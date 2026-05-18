import { motion } from 'motion/react';
import { ArrowRight, Zap, ShieldCheck, BadgeCheck, Sun, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Home() {
  const benefits = [
    {
      title: "Save on Energy Bills",
      description: "Slash your monthly electricity costs by up to 100% with sustainable solar power.",
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
    },
    {
      title: "Reliable 24/7 Power",
      description: "Say goodbye to grid instability and power outages. Enjoy uninterrupted energy.",
      icon: <Sun className="h-6 w-6 text-yellow-500" />,
    },
    {
      title: "Verified Installers",
      description: "We only work with certified, vetted installers to ensure the highest quality systems.",
      icon: <ShieldCheck className="h-6 w-6 text-yellow-500" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-br from-white to-[#FFFBEB] overflow-hidden border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/80 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-amber-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                42 New Installers Joined Today
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-[#0F172A] tracking-tight leading-[1.1] mb-8">
                Get Reliable <span className="text-[#F59E0B]">Solar Power</span> Near You
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl font-medium">
                The #1 platform connecting Nigerian homeowners with vetted solar experts. Save on bills, eliminate blackouts, and switch to clean energy in days.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/quote"
                  className="w-full sm:w-auto bg-[#EA580C] hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-orange-200 transition-all flex items-center justify-center group"
                >
                  Get Free Quote <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto bg-white border border-[#E2E8F0] hover:border-amber-300 text-slate-700 hover:text-amber-700 px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center shadow-sm"
                >
                  Verified Installers
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-5/12 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-3xl shadow-2xl border border-[#E2E8F0] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                    <Sun className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A]">Request Quote</h3>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-widest leading-none mt-1">Live in Lagos, Abuja, Kaduna & More</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center px-4 text-sm text-slate-400 font-medium">Lagos, Abuja, Kaduna...</div>
                  <div className="h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center px-4 text-sm text-slate-400 font-medium">Medium (5kVA)</div>
                  <Link to="/quote" className="block w-full bg-[#1E293B] text-white text-center py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">Start Your Search</Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4 tracking-tight">Why Choose SolarConnect?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">We're building Nigeria's most trusted solar marketplace, focused on quality, transparency, and reliability.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 rounded-[32px] border border-[#E2E8F0] bg-white hover:border-amber-200 transition-all shadow-sm group"
              >
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-8 mx-auto md:mx-0 group-hover:bg-amber-100 transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-4">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-yellow-200 -translate-y-1/2 z-0" />
            
            {[
              { step: '1', title: 'Submit Request', desc: 'Tell us about your power needs and location.', color: 'bg-yellow-500' },
              { step: '2', title: 'Get Matched', desc: 'We notify top verified installers in your area.', color: 'bg-orange-500' },
              { step: '3', title: 'Start Saving', desc: 'Recieve quotes and pick the best installer.', color: 'bg-green-500' },
            ].map((item, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center">
                <div className={cn("w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg", item.color)}>
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 font-medium px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Happy Solar Owners</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "John Adeyemi", loc: "Lekki, Lagos", text: "Finally free from NEPA blackouts! The installer SolarConnect matched me with was super professional and fast." },
              { name: "Ngozi Obi", loc: "Enugu City", text: "I saved over 40k last month on my shop's electricity bills. This platform is a lifesaver for business owners." },
              { name: "Sani Ibrahim", loc: "Maitama, Abuja", text: "Exceptional service. Got 3 quotes within hours of submitting the form. Highly recommend!" },
            ].map((t, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-start">
                <div className="flex mb-4">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                </div>
                <p className="text-slate-700 italic mb-6 font-medium">"{t.text}"</p>
                <div className="mt-auto">
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-slate-500 text-sm font-medium">{t.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-500 rounded-[40px] p-12 lg:p-20 text-center relative overflow-hidden">
             {/* Decorative Circles */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-black/5 rounded-full" />
            
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-8 relative z-10 leading-tight">
              Ready to harness the sun? <br />
              Get your free quote today.
            </h2>
            <Link
              to="/quote"
              className="inline-flex items-center bg-white text-yellow-600 px-10 py-5 rounded-full text-xl font-bold hover:bg-yellow-50 transition-colors shadow-2xl relative z-10"
            >
              Get Free Quote <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
