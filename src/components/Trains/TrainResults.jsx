import React from 'react';
import { motion } from 'framer-motion';
import { TrainFront } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TrainFilters from './TrainFilters'; 

const dummyTrains = [
  { id: 1, name: 'SBC NDLS RAJ', number: '22691', from: 'SBC', to: 'NDLS', dep: '08:00 PM', arr: '05:30 AM', duration: '33h 30m', price: '₹5,840', class: '1A' },
  { id: 2, name: 'MYS VANDEBHARAT', number: '20608', from: 'SBC', to: 'MAS', dep: '02:55 PM', arr: '07:20 PM', duration: '4h 25m', price: '₹2,360', class: 'EC' },
  { id: 3, name: 'KARNATAKA EXP', number: '12627', from: 'SBC', to: 'NDLS', dep: '07:20 PM', arr: '09:00 AM', duration: '37h 40m', price: '₹4,120', class: '2A' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const TrainResults = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleBooking = (train) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    // Forward train data to checkout page
    navigate('/book/train', { state: { train } });
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
        <h2 className="text-3xl font-light uppercase tracking-widest text-slate-900">Select Train</h2>
        <p className="text-sm text-gray-500 uppercase tracking-widest">Showing Top Results</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <TrainFilters />

        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col gap-6 w-full lg:w-3/4">
          {dummyTrains.map((train) => (
            <motion.div key={train.id} variants={itemVariants} className="group flex flex-col md:flex-row items-center justify-between bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
              
              <div className="flex items-center gap-6 w-full md:w-1/4 mb-6 md:mb-0">
                <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center border border-gray-100 flex-shrink-0">
                  <TrainFront size={24} className="text-slate-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-slate-900 whitespace-nowrap">{train.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-1 rounded-full inline-block">#{train.number}</span>
                    <span className="text-[10px] uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-1 rounded-full inline-block">{train.class}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center w-full md:flex-1 px-4 md:px-8 mb-6 md:mb-0">
                <div className="text-center min-w-[80px]">
                  <p className="text-2xl font-light text-slate-900">{train.dep}</p>
                  <p className="text-sm text-gray-500 font-medium">{train.from}</p>
                </div>
                
                <div className="flex flex-col items-center flex-1 px-4">
                  <span className="text-[11px] font-semibold tracking-widest text-slate-400 mb-2">{train.duration}</span>
                  <div className="w-full flex items-center relative">
                    <div className="w-full border-t-[1.5px] border-solid border-gray-300"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-500 border-2 border-white box-content"></div>
                  </div>
                  <span className="text-[11px] font-medium tracking-widest text-slate-400 mt-2 uppercase">Direct Route</span>
                </div>

                <div className="text-center min-w-[80px]">
                  <p className="text-2xl font-light text-slate-900">{train.arr}</p>
                  <p className="text-sm text-gray-500 font-medium">{train.to}</p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end w-full md:w-1/4 gap-6 pl-0 md:pl-4 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                <p className="text-2xl font-medium text-slate-900">{train.price}</p>
                <button 
                  onClick={() => handleBooking(train)}
                  className="bg-slate-900 text-white px-8 py-3 rounded-lg uppercase tracking-wider text-sm font-semibold hover:bg-amber-600 transition-colors"
                >
                  Select
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrainResults;