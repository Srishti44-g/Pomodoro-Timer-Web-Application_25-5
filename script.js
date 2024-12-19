document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    let isRunning = false;
    let isDarkMode = localStorage.getItem('isDarkMode') === 'true';
    let currentSession = 'Work';
    let timeLeft = localStorage.getItem('timeLeft') ? Number(localStorage.getItem('timeLeft')) : 25 * 60;
    let workDuration = localStorage.getItem('workDuration') ? Number(localStorage.getItem('workDuration')) : 25;
    let breakDuration = localStorage.getItem('breakDuration') ? Number(localStorage.getItem('breakDuration')) : 5;
    let completedSessions = localStorage.getItem('completedSessions') ? Number(localStorage.getItem('completedSessions')) : 0;
    let totalWorkTime = localStorage.getItem('totalWorkTime') ? Number(localStorage.getItem('totalWorkTime')) : 0;
    let timerRef = null;
  
    const render = () => {
      app.innerHTML = `
        <div class="container ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}">
          <header>
            <h1>Pomodoro Timer</h1>
            <button id="toggleTheme" class="${isDarkMode ? 'dark-hover-bg-gray-700' : 'hover-bg-gray-200'}">
              ${isDarkMode ? '☀️' : '🌙'}
            </button>
          </header>
          <main class="flex flex-col items-center">
            <div class="timer">
              <svg>
                <circle cx="50%" cy="50%" r="45%" fill="none" stroke-width="10" class="circle-bg" />
                <circle cx="50%" cy="50%" r="45%" fill="none" stroke-width="10" class="circle-progress" style="stroke-dasharray: 283; stroke-dashoffset: ${283 * (1 - calculateProgress() / 100)};" />
              </svg>
              <div class="timer-display">
                <div class="time">${formatTime(timeLeft)}</div>
                <div class="session">${currentSession} Session</div>
              </div>
            </div>
            <div class="controls">
              <button id="toggleTimer" class="start-stop">
                ${isRunning ? '⏸️' : '▶️'}
              </button>
              <button id="resetTimer" class="reset">
                🔄
              </button>
            </div>
            <div class="session-durations text-sm">
              <span>Work: ${workDuration} min</span>
              <span>Break: ${breakDuration} min</span>
            </div>
          </main>
          <section class="section settings">
            <h2>⚙️ Settings</h2>
            <div>
              <label>Work Duration (min)</label>
              <input id="workDuration" type="number" value="${workDuration}" />
            </div>
            <div>
              <label>Break Duration (min)</label>
              <input id="breakDuration" type="number" value="${breakDuration}" />
            </div>
          </section>
          <section class="section statistics">
            <h2>📊 Statistics</h2>
            <div class="stat">${completedSessions}</div>
            <div class="label">Sessions Completed</div>
            <div class="stat">${(totalWorkTime / 60).toFixed(1)}</div>
            <div class="label">Total Work Hours</div>
          </section>
          <footer>
            <div>
              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">GitHub</a>
            </div>
          </footer>
        </div>
      `;
  
      document.getElementById('toggleTheme').addEventListener('click', toggleTheme);
      document.getElementById('toggleTimer').addEventListener('click', toggleTimer);
      document.getElementById('resetTimer').addEventListener('click', resetTimer);
      document.getElementById('workDuration').addEventListener('input', (e) => {
        workDuration = Number(e.target.value);
        localStorage.setItem('workDuration', workDuration);
        if (!isRunning && currentSession === 'Work') {
          timeLeft = workDuration * 60;
          localStorage.setItem('timeLeft', timeLeft);
        }
      });
      document.getElementById('breakDuration').addEventListener('input', (e) => {
        breakDuration = Number(e.target.value);
        localStorage.setItem('breakDuration', breakDuration);
        if (!isRunning && currentSession === 'Break') {
          timeLeft = breakDuration * 60;
          localStorage.setItem('timeLeft', timeLeft);
        }
      });
    };
  
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
  
    const calculateProgress = () => {
      const totalSessionTime = currentSession === 'Work' ? workDuration * 60 : breakDuration * 60;
      return (totalSessionTime - timeLeft) / totalSessionTime * 100;
    };
  
    const switchSession = () => {
      if (currentSession === 'Work') {
        currentSession = 'Break';
        completedSessions++;
        totalWorkTime += workDuration;
        localStorage.setItem('completedSessions', completedSessions);
        localStorage.setItem('totalWorkTime', totalWorkTime);
      } else {
        currentSession = 'Work';
      }
      isRunning = false;
      clearInterval(timerRef);
      timeLeft = currentSession === 'Work' ? workDuration * 60 : breakDuration * 60;
      localStorage.setItem('timeLeft', timeLeft);
      render();
    };
  
    const toggleTheme = () => {
      isDarkMode = !isDarkMode;
      localStorage.setItem('isDarkMode', isDarkMode);
      render();
    };
  
    const resetTimer = () => {
      isRunning = false;
      timeLeft = workDuration * 60;
      currentSession = 'Work';
      clearInterval(timerRef);
      localStorage.setItem('timeLeft', timeLeft);
      render();
    };
  
    const toggleTimer = () => {
      isRunning = !isRunning;
      if (isRunning) {
        timerRef = setInterval(() => {
          timeLeft--;
          localStorage.setItem('timeLeft', timeLeft);
          if (timeLeft <= 0) {
            switchSession();
          }
          render();
        }, 1000);
      } else {
        clearInterval(timerRef);
      }
      render();
    };
  
    render();
  });