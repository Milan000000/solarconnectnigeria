import { Sun, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Sun className="h-6 w-6 text-yellow-500 fill-yellow-500" />
              <span className="text-xl font-bold text-white tracking-tight">SolarConnect<span className="text-yellow-600">NG</span></span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Connecting millions of Nigerians with reliable, verified solar energy installers since 2026. Empowering homes and businesses with clean energy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link></li>
              <li><Link to="/quote" className="hover:text-yellow-500 transition-colors">Request a Quote</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-500 transition-colors">Contact Us</Link></li>
              <li><Link to="/admin" className="hover:text-yellow-500 transition-colors">Installer Portal</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Verify Installer</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Connect With Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-yellow-500" />
                <span>support@solarconnect.ng</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-yellow-500" />
                <span>+234 800 SOLAR NG</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-yellow-500" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SolarConnect Nigeria. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
