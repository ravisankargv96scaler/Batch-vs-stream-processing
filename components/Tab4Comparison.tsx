import React, { useState } from 'react';
import { Layers, Zap } from 'lucide-react';

const Tab4Comparison: React.FC = () => {
  const [sliderVal, setSliderVal] = useState(50);

  const isBatch = sliderVal < 50;
  
  return (
    <div className="max-w-4xl mx-auto space-y-8">
       <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Technical Showdown</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Move the slider to see how requirements dictate the architecture.
        </p>
      </div>

      {/* Slider Section */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between mb-4 font-bold text-sm uppercase tracking-wide">
          <span className={`transition-colors ${isBatch ? 'text-indigo-600' : 'text-gray-400'}`}>Historical / Efficiency</span>
          <span className={`transition-colors ${!isBatch ? 'text-orange-600' : 'text-gray-400'}`}>Real-Time / Speed</span>
        </div>
        
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={sliderVal} 
          onChange={(e) => setSliderVal(parseInt(e.target.value))}
          className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-gray-600"
        />
        
        <div className="mt-8 grid grid-cols-2 gap-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          
          {/* Batch Column */}
          <div className={`p-6 transition-colors duration-300 ${isBatch ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'bg-transparent opacity-50'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Layers className={isBatch ? 'text-indigo-600' : 'text-gray-400'} />
              <h3 className="text-xl font-bold">Batch Processing</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-semibold text-gray-500">Latency</span>
                <span>Hours / Days</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-semibold text-gray-500">Data Size</span>
                <span>Bounded (Finite)</span>
              </li>
               <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-semibold text-gray-500">Trigger</span>
                <span>Schedule (Time)</span>
              </li>
              <li className="pt-2 text-gray-600 dark:text-gray-300 italic">
                "I need to analyze all sales from last month."
              </li>
            </ul>
          </div>

          {/* Stream Column */}
          <div className={`p-6 transition-colors duration-300 ${!isBatch ? 'bg-orange-50 dark:bg-orange-900/30' : 'bg-transparent opacity-50'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Zap className={!isBatch ? 'text-orange-600' : 'text-gray-400'} />
              <h3 className="text-xl font-bold">Stream Processing</h3>
            </div>
             <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-semibold text-gray-500">Latency</span>
                <span>Milliseconds / Seconds</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-semibold text-gray-500">Data Size</span>
                <span>Unbounded (Infinite)</span>
              </li>
               <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-semibold text-gray-500">Trigger</span>
                <span>Event (Arrival)</span>
              </li>
               <li className="pt-2 text-gray-600 dark:text-gray-300 italic">
                "I need to block this user immediately."
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Tab4Comparison;