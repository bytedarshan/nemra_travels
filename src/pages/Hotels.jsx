import React from 'react';
import HotelHero from '../components/Hotels/HotelHero';
import HotelSearch from '../components/Hotels/HotelSearch';
import HotelResults from '../components/Hotels/HotelResults';
import Footer from '../components/Home/Footer';

const Hotels = () => {
  return (
    <div className="w-full flex flex-col items-center overflow-hidden bg-slate-50 min-h-screen">
      <HotelHero />
      <HotelSearch />
      <HotelResults />
      <Footer />
    </div>
  );
};

export default Hotels;