import React from 'react';
import Hero from '../components/Home/Hero';
import SearchWidget from '../components/Home/SearchWidget';
import AboutOverview from '../components/Home/AboutOverview';
import PopularDestinations from '../components/Home/PopularDestinations';
import ContactSection from '../components/Home/ContactSection';
import Footer from '../components/Home/Footer';

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center overflow-hidden">
      <Hero />
      <SearchWidget />
      <AboutOverview />
      <PopularDestinations />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;