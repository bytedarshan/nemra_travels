import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
        alt="Luxury Travel" 
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-4"
      >
        <h1 className="text-6xl font-light tracking-widest uppercase mb-4 shadow-sm">
          Nemra Travels
        </h1>
        <p className="text-xl font-light tracking-wide text-gray-200">
          Experience the world without compromise.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;