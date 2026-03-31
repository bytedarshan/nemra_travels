import React from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section className="w-full bg-slate-900 text-white py-24 mt-16">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 text-center"
      >
        <h2 className="text-3xl font-light uppercase tracking-widest mb-8">Connect With Us</h2>
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <input type="email" placeholder="Your Email" className="p-4 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-400" />
          <textarea placeholder="How can we assist your journey?" rows="4" className="p-4 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-400"></textarea>
          <button className="bg-white text-slate-900 py-4 rounded-lg uppercase tracking-wider font-semibold hover:bg-gray-200 transition-colors">
            Send Inquiry
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;