import React from 'react';
import { Star } from 'lucide-react';

const HotelFilters = () => {
  return (
    <div className="w-full lg:w-1/4 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm h-fit">
      <h3 className="text-lg font-medium text-slate-900 mb-6 uppercase tracking-widest border-b border-gray-100 pb-4">
        Refine Search
      </h3>
      
      {/* Star Rating Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Star Rating</h4>
        <div className="space-y-3">
          {[5, 4, 3].map((stars) => (
            <label key={stars} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="accent-amber-500 w-4 h-4" />
              <div className="flex gap-1">
                {[...Array(stars)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                ))}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Price Per Night</h4>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="accent-amber-500 w-4 h-4" />
            <span className="text-sm font-light text-slate-600 group-hover:text-slate-900 transition-colors">Under ₹10,000</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="accent-amber-500 w-4 h-4" />
            <span className="text-sm font-light text-slate-600 group-hover:text-slate-900 transition-colors">₹10,000 - ₹30,000</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="accent-amber-500 w-4 h-4" />
            <span className="text-sm font-light text-slate-600 group-hover:text-slate-900 transition-colors">₹30,000+</span>
          </label>
        </div>
      </div>

      {/* Amenities Filter */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Amenities</h4>
        <div className="space-y-3">
          {['Private Pool', 'Spa & Wellness', 'Ocean View', 'Butler Service'].map((amenity) => (
            <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="accent-amber-500 w-4 h-4" />
              <span className="text-sm font-light text-slate-600 group-hover:text-slate-900 transition-colors">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelFilters;