import React, { useState, useEffect } from 'react';
import { Database, FileText, ArrowRight, Server, Clock, Loader2 } from 'lucide-react';

const Tab2Batch: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reportReady, setReportReady] = useState(false);
  const [records, setRecords] = useState(100);

  // Simulate accumulating data
  useEffect(() => {
    if (isProcessing) return;
    const interval = setInterval(() => {
      setRecords(prev => prev + Math.floor(Math.random() * 50));
    }, 500);
    return () => clearInterval(interval);
  }, [isProcessing]);

  const runETL = () => {
    setIsProcessing(true);
    setReportReady(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setReportReady(true);
          return 100;
        }
        return prev + 5;
      });
    }, 150); // Takes about 3 seconds (100 / 5 * 150ms)
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">Batch Processing: The Nightly Job</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Processing huge volumes of data at scheduled intervals. Think of it like a scheduled nightly report generation.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header Bar */}
        <div className="bg-gray-100 dark:bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Clock size={20} />
            <span className="font-mono font-semibold">SCHEDULE: DAILY 23:59:00</span>
          </div>
          <div className="flex items-center gap-2">
             <div className={`h-3 w-3 rounded-full ${isProcessing ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
             <span className="text-xs font-bold uppercase text-gray-500">{isProcessing ? 'RUNNING' : 'IDLE'}</span>
          </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Source System */}
          <div className="flex flex-col items-center space-y-4 w-1/3">
            <div className="relative">
               <Database size={64} className="text-indigo-600 dark:text-indigo-400" />
               <div className="absolute -bottom-2 -right-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-1 rounded-full border border-indigo-200 dark:border-indigo-700">
                 DB
               </div>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-gray-900 dark:text-white">Daily Transactions</h4>
              <p className="text-sm text-gray-500 font-mono mt-1">{records.toLocaleString()} records</p>
            </div>
          </div>

          {/* Processing Pipe */}
          <div className="flex-1 flex flex-col items-center space-y-2">
            {isProcessing ? (
               <div className="w-full">
                 <div className="flex justify-between text-xs text-gray-500 mb-1">
                   <span>ETL Job</span>
                   <span>{progress}%</span>
                 </div>
                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                   <div className="bg-green-500 h-full transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
                 </div>
                 <div className="text-center mt-2 text-xs text-indigo-500 animate-pulse font-semibold">
                   Transforming Data...
                 </div>
               </div>
            ) : (
               <ArrowRight size={32} className="text-gray-300 dark:text-gray-600" />
            )}
          </div>

          {/* Destination */}
          <div className="flex flex-col items-center space-y-4 w-1/3">
            <div className={`relative transition-all duration-500 ${reportReady ? 'scale-110' : 'opacity-50 grayscale'}`}>
               <FileText size={64} className="text-green-600 dark:text-green-400" />
               {reportReady && (
                 <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-lg">
                   <CheckCircle size={16} />
                 </div>
               )}
            </div>
            <div className="text-center">
              <h4 className="font-bold text-gray-900 dark:text-white">Summary Report</h4>
              <p className="text-sm text-gray-500 mt-1">{reportReady ? "Generated: Just now" : "Waiting for run..."}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-6 text-center border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={runETL}
            disabled={isProcessing}
            className={`
              px-8 py-3 rounded-lg font-bold shadow-md flex items-center justify-center gap-2 mx-auto transition-all
              ${isProcessing 
                ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg active:scale-95'}
            `}
          >
            {isProcessing ? (
              <><Loader2 className="animate-spin" /> Processing...</>
            ) : (
              <><Server /> Run Midnight ETL Job</>
            )}
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Note: While processing, the system is under heavy load. Output is only available at the end.
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper Icon
const CheckCircle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default Tab2Batch;