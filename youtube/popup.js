document.addEventListener('DOMContentLoaded', () => {
    const speedButtons = document.querySelectorAll('.speed-btn');
    const customSpeedInput = document.getElementById('customSpeed');
    const setCustomSpeedBtn = document.getElementById('setCustomSpeed');
    const volumeInput = document.getElementById('volumeValue');
    const setVolumeBtn = document.getElementById('setVolume');
    const themeToggle = document.getElementById('theme-toggle');
    const skipButton = document.getElementById('skipButton');

    // --- Helper Function ---
    function executeScriptOnPage(func, args) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0] && tabs[0].id && tabs[0].url.includes("youtube.com/watch")) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: func,
                    args: args || []
                }).catch(err => console.error('Error executing script:', err));
            } else {
                console.log("Not a YouTube video page. Action aborted.");
            }
        });
    }

    // --- Speed Controls ---
    speedButtons.forEach(button => {
        button.addEventListener('click', () => {
            const speed = parseFloat(button.dataset.speed);
            const setSpeed = (newSpeed) => {
                const video = document.querySelector('video');
                if (video) video.playbackRate = newSpeed;
            };
            executeScriptOnPage(setSpeed, [speed]);
        });
    });

    setCustomSpeedBtn.addEventListener('click', () => {
        const speed = parseFloat(customSpeedInput.value);
        if (!isNaN(speed) && speed > 0) {
            const setSpeed = (newSpeed) => {
                const video = document.querySelector('video');
                if (video) video.playbackRate = newSpeed;
            };
            executeScriptOnPage(setSpeed, [speed]);
        }
    });
    
    customSpeedInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') setCustomSpeedBtn.click();
    });

    // --- Volume Control ---
    setVolumeBtn.addEventListener('click', () => {
        const volumeValue = parseFloat(volumeInput.value);
        if (isNaN(volumeValue)) return;

        // Convert the 1-100 scale to the required 0.0-1.0 scale
        const volumePercentage = volumeValue / 100;

        const setVolumeOnPage = (newVolume) => {
            const video = document.querySelector('video');
            if (video) {
                video.volume = Math.max(0, Math.min(1, newVolume));
            }
        };
        executeScriptOnPage(setVolumeOnPage, [volumePercentage]);
    });
    
    volumeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') setVolumeBtn.click();
    });

    // --- Skip Button ---
    skipButton.addEventListener('click', () => {
        const SKIP_SPEED = 5.0;
        const DURATION = 3000; // 3 seconds

        const performSkip = (speed, duration) => {
            const video = document.querySelector('video');
            if (video) {
                const originalSpeed = video.playbackRate;
                video.playbackRate = speed;

                setTimeout(() => {
                    if (video.playbackRate === speed) {
                        video.playbackRate = originalSpeed;
                    }
                }, duration);
            }
        };
        executeScriptOnPage(performSkip, [SKIP_SPEED, DURATION]);
    });

    // --- Theme Control ---
    themeToggle.addEventListener('change', (e) => {
        const theme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
    });
});
