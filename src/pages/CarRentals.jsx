import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Home/Footer';

const dummyCars = [
  { 
    id: 1, 
    name: 'Mercedes-Benz S-Class', 
    type: 'Luxury Sedan', 
    price: '₹15,000', 
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80', 
    seats: 4, 
    transmission: 'Automatic' 
  },
  { 
    id: 2, 
    name: 'Range Rover Vogue', 
    type: 'Premium SUV', 
    price: '₹18,000', 
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80', 
    seats: 5, 
    transmission: 'Automatic' 
  },
  { 
    id: 3, 
    name: 'BMW 7 Series', 
    type: 'Luxury Sedan', 
    price: '₹14,500', 
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000&auto=format&fit=crop', 
    seats: 4, 
    transmission: 'Automatic' 
  }
];

const CarRentals = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleBooking = (car) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    navigate('/book/car', { state: { car } });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80" 
          alt="Luxury Car Fleet" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl text-white font-light uppercase tracking-widest mb-6"
          >
            Elite Fleet
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-200 max-w-2xl mx-auto text-sm md:text-base font-light"
          >
            Experience ultimate comfort and style. Choose from our curated selection of premium vehicles for your next journey.
          </motion.p>
        </div>
      </div>

      {/* Car Fleet Listing */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-light uppercase tracking-widest text-slate-900">Available Vehicles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dummyCars.map((car, index) => (
            <motion.div 
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="h-56 overflow-hidden relative">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full font-bold inline-block mb-3">{car.type}</span>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">{car.name}</h3>
                  <p className="text-sm text-gray-500 mb-6">{car.seats} Seats • {car.transmission}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Per Day</p>
                    <p className="text-xl font-bold text-slate-900">{car.price}</p>
                  </div>
                  <button 
                    onClick={() => handleBooking(car)}
                    className="bg-slate-900 text-white px-6 py-2 rounded-lg uppercase tracking-wider text-xs font-semibold hover:bg-amber-600 transition-colors shadow-md"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CarRentals;