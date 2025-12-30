import React, { useState, useEffect, useRef } from 'react';
import { CreditCard, ScanLine, AlertOctagon, CheckCircle2 } from 'lucide-react';

interface Transaction {
  id: number;
  status: 'pending' | 'scanning' | 'approved' | 'fraud';
  xPos: number; // percentage 0 to 100
}

const Tab3Stream: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const SCANNER_POS = 50; // The scanner is at 50% width

  useEffect(() => {
    // Game Loop for movement and spawning
    const interval = setInterval(() => {
      setTransactions(prev => {
        // 1. Move existing transactions
        let updated = prev.map(t => ({
          ...t,
          xPos: t.xPos + 1.5 // Move 1.5% per tick
        }));

        // 2. Logic: Check Scanner
        updated = updated.map(t => {
          if (t.status === 'pending' && t.xPos >= SCANNER_POS) {
            // Determine fate
            const isFraud = Math.random() < 0.2; // 20% fraud chance
            return { ...t, status: isFraud ? 'fraud' : 'approved' };
          }
          return t;
        });

        // 3. Remove transactions that went off screen
        updated = updated.filter(t => t.xPos < 105);

        // 4. Randomly spawn new transaction (approx every second)
        if (Math.random() < 0.05) { // 5% chance per 50ms tick
           updated.push({
             id: Date.now() + Math.random(),
             status: 'pending',
             xPos: -10
           });
        }
        
        return updated;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-500">Stream Processing: The Real-Time Feed</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Processing data event-by-event as it happens. Example: Real-time fraud detection.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden py-12 px-4 relative min-h-[300px]">
        
        {/* The Conveyor Belt Track */}
        <div className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 bg-gray-100 dark:bg-gray-900 border-y border-gray-300 dark:border-gray-700 overflow-hidden" ref={containerRef}>
          {/* Moving background pattern for belt effect */}
          <div className="absolute inset-0 opacity-10" 
               style={{ 
                 backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, #000 40px, #000 42px)',
                 backgroundSize: '100% 100%'
               }}>
          </div>

          {/* Scanner Bridge */}
          <div className="absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 z-10 flex flex-col items-center justify-center">
             <div className="w-1 bg-red-500/30 h-full absolute"></div>
             <div className="bg-gray-800 text-white p-2 rounded-lg z-20 shadow-lg flex flex-col items-center">
               <ScanLine className="animate-pulse text-orange-400" />
               <span className="text-[10px] mt-1 uppercase font-bold">Scanner</span>
             </div>
          </div>

          {/* Transactions */}
          {transactions.map(t => (
            <div
              key={t.id}
              className="absolute top-1/2 -translate-y-1/2 transition-transform will-change-transform"
              style={{ 
                left: `${t.xPos}%`,
                transition: 'none' // Controlled by JS interval
              }}
            >
              <div className={`
                flex flex-col items-center p-2 rounded-lg shadow-md w-16 h-16 justify-center
                transition-all duration-300
                ${t.status === 'pending' ? 'bg-white dark:bg-gray-700 text-gray-500' : ''}
                ${t.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-2 border-green-500' : ''}
                ${t.status === 'fraud' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-2 border-red-500 scale-110' : ''}
              `}>
                {t.status === 'fraud' ? <AlertOctagon size={24} /> : 
                 t.status === 'approved' ? <CheckCircle2 size={24} /> :
                 <CreditCard size={24} />}
                
                <span className="text-[10px] font-bold mt-1">
                  {t.status === 'pending' ? '...' : t.status === 'fraud' ? 'FRAUD' : 'OK'}
                </span>
              </div>
            </div>
          ))}

        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white border border-gray-400 rounded-sm"></div> Pending
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div> Approved
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-sm"></div> Fraud Alert
          </div>
        </div>
      </div>
      
      <div className="text-center p-4 bg-orange-50 dark:bg-gray-700/30 rounded-lg text-orange-800 dark:text-orange-200">
        <h4 className="font-bold mb-2">Why Stream?</h4>
        <p className="text-sm">We can't wait until midnight to stop a fraudulent credit card transaction. We need near-zero latency.</p>
      </div>
    </div>
  );
};

export default Tab3Stream;