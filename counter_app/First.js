// Stopwatch application
class Stopwatch {
    constructor() {
        // State
        this.currentTime = 0;      // elapsed seconds
        this.intervalId = null;
        this.isRunning = false;

        // DOM elements
        this.display = document.getElementById('digits');
        this.startBtn = document.getElementById('increase-btn');
        this.stopBtn = document.getElementById('decrease-btn');
        this.resetBtn = document.getElementById('save-btn');   // repurposed as Reset
        this.customInput = document.getElementById('custom-increment');
        this.customAddBtn = document.getElementById('custom-add');
        this.resetCounterBtn = document.getElementById('reset-btn');   // also Reset
        this.clearHistoryBtn = document.getElementById('clear-history-btn');

        // Custom increment default
        this.increment = parseFloat(this.customInput.value) || 1;

        this.init();
        this.updateDisplay();
    }

    init() {
        // Attach event listeners
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.resetCounterBtn.addEventListener('click', () => this.reset());

        // Update increment when the input changes
        this.customInput.addEventListener('input', () => {
            this.increment = parseFloat(this.customInput.value) || 0;
        });

        // Optional: the "Add" button can also set the increment
        this.customAddBtn.addEventListener('click', () => {
            this.increment = parseFloat(this.customInput.value) || 0;
            // Provide feedback (optional)
            this.showMessage(`Increment set to ${this.increment} second(s)`);
        });

        // Hide or disable the history section (we'll remove it from the UI later)
        if (this.clearHistoryBtn) {
            this.clearHistoryBtn.style.display = 'none';
        }
        const historySection = document.querySelector('.history-section');
        if (historySection) {
            historySection.style.display = 'none';
        }
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.currentTime += this.increment;
            this.updateDisplay();
        }, 1000);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
    }

    reset() {
        this.stop();
        this.currentTime = 0;
        this.updateDisplay();
    }

    updateDisplay() {
        // Show one decimal place (e.g., 12.5 seconds)
        this.display.textContent = this.currentTime.toFixed(1);
    }

    showMessage(msg) {
        // Simple temporary notification
        const oldMsg = document.getElementById('temp-message');
        if (oldMsg) oldMsg.remove();
        const div = document.createElement('div');
        div.id = 'temp-message';
        div.textContent = msg;
        div.style.position = 'fixed';
        div.style.bottom = '20px';
        div.style.right = '20px';
        div.style.backgroundColor = '#28a745';
        div.style.color = 'white';
        div.style.padding = '10px 20px';
        div.style.borderRadius = '8px';
        div.style.zIndex = '1000';
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 2000);
    }
}

// Start the stopwatch when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Stopwatch();
});