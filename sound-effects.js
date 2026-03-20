// ===== BUTTON CLICK SOUND EFFECTS =====

// Sound effect manager
const SoundFX = {
    // Initialize with multiple sound options for variety
    sounds: [
        'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
        'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'
    ],
    
    // Preload all sounds
    init: function() {
        this.preloadedSounds = [];
        const self = this;
        
        this.sounds.forEach((url, index) => {
            const audio = new Audio(url);
            audio.volume = 0.4; // 40% volume - clear but not loud
            audio.preload = 'auto';
            
            // Force load the audio
            audio.load();
            
            this.preloadedSounds.push(audio);
        });
        
        console.log('🔊 Sound effects initialized');
    },
    
    // Play click sound with variation
    playClick: function() {
        try {
            // Use a random sound for variety
            const soundIndex = Math.floor(Math.random() * this.preloadedSounds.length);
            const soundToPlay = this.preloadedSounds[soundIndex].cloneNode();
            soundToPlay.volume = 0.4;
            
            // Ensure the sound can play
            soundToPlay.addEventListener('canplaythrough', () => {
                soundToPlay.play().catch(err => {
                    console.log('Sound play blocked:', err.message);
                });
            });
            
            // Fallback: try to play immediately
            setTimeout(() => {
                soundToPlay.play().catch(err => {
                    // Silent fail for browser policy
                });
            }, 10);
            
        } catch (error) {
            console.log('Sound error:', error.message);
        }
    }
};

// Initialize sounds immediately
SoundFX.init();

// Make sound available globally for testing
window.playTestSound = function() {
    SoundFX.playClick();
    console.log('Test sound played!');
};

// Add click sounds after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing button sounds...');
    
    // Select all buttons with .btn class
    const buttons = document.querySelectorAll('.btn');
    console.log('Found', buttons.length, 'buttons');
    
    // Add click event listener to each button
    buttons.forEach((button, index) => {
        console.log('Adding sound to button', index + 1);
        
        button.addEventListener('click', function(e) {
            console.log('Button clicked - playing sound');
            SoundFX.playClick();
            
            // Add visual feedback
            const originalTransform = this.style.transform;
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = originalTransform;
            }, 100);
        });
    });
    
    console.log('✅ Button sound effects ready!');
});
