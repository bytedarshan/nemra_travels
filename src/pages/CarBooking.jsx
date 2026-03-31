import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, User, Calendar, Shield, ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Home/Footer';

const CarBooking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { currentUser, bookItem } = useAuth();

  // Booking States
  const [driverName, setDriverName] = useState(currentUser ? currentUser.name : '');
  const [age, setAge] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  
  // Add-ons
  const [needChauffeur, setNeedChauffeur] = useState(false);
  const [needInsurance, setNeedInsurance] = useState(true);

  if (!currentUser) return <Navigate to="/login" replace />;
  if (!state || !state.car) return <Navigate to="/cars" replace />;

  const { car } = state;

  // Simple day calculation
  const calculateDays = () => {
    if (!pickupDate || !dropoffDate) return 1;
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays > 0 ? diffDays : 1;
  };

  const days = calculateDays();
  const baseRate = parseInt(car.price.replace(/[^0-9]/g, ''));
  const totalBase = baseRate * days;
  const chauffeurCost = needChauffeur ? 1500 * days : 0;
  const insuranceCost = needInsurance ? 800 * days : 0;
  const totalAmount = totalBase + chauffeurCost + insuranceCost;

  const handleConfirmBooking = () => {
    if (!driverName || !age || !pickupDate || !dropoffDate) {
      alert("Please fill in all driver details and dates.");
      return;
    }

    const bookingDetails = {
      airline: car.name, // Reusing generic dashboard field
      from: `Pickup: ${pickupDate}`,
      to: `Dropoff: ${dropoffDate}`,
      price: `₹${totalAmount.toLocaleString('en-IN')}`,
      class: needChauffeur ? 'Chauffeur Driven' : 'Self Drive',
      driverName,
      days,
    };

    const result = bookItem(bookingDetails, 'car');
    if (result.success) {
      navigate('/account');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Summary */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white mb-8 flex flex-col md:flex-row justify-between items-center shadow-lg">
          <div className="flex items-center gap-6">
            <div className="h-24 w-32 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center p-2 border border-white/20">
              <img src={car.image} alt={car.name} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <p className="text-sm text-amber-500 uppercase tracking-widest font-bold mb-1">{car.type}</p>
              <h1 className="text-3xl font-light tracking-wide">{car.name}</h1>
              <p className="text-gray-400 font-light text-sm mt-1">{car.transmission} • {car.seats} Seats</p>
            </div>
          </div>
          <div className="mt-6 md:mt-0 text-center md:text-right">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Daily Rate</p>
            <p className="text-2xl font-medium">{car.price}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-2/3 space-y-8">
            
            {/* Rental Schedule */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-medium text-slate-900 mb-6 flex items-center gap-2">
                <Calendar className="text-amber-500" /> Rental Schedule
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Pickup Date</label>
                  <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="w-full p-3 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 text-slate-900" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Drop-off Date</label>
                  <input type="date" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} className="w-full p-3 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 text-slate-900" />
                </div>
              </div>
            </motion.div>

            {/* Driver Details */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-medium text-slate-900 mb-6 flex items-center gap-2">
                <User className="text-amber-500" /> Driver Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Full Name</label>
                  <input type="text" value={driverName} onChange={(e) => setDriverName(e.target.value)} className="w-full p-3 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 text-slate-900" placeholder="As per Driving License" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Age</label>
                  <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-3 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 text-slate-900" placeholder="Must be 21+" />
                </div>
              </div>
            </motion.div>

            {/* Add-ons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-medium text-slate-900 mb-6 flex items-center gap-2">
                <Shield className="text-amber-500" /> Protection & Add-ons
              </h2>
              <div className="space-y-4">
                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${needInsurance ? 'border-amber-500 bg-amber-50' : 'border-gray-200 bg-white hover:border-amber-300'}`}>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={needInsurance} onChange={() => setNeedInsurance(!needInsurance)} className="w-5 h-5 accent-amber-500" />
                    <div>
                      <p className="font-medium text-slate-900">Comprehensive Insurance</p>
                      <p className="text-xs text-gray-500">Zero liability on damages</p>
                    </div>
                  </div>
                  <span className="font-semibold text-slate-900">₹800 / day</span>
                </label>

                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${needChauffeur ? 'border-amber-500 bg-amber-50' : 'border-gray-200 bg-white hover:border-amber-300'}`}>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={needChauffeur} onChange={() => setNeedChauffeur(!needChauffeur)} className="w-5 h-5 accent-amber-500" />
                    <div>
                      <p className="font-medium text-slate-900">Professional Chauffeur</p>
                      <p className="text-xs text-gray-500">Sit back and relax</p>
                    </div>
                  </div>
                  <span className="font-semibold text-slate-900">₹1,500 / day</span>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Pricing Summary Sidebar */}
          <div className="w-full lg:w-1/3">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-32">
              <h2 className="text-xl font-medium text-slate-900 mb-6 border-b border-gray-100 pb-4">Rental Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Duration</span>
                  <span className="font-medium text-slate-900">{days} {days === 1 ? 'Day' : 'Days'}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Base Rate</span>
                  <span className="font-medium text-slate-900">₹{totalBase.toLocaleString('en-IN')}</span>
                </div>
                {needInsurance && (
                  <div className="flex justify-between text-slate-600">
                    <span>Insurance</span>
                    <span className="font-medium text-slate-900">₹{insuranceCost.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {needChauffeur && (
                  <div className="flex justify-between text-slate-600">
                    <span>Chauffeur</span>
                    <span className="font-medium text-slate-900">₹{chauffeurCost.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              <div className="bg-amber-50 p-6 rounded-2xl mb-8 border border-amber-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-900 uppercase tracking-widest text-xs">Total Amount</span>
                  <span className="text-2xl font-bold text-amber-600">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] text-amber-700 uppercase tracking-widest font-medium text-right">Includes all taxes & fees</p>
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

export default CarBooking;