import React from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FlightFilters from './FlightFilters'; 

const dummyFlights = [
  { id: 1, airline: 'Emirates', from: 'DXB', to: 'JFK', dep: '08:00 AM', arr: '02:00 PM', duration: '14h 00m', price: '₹1,04,250', class: 'Business' },
  { id: 2, airline: 'Qatar Airways', from: 'DOH', to: 'LHR', dep: '11:30 AM', arr: '04:15 PM', duration: '7h 45m', price: '₹74,890', class: 'First Class' },
  { id: 3, airline: 'Singapore Airlines', from: 'SIN', to: 'SYD', dep: '09:15 PM', arr: '06:55 AM', duration: '7h 40m', price: '₹91,100', class: 'Business' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const FlightResults = () => {
  const { currentUser, bookItem } = useAuth();
  const navigate = useNavigate();

  const handleBooking = (flight) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // INSTEAD of booking instantly, we pass the data to our new checkout page
    navigate('/book/flight', { state: { flight } });
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
        <h2 className="text-3xl font-light uppercase tracking-widest text-slate-900">Select Departure</h2>
        <p className="text-sm text-gray-500 uppercase tracking-widest">Showing Top Results</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <FlightFilters />

        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col gap-6 w-full lg:w-3/4">
          {dummyFlights.map((flight) => (
            <motion.div key={flight.id} variants={itemVariants} className="group flex flex-col md:flex-row items-center justify-between bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-6 w-full md:w-1/4 mb-6 md:mb-0">
                <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center border border-gray-100 flex-shrink-0">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Air</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-slate-900 whitespace-nowrap">{flight.airline}</h4>
                  <span className="text-[10px] uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-1 rounded-full inline-block mt-1">{flight.class}</span>
                </div>
              </div>

              <div className="flex items-center justify-center w-full md:flex-1 px-4 md:px-8 mb-6 md:mb-0">
                <div className="text-center min-w-[80px]">
                  <p className="text-2xl font-light text-slate-900">{flight.dep}</p>
                  <p className="text-sm text-gray-500 font-medium">{flight.from}</p>
                </div>
                <div className="flex flex-col items-center flex-1 px-4">
                  <span className="text-[11px] font-semibold tracking-widest text-slate-400 mb-2">{flight.duration}</span>
                  <div className="w-full flex items-center relative">
                    <div className="w-full border-t-[1.5px] border-dashed border-gray-300"></div>
                    <Plane size={18} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-500 bg-white px-1" />
                  </div>
                  <span className="text-[11px] font-medium tracking-widest text-amber-600 mt-2 uppercase">Direct</span>
                </div>
                <div className="text-center min-w-[80px]">
                  <p className="text-2xl font-light text-slate-900">{flight.arr}</p>
                  <p className="text-sm text-gray-500 font-medium">{flight.to}</p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end w-full md:w-1/4 gap-6 pl-0 md:pl-4 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                <p className="text-2xl font-medium text-slate-900">{flight.price}</p>
                <button 
                  onClick={() => handleBooking(flight)}
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

export default FlightResults;