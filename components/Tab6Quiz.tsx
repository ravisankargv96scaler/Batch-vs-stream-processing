import React, { useState } from 'react';
import { Trophy, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '../types';

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which method typically has lower latency?",
    options: ["Batch Processing", "Stream Processing"],
    correctIndex: 1
  },
  {
    id: 2,
    question: "Processing monthly payroll is a classic example of...",
    options: ["Stream Processing", "Batch Processing", "Real-time Processing"],
    correctIndex: 1
  },
  {
    id: 3,
    question: "Stream processing is triggered by...",
    options: ["A Schedule (Time)", "An Event (Data Creation)", "A Manager"],
    correctIndex: 1
  }
];

const Tab6Quiz: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId: number, optionIndex: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctIndex) score++;
    });
    return score;
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions!");
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Knowledge Check</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Let's see what you've learned.
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => {
          const isCorrect = submitted && answers[q.id] === q.correctIndex;
          const isWrong = submitted && answers[q.id] !== q.correctIndex;

          return (
            <div key={q.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                {idx + 1}. {q.question}
              </h3>
              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  const isSelected = answers[q.id] === i;
                  let btnClass = "w-full text-left px-4 py-3 rounded-lg border transition-all ";
                  
                  if (submitted) {
                    if (i === q.correctIndex) btnClass += "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-300 font-bold";
                    else if (isSelected && i !== q.correctIndex) btnClass += "bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-300";
                    else btnClass += "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-400";
                  } else {
                    if (isSelected) btnClass += "bg-indigo-100 dark:bg-indigo-900/50 border-indigo-500 text-indigo-800 dark:text-indigo-200 font-medium";
                    else btnClass += "bg-gray-50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(q.id, i)}
                      disabled={submitted}
                      className={btnClass}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-6">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all"
          >
            Submit Answers
          </button>
        ) : (
          <div className="space-y-4 animate-fade-in">
             <div className="flex flex-col items-center gap-2">
                <Trophy size={48} className={score === questions.length ? "text-yellow-500" : "text-gray-400"} />
                <h3 className="text-2xl font-bold">You scored {score} / {questions.length}</h3>
                <p className="text-gray-500">
                  {score === questions.length ? "Perfect! You're a Data Engineering Pro." : "Good effort! Review the tabs to master the concepts."}
                </p>
             </div>
             <button
               onClick={handleReset}
               className="inline-flex items-center gap-2 text-indigo-600 hover:underline mt-4"
             >
               <RotateCcw size={16} /> Try Again
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tab6Quiz;