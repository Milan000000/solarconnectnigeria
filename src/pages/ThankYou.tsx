import { motion } from 'motion/react';
import { CheckCircle2, MessageCircle, ArrowRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function ThankYou() {
  const location = useLocation();
  const waLink = location.state?.waLink || 'https://wa.me/2347033340185';

  return (
    <div className="min-h-screen pt-40 pb-20 bg-[#FBFBFA] flex items-center justify-center">
      <div className="max-w-xl w-full px-4 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-emerald-500/10"
        >
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </motion.div>

        <h1 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">Request Received!</h1>
        <p className="text-slate-600 text-lg mb-10 font-medium leading-relaxed">
          Thank you for choosing SolarConnect. Our verified installers have been notified and will contact you shortly with your quotes.
        </p>

        <div className="space-y-4">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#22c35e] text-white px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-green-100 transition-all text-lg"
          >
            <MessageCircle className="w-6 h-6" /> Chat on WhatsApp Now
          </a>
          
          <Link
            to="/"
            className="w-full bg-white border border-[#E2E8F0] text-slate-700 px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:border-amber-500 hover:text-amber-600 transition-all text-lg shadow-sm"
          >
            <Home className="w-5 h-5" /> Back to Home
          </Link>
        </div>

        <div className="mt-12 p-8 bg-amber-50 rounded-[32px] border border-amber-100/50">
          <p className="text-sm text-amber-800 font-bold italic">
            "We typically respond within 2-4 hours. Keep your phone nearby!"
          </p>
        </div>
      </div>
    </div>
  );
}
