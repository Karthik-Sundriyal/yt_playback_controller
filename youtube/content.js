// This script runs on YouTube pages to automatically handle ads.
console.log("YouTube Controller content script loaded. Ad skipper is active.");

// --- Global variable to store the user's original playback speed ---
let originalPlaybackRate = 1;

// --- Main function to handle ad detection and skipping ---
const initializeAdSkipper = () => {
    const video = document.querySelector('video');
    if (!video) {
        // If there's no video, we don't need to do anything.
        return;
    }

    // This observer will watch for changes in the YouTube player.
    const observer = new MutationObserver((mutations) => {
        // Look for the main ad container. YouTube often uses this class.
        const adContainer = document.querySelector('.video-ads.ytp-ad-module');
        
        // Check if the ad container is present and has child elements, indicating an ad is active.
        if (adContainer && adContainer.children.length > 0) {
            // --- An Ad is Active ---
            
            // Save the user's current speed if it hasn't been saved yet.
            if (video.playbackRate !== 16) {
                originalPlaybackRate = video.playbackRate;
            }

            // Mute the ad and speed it up to get through it quickly.
            video.muted = true;
            video.playbackRate = 16;

            // Look for a "Skip Ad" button using multiple common selectors.
            const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-skip-ad-button');
            if (skipButton) {
                // --- FIX for aria-hidden error ---
                // Before clicking, remove focus from the button. This prevents the
                // "Blocked aria-hidden on an element because its descendant retained focus" error.
                skipButton.blur();
                
                // Click the button to skip the ad.
                skipButton.click();
            }
        } else {
            // --- No Ad is Active ---
            // If the video speed was set to 16 (our ad speed), restore it.
            if (video.playbackRate === 16) {
                video.playbackRate = originalPlaybackRate;
                video.muted = false; // Unmute the video
            }
        }
    });

    // Start observing the main player container for changes.
    const player = document.querySelector('#movie_player');
    if (player) {
        observer.observe(player, {
            childList: true,
            subtree: true,
        });
    }
};

// --- Initial Run and Navigation Handling ---
// This section ensures the skipper works even when navigating between videos
// without a full page reload (which is how YouTube works).

// Run the skipper when the script is first injected.
setTimeout(initializeAdSkipper, 500);

// Watch for changes in the URL to detect navigation to a new video.
let lastUrl = location.href;
const navigationObserver = new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        // When the URL changes, wait a moment for the new page to load, then re-initialize.
        setTimeout(initializeAdSkipper, 500);
    }
});

// Start observing the entire document body for URL changes.
navigationObserver.observe(document.body, {
    childList: true,
    subtree: true,
});
