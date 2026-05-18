import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Layers, Settings, LogOut, CheckCircle2, 
  Clock, Trash2, Download, Search, Plus, ExternalLink,
  MoreVertical, ShieldCheck, Mail, Phone, MapPin, Subtitles,
  Sun
} from 'lucide-react';
import { Lead, LeadStatus, Installer, SubscriptionStatus } from '../types';
import { cn } from '../lib/utils';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [installers, setInstallers] = useState<Installer[]>([]);
  const [activeTab, setActiveTab] = useState<'leads' | 'installers' | 'settings'>('leads');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        alert('Incorrect password');
      }
    } catch (e) {
      alert('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    try {
      const [leadsRes, installersRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/installers')
      ]);
      
      const leadsData = await leadsRes.json();
      const installersData = await installersRes.json();

      setLeads(Array.isArray(leadsData) ? leadsData : []);
      setInstallers(Array.isArray(installersData) ? installersData : []);
    } catch (e) {
      console.error('Fetch error:', e);
      setLeads([]);
      setInstallers([]);
    }
  };

  const updateLeadStatus = async (id: string, status: LeadStatus) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) fetchData();
    } catch (e) {
      console.error('Update error:', e);
    }
  };

  const updateLeadAssignment = async (id: string, assignedInstaller: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignedInstaller }),
      });
      if (res.ok) fetchData();
    } catch (e) {
      console.error('Assignment error:', e);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  const exportLeads = () => {
    window.open('/api/export/leads', '_blank');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FBFBFA] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white p-10 rounded-[40px] border border-[#E2E8F0] shadow-2xl"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#F59E0B] rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-amber-500/20">
              <Sun className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Admin Terminal</h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">SolarConnect Nigeria Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Access Password</label>
              <input
                type="password"
                required
                className="w-full bg-[#FBFBFA] border border-[#E2E8F0] rounded-2xl px-6 py-4 text-[#0F172A] focus:ring-2 focus:ring-[#F59E0B] outline-none transition-all placeholder:text-slate-300 font-bold"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-[#1E293B] text-white font-bold py-5 rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
            >
              Initialize System {isLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const safeLeads = Array.isArray(leads) ? leads : [];
  const safeInstallers = Array.isArray(installers) ? installers : [];

  const filteredLeads = safeLeads.filter(l => 
    (l.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    (l.location?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-[#1E293B] border-r border-slate-800 flex flex-col fixed h-full z-30">
        <div className="p-6 hidden lg:block border-b border-slate-800/50">
           <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#F59E0B] rounded-lg flex items-center justify-center">
              <Sun className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">SolarAdmin</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          <button
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === 'leads' ? 'bg-[#F59E0B] text-white font-bold shadow-lg shadow-amber-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Users className="w-5 h-5 shrink-0" />
            <span className="hidden lg:block text-sm">Lead Engine</span>
          </button>
          <button
            onClick={() => setActiveTab('installers')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === 'installers' ? 'bg-[#F59E0B] text-white font-bold shadow-lg shadow-amber-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Layers className="w-5 h-5 shrink-0" />
            <span className="hidden lg:block text-sm">Partners</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-[#F59E0B] text-white font-bold shadow-lg shadow-amber-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span className="hidden lg:block text-sm">Configuration</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-medium"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="hidden lg:block">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 lg:ml-64 p-8 lg:p-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 pb-8 border-b border-[#E2E8F0]">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {activeTab === 'leads' ? 'Global Lead Stream' : activeTab === 'installers' ? 'Installer Portfolio' : 'System Variables'}
            </h2>
            <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest leading-none">Live Data Visualization</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Filter data stream..."
                className="pl-11 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#F59E0B] outline-none w-64 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {activeTab === 'leads' && (
              <button
                onClick={exportLeads}
                className="bg-white border border-[#E2E8F0] text-slate-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all text-sm shadow-sm"
              >
                <Download className="w-4 h-4" /> Export
              </button>
            )}
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Volume', val: safeLeads.length, color: 'bg-blue-500' },
            { label: 'New Entries', val: safeLeads.filter(l => l.status === LeadStatus.NEW).length, color: 'bg-[#EA580C]' },
            { label: 'Active Partners', val: safeInstallers.filter(i => i.subscriptionStatus === SubscriptionStatus.ACTIVE).length, color: 'bg-[#F59E0B]' },
            { label: 'Conversion', val: `${Math.round((safeLeads.filter(l => l.status === LeadStatus.CLOSED).length / (safeLeads.length || 1)) * 100)}%`, color: 'bg-emerald-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-6">
              <div className={cn("w-2 h-2 rounded-full", stat.color)} />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-[#0F172A] tracking-tighter leading-none">{stat.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Table Section */}
        <AnimatePresence mode="wait">
          {activeTab === 'leads' && (
            <motion.div
              key="leads"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] bg-slate-50/50">
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Requester</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Config</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Partner Assigned</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Budget</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Status</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {filteredLeads.map((lead) => (
                      <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500 uppercase">
                              {lead.name[0]}
                            </div>
                            <div>
                              <p className="font-bold text-[#0F172A]">{lead.name}</p>
                              <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mt-1">
                                <span className="flex items-center gap-1 uppercase tracking-wider">{lead.location}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-sm">
                          <p className="font-bold text-[#1E293B]">{lead.systemType}</p>
                          <p className="text-xs text-slate-400 font-medium">{lead.propertyType}</p>
                        </td>
                        <td className="px-8 py-5">
                          <select
                            value={lead.assignedInstaller || ""}
                            onChange={(e) => updateLeadAssignment(lead._id!, e.target.value)}
                            className="text-[10px] font-bold px-3 py-1 rounded-lg border border-[#E2E8F0] bg-[#FBFBFA] outline-none text-slate-600 focus:ring-2 focus:ring-amber-500 transition-all uppercase tracking-wider w-full max-w-[160px]"
                          >
                            <option value="">Unassigned</option>
                            {safeInstallers.map(inst => (
                              <option key={inst._id} value={inst._id}>{inst.businessName}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-8 py-5">
                          <span className="inline-flex px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded border border-slate-200">
                            {lead.budget}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead._id!, e.target.value as LeadStatus)}
                            className={cn(
                              "text-[10px] font-bold px-3 py-1 rounded-lg border outline-none transition-all uppercase tracking-wider",
                              lead.status === LeadStatus.NEW && "bg-orange-900/10 text-orange-600 border-orange-200",
                              lead.status === LeadStatus.CONTACTED && "bg-emerald-900/10 text-emerald-600 border-emerald-200",
                              lead.status === LeadStatus.CLOSED && "bg-slate-900/10 text-slate-600 border-slate-200",
                            )}
                          >
                            <option value={LeadStatus.NEW}>New</option>
                            <option value={LeadStatus.CONTACTED}>Contacted</option>
                            <option value={LeadStatus.CLOSED}>Finalized</option>
                          </select>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => deleteLead(lead._id!)}
                              className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredLeads.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-8 py-20 text-center text-slate-400 italic">
                          No leads found in the current buffer.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'installers' && (
            <motion.div
              key="installers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {safeInstallers.map((installer) => (
                <div key={installer._id} className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-sm relative overflow-hidden group">
                  <div className={cn(
                    "absolute top-0 right-0 w-32 h-32 -translate-y-1/2 translate-x-1/4 rounded-full blur-3xl opacity-20",
                    installer.subscriptionStatus === SubscriptionStatus.ACTIVE ? "bg-emerald-500" : "bg-slate-500"
                  )} />
                  
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 bg-[#1E293B] rounded-2xl flex items-center justify-center">
                      <Sun className="h-6 w-6 text-[#F59E0B]" />
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest",
                      installer.subscriptionStatus === SubscriptionStatus.ACTIVE ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                    )}>
                      {installer.subscriptionStatus}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">{installer.businessName}</h3>
                  <p className="text-slate-500 text-sm mb-6 flex items-center gap-2 font-medium uppercase tracking-wider text-[10px]">
                    <MapPin className="w-3 h-3 text-amber-500" /> {installer.location}
                  </p>

                  <div className="space-y-4 pt-6 border-t border-[#E2E8F0]">
                    <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                      <Mail className="w-4 h-4 text-slate-400" /> {installer.email}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                      <Phone className="w-4 h-4 text-slate-400" /> {installer.phone}
                    </div>
                  </div>

                  <button className="w-full mt-8 bg-[#FBFBFA] hover:bg-slate-100 text-slate-700 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm border border-[#E2E8F0]">
                    Manage Partner <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-12 rounded-[50px] border border-slate-200 max-w-2xl"
            >
              <h3 className="text-2xl font-extrabold text-[#0F172A] mb-8 tracking-tight">Platform Parameters</h3>
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Lead Assignment Logic</label>
                  <select className="w-full bg-[#FBFBFA] border border-[#E2E8F0] rounded-xl px-6 py-4 text-[#0F172A] font-bold outline-none focus:ring-2 focus:ring-amber-500 transition-all appearance-none cursor-pointer">
                    <option>Manual Distribution (Current)</option>
                    <option>Round Robin (Auto)</option>
                    <option>Highest Ranked First</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Admin Notification Email</label>
                  <input
                    type="email"
                    className="w-full bg-[#FBFBFA] border border-[#E2E8F0] rounded-xl px-6 py-4 text-[#0F172A] font-bold outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    defaultValue="davidaiki17@gmail.com"
                  />
                </div>
                <div className="flex items-center justify-between p-6 bg-amber-50 rounded-2xl border border-amber-100">
                   <div>
                     <p className="font-bold text-amber-900 text-sm">Subscription Engine</p>
                     <p className="text-xs text-amber-700 opacity-80 font-medium">Automatic suspension of non-paying installers.</p>
                   </div>
                   <div className="w-12 h-6 bg-amber-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                   </div>
                </div>
                <button className="bg-[#1E293B] text-white px-10 py-5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-100">
                  Update Configuration
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
