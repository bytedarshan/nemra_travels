import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Global/Navbar';
import Home from './pages/Home';
import Account from './pages/Account';
import LoginSignup from './pages/LoginSignup';
import FlightTickets from './pages/FlightTickets';
import TrainTickets from './pages/TrainTickets';
import Hotels from './pages/Hotels';
import CarRentals from './pages/CarRentals';
import FlightBooking from './pages/FlightBooking';
import TrainBooking from './pages/TrainBooking';
import HotelBooking from './pages/HotelBooking';
import CarBooking from './pages/CarBooking'; // NEW IMPORT

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/flights" element={<FlightTickets />} />
            <Route path="/trains" element={<TrainTickets />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/cars" element={<CarRentals />} />
            
            <Route path="/book/flight" element={<FlightBooking />} />
            <Route path="/book/train" element={<TrainBooking />} />
            <Route path="/book/hotel" element={<HotelBooking />} />
            <Route path="/book/car" element={<CarBooking />} /> {/* NEW ROUTE */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;