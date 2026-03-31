import React from 'react';

const TrainFilters = () => {
  return (
    <div className="w-full lg:w-1/4 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm h-fit">
      <h3 className="text-lg font-medium text-slate-900 mb-6 uppercase tracking-widest border-b border-gray-100 pb-4">
        Filter By
      </h3>
      
      {/* Class Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Journey Class</h4>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="accent-amber-500 w-4 h-4" defaultChecked />
            <span className="text-sm font-light text-slate-600 group-hover:text-slate-900 transition-colors">1A (First AC)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="accent-amber-500 w-4 h-4" defaultChecked />
            <span className="text-sm font-light text-slate-600 group-hover:text-slate-900 transition-colors">EC (Executive Chair)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="accent-amber-500 w-4 h-4" />
            <span className="text-sm font-light text-slate-600 group-hover:text-slate-900 transition-colors">2A (Second AC)</span>
          </label>
        </div>
      </div>

      {/* Train Type Filter */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Train Type</h4>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="accent-amber-500 w-4 h-4" />
            <span className="text-sm font-light text-slate-600 group-hover:text-slate-900 transition-colors">Vande Bharat</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="accent-amber-500 w-4 h-4" />
            <span className="text-sm font-light text-slate-600 group-hover:text-slate-900 transition-colors">Rajdhani Express</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="accent-amber-500 w-4 h-4" />
            <span className="text-sm font-light text-slate-600 group-hover:text-slate-900 transition-colors">Shatabdi Express</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default TrainFilters;