import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HotelFilters from './HotelFilters';

const dummyHotels = [
  { 
    id: 1, 
    name: 'The Ritz-Carlton, Bali', 
    location: 'Bali, Indonesia', 
    rating: 5, 
    price: '₹48,000', 
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop',
    tags: ['Oceanfront', 'Tropical Luxury']
  },
  { 
    id: 2, 
    name: 'Waldorf Astoria', 
    location: 'Maldives', 
    rating: 5, 
    price: '₹1,25,000', 
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop',
    tags: ['Overwater Villa', 'Private Pool']
  },
  { 
    id: 3, 
    name: 'Four Seasons Resort', 
    location: 'Bora Bora', 
    rating: 5, 
    price: '₹95,000', 
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000&auto=format&fit=crop',
    tags: ['Lagoon View', 'Spa Retreat']
  },
];

const HotelResults = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleBooking = (hotel) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    navigate('/book/hotel', { state: { hotel } });
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
        <h2 className="text-3xl font-light uppercase tracking-widest text-slate-900">Elite Stays</h2>
        <p className="text-sm text-gray-500 uppercase tracking-widest">Recommended for You</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <HotelFilters />

        <div className="flex flex-col gap-8 w-full lg:w-3/4">
          {dummyHotels.map((hotel, index) => (
            <motion.div 
              key={hotel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
              </div>

              <div className="w-full md:w-3/5 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-light text-slate-900 tracking-wide">{hotel.name}</h3>
                    <div className="flex gap-1">
                      {[...Array(hotel.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <MapPin size={16} />
                    <span className="text-sm font-light uppercase tracking-wider">{hotel.location}</span>
                  </div>
                  <div className="flex gap-2 mb-6">
                    {hotel.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest border border-slate-200 px-3 py-1 rounded-full text-slate-500 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Per Night From</p>
                    <p className="text-3xl font-medium text-slate-900">{hotel.price}</p>
                  </div>
                  <button 
                    onClick={() => handleBooking(hotel)}
                    className="bg-slate-900 text-white px-10 py-3 rounded-lg uppercase tracking-wider text-sm font-semibold hover:bg-amber-600 transition-colors"
                  >
                    Book Now
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

export default HotelResults;