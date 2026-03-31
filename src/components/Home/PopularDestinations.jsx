import React from 'react';
import { motion } from 'framer-motion';

const destinations = [
  { 
    name: 'Santorini', 
    img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1000&auto=format&fit=crop', 
    desc: 'Whitewashed luxury by the Aegean.' 
  },
  { 
    name: 'Kyoto', 
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop', 
    desc: 'Timeless tranquility and heritage.' 
  },
  { 
    name: 'Bali', 
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop', 
    desc: 'Tropical luxury and serene beaches.' 
  }
];

const PopularDestinations = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-light uppercase tracking-widest mb-12 text-center">Curated Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {destinations.map((dest, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group relative h-96 rounded-2xl overflow-hidden shadow-xl cursor-pointer"
          >
            <img src={dest.img} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-2xl text-white font-medium tracking-wide mb-2">{dest.name}</h3>
              <p className="text-gray-300 font-light opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                {dest.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;