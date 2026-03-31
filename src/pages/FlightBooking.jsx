import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane, User, Info, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Home/Footer';

const FlightBooking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { currentUser, bookItem } = useAuth();
  
  // Passenger Form State
  const [passengerName, setPassengerName] = useState(currentUser ? currentUser.name : '');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  
  // Seat Selection State
  const [selectedSeat, setSelectedSeat] = useState(null);

  // If no flight data was passed or user isn't logged in, send them away
  if (!currentUser) return <Navigate to="/login" replace />;
  if (!state || !state.flight) return <Navigate to="/flights" replace />;

  const { flight } = state;

  // Generate a dummy seat map (Rows 1-2: Business, Rows 3-10: Economy)
  const renderSeatMap = () => {
    const rows = [];
    for (let i = 1; i <= 10; i++) {
      const isBusiness = i <= 2;
      const columns = isBusiness ? ['A', 'B', 'E', 'F'] : ['A', 'B', 'C', 'D', 'E', 'F'];
      
      rows.push(
        <div key={`row-${i}`} className="flex justify-center gap-2 md:gap-4 mb-3">
          <div className="w-6 flex items-center justify-center text-xs text-gray-400 font-bold">{i}</div>
          <div className="flex gap-2">
            {columns.map(col => {
              const seatId = `${i}${col}`;
              // Randomly disable some seats to make it look real
              const isOccupied = (i * col.charCodeAt(0)) % 7 === 0;
              const isSelected = selectedSeat === seatId;
              
              // Add an aisle gap
              const isAisle = (isBusiness && col === 'B') || (!isBusiness && col === 'C');

              return (
                <React.Fragment key={seatId}>
                  <button
                    disabled={isOccupied}
                    onClick={() => setSelectedSeat(seatId)}
                    className={`w-10 h-10 rounded-t-xl rounded-b-md border transition-all flex items-center justify-center text-xs font-bold
                      ${isOccupied ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed' : 
                        isSelected ? 'bg-amber-500 border-amber-600 text-white shadow-md scale-110' : 
                        isBusiness ? 'bg-slate-800 border-slate-900 text-white hover:bg-slate-700' : 
                        'bg-white border-gray-300 text-slate-600 hover:border-amber-500 hover:text-amber-500'}`}
                  >
                    {col}
                  </button>
                  {isAisle && <div className="w-4 md:w-8"></div>}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      );
    }
    return rows;
  };

  const handleConfirmBooking = () => {
    if (!passengerName || !age) {
      alert("Please fill in all passenger details.");
      return;
    }
    
    // Add the specific details to the booking payload
    const bookingDetails = {
      ...flight,
      passengerName,
      age,
      gender,
      seat: selectedSeat || 'Unassigned',
      price: flight.price // In a real app, seat selection might add to this price
    };

    const result = bookItem(bookingDetails, 'flight');
    if (result.success) {
      navigate('/account');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Summary */}
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white mb-8 flex flex-col md:flex-row justify-between items-center shadow-lg">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <div className="bg-white/10 p-4 rounded-full border border-white/20">
              <Plane size={32} className="text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">{flight.airline} • {flight.class}</p>
              <h1 className="text-2xl md:text-3xl font-light tracking-wide">
                {flight.from} <span className="text-amber-500 mx-2">→</span> {flight.to}
              </h1>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Departure</p>
            <p className="text-2xl font-medium">{flight.dep}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Form & Seat Map */}
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

            {/* Seat Selection Map */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-slate-900">Select Your Seat</h2>
                <span className="text-xs uppercase tracking-widest bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-bold">Optional</span>
              </div>
              
              <div className="flex justify-center gap-6 mb-8 text-xs uppercase tracking-widest text-gray-500">
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-slate-800"></div> Premium</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded border border-gray-300 bg-white"></div> Standard</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-gray-200"></div> Occupied</div>
              </div>

              {/* Airplane Layout */}
              <div className="relative max-w-md mx-auto bg-slate-50 border-x-4 border-t-[20px] border-slate-200 rounded-t-full pt-12 pb-8 px-4 flex flex-col items-center">
                {renderSeatMap()}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Pricing Summary */}
          <div className="w-full lg:w-1/3">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-32">
              <h2 className="text-xl font-medium text-slate-900 mb-6 border-b border-gray-100 pb-4">Fare Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Base Fare (1 Adult)</span>
                  <span className="font-medium text-slate-900">{flight.price}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxes & Surcharges</span>
                  <span className="font-medium text-slate-900">₹2,450</span>
                </div>
                <div className="flex justify-between text-slate-600 border-t border-gray-100 pt-4">
                  <span className="flex items-center gap-2">Seat Selection {selectedSeat && <span className="bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded">{selectedSeat}</span>}</span>
                  <span className="font-medium text-slate-900">{selectedSeat ? '₹850' : '₹0'}</span>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl mb-8 flex justify-between items-center border border-amber-100">
                <span className="font-bold text-slate-900 uppercase tracking-widest text-sm">Total Amount</span>
                <span className="text-2xl font-bold text-amber-600">
                  {/* Dummy calculation for display purposes */}
                  ₹{(parseInt(flight.price.replace(/[^0-9]/g, '')) + 2450 + (selectedSeat ? 850 : 0)).toLocaleString('en-IN')}
                </span>
              </div>

              <button 
                onClick={handleConfirmBooking}
                className="w-full bg-slate-900 text-white py-4 rounded-xl uppercase tracking-wider font-semibold hover:bg-amber-600 transition-colors shadow-lg flex justify-center items-center gap-2 group"
              >
                Confirm Booking <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="mt-4 flex items-start gap-2 text-xs text-gray-400">
                <Info size={14} className="flex-shrink-0 mt-0.5" />
                <p>By clicking Confirm Booking, you agree to our Terms of Service and Cancellation Policy.</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FlightBooking;