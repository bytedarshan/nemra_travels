import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Users, Briefcase, ShieldCheck } from 'lucide-react';
import CarFilters from './CarFilters';

const dummyCars = [
  { 
    id: 1, 
    name: 'Mercedes-Benz S-Class', 
    price: '₹12,500', 
    type: 'Luxury Sedan',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop',
    specs: { seats: 4, bags: 2, trans: 'Auto' }
  },
  { 
    id: 2, 
    name: 'Range Rover Autobiography', 
    price: '₹18,000', 
    type: 'Premium SUV',
    image: 'https://images.unsplash.com/photo-1606148632349-53815309993c?q=80&w=1000&auto=format&fit=crop',
    specs: { seats: 5, bags: 4, trans: 'Auto' }
  },
  { 
    id: 3, 
    name: 'Audi A8 L', 
    price: '₹11,000', 
    type: 'Luxury Sedan',
    image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?q=80&w=1000&auto=format&fit=crop',
    specs: { seats: 4, bags: 2, trans: 'Auto' }
  },
];

const CarResults = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
        <h2 className="text-3xl font-light uppercase tracking-widest text-slate-900">Available Fleet</h2>
        <p className="text-sm text-gray-500 uppercase tracking-widest">Chauffeur Included Rates</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <CarFilters />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full lg:w-3/4">
          {dummyCars.map((car, index) => (
            <motion.div 
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="h-56 relative overflow-hidden">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck size={14} className="text-amber-600" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Verified</span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-medium text-slate-900">{car.name}</h3>
                  <p className="text-xs uppercase tracking-widest text-amber-600 mt-1">{car.type}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6 border-y border-gray-50 py-4">
                  <div className="flex flex-col items-center gap-1">
                    <Users size={16} className="text-gray-400" />
                    <span className="text-[11px] text-gray-500">{car.specs.seats} Seats</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-x border-gray-100 px-2">
                    <Briefcase size={16} className="text-gray-400" />
                    <span className="text-[11px] text-gray-500">{car.specs.bags} Bags</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Gauge size={16} className="text-gray-400" />
                    <span className="text-[11px] text-gray-500">{car.specs.trans}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Starting At</p>
                    <p className="text-2xl font-medium text-slate-900">{car.price}<span className="text-sm font-light text-gray-500">/day</span></p>
                  </div>
                  <button className="bg-slate-900 text-white px-6 py-2 rounded-lg uppercase tracking-wider text-xs font-semibold hover:bg-amber-600 transition-colors">
                    Reserve
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarResults;