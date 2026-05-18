import { Link } from 'react-router-dom';
import { Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Get a Quote', path: '/quote' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E2E8F0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#F59E0B] rounded-xl flex items-center justify-center">
              <Sun className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0F172A]">SolarConnect <span className="text-[#F59E0B]">Nigeria</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-slate-600 hover:text-[#F59E0B] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="px-4 py-2 bg-[#1E293B] text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-slate-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/quote"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-yellow-500 text-white px-4 py-3 rounded-xl font-semibold mt-4"
              >
                Get Free Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
