import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TrainFront, User, Info, ArrowRight, BedSingle } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Home/Footer';

const TrainBooking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { currentUser, bookItem } = useAuth();
  
  // Passenger Form State
  const [passengerName, setPassengerName] = useState(currentUser ? currentUser.name : '');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  
  // Seat/Berth Preference State
  const [seatPreference, setSeatPreference] = useState('No Preference');

  // If no train data was passed or user isn't logged in, redirect
  if (!currentUser) return <Navigate to="/login" replace />;
  if (!state || !state.train) return <Navigate to="/trains" replace />;

  const { train } = state;

  const preferences = [
    'No Preference', 
    'Lower Berth', 
    'Middle Berth', 
    'Upper Berth', 
    'Side Lower', 
    'Side Upper',
    'Window Seat',
    'Aisle Seat'
  ];

  const handleConfirmBooking = () => {
    if (!passengerName || !age) {
      alert("Please fill in all passenger details.");
      return;
    }
    
    // Format train details for the Account dashboard
    const bookingDetails = {
      airline: train.name, // Mapping to generic field used in Account dashboard
      from: train.from,
      to: train.to,
      price: train.price,
      class: train.class,
      passengerName,
      age,
      gender,
      seat: seatPreference, // Saving the preference instead of an exact seat
    };

    const result = bookItem(bookingDetails, 'train');
    if (result.success) {
      navigate('/account');
    }
  };

  // Extract base price for calculation
  const basePrice = parseInt(train.price.replace(/[^0-9]/g, ''));
  const convenienceFee = 250;
  const totalAmount = basePrice + convenienceFee;

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Summary */}
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white mb-8 flex flex-col md:flex-row justify-between items-center shadow-lg">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <div className="bg-white/10 p-4 rounded-full border border-white/20">
              <TrainFront size={32} className="text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">{train.name} • Class: {train.class}</p>
              <h1 className="text-2xl md:text-3xl font-light tracking-wide">
                {train.from} <span className="text-amber-500 mx-2">→</span> {train.to}
              </h1>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Departure</p>
            <p className="text-2xl font-medium">{train.dep}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Form & Preferences */}
          <div className="w-full lg:w-2/3 space-y-8">
            
            {/* Passenger Details Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-medium text-slate-900 mb-6 flex items-center gap-2">
                <User className="text-amber-500" /> Passenger Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Full Name</label>
                  <input type="text" value={passengerName} onChange={(e) => setPassengerName(e.target.value)} className="w-full p-3 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 text-slate-900" placeholder="As per Govt. ID" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Age</label>
                  <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-3 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 text-slate-900" placeholder="Years" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-3 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 text-slate-900">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Berth/Seat Preference */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-slate-900 flex items-center gap-2">
                  <BedSingle className="text-amber-500" /> Berth / Seat Preference
                </h2>
                <span className="text-xs uppercase tracking-widest bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-bold">Subject to Availability</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {preferences.map((pref) => (
                  <button
                    key={pref}
                    onClick={() => setSeatPreference(pref)}
                    className={`py-3 px-2 rounded-xl border text-sm font-medium transition-all duration-300 ${
                      seatPreference === pref 
                        ? 'bg-amber-50 border-amber-500 text-amber-700 shadow-sm' 
                        : 'bg-white border-gray-200 text-slate-600 hover:border-amber-500 hover:text-amber-600'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
                <Info size={14} /> Note: Preferences are not guaranteed and are allocated during chart preparation.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Pricing Summary */}
          <div className="w-full lg:w-1/3">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-32">
              <h2 className="text-xl font-medium text-slate-900 mb-6 border-b border-gray-100 pb-4">Fare Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Ticket Fare (1 Adult)</span>
                  <span className="font-medium text-slate-900">₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Convenience Fee</span>
                  <span className="font-medium text-slate-900">₹{convenienceFee}</span>
                </div>
                <div className="flex justify-between text-slate-600 border-t border-gray-100 pt-4">
                  <span className="flex items-center gap-2">Preference</span>
                  <span className="font-medium text-slate-900 text-right">{seatPreference}</span>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl mb-8 flex justify-between items-center border border-amber-100">
                <span className="font-bold text-slate-900 uppercase tracking-widest text-sm">Total Amount</span>
                <span className="text-2xl font-bold text-amber-600">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <button 
                onClick={handleConfirmBooking}
                className="w-full bg-slate-900 text-white py-4 rounded-xl uppercase tracking-wider font-semibold hover:bg-amber-600 transition-colors shadow-lg flex justify-center items-center gap-2 group"
              >
                Confirm Booking <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TrainBooking;