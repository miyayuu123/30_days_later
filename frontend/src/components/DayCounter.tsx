import React from 'react';

interface DayCounterProps {
  currentDay: number;
  totalDays: number;
  scenario: string;
}

const DayCounter: React.FC<DayCounterProps> = ({ currentDay, totalDays, scenario }) => {
  const progress = (currentDay / totalDays) * 100;

  return (
    <div className="ui-interactive bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Day {currentDay}
          </h2>
          <p className="text-gray-300 text-sm">
            {totalDays - currentDay} days remaining
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-3xl font-bold text-future-blue">
            {currentDay}/{totalDays}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-700/50 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-future-blue to-future-purple h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="text-white">
        <p className="text-sm text-gray-400 mb-2">Today's scenario:</p>
        <p className="text-base leading-relaxed">{scenario}</p>
      </div>
    </div>
  );
};

export default DayCounter;