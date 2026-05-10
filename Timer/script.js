// --- 1. STATE VARIABLES ---
let timeLeft = 25 * 60; // Starts at 25 minutes (in seconds)
let isRunning = false;
let timerInterval;
let isWorkMode = true;
let sessionsCompleted = 0;

// --- 2. GRAB HTML ELEMENTS ---
const display = document.getElementById('timer-display');
const startBtn = document.getElementById('btn-start');
const resetBtn = document.getElementById('btn-reset');
const workBtn = document.getElementById('btn-work');
const breakBtn = document.getElementById('btn-break');
const sessionCount = document.getElementById('session-count');

// --- 3. CORE FUNCTIONS ---

// Formats the seconds back into MM:SS
const updateDisplay = () => {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    display.textContent = `${minutes}:${seconds}`;
};

// Handles Play/Pause logic
const toggleTimer = () => {
    if (isRunning) {
        // Pause the timer
        clearInterval(timerInterval);
        startBtn.textContent = 'Start';
        isRunning = false;
    } else {
        // Start the timer
        isRunning = true;
        startBtn.textContent = 'Pause';

        timerInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();

            // What happens when time runs out?
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                startBtn.textContent = 'Start';

                if (isWorkMode) {
                    sessionsCompleted++;
                    sessionCount.textContent = sessionsCompleted;
                    alert("Great focus! Time for a 5-minute break.");
                    setMode(false); // Auto-switch to break
                } else {
                    alert("Break is over! Let's get back to work.");
                    setMode(true); // Auto-switch to work
                }
            }
        }, 1000);
    }
};

// Resets current timer back to full
const resetTimer = () => {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.textContent = 'Start';
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    updateDisplay();
};

// Switches between 25 min work and 5 min break
const setMode = (work) => {
    isWorkMode = work;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;

    // Visual UI update for the active tab
    if (work) {
        workBtn.classList.replace('text-gray-500', 'text-lime-400');
        breakBtn.classList.replace('text-lime-400', 'text-gray-500');
    } else {
        breakBtn.classList.replace('text-gray-500', 'text-lime-400');
        workBtn.classList.replace('text-lime-400', 'text-gray-500');
    }

    resetTimer(); // Reset time when switching tabs
};

// --- 4. EVENT LISTENERS ---
startBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);
workBtn.addEventListener('click', () => setMode(true));
breakBtn.addEventListener('click', () => setMode(false));

// Initialize display on first load
updateDisplay();