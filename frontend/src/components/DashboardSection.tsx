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
  onSubmitTasks: (completedTasks: {todoIds: string[], routineIds: string[]}) => void;
  isRecalculating: boolean;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({
  todos,
  routines,
  scenarios,
  onSubmitTasks,
  isRecalculating
}) => {
  const [selectedTodos, setSelectedTodos] = useState<string[]>([]);
  const [selectedRoutines, setSelectedRoutines] = useState<string[]>([]);

  const handleTodoToggle = (todoId: string) => {
    setSelectedTodos(prev => 
      prev.includes(todoId) 
        ? prev.filter(id => id !== todoId)
        : [...prev, todoId]
    );
  };

  const handleRoutineToggle = (routineId: string) => {
    setSelectedRoutines(prev => 
      prev.includes(routineId) 
        ? prev.filter(id => id !== routineId)
        : [...prev, routineId]
    );
  };

  const handleSubmit = () => {
    if (selectedTodos.length === 0 && selectedRoutines.length === 0) return;
    onSubmitTasks({
      todoIds: selectedTodos,
      routineIds: selectedRoutines
    });
    setSelectedTodos([]);
    setSelectedRoutines([]);
  };

  const hasSelections = selectedTodos.length > 0 || selectedRoutines.length > 0;

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


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Todos Section */}
          <div className="acoustic-card">
            <h3 className="text-xl font-light text-warm-cream mb-4 font-acoustic">📝 Generated Tasks</h3>
            <p className="text-warm-brown/80 text-sm mb-4 font-light">Based on your schedule and goals</p>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {todos.map((todo) => {
                const isSelected = selectedTodos.includes(todo.id);
                const isCompleted = todo.completed;
                return (
                  <div key={todo.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                    isCompleted ? 'opacity-50 border-warm-brown/20' : 
                    isSelected ? 'border-soft-orange bg-soft-orange/10' : 
                    'border-warm-brown/30 hover:border-soft-orange/50 hover:bg-soft-orange/5'
                  }`}
                  onClick={() => !isCompleted && handleTodoToggle(todo.id)}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      isCompleted 
                        ? 'bg-muted-green border-muted-green text-white' 
                        : isSelected
                        ? 'bg-soft-orange border-soft-orange text-white'
                        : 'border-warm-brown/40'
                    }`}>
                      {(isSelected || isCompleted) && '✓'}
                    </div>
                    <span className={`flex-1 font-light ${
                      isCompleted ? 'line-through text-warm-brown/50' : 
                      isSelected ? 'text-warm-cream font-medium' : 'text-warm-cream'
                    }`}>
                      {todo.text}
                    </span>
                    <span className="text-xs text-warm-brown/80 capitalize">
                      {todo.impact}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Routines Section */}
          <div className="acoustic-card">
            <h3 className="text-xl font-light text-warm-cream mb-4 font-acoustic">🔄 Routines</h3>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {routines.map((routine) => {
                const isSelected = selectedRoutines.includes(routine.id);
                const isCompleted = routine.completedToday;
                return (
                  <div key={routine.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                    isCompleted ? 'opacity-50 border-warm-brown/20' : 
                    isSelected ? 'border-soft-orange bg-soft-orange/10' : 
                    'border-warm-brown/30 hover:border-soft-orange/50 hover:bg-soft-orange/5'
                  }`}
                  onClick={() => !isCompleted && handleRoutineToggle(routine.id)}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      isCompleted 
                        ? 'bg-muted-green border-muted-green text-white' 
                        : isSelected
                        ? 'bg-soft-orange border-soft-orange text-white'
                        : 'border-warm-brown/40'
                    }`}>
                      {(isSelected || isCompleted) && '✓'}
                    </div>
                    <div className="flex-1">
                      <span className={`block font-light ${
                        isCompleted ? 'text-muted-green' : 
                        isSelected ? 'text-warm-cream font-medium' : 'text-warm-cream'
                      }`}>
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
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        {hasSelections && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              disabled={isRecalculating}
              className="px-8 py-3 bg-soft-orange hover:bg-soft-orange/80 text-warm-cream rounded-xl font-light font-acoustic text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Submit Progress ({selectedTodos.length + selectedRoutines.length} tasks)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardSection;