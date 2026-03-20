// ===== BUTTON CLICK SOUND EFFECTS =====

// Create audio element for click sound (using a soft UI click from CDN)
const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');

// Configure audio settings
clickSound.volume = 0.3; // Low volume (30%)
clickSound.preload = 'auto'; // Preload for instant playback

// Function to play click sound
function playClickSound() {
    // Clone the audio to allow rapid successive plays
    const soundClone = clickSound.cloneNode();
    soundClone.volume = 0.3;
    
    // Play the sound
    soundClone.play().catch(error => {
        // Silently handle autoplay policy errors
        console.log('Audio play prevented by browser policy');
    });
}

// Initialize button sound effects after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Select all buttons with .btn class
    const buttons = document.querySelectorAll('.btn');
    
    // Add click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Play sound on click
            playClickSound();
            
            // Optional: Add visual feedback (if not already present)
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
        
        // Optional: Add hover sound effect (very subtle)
        button.addEventListener('mouseenter', function() {
            // Uncomment below if you want hover sounds too
            // playHoverSound();
        });
    });
    
    // Optional: Add hover sound function (commented out by default)
    /*
    function playHoverSound() {
        const hoverSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
        hoverSound.volume = 0.15; // Very low volume for hover
        hoverSound.play().catch(() => {});
    }
    */
});
