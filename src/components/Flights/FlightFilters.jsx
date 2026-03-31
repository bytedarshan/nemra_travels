import React from 'react';

const FlightFilters = () => {
  return (
    <div className="w-full lg:w-1/4 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm h-fit">
      <h3 className="text-lg font-medium text-slate-900 mb-6 uppercase tracking-widest border-b border-gray-100 pb-4">
        Filter By
      </h3>
      
      {/* Stops Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Stops</h4>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="accent-amber-500 w-4 h-4" defaultChecked />
            <span className="text-sm font-light text-slate-600 group-hover:text-slate-900 transition-colors">Direct</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="accent-amber-500 w-4 h-4" />
            <span className="text-sm font-light text-slate-600 group-hover:text-slate-900 transition-colors">1 Stop</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="accent-amber-500 w-4 h-4" />
            <span className="text-sm font-light text-slate-600 group-hover:text-slate-900 transition-colors">2+ Stops</span>
          </label>
        </div>
      </div>

      {/* Time of Day Filter */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Departure Time</h4>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="accent-amber-500 w-4 h-4" />
            <span className="text-sm font-light text-slate-600 group-hover:text-slate-900 transition-colors">Morning (06:00 - 11:59)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="accent-amber-500 w-4 h-4" />
            <span className="text-sm font-light text-slate-600 group-hover:text-slate-900 transition-colors">Afternoon (12:00 - 17:59)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="accent-amber-500 w-4 h-4" />
            <span className="text-sm font-light text-slate-600 group-hover:text-slate-900 transition-colors">Evening (18:00 - 23:59)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FlightFilters;