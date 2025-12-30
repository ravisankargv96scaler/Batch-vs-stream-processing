import React, { useState } from 'react';
import { Briefcase, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Scenario } from '../types';

const scenarios: Scenario[] = [
  {
    id: 1,
    description: "Calculate monthly payroll for 50,000 employees.",
    correctAnswer: 'batch',
    explanation: "Payroll is a periodic event (once a month). You need all the data from the month before you calculate. High throughput, low urgency."
  },
  {
    id: 2,
    description: "Monitor IoT temperature sensors to prevent engine overheating.",
    correctAnswer: 'stream',
    explanation: "If an engine overheats, you need to know NOW. Waiting for a nightly report would result in a broken engine."
  },
  {
    id: 3,
    description: "Generate end-of-year financial statements.",
    correctAnswer: 'batch',
    explanation: "This requires aggregating a massive amount of historical data once. Speed is not critical; accuracy and completeness are."
  },
  {
    id: 4,
    description: "Recommend a movie based on what the user just clicked.",
    correctAnswer: 'stream',
    explanation: "The user is engaged right now. If you wait until tomorrow to recommend a movie, they will have left the site."
  }
];

const Tab5UseCases: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const currentScenario = scenarios[currentIndex];

  const handleChoice = (choice: 'batch' | 'stream') => {
    if (choice === currentScenario.correctAnswer) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const nextScenario = () => {
    setFeedback(null);
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Architect's Choice</h2>
        <p className="text-gray-600 dark:text-gray-300">
          You are the Data Architect. Choose the right tool for the job.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden min-h-[400px] flex flex-col">
        {/* Scenario Card Header */}
        <div className="bg-gray-100 dark:bg-gray-900 p-6 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <Briefcase className="text-gray-500" />
          <span className="font-mono text-sm uppercase text-gray-500">Scenario {currentIndex + 1} of {scenarios.length}</span>
        </div>

        {/* Content */}
        <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-8">
          
          <h3 className="text-2xl font-medium text-gray-800 dark:text-gray-100">
            "{currentScenario.description}"
          </h3>

          {!feedback ? (
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <button
                onClick={() => handleChoice('batch')}
                className="py-4 rounded-xl border-2 border-indigo-100 dark:border-indigo-900 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all font-bold text-indigo-700 dark:text-indigo-400 text-lg"
              >
                Batch
              </button>
              <button
                 onClick={() => handleChoice('stream')}
                 className="py-4 rounded-xl border-2 border-orange-100 dark:border-orange-900 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-all font-bold text-orange-700 dark:text-orange-400 text-lg"
              >
                Stream
              </button>
            </div>
          ) : (
            <div className="animate-fade-in flex flex-col items-center w-full">
               <div className={`flex items-center gap-2 text-xl font-bold mb-4 ${feedback === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
                 {feedback === 'correct' ? <CheckCircle size={32} /> : <XCircle size={32} />}
                 {feedback === 'correct' ? "Correct!" : "Not quite."}
               </div>
               
               <p className="text-gray-600 dark:text-gray-300 max-w-md mb-8">
                 {currentScenario.explanation}
               </p>

               <button 
                 onClick={nextScenario}
                 className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold hover:scale-105 transition-transform"
               >
                 Next Scenario <ArrowRight size={18} />
               </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Tab5UseCases;