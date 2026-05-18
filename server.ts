import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import { MongoClient, ObjectId } from "mongodb";
import { LeadStatus, SubscriptionStatus } from "./src/types";

// --- Database Connection ---
const MONGODB_URI = process.env.MONGODB_URI;
let db: any = null;

async function connectDB() {
  if (MONGODB_URI) {
    try {
      const client = new MongoClient(MONGODB_URI);
      await client.connect();
      db = client.db("solarconnect");
      console.log("Connected to MongoDB Atlas");
    } catch (e) {
      console.error("MongoDB connection failed, falling back to in-memory:", e);
    }
  }
}

// --- Fallback In-Memory Data ---
let mem_leads: any[] = [];
let mem_installers: any[] = [
  {
    _id: "1",
    businessName: "Lagos Solar Solutions",
    phone: "+234 800 123 4567",
    email: "info@lagossolar.com",
    location: "Lagos",
    subscriptionStatus: SubscriptionStatus.ACTIVE,
    createdAt: new Date().toISOString(),
  }
];

async function startServer() {
  await connectDB();
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // --- Auth Middleware ---
  const authenticateAdmin = (req: any, res: any, next: any) => {
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
      req.admin = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // --- API Routes ---

  // Admin Auth
  app.post("/api/auth/login", (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    
    if (password === adminPassword) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1d" });
      res.cookie("admin_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
      return res.json({ success: true });
    }
    res.status(401).json({ error: "Incorrect password" });
  });

  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("admin_token");
    res.json({ success: true });
  });

  app.get("/api/auth/check", (req, res) => {
    const token = req.cookies.admin_token;
    if (!token) return res.json({ authenticated: false });
    try {
      jwt.verify(token, process.env.JWT_SECRET || "default_secret");
      res.json({ authenticated: true });
    } catch (err) {
      res.json({ authenticated: false });
    }
  });

  // Leads API
  app.get("/api/leads", authenticateAdmin, async (req, res) => {
    if (db) {
      const leads = await db.collection("leads").find().sort({ createdAt: -1 }).toArray();
      return res.json(leads);
    }
    res.json([...mem_leads].sort((a,b) => b.createdAt.localeCompare(a.createdAt)));
  });

  app.post("/api/leads", async (req, res) => {
    const leadData = req.body;
    const newLead = {
      ...leadData,
      status: LeadStatus.NEW,
      createdAt: new Date().toISOString(),
    };
    
    if (db) {
      await db.collection("leads").insertOne(newLead);
    } else {
      newLead._id = Math.random().toString(36).substr(2, 9);
      mem_leads.push(newLead);
    }
    
    // Generate WhatsApp Link
    const message = `Hello SolarConnect! I am ${newLead.name}. I just requested a solar quote for my ${newLead.propertyType} in ${newLead.location}. Phone: ${newLead.phone}`;
    const waLink = `https://wa.me/2347033340185?text=${encodeURIComponent(message)}`;
    
    res.status(201).json({ success: true, lead: newLead, whatsappLink: waLink });
  });

  app.patch("/api/leads/:id", authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    
    if (db) {
      await db.collection("leads").updateOne({ _id: new ObjectId(id) }, { $set: updates });
    } else {
      mem_leads = mem_leads.map(l => l._id === id ? { ...l, ...updates } : l);
    }
    res.json({ success: true });
  });

  app.delete("/api/leads/:id", authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    if (db) {
      await db.collection("leads").deleteOne({ _id: new ObjectId(id) });
    } else {
      mem_leads = mem_leads.filter(l => l._id !== id);
    }
    res.json({ success: true });
  });

  // Installers API
  app.get("/api/installers", authenticateAdmin, async (req, res) => {
    if (db) {
      const installers = await db.collection("installers").find().toArray();
      return res.json(installers);
    }
    res.json(mem_installers);
  });

  app.post("/api/installers", authenticateAdmin, async (req, res) => {
    const installerData = req.body;
    const newInstaller = {
      ...installerData,
      createdAt: new Date().toISOString(),
    };
    
    if (db) {
      await db.collection("installers").insertOne(newInstaller);
    } else {
      newInstaller._id = Math.random().toString(36).substr(2, 9);
      mem_installers.push(newInstaller);
    }
    res.status(201).json(newInstaller);
  });

  app.patch("/api/installers/:id", authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    
    if (db) {
      await db.collection("installers").updateOne({ _id: new ObjectId(id) }, { $set: updates });
    } else {
      mem_installers = mem_installers.map(i => i._id === id ? { ...i, ...updates } : i);
    }
    res.json({ success: true });
  });

  // Export CSV
  app.get("/api/export/leads", authenticateAdmin, async (req, res) => {
    let exportLeads = mem_leads;
    if (db) {
      exportLeads = await db.collection("leads").find().toArray();
    }
    
    const headers = "Name,Phone,Location,Property,Budget,Type,Status,Created\n";
    const rows = exportLeads.map(l => 
      `"${l.name}","${l.phone}","${l.location}","${l.propertyType}","${l.budget}","${l.systemType}","${l.status}","${l.createdAt}"`
    ).join("\n");
    
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=solar_leads.csv");
    res.send(headers + rows);
  });

  // --- Vite Middleware or Static Serving ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
