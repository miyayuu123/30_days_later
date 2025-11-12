import React from 'react';

interface DiaryEntry {
  day: number;
  date: string;
  entry: string;
  mood: 'positive' | 'neutral' | 'negative';
}

interface DiarySectionProps {
  entries: DiaryEntry[];
}

const DiarySection: React.FC<DiarySectionProps> = ({ entries }) => {
  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'positive': return '😊';
      case 'negative': return '😔';
      default: return '😐';
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'positive': return 'text-green-400 border-green-400/30';
      case 'negative': return 'text-red-400 border-red-400/30';
      default: return 'text-yellow-400 border-yellow-400/30';
    }
  };

  return (
    <section id="diary-section" className="section diary-section">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Your 30-Day Journey
          </h2>
          <p className="text-gray-400 text-lg font-light">
            A chronicle of your transformation, day by day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <div key={entry.day} className={`card ${getMoodColor(entry.mood)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getMoodIcon(entry.mood)}</span>
                  <div>
                    <h3 className="text-white font-semibold">Day {entry.day}</h3>
                    <p className="text-gray-400 text-sm">{entry.date}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {entry.entry}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="glass p-6 inline-block">
            <p className="text-white mb-2">
              📖 {entries.length} days documented
            </p>
            <p className="text-gray-400 text-sm">
              Watch your story unfold in real time
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiarySection;