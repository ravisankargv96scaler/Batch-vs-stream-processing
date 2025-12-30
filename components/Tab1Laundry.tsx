import React, { useState, useEffect } from 'react';
import { Shirt, WashingMachine, Sparkles, Archive, ArrowRight, PauseCircle, PlayCircle } from 'lucide-react';

const Tab1Laundry: React.FC = () => {
  // Batch State
  const [basketItems, setBasketItems] = useState<number>(0);
  const [isWashingBatch, setIsWashingBatch] = useState(false);
  const [batchCompleted, setBatchCompleted] = useState(false);

  // Stream State
  const [streamActive, setStreamActive] = useState(true);
  const [streamItems, setStreamItems] = useState<{ id: number; stage: 'dirty' | 'washing' | 'clean' }[]>([]);

  // Batch Simulation
  useEffect(() => {
    if (isWashingBatch || batchCompleted) return;
    const interval = setInterval(() => {
      setBasketItems(prev => {
        if (prev >= 10) {
          clearInterval(interval);
          return 10;
        }
        return prev + 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [isWashingBatch, batchCompleted]);

  const runBatchWash = () => {
    setIsWashingBatch(true);
    setTimeout(() => {
      setIsWashingBatch(false);
      setBasketItems(0);
      setBatchCompleted(true);
      setTimeout(() => setBatchCompleted(false), 2000); // Reset after "Done" message
    }, 3000);
  };

  // Stream Simulation
  useEffect(() => {
    if (!streamActive) return;

    const interval = setInterval(() => {
      const newItemId = Date.now();
      // Add new dirty item
      setStreamItems(prev => [...prev, { id: newItemId, stage: 'dirty' }]);

      // Move to washing instantly
      setTimeout(() => {
        setStreamItems(prev => prev.map(item => item.id === newItemId ? { ...item, stage: 'washing' } : item));
      }, 500);

      // Move to clean quickly
      setTimeout(() => {
        setStreamItems(prev => prev.map(item => item.id === newItemId ? { ...item, stage: 'clean' } : item));
      }, 1500);

      // Remove
      setTimeout(() => {
        setStreamItems(prev => prev.filter(item => item.id !== newItemId));
      }, 2500);

    }, 2000);

    return () => clearInterval(interval);
  }, [streamActive]);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">The Core Concept: The Laundry Analogy</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Understanding the difference between accumulating tasks vs. handling them immediately.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Batch Processing Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-indigo-100 dark:border-indigo-900 p-6 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">Batch Processing</h3>
            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold uppercase tracking-wide">
              High Throughput
            </span>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 py-8">
            <div className="relative">
              <Archive size={64} className="text-gray-400 dark:text-gray-500" />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {basketItems}
              </div>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-indigo-600 h-full transition-all duration-300" 
                style={{ width: `${(basketItems / 10) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Laundry Basket ({basketItems}/10)</p>

            <div className="h-20 flex items-center justify-center">
              {isWashingBatch ? (
                <WashingMachine size={48} className="text-indigo-600 animate-spin" />
              ) : batchCompleted ? (
                 <div className="flex flex-col items-center text-green-500">
                    <Sparkles size={48} />
                    <span className="font-bold">All Clean!</span>
                 </div>
              ) : (
                <WashingMachine size={48} className="text-gray-300 dark:text-gray-600" />
              )}
            </div>

            <button
              onClick={runBatchWash}
              disabled={basketItems < 10 || isWashingBatch}
              className={`
                w-full py-3 rounded-lg font-semibold shadow-md transition-all
                ${basketItems >= 10 && !isWashingBatch
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer transform hover:-translate-y-1' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'}
              `}
            >
              {isWashingBatch ? 'Washing...' : 'Run Weekly Wash'}
            </button>
          </div>
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-gray-700/50 rounded-lg text-sm text-indigo-800 dark:text-indigo-200">
            <strong>Analogy:</strong> Wait until the basket is full, then process everything at once. Efficient for water, but you wait a week for clean socks.
          </div>
        </div>

        {/* Stream Processing Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-orange-100 dark:border-orange-900 p-6 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-orange-500"></div>
           <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">Stream Processing</h3>
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full text-xs font-semibold uppercase tracking-wide">
              Low Latency
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center py-8 relative">
            <button 
              onClick={() => setStreamActive(!streamActive)}
              className="absolute top-0 right-0 text-orange-500 hover:text-orange-600"
            >
              {streamActive ? <PauseCircle /> : <PlayCircle />}
            </button>

            <div className="w-full h-40 relative border-b-2 border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
              {/* This represents the timeline/conveyor */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center">
                 <WashingMachine className="text-orange-500 mb-1" size={32} />
                 <span className="text-xs font-bold text-gray-500">Instant Wash</span>
              </div>

              {streamItems.map(item => (
                <div 
                  key={item.id}
                  className={`absolute transition-all duration-500 flex flex-col items-center
                    ${item.stage === 'dirty' ? 'left-10 opacity-100' : ''}
                    ${item.stage === 'washing' ? 'left-1/2 -translate-x-1/2 scale-125 opacity-100' : ''}
                    ${item.stage === 'clean' ? 'left-[80%] opacity-0' : ''}
                  `}
                >
                  <Shirt 
                    className={`
                      transition-colors duration-300
                      ${item.stage === 'dirty' ? 'text-gray-600 dark:text-gray-400' : ''}
                      ${item.stage === 'washing' ? 'text-blue-500' : ''}
                      ${item.stage === 'clean' ? 'text-green-500' : ''}
                    `} 
                    size={24} 
                  />
                  {item.stage === 'clean' && (
                    <span className="absolute -top-6 text-green-600 font-bold text-xs animate-bounce">Clean!</span>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
              <p>Items processed individually in real-time.</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-orange-50 dark:bg-gray-700/50 rounded-lg text-sm text-orange-800 dark:text-orange-200">
            <strong>Analogy:</strong> Wash every sock the moment you take it off. Instant results, but runs the machine constantly.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab1Laundry;