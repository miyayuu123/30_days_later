import React, { useState, useEffect } from 'react';
import VideoSection from './components/VideoSection';
import DiarySection from './components/DiarySection';
import DashboardSection from './components/DashboardSection';
import OnboardingFlow from './components/OnboardingFlow';
import RecalculationBanner from './components/RecalculationBanner';
import FutureCalculationIntro from './components/FutureCalculationIntro';

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

interface DiaryEntry {
  day: number;
  date: string;
  entry: string;
  mood: 'positive' | 'neutral' | 'negative';
}

interface UserData {
  name: string;
  googleConnected: boolean;
  faceImage: string | null;
  onboardingComplete: boolean;
  introComplete: boolean;
}

function App() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    googleConnected: false,
    faceImage: null,
    onboardingComplete: false,
    introComplete: false
  });

  const [isRecalculating, setIsRecalculating] = useState(false);
  const [recalculationProgress, setRecalculationProgress] = useState(0);
  const [currentVideo, setCurrentVideo] = useState("/hero-video.mp4");
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Complete morning workout', completed: false, impact: 'high' },
    { id: '2', text: 'Learn a new skill for 30 minutes', completed: false, impact: 'high' },
    { id: '3', text: 'Read 20 pages of a book', completed: true, impact: 'medium' },
    { id: '4', text: 'Call a friend or family member', completed: false, impact: 'medium' },
    { id: '5', text: 'Plan tomorrow\'s priorities', completed: false, impact: 'low' },
  ]);

  const [routines, setRoutines] = useState<Routine[]>([
    { id: '1', name: 'Morning Meditation', streak: 12, completedToday: true, impact: 'high' },
    { id: '2', name: 'Drink 8 glasses of water', streak: 8, completedToday: false, impact: 'medium' },
    { id: '3', name: 'Journal writing', streak: 5, completedToday: true, impact: 'high' },
    { id: '4', name: 'Evening walk', streak: 15, completedToday: false, impact: 'medium' },
  ]);

  const [scenarios, setScenarios] = useState<Scenario[]>([
    { id: '1', text: 'You land your dream job and start a fulfilling career', type: 'positive', probability: 75 },
    { id: '2', text: 'You develop a strong network of professional connections', type: 'positive', probability: 68 },
    { id: '3', text: 'You achieve your fitness and health goals', type: 'positive', probability: 82 },
    { id: '4', text: 'You start a side project that gains traction', type: 'positive', probability: 55 },
    { id: '5', text: 'You fall into old habits and lose motivation', type: 'negative', probability: 25 },
    { id: '6', text: 'You face unexpected financial challenges', type: 'negative', probability: 18 },
    { id: '7', text: 'You struggle with work-life balance', type: 'negative', probability: 30 },
  ]);

  const diaryEntries: DiaryEntry[] = [
    { day: 1, date: 'Nov 12, 2024', entry: 'Started my journey today. Feeling excited but nervous about the changes ahead. Set up my daily routines and goals.', mood: 'positive' },
    { day: 2, date: 'Nov 13, 2024', entry: 'Completed my morning meditation and workout. Already feeling more energized. The small wins are building momentum.', mood: 'positive' },
    { day: 3, date: 'Nov 14, 2024', entry: 'Had a challenging day at work, but stuck to my evening routine. Learning that consistency matters more than perfection.', mood: 'neutral' },
    { day: 4, date: 'Nov 15, 2024', entry: 'Connected with an old friend today. Realized how much personal growth I\'ve experienced. Grateful for this journey.', mood: 'positive' },
    { day: 5, date: 'Nov 16, 2024', entry: 'Struggled with motivation today. Skipped my workout but made sure to journal. Tomorrow is a fresh start.', mood: 'negative' },
    { day: 6, date: 'Nov 17, 2024', entry: 'Back on track! Completed all my tasks and routines. The key is not letting one bad day derail everything.', mood: 'positive' },
  ];

  const handleSubmitTasks = (completedTasks: {todoIds: string[], routineIds: string[]}) => {
    if (isRecalculating) return;

    // Start recalculation process
    startRecalculation();

    // Mark selected todos as completed
    setTodos(prev => prev.map(todo => {
      if (completedTasks.todoIds.includes(todo.id)) {
        updateScenarioProbabilities(todo.impact, 'positive');
        return { ...todo, completed: true };
      }
      return todo;
    }));

    // Mark selected routines as completed
    setRoutines(prev => prev.map(routine => {
      if (completedTasks.routineIds.includes(routine.id)) {
        updateScenarioProbabilities(routine.impact, 'positive');
        return { ...routine, completedToday: true, streak: routine.streak + 1 };
      }
      return routine;
    }));
  };

  const startRecalculation = () => {
    setIsRecalculating(true);
    setRecalculationProgress(0);

    // Simulate recalculation progress
    const progressInterval = setInterval(() => {
      setRecalculationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsRecalculating(false);
            setRecalculationProgress(0);
            // Generate new video URL (simulate video change)
            setCurrentVideo(`/hero-video.mp4?t=${Date.now()}`);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
  };

  const updateScenarioProbabilities = (impact: string, direction: 'positive' | 'negative') => {
    const multiplier = impact === 'high' ? 5 : impact === 'medium' ? 3 : 1;
    const change = direction === 'positive' ? multiplier : -multiplier;

    setScenarios(prev => prev.map(scenario => ({
      ...scenario,
      probability: Math.max(0, Math.min(100, scenario.probability + 
        (scenario.type === 'positive' ? change : -change)))
    })));
  };


  const handleOnboardingComplete = (onboardingData: any) => {
    setUserData({
      name: onboardingData.name,
      googleConnected: onboardingData.googleConnected,
      faceImage: onboardingData.faceImage,
      onboardingComplete: true,
      introComplete: false
    });
  };

  const handleIntroComplete = () => {
    setUserData(prev => ({
      ...prev,
      introComplete: true
    }));
  };

  // Show onboarding if not complete
  if (!userData.onboardingComplete) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  // Show future calculation intro if onboarding complete but intro not complete
  if (!userData.introComplete) {
    return (
      <FutureCalculationIntro 
        isVisible={true}
        onComplete={handleIntroComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-future-dark">
      <VideoSection 
        title="30 Days Later"
        description={`Welcome back, ${userData.name}`}
        videoUrl={currentVideo}
      />
      
      <DashboardSection 
        todos={todos}
        routines={routines}
        scenarios={scenarios}
        onSubmitTasks={handleSubmitTasks}
        isRecalculating={isRecalculating}
      />
      
      <DiarySection entries={diaryEntries} />
      
      <RecalculationBanner 
        isVisible={isRecalculating}
        progress={recalculationProgress}
      />
    </div>
  );
}

export default App;