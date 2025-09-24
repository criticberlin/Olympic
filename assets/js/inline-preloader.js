// Preserve language state for preloader
let savedLanguage = localStorage.getItem('selectedLanguage') || 'ar';

// Set initial document direction based on saved language
document.documentElement.setAttribute('dir', savedLanguage === 'ar' ? 'rtl' : 'ltr');
document.documentElement.setAttribute('lang', savedLanguage);

// Original preloader animations and functions
const logoContainer = document.getElementById('logo-container');
const preloaderSvg = document.getElementById('loaderSvg');

// Add the Olympic logo to the preloader
const logoContent = `
    <!-- Green parts of logo with filter -->
    <path d="M-122,-50 L-92,-50 L-92,50 L-122,50 Z" fill="url(#pattern1)" filter="url(#greenGlow)" transform="translate(0, 0) rotate(0)"></path>
    <path d="M-62,-50 L-32,-50 L-32,50 L-62,50 Z" fill="url(#pattern2)" filter="url(#greenGlow)" transform="translate(0, 0) rotate(0)"></path>
    <path d="M-2,-50 L28,-50 L28,50 L-2,50 Z" fill="url(#pattern3)" filter="url(#greenGlow)" transform="translate(0, 0) rotate(0)"></path>
    
    <!-- Red flame parts with filter -->
    <path d="M58,-50 L88,-50 L88,50 L58,50 Z" fill="url(#pattern4)" filter="url(#redGlow)" transform="translate(0, 0) rotate(0)"></path>
    <path d="M118,-50 L148,-50 L148,50 L118,50 Z" fill="url(#pattern5)" filter="url(#redGlow)" transform="translate(0, 0) rotate(0)"></path>
    <path d="M178,-50 L208,-50 L208,50 L178,50 Z" fill="url(#pattern6)" filter="url(#redGlow)" transform="translate(0, 0) rotate(0)"></path>
`;

// Insert the logo content
if (logoContainer) {
    logoContainer.innerHTML = logoContent;
}

// Animation for the preloader
if (preloaderSvg) {
    // Add rotation animation to the logo container
    gsap.to('#logo-container', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear"
    });
    
    // Pulse animation for the glow effects
    gsap.to('#greenGlow feFlood', {
        attr: { 'flood-opacity': 0.8 },
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
    });
    
    gsap.to('#redGlow feFlood', {
        attr: { 'flood-opacity': 0.8 },
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 0.75
    });
}

// Function to hide preloader
function hidePreloader() {
    const preloader = document.querySelector('.preloader-svg');
    if (preloader) {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                preloader.style.display = 'none';
                // Reapply saved language after preloader is hidden
                if (window.setLanguage) {
                    window.setLanguage(savedLanguage);
                } else {
                    // If setLanguage function isn't available, set direction and language attributes
                    document.documentElement.setAttribute('dir', savedLanguage === 'ar' ? 'rtl' : 'ltr');
                    document.documentElement.setAttribute('lang', savedLanguage);
                }
            }
        });
    }
}

// Make hidePreloader globally available
window.hidePreloader = hidePreloader;

// Hide preloader when page is loaded
window.addEventListener('load', () => {
    // Short delay before hiding preloader
    setTimeout(hidePreloader, 1500);
});








