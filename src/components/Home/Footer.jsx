import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-400 py-12 px-8 text-sm font-light">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-800 pb-8 mb-8">
        <div>
          <h4 className="text-white uppercase tracking-widest mb-4">Nemra Travels</h4>
          <p>Elevating global transit and accommodations.</p>
        </div>
        <div>
          <h4 className="text-white uppercase tracking-widest mb-4">Location</h4>
          <p>B 702, Orange Odyssey, Navlakha<br/>Indore, Madhya Pradesh, India</p>
        </div>
        <div>
          <h4 className="text-white uppercase tracking-widest mb-4">Contact</h4>
          <p>info@nemratravels.com<br/>+91 6374955655/+91 9300390030</p>
        </div>
      </div>
      <div className="text-center">
        &copy; {new Date().getFullYear()} Nemra Travels. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;