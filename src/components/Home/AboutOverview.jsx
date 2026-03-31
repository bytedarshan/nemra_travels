import React from 'react';
import { motion } from 'framer-motion';

const AboutOverview = () => {
  return (
    <section className="w-full max-w-6xl mx-auto py-24 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-light uppercase tracking-widest mb-6">The Nemra Standard</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
          Whether you are a solo explorer seeking hidden gems or a premium travel agent curating bespoke itineraries, Nemra Travels provides a seamless, luxurious gateway to the globe's finest destinations, flights, and accommodations.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutOverview;