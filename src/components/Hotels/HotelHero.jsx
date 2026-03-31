import React from 'react';
import { motion } from 'framer-motion';

const HotelHero = () => {
  return (
    <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" 
        alt="Luxury Resort" 
        className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
      />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-4 mt-16"
      >
        <h1 className="text-5xl font-light tracking-widest uppercase mb-4 shadow-sm">
          World-Class Stays
        </h1>
        <p className="text-lg font-light tracking-wide text-gray-300">
          Handpicked luxury hotels and private villas across the globe.
        </p>
      </motion.div>
    </section>
  );
};

export default HotelHero;