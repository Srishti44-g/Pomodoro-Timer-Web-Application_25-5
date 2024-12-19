import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Play, Pause, RotateCcw, Settings, BarChart } from 'lucide-react';

const PomodoroTimer = () => {
  // State Management
  const [isRunning, setIsRunning] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentSession, setCurrentSession] = useState('Work');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Default 25 minutes
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalWorkTime, setTotalWorkTime] = useState(0);

  // References
  const timerRef = useRef(null);

  // Timer Logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            switchSession();
            return currentSession === 'Work' 
              ? breakDuration * 60 
              : workDuration * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      switchSession();
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft, currentSession]);

  const switchSession = () => {
    if (currentSession === 'Work') {
      setCurrentSession('Break');
      setCompletedSessions(prev => prev + 1);
      setTotalWorkTime(prev => prev + workDuration);
    } else {
      setCurrentSession('Work');
    }
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    const totalSessionTime = currentSession === 'Work' 
      ? workDuration * 60 
      : breakDuration * 60;
    return (totalSessionTime - timeLeft) / totalSessionTime * 100;
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(workDuration * 60);
    setCurrentSession('Work');
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className={`min-h-screen p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Pomodoro Timer</h1>
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {isDarkMode ? <Sun /> : <Moon />}
        </button>
      </header>

      {/* Main Timer Section */}
      <main className="flex flex-col items-center">
        <div className="relative w-64 h-64 mb-4">
          {/* Circular Progress */}
          <svg className="absolute top-0 left-0 w-full h-full rotate-[-90deg]">
            <circle 
              cx="50%" 
              cy="50%" 
              r="45%" 
              fill="none" 
              strokeWidth="10" 
              stroke={isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}
            />
            <circle 
              cx="50%" 
              cy="50%" 
              r="45%" 
              fill="none" 
              strokeWidth="10" 
              stroke={isDarkMode ? '#4A90E2' : '#007BFF'}
              strokeDasharray="283"
              strokeDashoffset={`${283 * (1 - calculateProgress() / 100)}`}
            />
          </svg>

          {/* Timer Display */}
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <div className="text-6xl font-bold">{formatTime(timeLeft)}</div>
            <div className="text-lg mt-2">{currentSession} Session</div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex space-x-4 mb-4">
          <button 
            onClick={toggleTimer} 
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            {isRunning ? <Pause /> : <Play />}
          </button>
          <button 
            onClick={resetTimer} 
            className="p-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300"
          >
            <RotateCcw />
          </button>
        </div>

        {/* Timer Labels */}
        <div className="flex space-x-4 text-sm">
          <span>Work: {workDuration} min</span>
          <span>Break: {breakDuration} min</span>
        </div>
      </main>

      {/* Customization Panel */}
      <section className="mt-8 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Settings className="mr-2" /> Settings
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Work Duration (min)</label>
            <input 
              type="number" 
              value={workDuration}
              onChange={(e) => setWorkDuration(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Break Duration (min)</label>
            <input 
              type="number" 
              value={breakDuration}
              onChange={(e) => setBreakDuration(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="mt-8 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart className="mr-2" /> Statistics
        </h2>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{completedSessions}</div>
            <div className="text-sm">Sessions Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{totalWorkTime.toFixed(1)}</div>
            <div className="text-sm">Total Work Hours</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm">
        <div className="space-x-4">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export default PomodoroTimer;
