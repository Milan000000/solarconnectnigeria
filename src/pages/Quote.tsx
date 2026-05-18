import { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Phone, MapPin, Building, Banknote, Sun, Send, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Quote() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    propertyType: 'Home',
    budget: 'Under 1M',
    systemType: 'Small',
    notes: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      if (data.success) {
        // Carry WhatsApp link to Thank You page
        navigate('/thank-you', { state: { waLink: data.whatsappLink } });
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight mb-6">
              Get Your <span className="text-[#F59E0B]">Solar Quote</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              Tell us about your power needs. Our engine will match you with the best verified installers in your specific area.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-10 rounded-[32px] border border-[#E2E8F0] shadow-sm">
              <h3 className="text-xl font-bold text-[#0F172A] mb-8 flex items-center">
                <Sun className="w-6 h-6 text-[#F59E0B] mr-3" /> The Connection Process
              </h3>
              <div className="space-y-8">
                {[
                  { title: 'Data Submission', desc: 'We capture your specific energy requirements.' },
                  { title: 'Local Matching', desc: 'Our system identifies top installers near you.' },
                  { title: 'Quote Delivery', desc: 'Receive up to 3 competitive solar offers.' },
                  { title: 'Save Securely', desc: 'Review, compare, and pick the best partner.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center font-bold text-amber-600 shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A] mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1E293B] p-10 rounded-[32px] text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
               <Zap className="w-10 h-10 text-[#F59E0B] mb-6" />
               <h4 className="text-2xl font-bold mb-4 tracking-tight">Vetted Excellence</h4>
               <p className="text-slate-400 text-sm leading-relaxed font-medium">
                 Every installer on SolarConnect undergoes a 12-point verification process including certifications and historical performance auditing.
               </p>
            </div>
          </div>

          {/* Right: The Form */}
          <div className="lg:col-span-7">
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleSubmit}
              className="bg-white p-8 lg:p-12 rounded-[40px] border border-[#E2E8F0] shadow-sm space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 ml-1">Full Name</label>
                  <div className="relative group">
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Kola Owolabi"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-6 pr-4 py-4 bg-[#FBFBFA] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#F59E0B] transition-all outline-none text-[#0F172A] font-bold placeholder:text-slate-300 placeholder:font-medium"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 ml-1">Phone Number</label>
                  <div className="relative group">
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="0800 000 0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-6 pr-4 py-4 bg-[#FBFBFA] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#F59E0B] transition-all outline-none text-[#0F172A] font-bold placeholder:text-slate-300 placeholder:font-medium"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 ml-1">Installation Location</label>
                  <div className="relative group">
                     <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input
                      required
                      name="location"
                      type="text"
                      placeholder="Area, State (e.g. Barnawa, Kaduna)"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-14 pr-4 py-4 bg-[#FBFBFA] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#F59E0B] transition-all outline-none text-[#0F172A] font-bold placeholder:text-slate-300 placeholder:font-medium"
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 ml-1">Property</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-[#FBFBFA] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#F59E0B] transition-all outline-none text-[#0F172A] font-bold appearance-none cursor-pointer"
                  >
                    <option>Home</option>
                    <option>Office</option>
                    <option>Shop</option>
                    <option>Industrial</option>
                  </select>
                </div>

                {/* System Capacity */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 ml-1">Capacity Needs</label>
                  <select
                    name="systemType"
                    value={formData.systemType}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-[#FBFBFA] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#F59E0B] transition-all outline-none text-[#0F172A] font-bold appearance-none cursor-pointer"
                  >
                    <option>Small (Basic Lights)</option>
                    <option>Medium (Fridge/AC)</option>
                    <option>Full Scale (Duplex)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-[#EA580C] hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-5 rounded-2xl text-lg shadow-xl shadow-orange-100 transition-all flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? 'Syncing with Experts...' : 'Get Personalized Quote'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-[10px] text-slate-400 border-t border-[#E2E8F0] mt-8 pt-8 font-medium">
                  SECURE DATA TRANSMISSION • VERIFIED PARTNERS ONLY
                </p>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}
