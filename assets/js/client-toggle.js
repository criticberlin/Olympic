/**
 * Client toggle functionality
 * This script handles the toggling of the previous clients section
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get the toggle button and previous clients section
    const toggleButton = document.getElementById('toggle-clients');
    const previousClientsSection = document.getElementById('previous-clients');
    
    // Only proceed if both elements are found
    if (toggleButton && previousClientsSection) {
        // Set initial height for animation
        let sectionHeight = 0;
        
        // Function to toggle the previous clients section
        function togglePreviousClients() {
            const isHidden = !previousClientsSection.classList.contains('visible');
            
            // Toggle visibility
            if (isHidden) {
                // Show section
                previousClientsSection.style.display = 'grid'; // Changed to grid for our layout
                previousClientsSection.classList.add('visible');
                
                // Ensure all logos are properly positioned
                setupLogos();
                
                // Measure the height each time to ensure all logos display properly
                sectionHeight = previousClientsSection.scrollHeight;
                
                // Set max-height for animation
                previousClientsSection.style.maxHeight = sectionHeight + 'px';
                
                // Update button text and icon
                updateButtonState(true);
                
                // Scroll to the previous clients section with smooth animation
                setTimeout(() => {
                    // Calculate the position to scroll to - slightly above the section
                    const sectionRect = previousClientsSection.getBoundingClientRect();
                    const offsetPosition = window.pageYOffset + sectionRect.top - 100; // 100px offset for better visibility
                    
                    // Scroll with animation
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Removed highlight effect as requested
                }, 200);
            } else {
                // Hide section
                previousClientsSection.style.maxHeight = '0';
                previousClientsSection.classList.remove('visible');
                
                // Wait for animation to complete before hiding
                setTimeout(() => {
                    if (!previousClientsSection.classList.contains('visible')) {
                        previousClientsSection.style.display = 'none';
                    }
                }, 300);
                
                // Update button text and icon
                updateButtonState(false);
            }
        }
        
        // Function to update button state
        function updateButtonState(isExpanded) {
            const icon = toggleButton.querySelector('i');
            const textElement = toggleButton.querySelector('.text');
            
            if (icon) {
                // Toggle icon class
                icon.classList.toggle('fa-angle-down', !isExpanded);
                icon.classList.toggle('fa-angle-up', isExpanded);
                
                // Add animation class
                icon.classList.add('toggle-rotate');
                icon.classList.toggle('rotated', isExpanded);
            }
            
            if (textElement) {
                const currentLang = document.documentElement.getAttribute('lang') || 'en';
                const newText = isExpanded ? 'Hide Previous Partners' : 'View Previous Partners';
                
                // Update text content - removed duplicate data attributes
                
                // If there's a data-i18n attribute, update translations as well
                if (textElement.hasAttribute('data-i18n')) {
                    // Get the base i18n path and update it
                    const i18nPath = textElement.getAttribute('data-i18n');
                    // We'll use the partners.viewAll or partners.hidePrevious key based on state
                    const newKey = isExpanded ? 'partners.hidePrevious' : 'partners.viewAll';
                    textElement.setAttribute('data-i18n', newKey);
                    
                    // Re-translate using the language-toggle.js mechanism if available
                    if (window.languageToggleTranslate) {
                        window.languageToggleTranslate(textElement);
                    }
                }
            }
        }
        
        // Function to ensure all logos display correctly
        function setupLogos() {
            // Fix all logos in the hidden section
            const allLogos = previousClientsSection.querySelectorAll('.fx-client-6-logo');
            allLogos.forEach(logo => {
                // Ensure proper borders and margins
                logo.style.border = '1px solid #F2F2F2';
                logo.style.margin = '0';
                
                // Ensure consistent image size
                const img = logo.querySelector('img');
                if (img) {
                    img.style.maxWidth = '60%';
                    img.style.maxHeight = '60%';
                }
                
                // Add hover event listeners to ensure hover effects work
                logo.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                    this.style.borderColor = '#000';
                    this.style.zIndex = '2';
                    this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                    if (img) img.style.opacity = '1';
                });
                
                logo.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                    this.style.borderColor = '#F2F2F2';
                    this.style.zIndex = '1';
                    this.style.boxShadow = 'none';
                    if (img) img.style.opacity = '0.5';
                });
            });
            
            const lastLogo = previousClientsSection.querySelector('.last-logo');
            if (lastLogo) {
                // Make sure the last logo is centered in its row
                if (window.innerWidth > 767) {
                    lastLogo.style.gridColumn = '2 / 4';
                } else {
                    lastLogo.style.gridColumn = '1 / 3';
                }
                
                // Make sure the last logo is visible and properly styled
                lastLogo.style.display = 'flex';
                lastLogo.style.border = '1px solid #F2F2F2';
                lastLogo.style.height = '160px';
                
                // Ensure the image size is consistent
                const lastImg = lastLogo.querySelector('img');
                if (lastImg) {
                    lastImg.style.maxWidth = '60%';
                    lastImg.style.maxHeight = '60%';
                    lastImg.style.opacity = '0.5';
                }
                
                // Add specific hover effect for the last logo
                lastLogo.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                    this.style.borderColor = '#000';
                    this.style.zIndex = '2';
                    this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                    if (lastImg) lastImg.style.opacity = '1';
                });
                
                lastLogo.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                    this.style.borderColor = '#F2F2F2';
                    this.style.zIndex = '1';
                    this.style.boxShadow = 'none';
                    if (lastImg) lastImg.style.opacity = '0.5';
                });
                
                // Special handling for mobile view to ensure 15th logo is visible
                if (window.innerWidth <= 767) {
                    lastLogo.style.display = 'flex';
                    lastLogo.style.width = '100%';
                    lastLogo.style.gridColumn = '1 / 3';
                    lastLogo.style.margin = '0 auto';
                }
            }
        }
        
        // Add click event listener to the toggle button
        toggleButton.addEventListener('click', togglePreviousClients);
        
        // Set initial state - ensure section starts hidden
        previousClientsSection.style.display = 'none';
        previousClientsSection.style.maxHeight = '0';
        
        // Call setupLogos when the hidden section becomes visible
        previousClientsSection.addEventListener('transitionstart', setupLogos);
        
        // Also set up all logos when the window loads
        window.addEventListener('load', setupLogos);
        // Also adjust on window resize
        window.addEventListener('resize', setupLogos);
    }
});
