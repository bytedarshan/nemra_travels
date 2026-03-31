import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building, Users, Baby, Bed, Info, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Home/Footer';

const HotelBooking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { currentUser, bookItem } = useAuth();

  // Guest & Room States
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [guestNames, setGuestNames] = useState(['']);
  const [roomType, setRoomType] = useState('Deluxe Room');

  // If no hotel data or user not logged in, send them back
  if (!currentUser) return <Navigate to="/login" replace />;
  if (!state || !state.hotel) return <Navigate to="/hotels" replace />;

  const { hotel } = state;

  const roomOptions = [
    { name: 'Deluxe Room', priceMod: 0 },
    { name: 'Premium Sea View', priceMod: 5500 },
    { name: 'Luxury Suite', priceMod: 15000 },
    { name: 'Presidential Villa', priceMod: 45000 }
  ];

  // Sync guest name inputs with total guest count (Adults + Children)
  useEffect(() => {
    const totalGuests = adults + children;
    const currentNames = [...guestNames];
    if (currentNames.length < totalGuests) {
      while (currentNames.length < totalGuests) currentNames.push('');
    } else {
      currentNames.length = totalGuests;
    }
    setGuestNames(currentNames);
  }, [adults, children, guestNames]);

  const handleNameChange = (index, value) => {
    const newNames = [...guestNames];
    newNames[index] = value;
    setGuestNames(newNames);
  };

  const handleConfirmBooking = () => {
    if (guestNames.some(name => !name.trim())) {
      alert("Please provide names for all guests.");
      return;
    }

    const selectedRoom = roomOptions.find(r => r.name === roomType);
    const basePrice = parseInt(hotel.price.replace(/[^0-9]/g, ''));
    const finalPrice = basePrice + selectedRoom.priceMod;

    const bookingDetails = {
      airline: hotel.name, // Using 'airline' key to match the universal Account dashboard display
      from: hotel.location,
      to: roomType,
      price: `₹${finalPrice.toLocaleString('en-IN')}`,
      class: `${adults} Adults, ${children} Children`,
      guests: guestNames,
      infants: infants,
    };

    const result = bookItem(bookingDetails, 'hotel');
    if (result.success) {
      navigate('/account');
    }
  };

  const currentBasePrice = parseInt(hotel.price.replace(/[^0-9]/g, ''));
  const roomPriceMod = roomOptions.find(r => r.name === roomType).priceMod;
  const totalAmount = currentBasePrice + roomPriceMod;

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Hotel Header Summary */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white mb-8 flex flex-col md:flex-row justify-between items-center shadow-lg border border-white/10">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-xl overflow-hidden border border-white/20">
              <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm text-amber-500 uppercase tracking-widest font-bold mb-1">Confirming Stay</p>
              <h1 className="text-3xl font-light tracking-wide">{hotel.name}</h1>
              <p className="text-gray-400 font-light italic">{hotel.location}</p>
            </div>
          </div>
          <div className="mt-6 md:mt-0 text-center md:text-right">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Starting Price</p>
            <p className="text-2xl font-medium">{hotel.price}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-2/3 space-y-8">
            
            {/* Room & Occupancy Selection */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-medium text-slate-900 mb-6 flex items-center gap-2">
                <Bed className="text-amber-500" /> Room & Occupancy
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-3">Room Category</label>
                  <div className="grid grid-cols-1 gap-2">
                    {roomOptions.map((option) => (
                      <button
                        key={option.name}
                        onClick={() => setRoomType(option.name)}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          roomType === option.name 
                          ? 'bg-slate-900 border-slate-900 text-white' 
                          : 'bg-white border-gray-200 text-slate-600 hover:border-amber-500'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{option.name}</span>
                          <span className={roomType === option.name ? 'text-amber-400' : 'text-slate-400 text-xs'}>
                            {option.priceMod === 0 ? 'Base Rate' : `+₹${option.priceMod.toLocaleString('en-IN')}`}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold">Number of Guests</label>
                  
                  <div className="space-y-4">
                    {[
                      { label: 'Adults', state: adults, set: setAdults, icon: <Users size={18}/> },
                      { label: 'Children', state: children, set: setChildren, sub: 'Age 2-12', icon: <Users size={18}/> },
                      { label: 'Infants', state: infants, set: setInfants, sub: 'Under 2', icon: <Baby size={18}/> }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between bg-slate-50 p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="text-slate-400">{item.icon}</div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                            {item.sub && <p className="text-[10px] text-gray-400 uppercase">{item.sub}</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => item.set(Math.max(item.label === 'Adults' ? 1 : 0, item.state - 1))}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white transition-colors"
                          >-</button>
                          <span className="w-4 text-center font-bold">{item.state}</span>
                          <button 
                            onClick={() => item.set(item.state + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white transition-colors"
                          >+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dynamic Guest Name Manifest */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-medium text-slate-900 mb-6 flex items-center gap-2">
                <Users className="text-amber-500" /> Guest Manifest
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {guestNames.map((name, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative"
                    >
                      <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1 ml-1">
                        Guest {i + 1} {i === 0 && '(Primary)'}
                      </label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => handleNameChange(i, e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 text-slate-900"
                        placeholder="Enter full name"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Pricing Summary Sidebar */}
          <div className="w-full lg:w-1/3">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-32">
              <h2 className="text-xl font-medium text-slate-900 mb-6 border-b border-gray-100 pb-4">Booking Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Base Fare ({adults + children} Guests)</span>
                  <span className="font-medium text-slate-900">₹{currentBasePrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Room Upgrade</span>
                  <span className="font-medium text-slate-900">₹{roomPriceMod.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600 border-t border-gray-100 pt-4">
                  <span className="flex items-center gap-2">Infant Charges</span>
                  <span className="font-medium text-slate-900">Complimentary</span>
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-2xl mb-8 border border-amber-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-900 uppercase tracking-widest text-xs">Total for Stay</span>
                  <span className="text-2xl font-bold text-amber-600">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] text-amber-700 uppercase tracking-widest font-medium text-right">Includes all taxes</p>
              </div>

              <button 
                onClick={handleConfirmBooking}
                className="w-full bg-slate-900 text-white py-4 rounded-xl uppercase tracking-wider font-semibold hover:bg-amber-600 transition-colors shadow-lg flex justify-center items-center gap-2 group"
              >
                Confirm Reservation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HotelBooking;