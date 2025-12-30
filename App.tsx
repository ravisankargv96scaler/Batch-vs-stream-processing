import React, { useState } from 'react';
import { LayoutDashboard, Package, Activity, Scale, BrainCircuit, CheckCircle2 } from 'lucide-react';
import { TabId } from './types';
import Tab1Laundry from './components/Tab1Laundry';
import Tab2Batch from './components/Tab2Batch';
import Tab3Stream from './components/Tab3Stream';
import Tab4Comparison from './components/Tab4Comparison';
import Tab5UseCases from './components/Tab5UseCases';
import Tab6Quiz from './components/Tab6Quiz';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>(TabId.CONCEPT);

  const renderContent = () => {
    switch (activeTab) {
      case TabId.CONCEPT: return <Tab1Laundry />;
      case TabId.BATCH: return <Tab2Batch />;
      case TabId.STREAM: return <Tab3Stream />;
      case TabId.COMPARISON: return <Tab4Comparison />;
      case TabId.USE_CASES: return <Tab5UseCases />;
      case TabId.QUIZ: return <Tab6Quiz />;
      default: return <Tab1Laundry />;
    }
  };

  const navItems = [
    { id: TabId.CONCEPT, label: 'The Core Concept', icon: LayoutDashboard },
    { id: TabId.BATCH, label: 'Batch Processing', icon: Package },
    { id: TabId.STREAM, label: 'Stream Processing', icon: Activity },
    { id: TabId.COMPARISON, label: 'Comparison', icon: Scale },
    { id: TabId.USE_CASES, label: 'Use Cases', icon: BrainCircuit },
    { id: TabId.QUIZ, label: 'Summary & Quiz', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-slate-800 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white">
                <Activity size={24} />
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                DataPipelines<span className="font-light text-gray-500 dark:text-gray-400">.edu</span>
              </h1>
            </div>
            <div className="hidden md:flex text-sm text-gray-500 dark:text-gray-400">
              Interactive Learning Module
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-hide">
          <nav className="flex space-x-1 md:space-x-4 h-14 items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap
                    ${isActive 
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}
                  `}
                >
                  <Icon className={`mr-2 h-4 w-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} DataPipelines.edu. Built for educational purposes.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;