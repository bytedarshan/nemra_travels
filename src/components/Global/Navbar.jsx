import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Importing our brain

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Bring in the current user data and logout function
  const { currentUser, logout } = useAuth(); 
  
  const isHome = location.pathname === '/';
  const requireSolidStyle = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        requireSolidStyle ? 'bg-white/90 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className={`text-2xl font-light tracking-widest uppercase ${requireSolidStyle ? 'text-slate-900' : 'text-white'}`}>
          Nemra Travels
        </Link>
        
        <div className={`hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest ${requireSolidStyle ? 'text-slate-600' : 'text-gray-200'}`}>
          <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <Link to="/flights" className="hover:text-amber-500 transition-colors">Flights</Link>
          <Link to="/trains" className="hover:text-amber-500 transition-colors">Trains</Link>
          <Link to="/hotels" className="hover:text-amber-500 transition-colors">Hotels</Link>
          <Link to="/cars" className="hover:text-amber-500 transition-colors">Cars</Link>
          
          <div className="flex items-center gap-6 ml-4 border-l border-current pl-6 opacity-80">
            {/* Conditional Rendering: If NO user, show Login. If user exists, show Account. */}
            {!currentUser ? (
              <Link to="/login" className="hover:text-amber-500 transition-colors">
                Login / Sign Up
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/account" className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  requireSolidStyle ? 'border-slate-300 hover:border-slate-900 text-slate-900' : 'border-white/30 hover:border-white text-white'
                }`}>
                  <User size={16} />
                  <span className="truncate max-w-[100px]">{currentUser.name.split(' ')[0]}</span>
                </Link>
                
                <button 
                  onClick={logout} 
                  title="Logout"
                  className="hover:text-red-500 transition-colors flex items-center"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;