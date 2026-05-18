import { motion } from 'motion/react';
import { Mail, Phone, MessageCircle, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-40 pb-24 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-[#0F172A] mb-8 leading-[1.1] tracking-tight">
              Talk to Our <br /> <span className="text-[#F59E0B]">Expert Team</span>
            </h1>
            <p className="text-lg text-slate-600 mb-12 font-medium leading-relaxed max-w-xl">
              Have questions about solar energy, installation costs, or how our platform works? We're here to help you make the right choice for your home.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Mail className="w-5 h-5" />, label: "Email Us", val: "davidaiki17@gmail.com", link: "mailto:davidaiki17@gmail.com" },
                { icon: <Phone className="w-5 h-5" />, label: "Call Center", val: "+234 800 SOLAR", link: "tel:+234800000000" },
                { icon: <MessageCircle className="w-5 h-5" />, label: "WhatsApp", val: "+234 703 334 0185", link: "https://wa.me/2347033340185" },
                { icon: <MapPin className="w-5 h-5" />, label: "HQ Office", val: "VI, Lagos", link: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  className="p-6 rounded-[32px] border border-[#E2E8F0] bg-white hover:border-[#F59E0B]/30 hover:bg-amber-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-slate-50 flex items-center justify-center rounded-xl group-hover:bg-white transition-colors text-[#F59E0B] mb-4">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-[#0F172A]">{item.val}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 lg:p-14 rounded-[50px] border border-[#E2E8F0] shadow-sm"
          >
            <h3 className="text-2xl font-bold text-[#0F172A] mb-8 tracking-tight">Drop a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 bg-[#FBFBFA] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#F59E0B] outline-none transition-all font-medium"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-6 py-4 bg-[#FBFBFA] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#F59E0B] outline-none transition-all font-medium"
                />
              </div>
              <textarea
                rows={4}
                placeholder="How can we help?"
                className="w-full px-6 py-4 bg-[#FBFBFA] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#F59E0B] outline-none transition-all resize-none font-medium"
              />
              <button
                type="button"
                className="w-full bg-[#1E293B] text-white font-bold py-5 rounded-2xl text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-100 flex items-center justify-center gap-3"
              >
                Send Message <Send className="w-5 h-5 text-amber-500" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
