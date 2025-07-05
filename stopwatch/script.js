class Stopwatch {
    constructor() {
        // Time tracking variables
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.isRunning = false;
        this.lapCounter = 0;
        
        // DOM elements
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.millisecondsElement = document.getElementById('milliseconds');
        
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        
        this.lapList = document.getElementById('lapList');
        this.stopwatchContainer = document.querySelector('.stopwatch');
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Show empty state message
        this.showEmptyLaps();
    }
    
    initEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.recordLap());
    }
    
    start() {
        if (!this.isRunning) {
            this.startTime = Date.now() - this.elapsedTime;
            this.timerInterval = setInterval(() => this.updateDisplay(), 10);
            this.isRunning = true;
            
            // Update button states
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            this.lapBtn.disabled = false;
            
            // Add running animation
            this.stopwatchContainer.classList.add('running');
        }
    }
    
    pause() {
        if (this.isRunning) {
            clearInterval(this.timerInterval);
            this.isRunning = false;
            
            // Update button states
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            this.lapBtn.disabled = true;
            
            // Remove running animation
            this.stopwatchContainer.classList.remove('running');
        }
    }
    
    reset() {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        this.elapsedTime = 0;
        this.lapCounter = 0;
        
        // Reset display
        this.updateDisplay();
        
        // Reset button states
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.lapBtn.disabled = true;
        
        // Clear lap times
        this.clearLaps();
        
        // Remove running animation
        this.stopwatchContainer.classList.remove('running');
    }
    
    updateDisplay() {
        if (this.isRunning) {
            this.elapsedTime = Date.now() - this.startTime;
        }
        
        const time = this.formatTime(this.elapsedTime);
        
        this.hoursElement.textContent = time.hours;
        this.minutesElement.textContent = time.minutes;
        this.secondsElement.textContent = time.seconds;
        this.millisecondsElement.textContent = time.milliseconds;
    }
    
    formatTime(timeInMs) {
        const totalSeconds = Math.floor(timeInMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((timeInMs % 1000));
        
        return {
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0'),
            milliseconds: milliseconds.toString().padStart(3, '0')
        };
    }
    
    recordLap() {
        if (this.isRunning) {
            this.lapCounter++;
            const currentTime = this.elapsedTime;
            const formattedTime = this.formatTime(currentTime);
            
            // Remove empty state if it exists
            const emptyState = this.lapList.querySelector('.empty-laps');
            if (emptyState) {
                emptyState.remove();
            }
            
            // Create lap item
            const lapItem = document.createElement('div');
            lapItem.className = 'lap-item';
            lapItem.innerHTML = `
                <span class="lap-number">Lap ${this.lapCounter}</span>
                <span class="lap-time">${formattedTime.hours}:${formattedTime.minutes}:${formattedTime.seconds}:${formattedTime.milliseconds}</span>
            `;
            
            // Add to top of list (most recent first)
            this.lapList.insertBefore(lapItem, this.lapList.firstChild);
            
            // Add entrance animation
            lapItem.style.animation = 'slideIn 0.3s ease-out';
            
            // Scroll to top to show new lap
            this.lapList.scrollTop = 0;
        }
    }
    
    clearLaps() {
        this.lapList.innerHTML = '';
        this.showEmptyLaps();
    }
    
    showEmptyLaps() {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-laps';
        emptyMessage.textContent = 'No lap times recorded yet. Start the stopwatch and click "Lap" to record times.';
        this.lapList.appendChild(emptyMessage);
    }
}

// Utility functions for enhanced user experience
class StopwatchEnhancements {
    constructor(stopwatch) {
        this.stopwatch = stopwatch;
        this.initKeyboardShortcuts();
        this.initVisibilityAPI();
    }
    
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Prevent shortcuts when user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    if (this.stopwatch.isRunning) {
                        this.stopwatch.pause();
                    } else {
                        this.stopwatch.start();
                    }
                    break;
                case 'KeyR':
                    e.preventDefault();
                    this.stopwatch.reset();
                    break;
                case 'KeyL':
                    e.preventDefault();
                    if (this.stopwatch.isRunning) {
                        this.stopwatch.recordLap();
                    }
                    break;
            }
        });
    }
    
    initVisibilityAPI() {
        // Handle page visibility changes to maintain accuracy
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && this.stopwatch.isRunning) {
                // Recalculate elapsed time when page becomes visible again
                this.stopwatch.updateDisplay();
            }
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const stopwatch = new Stopwatch();
    const enhancements = new StopwatchEnhancements(stopwatch);
    
    // Add keyboard shortcuts help
    const helpText = document.createElement('div');
    helpText.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 15px;
        border-radius: 8px;
        font-size: 0.8rem;
        opacity: 0.7;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;
    helpText.innerHTML = `
        <strong>Keyboard Shortcuts:</strong><br>
        Space: Start/Pause<br>
        R: Reset<br>
        L: Record Lap
    `;
    
    helpText.addEventListener('mouseenter', () => {
        helpText.style.opacity = '1';
    });
    
    helpText.addEventListener('mouseleave', () => {
        helpText.style.opacity = '0.7';
    });
    
    document.body.appendChild(helpText);
    
    // Console welcome message
    console.log(`
    🏁 Stopwatch App Initialized!
    
    Keyboard Shortcuts:
    • Space: Start/Pause
    • R: Reset
    • L: Record Lap
    
    Features:
    ✅ Precise time tracking
    ✅ Lap time recording
    ✅ Responsive design
    ✅ Keyboard shortcuts
    ✅ Visual feedback
    `);
});