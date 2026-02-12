// Simple loader script to remove splash screen when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Hide splash screen when content is loaded
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        splashScreen.style.display = 'none';
    }
});

// Fallback: remove splash screen after a timeout
setTimeout(function() {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        splashScreen.style.display = 'none';
    }
}, 5000);