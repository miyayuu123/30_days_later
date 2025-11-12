import React, { useState } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  impact: 'high' | 'medium' | 'low';
}

interface Routine {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
  impact: 'high' | 'medium' | 'low';
}

interface Scenario {
  id: string;
  text: string;
  type: 'positive' | 'negative';
  probability: number;
}

interface DashboardSectionProps {
  todos: Todo[];
  routines: Routine[];
  scenarios: Scenario[];
  onCompleteTask: (taskId: string, type: 'todo' | 'routine') => void;
  onAddTodo: (text: string, impact: 'high' | 'medium' | 'low') => void;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({
  todos,
  routines,
  scenarios,
  onCompleteTask,
  onAddTodo
}) => {
  const [newTodo, setNewTodo] = useState('');
  const [newTodoImpact, setNewTodoImpact] = useState<'high' | 'medium' | 'low'>('medium');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAddTodo(newTodo.trim(), newTodoImpact);
      setNewTodo('');
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-green-400 border-green-400/30';
      case 'medium': return 'text-yellow-400 border-yellow-400/30';
      case 'low': return 'text-blue-400 border-blue-400/30';
      default: return 'text-gray-400 border-gray-400/30';
    }
  };

  const completedTodos = todos.filter(t => t.completed).length;
  const completedRoutines = routines.filter(r => r.completedToday).length;
  const positiveScenarios = scenarios.filter(s => s.type === 'positive');
  const negativeScenarios = scenarios.filter(s => s.type === 'negative');

  const averagePositiveProbability = positiveScenarios.reduce((acc, s) => acc + s.probability, 0) / positiveScenarios.length || 0;

  return (
    <section id="dashboard-section" className="section dashboard-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Life Dashboard
          </h2>
          <p className="text-gray-400 text-lg font-light">
            Track your progress and shape your future
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="acoustic-card text-center">
            <div className="text-3xl font-light text-soft-orange mb-2 font-acoustic">
              {Math.round(averagePositiveProbability)}%
            </div>
            <p className="text-warm-brown/80 font-light">Positive Outlook</p>
          </div>
          
          <div className="acoustic-card text-center">
            <div className="text-3xl font-light text-muted-green mb-2 font-acoustic">
              {completedTodos}/{todos.length}
            </div>
            <p className="text-warm-brown/80 font-light">Tasks Complete</p>
          </div>
          
          <div className="acoustic-card text-center">
            <div className="text-3xl font-light text-warm-brown mb-2 font-acoustic">
              {completedRoutines}/{routines.length}
            </div>
            <p className="text-warm-brown/80 font-light">Routines Today</p>
          </div>
          
          <div className="acoustic-card text-center">
            <div className="text-3xl font-light text-soft-orange mb-2 font-acoustic">
              {routines.reduce((acc, r) => acc + r.streak, 0)}
            </div>
            <p className="text-warm-brown/80 font-light">Total Streak</p>
          </div>
        </div>

        {/* Scenarios Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="acoustic-card">
            <h3 className="text-xl font-light text-muted-green mb-4 font-acoustic">✨ POSITIVE</h3>
            <div className="space-y-3">
              {positiveScenarios.map((scenario) => (
                <div key={scenario.id} className="p-3 bg-muted-green/10 border border-muted-green/30 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-muted-green font-light">{scenario.probability}% likely</span>
                  </div>
                  <p className="text-warm-cream/90 text-sm font-light">{scenario.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="acoustic-card">
            <h3 className="text-xl font-light text-soft-orange mb-4 font-acoustic">⚠️ NEGATIVE</h3>
            <div className="space-y-3">
              {negativeScenarios.map((scenario) => (
                <div key={scenario.id} className="p-3 bg-soft-orange/10 border border-soft-orange/30 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-soft-orange font-light">{scenario.probability}% risk</span>
                  </div>
                  <p className="text-warm-cream/90 text-sm font-light">{scenario.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Todos Section */}
          <div className="acoustic-card">
            <h3 className="text-xl font-light text-warm-cream mb-4 font-acoustic">📝 Tasks & Goals</h3>
            
            <form onSubmit={handleAddTodo} className="mb-4">
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-future-blue"
                />
                <select
                  value={newTodoImpact}
                  onChange={(e) => setNewTodoImpact(e.target.value as 'high' | 'medium' | 'low')}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-future-blue"
                >
                  <option value="high">High Impact</option>
                  <option value="medium">Medium Impact</option>
                  <option value="low">Low Impact</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-2 bg-future-blue hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </form>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {todos.map((todo) => (
                <div key={todo.id} className={`flex items-center gap-3 p-3 rounded-lg border ${getImpactColor(todo.impact)} ${todo.completed ? 'opacity-50' : ''}`}>
                  <button
                    onClick={() => onCompleteTask(todo.id, 'todo')}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      todo.completed 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-400 hover:border-green-400'
                    }`}
                  >
                    {todo.completed && '✓'}
                  </button>
                  <span className={`flex-1 ${todo.completed ? 'line-through text-warm-brown/50' : 'text-warm-cream'} font-light`}>
                    {todo.text}
                  </span>
                  <span className="text-xs text-warm-brown/80 capitalize">
                    {todo.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Routines Section */}
          <div className="acoustic-card">
            <h3 className="text-xl font-light text-warm-cream mb-4 font-acoustic">🔄 Routines</h3>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {routines.map((routine) => (
                <div key={routine.id} className={`flex items-center gap-3 p-3 rounded-lg border ${getImpactColor(routine.impact)}`}>
                  <button
                    onClick={() => onCompleteTask(routine.id, 'routine')}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      routine.completedToday 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-400 hover:border-green-400'
                    }`}
                  >
                    {routine.completedToday && '✓'}
                  </button>
                  <div className="flex-1">
                    <span className={`block ${routine.completedToday ? 'text-muted-green' : 'text-warm-cream'} font-light`}>
                      {routine.name}
                    </span>
                    <span className="text-xs text-warm-brown/80 font-light">
                      {routine.streak} day streak
                    </span>
                  </div>
                  <span className="text-xs text-warm-brown/80 capitalize">
                    {routine.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;