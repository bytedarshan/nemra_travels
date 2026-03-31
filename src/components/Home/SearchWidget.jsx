import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SearchWidget = () => {
  // Track which tab is currently selected (defaults to Flights)
  const [activeTab, setActiveTab] = useState('Flights');
  const navigate = useNavigate();

  // Route the user based on the currently active tab
  const handleSearch = () => {
    if (activeTab === 'Flights') navigate('/flights');
    else if (activeTab === 'Trains') navigate('/trains');
    else if (activeTab === 'Hotels') navigate('/hotels');
    else if (activeTab === 'Cars') navigate('/cars');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-20 -mt-24 w-11/12 max-w-6xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/40 mx-auto"
    >
      {/* Service Tabs */}
      <div className="flex gap-6 mb-6 border-b border-gray-200 pb-4">
        {['Flights', 'Trains', 'Hotels', 'Cars'].map(service => (
          <button 
            key={service} 
            onClick={() => setActiveTab(service)}
            className={`text-sm font-semibold uppercase tracking-wider transition-all duration-300 pb-1 ${
              activeTab === service 
                ? 'text-amber-600 border-b-2 border-amber-600' 
                : 'text-gray-500 hover:text-slate-900 border-b-2 border-transparent'
            }`}
          >
            {service}
          </button>
        ))}
      </div>

      {/* Search Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <input 
          type="text" 
          placeholder={activeTab === 'Hotels' ? 'City or Hotel Name' : 'From'} 
          className="p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors" 
        />
        <input 
          type="text" 
          placeholder={activeTab === 'Hotels' ? 'Check-in Date' : 'To'} 
          className="p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors" 
        />
        <input 
          type="date" 
          className="p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-slate-600 transition-colors" 
        />
        <input 
          type="number" 
          placeholder="Pax" 
          min="1" 
          className="p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors" 
        />
        <button 
          onClick={handleSearch}
          className="bg-slate-900 text-white rounded-lg uppercase tracking-wider font-semibold hover:bg-amber-600 transition-colors shadow-lg shadow-slate-900/20"
        >
          Search
        </button>
      </div>
    </motion.div>
  );
};

export default SearchWidget;