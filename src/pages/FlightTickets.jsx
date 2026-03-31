import React from 'react';
import FlightHero from '../components/Flights/FlightHero';
import FlightSearch from '../components/Flights/FlightSearch';
import FlightResults from '../components/Flights/FlightResults';
import Footer from '../components/Home/Footer';

const FlightTickets = () => {
  return (
    <div className="w-full flex flex-col items-center overflow-hidden bg-slate-50 min-h-screen">
      <FlightHero />
      <FlightSearch />
      <FlightResults />
      <Footer />
    </div>
  );
};

export default FlightTickets;