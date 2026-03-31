import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane, Building, Wallet, Users, BarChart3, Settings, CheckCircle, Trash2 } from 'lucide-react';
import Footer from '../components/Home/Footer';

const Account = () => {
  const { currentUser, getUserBookings, cancelBooking } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const isProAgent = currentUser.role === 'agent';
  const myBookings = getUserBookings();

  const handleCancel = (bookingId) => {
    if(window.confirm("Are you sure you want to cancel this booking? This action cannot be undone.")) {
      cancelBooking(bookingId);
    }
  };

  // --- DYNAMIC AGENT CALCULATIONS ---
  // Calculate 10% commission on all booked items
  const calculateCommissions = () => {
    let totalCommission = 0;
    myBookings.forEach(booking => {
      if (booking.price) {
        // Strip out the rupee symbol and commas, turn into a number
        const numericPrice = parseInt(booking.price.replace(/[^0-9]/g, ''));
        if (!isNaN(numericPrice)) {
          totalCommission += numericPrice * 0.10; // 10% cut
        }
      }
    });
    return totalCommission;
  };

  // Count unique clients based on the names entered during checkout
  const calculateActiveClients = () => {
    const uniqueClients = new Set();
    myBookings.forEach(booking => {
      if (booking.passengerName) uniqueClients.add(booking.passengerName); // Flights & Trains
      if (booking.driverName) uniqueClients.add(booking.driverName); // Cars
      if (booking.guests && Array.isArray(booking.guests)) {
        // Hotels (has an array of guests)
        booking.guests.forEach(guest => {
          if (guest.trim()) uniqueClients.add(guest.trim());
        });
      }
    });
    return uniqueClients.size;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pt-32">
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 pb-16">
        
        {/* Universal Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-wide text-slate-900">
              Welcome, <span className="font-medium">{currentUser.name}</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              {currentUser.email} 
              <span className={`px-2 py-0.5 text-[10px] uppercase tracking-widest rounded-full font-bold ${isProAgent ? 'bg-slate-900 text-amber-500' : 'bg-gray-100 text-gray-500'}`}>
                {isProAgent ? 'Nemra Pro Agent' : 'Standard Member'}
              </span>
            </p>
          </div>
          <button className="p-3 bg-slate-50 text-slate-600 rounded-full hover:bg-slate-100 transition-colors border border-gray-200">
            <Settings size={20} />
          </button>
        </div>

        {/* Dynamic Content Based on Role */}
        {isProAgent ? (
          /* NEMRA PRO AGENT DASHBOARD */
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Dynamic Commission Card */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800">
                <div className="flex justify-between items-start mb-4">
                  <BarChart3 className="text-amber-500" size={28} />
                </div>
                <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Total Commissions</p>
                <p className="text-4xl font-light tracking-wide">
                  ₹{calculateCommissions().toLocaleString('en-IN')}
                </p>
              </div>

              {/* Dynamic Active Clients Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <Users className="text-slate-400" size={28} />
                </div>
                <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Active Clients</p>
                <p className="text-4xl font-light text-slate-900 tracking-wide">
                  {calculateActiveClients()}
                </p>
              </div>

              {/* Total Bookings Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <Plane className="text-slate-400" size={28} />
                </div>
                <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Total Bookings</p>
                <p className="text-4xl font-light text-slate-900 tracking-wide">{myBookings.length}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium text-slate-900 uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">Agent Bookings History</h2>
              
              {myBookings.length === 0 ? (
                 <p className="text-gray-500 text-sm">No client bookings processed yet.</p>
              ) : (
                <div className="space-y-4">
                  {myBookings.map((booking) => (
                    <div key={booking.bookingId} className="flex justify-between items-center p-4 border border-gray-50 bg-slate-50 rounded-xl relative">
                      <div className="flex gap-4 items-center">
                        <div className="bg-white p-3 rounded-full shadow-sm"><Plane size={18} className="text-amber-600" /></div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{booking.from} to {booking.to} ({booking.airline})</p>
                          <p className="text-xs text-gray-500">PNR: {booking.bookingId} • {booking.class}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-right pr-8">
                        <div>
                          <p className="text-sm font-bold text-slate-900">{booking.price}</p>
                          <p className="text-xs text-green-600 uppercase tracking-wider font-bold flex items-center justify-end gap-1 mt-1">
                            <CheckCircle size={12} /> Confirmed
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleCancel(booking.bookingId)}
                        className="absolute right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Cancel Booking"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* STANDARD CUSTOMER DASHBOARD */
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 cursor-pointer hover:shadow-md transition-all">
                <div className="bg-amber-50 p-4 rounded-xl text-amber-600"><Wallet size={28} /></div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900">Nemra Wallet</h3>
                  <p className="text-sm text-gray-500">Balance: ₹0.00</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 cursor-pointer hover:shadow-md transition-all">
                <div className="bg-slate-50 p-4 rounded-xl text-slate-600"><Building size={28} /></div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900">Saved Passengers</h3>
                  <p className="text-sm text-gray-500">Manage family details for quick booking</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium text-slate-900 uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">Upcoming Trips</h2>
              
              {myBookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-slate-50 p-6 rounded-full mb-4">
                    <Plane size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No trips planned yet</h3>
                  <p className="text-sm text-gray-500 max-w-md">Your upcoming flight, train, and hotel bookings will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myBookings.map((booking) => (
                    <div key={booking.bookingId} className="flex flex-col md:flex-row justify-between md:items-center p-6 border border-gray-100 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow relative">
                      <div className="flex items-center gap-6 mb-4 md:mb-0">
                        <div className="bg-amber-50 p-4 rounded-full border border-amber-100">
                           <Plane size={24} className="text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">{booking.dateBooked.split('T')[0]}</p>
                          <h4 className="text-xl font-medium text-slate-900">{booking.airline}</h4>
                          <p className="text-sm text-gray-500 mt-1">{booking.from} <span className="text-amber-500 mx-2">→</span> {booking.to}</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 mt-4 md:mt-0 pr-0 md:pr-12">
                        <span className="text-xs uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full mb-2 self-start md:self-end">
                          Booking ID: {booking.bookingId}
                        </span>
                        <p className="text-lg font-medium text-slate-900">{booking.price}</p>
                        <p className="text-xs text-green-600 uppercase tracking-wider font-bold flex items-center gap-1 mt-1">
                          <CheckCircle size={12} /> Confirmed
                        </p>
                      </div>
                      
                      {/* Cancel Button */}
                      <button 
                        onClick={() => handleCancel(booking.bookingId)}
                        className="absolute top-4 right-4 md:top-1/2 md:-translate-y-1/2 md:right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Cancel Booking"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default Account;