import React from 'react';
import { motion } from 'framer-motion';

const HotelSearch = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-20 -mt-20 w-11/12 max-w-6xl mx-auto bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/40"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Destination</label>
          <input type="text" placeholder="Where are you going?" className="p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Check-in</label>
          <input type="date" className="p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-600" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Check-out</label>
          <input type="date" className="p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-600" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Guests</label>
          <select className="p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-600 uppercase tracking-wide text-sm">
            <option>1 Adult, 0 Children</option>
            <option>2 Adults, 0 Children</option>
            <option>2 Adults, 2 Children</option>
          </select>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button className="bg-slate-900 text-white px-10 py-3 rounded-lg uppercase tracking-wider font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
          Search Hotels
        </button>
      </div>
    </motion.div>
  );
};

export default HotelSearch;