# Pomodoro-Timer-Web-Application
src/
 ├── components/
* │   ├── Header.js
* │   ├── TimerDisplay.js
* │   ├── Controls.js
* │   ├── SettingsPanel.js
* │   ├── Statistics.js
* │   └── Footer.js
* ├── App.js
* ├── index.css
* └── index.js

## Wireframe for the Web App
### 1. Header
* Position: Top of the page (sticky).
* Components:
   * Logo/Title: "Pomodoro Timer" on the left.
   * Theme Toggle: Dark/Light mode switch on the right.
### 2. Main Timer Section
* Position: Centered on the screen (vertically and horizontally).
* Components:
   * Timer Display:
      * Large circular timer with a countdown.
      * Progress bar around the timer.
   * Session Indicator: Below the timer, showing the current session (e.g., "Work" or "Break").
   * Control Buttons:
      * Start/Pause Button.
      * Reset Button.
   * Timer Labels: Work and Break durations displayed as small text.
### 3. Customization Panel (Settings Section)
* Position: Below the Timer Section.
* Components:
   * Input Fields:
      * "Work Duration": Number input for setting work time.
      * "Break Duration": Number input for setting break time.
   * Save Button: To apply changes.
   * Default Button: To reset to default settings.
### 4. Statistics Section
* Position: Below the Customization Panel (or accessible via a tab).
* Components:
   * Daily Summary:
      * A bar chart showing completed sessions for the day.
   * Cumulative Stats:
      * Total sessions completed.
      * Total time spent working (in hours).
### 5. Footer
* Position: Bottom of the page.
* Components:
   * Links:
      * About.
      * Contact.
      * GitHub repository link.


