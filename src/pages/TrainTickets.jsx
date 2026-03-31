import React from 'react';
import TrainHero from '../components/Trains/TrainHero';
import TrainSearch from '../components/Trains/TrainSearch';
import TrainResults from '../components/Trains/TrainResults';
import Footer from '../components/Home/Footer';

const TrainTickets = () => {
  return (
    <div className="w-full flex flex-col items-center overflow-hidden bg-slate-50 min-h-screen">
      <TrainHero />
      <TrainSearch />
      <TrainResults />
      <Footer />
    </div>
  );
};

export default TrainTickets;