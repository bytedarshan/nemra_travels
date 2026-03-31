import React from 'react';
import { motion } from 'framer-motion';

const CarSearch = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-20 -mt-20 w-11/12 max-w-6xl mx-auto bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/40"
    >
      <div className="flex gap-6 mb-6 border-b border-gray-200 pb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="driverOption" defaultChecked className="accent-amber-500" />
          <span className="text-sm font-semibold uppercase tracking-wider text-slate-900">With Driver</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="driverOption" className="accent-amber-500" />
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-500 hover:text-slate-900 transition-colors">Self Drive</span>
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input type="text" placeholder="Pickup Location" className="p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
        <input type="date" className="p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-600" />
        <input type="time" className="p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-600" />
        <select className="p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-600 uppercase tracking-wide text-sm">
          <option>Luxury Sedan</option>
          <option>Premium SUV</option>
          <option>Exotic Convertible</option>
        </select>
      </div>
      <div className="mt-6 flex justify-end">
        <button className="bg-slate-900 text-white px-10 py-3 rounded-lg uppercase tracking-wider font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
          Find Your Ride
        </button>
      </div>
    </motion.div>
  );
};

export default CarSearch;