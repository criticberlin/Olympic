/**
 * RTL Animation Fixes for Olympic Website
 * Handles dynamic RTL/LTR adjustments for Swiper carousels and other animations
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Function to initialize RTL-aware Swiper carousels
    function initializeRTLCarousels() {
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        
        // Client slider RTL configuration
        if (document.querySelector('.fx-c1-active')) {
            const clientSlider = document.querySelector('.fx-c1-active');
            if (clientSlider && clientSlider.swiper) {
                // Update existing Swiper instance for RTL
                clientSlider.swiper.changeLanguageDirection(isRTL ? 'rtl' : 'ltr');
                clientSlider.swiper.update();
            }
        }
        
        // Services slider RTL configuration
        if (document.querySelector('.fx-services-1-active')) {
            const servicesSlider = document.querySelector('.fx-services-1-active');
            if (servicesSlider && servicesSlider.swiper) {
                servicesSlider.swiper.changeLanguageDirection(isRTL ? 'rtl' : 'ltr');
                servicesSlider.swiper.update();
            }
        }
        
        // Services slider fx-s3-active RTL configuration (used in index.html)
        if (document.querySelector('.fx-s3-active')) {
            const servicesS3Slider = document.querySelector('.fx-s3-active');
            if (servicesS3Slider && servicesS3Slider.swiper) {
                // Destroy current slider and reinitialize with correct RTL setting
                servicesS3Slider.swiper.destroy(true, true);
                
                // Reinitialize using the global function
                setTimeout(() => {
                    if (typeof window.initServicesSlider === 'function') {
                        window.initServicesSlider();
                    }
                }, 100);
            }
        }
        
        // Serve slider RTL configuration
        if (document.querySelector('.fx-serve-1-active')) {
            const serveSlider = document.querySelector('.fx-serve-1-active');
            if (serveSlider && serveSlider.swiper) {
                serveSlider.swiper.changeLanguageDirection(isRTL ? 'rtl' : 'ltr');
                serveSlider.swiper.update();
            }
        }
    }
    
    // Function to fix client section gap and loop animation issues
    function fixClientSectionGap() {
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        
        // Fix client slider loop animation issues (both LTR and RTL)
        const clientSliders = document.querySelectorAll('.fx-c1-active');
        
        clientSliders.forEach(slider => {
            if (slider.swiper) {
                // Enhanced fix for loop transitions using class-based approach
                slider.swiper.on('beforeLoopFix', function() {
                    this.el.classList.add('swiper-transitioning');
                });
                
                slider.swiper.on('afterLoopFix', function() {
                    setTimeout(() => {
                        this.el.classList.remove('swiper-transitioning');
                    }, 100);
                });
                
                slider.swiper.on('slideChangeTransitionStart', function() {
                    this.el.classList.add('swiper-transitioning');
                });
                
                slider.swiper.on('slideChangeTransitionEnd', function() {
                    setTimeout(() => {
                        this.el.classList.remove('swiper-transitioning');
                    }, 50);
                });
                
                // Fix loop initialization issues
                slider.swiper.on('init', function() {
                    setTimeout(() => {
                        this.update();
                        this.updateSize();
                        this.updateSlides();
                    }, 100);
                });
                
                // Fix RTL specific issues
                if (isRTL) {
                    slider.swiper.changeLanguageDirection('rtl');
                    slider.swiper.update();
                }
            }
        });

        // Fix client logo wrapper styling
        const clientWrappers = document.querySelectorAll('.fx-client-1-slider .swiper-wrapper');
        
        clientWrappers.forEach(wrapper => {
            // Remove any empty space and ensure proper alignment
            wrapper.style.justifyContent = 'flex-start';
            wrapper.style.alignItems = 'center';
            
            // Ensure smooth transitions for all slides
            const slides = wrapper.querySelectorAll('.swiper-slide');
            slides.forEach(slide => {
                slide.style.display = 'flex';
                slide.style.justifyContent = 'center';
                slide.style.alignItems = 'center';
                slide.style.transition = 'all 0.5s ease';
            });
        });
    }
    
    // Function to fix pagination jumping animation
    function fixPaginationJumping() {
        const paginationElements = document.querySelectorAll('.swiper-pagination-fraction');
        
        paginationElements.forEach(pagination => {
            // Prevent jumping by maintaining consistent direction
            pagination.style.direction = 'ltr';
            pagination.style.unicodeBidi = 'bidi-override';
            
            // Add transition for smooth changes
            pagination.style.transition = 'all 0.3s ease';
        });
    }
    
    // Function to fix services section loop gap
    function fixServicesLoopGap() {
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        
        // Fix services section (fx-serve-1-active) in index.html
        const servicesSliders = document.querySelectorAll('.fx-serve-1-active');
        
        // Also fix services section (fx-s3-active) used in services carousel
        const servicesS3Sliders = document.querySelectorAll('.fx-s3-active');
        
        servicesSliders.forEach(slider => {
            if (slider.swiper) {
                if (isRTL) {
                    // Fix RTL direction and remove empty space before first card
                    slider.swiper.changeLanguageDirection('rtl');
                    
                    // Fix wrapper alignment to prevent empty space
                    const wrapper = slider.querySelector('.swiper-wrapper');
                    if (wrapper) {
                        wrapper.style.justifyContent = 'flex-start';
                        wrapper.style.transform = 'translate3d(0, 0, 0)';
                    }
                    
                    // Fix individual slides
                    const slides = slider.querySelectorAll('.swiper-slide');
                    slides.forEach((slide, index) => {
                        slide.style.marginLeft = '0';
                        slide.style.marginRight = '0';
                        if (index === 0) {
                            slide.style.marginRight = '0';
                        }
                    });
                    
                    // Update the swiper instance
                    slider.swiper.update();
                }
                
                // Fix loop transition issues for both LTR and RTL
                slider.swiper.on('slideChangeTransitionStart', function() {
                    const wrapper = this.wrapperEl;
                    if (wrapper && isRTL) {
                        wrapper.style.transform = wrapper.style.transform.replace(/translateX\([^)]*\)/, 
                            match => {
                                const value = parseFloat(match.replace(/[^\-\d.]/g, ''));
                                return `translateX(${value}px)`;
                            }
                        );
                    }
                });
            }
        });

        // Apply minimal fixes to fx-s3-active sliders (let Swiper handle RTL naturally)
        servicesS3Sliders.forEach(slider => {
            if (slider.swiper) {
                // Just ensure the slider is updated, no manual overrides
                slider.swiper.update();
            }
        });

        // Also fix fx-services-1-active sliders
        const servicesSliders2 = document.querySelectorAll('.fx-services-1-active');
        
        servicesSliders2.forEach(slider => {
            if (slider.swiper && isRTL) {
                slider.swiper.changeLanguageDirection('rtl');
                slider.swiper.update();
                
                // Remove gaps
                const wrapper = slider.querySelector('.swiper-wrapper');
                if (wrapper) {
                    wrapper.style.justifyContent = 'flex-start';
                }
            }
        });
    }
    
    // Function to fix project navigation green line alignment
    function fixProjectNavigationAlignment() {
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        
        if (isRTL) {
            // Fix project slider navigation buttons alignment
            const navButtons = document.querySelectorAll('.fx-slider-btn-2-item');
            
            navButtons.forEach(button => {
                // Add RTL-specific class for styling
                button.classList.add('rtl-nav-button');
            });
            
            // Fix project sliders direction
            const projectSliders = document.querySelectorAll('.fx-p2-active');
            
            projectSliders.forEach(slider => {
                if (slider.swiper) {
                    slider.swiper.changeLanguageDirection('rtl');
                    slider.swiper.update();
                }
            });
            
            // Fix scrollbar direction
            const scrollbars = document.querySelectorAll('.fx-p2-scrollbar');
            scrollbars.forEach(scrollbar => {
                scrollbar.style.direction = 'rtl';
            });
        }
    }
    
    // Function to ensure animation consistency
    function ensureAnimationConsistency() {
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        
        // Fix WOW animations for RTL
        if (typeof WOW !== 'undefined') {
            const wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: true,
                live: true
            });
            
            // Override animations for RTL
            if (isRTL) {
                document.querySelectorAll('.wow.fadeInLeft').forEach(el => {
                    el.classList.remove('fadeInLeft');
                    el.classList.add('fadeInRight');
                });
                
                document.querySelectorAll('.wow.fadeInRight').forEach(el => {
                    el.classList.remove('fadeInRight');
                    el.classList.add('fadeInLeft');
                });
                
                document.querySelectorAll('.wow.slideInLeft').forEach(el => {
                    el.classList.remove('slideInLeft');
                    el.classList.add('slideInRight');
                });
                
                document.querySelectorAll('.wow.slideInRight').forEach(el => {
                    el.classList.remove('slideInRight');
                    el.classList.add('slideInLeft');
                });
            }
            
            wow.init();
        }
        
        // Fix GSAP animations for RTL
        if (typeof gsap !== 'undefined') {
            const rtlElements = document.querySelectorAll('[data-rtl-animation]');
            rtlElements.forEach(element => {
                const animationType = element.dataset.rtlAnimation;
                
                if (isRTL) {
                    switch (animationType) {
                        case 'slideLeft':
                            gsap.from(element, { x: 100, opacity: 0, duration: 1 });
                            break;
                        case 'slideRight':
                            gsap.from(element, { x: -100, opacity: 0, duration: 1 });
                            break;
                    }
                } else {
                    switch (animationType) {
                        case 'slideLeft':
                            gsap.from(element, { x: -100, opacity: 0, duration: 1 });
                            break;
                        case 'slideRight':
                            gsap.from(element, { x: 100, opacity: 0, duration: 1 });
                            break;
                    }
                }
            });
        }
    }
    
    // Function to handle language toggle events
    function handleLanguageToggle() {
        // Listen for language change events from language-toggle.js
        document.addEventListener('languageChanged', function(event) {
            const isRTL = event.detail.direction === 'rtl';
            
            // Re-initialize all RTL fixes after language change
            setTimeout(() => {
                initializeRTLCarousels();
                fixClientSectionGap();
                fixPaginationJumping();
                fixServicesLoopGap();
                fixProjectNavigationAlignment();
                ensureAnimationConsistency();
                
                // Reinitialize services slider for perfect RTL transition
                if (typeof window.initServicesSlider === 'function') {
                    const servicesSlider = document.querySelector('.fx-s3-active');
                    if (servicesSlider && servicesSlider.swiper) {
                        servicesSlider.swiper.destroy(true, true);
                        setTimeout(() => {
                            window.initServicesSlider();
                        }, 50);
                    }
                }
            }, 300); // Small delay to ensure DOM updates are complete
        });
    }
    
    // Initialize RTL observer
    function initializeRTLObserver() {
        // Watch for dir attribute changes on html element
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
                    const isRTL = mutation.target.getAttribute('dir') === 'rtl';
                    
                    // Apply all fixes when direction changes
                    setTimeout(() => {
                        initializeRTLCarousels();
                        fixClientSectionGap();
                        fixPaginationJumping();
                        fixServicesLoopGap();
                        fixProjectNavigationAlignment();
                        ensureAnimationConsistency();
                        
                        // Reinitialize services slider for perfect RTL transition
                        if (typeof window.initServicesSlider === 'function') {
                            const servicesSlider = document.querySelector('.fx-s3-active');
                            if (servicesSlider && servicesSlider.swiper) {
                                servicesSlider.swiper.destroy(true, true);
                                setTimeout(() => {
                                    window.initServicesSlider();
                                }, 50);
                            }
                        }
                    }, 100);
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['dir']
        });
    }
    
    // Main initialization function
    function initRTLAnimationFixes() {
        // Wait for other scripts to load
        setTimeout(() => {
            initializeRTLCarousels();
            fixClientSectionGap();
            fixPaginationJumping();
            fixServicesLoopGap();
            fixProjectNavigationAlignment();
            ensureAnimationConsistency();
            handleLanguageToggle();
            initializeRTLObserver();
        }, 500);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRTLAnimationFixes);
    } else {
        initRTLAnimationFixes();
    }
    
    // Also initialize when window loads (for Swiper instances)
    window.addEventListener('load', function() {
        setTimeout(() => {
            initializeRTLCarousels();
            fixClientSectionGap();
            fixServicesLoopGap();
            fixProjectNavigationAlignment();
            ensureAnimationConsistency();
            
            // Ensure services slider is properly initialized with RTL if needed
            if (typeof window.initServicesSlider === 'function') {
                const servicesSlider = document.querySelector('.fx-s3-active');
                if (servicesSlider && !servicesSlider.swiper) {
                    window.initServicesSlider();
                }
            }
        }, 1000);
    });
    
    // Handle resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const swipers = document.querySelectorAll('.swiper');
            swipers.forEach(swiper => {
                if (swiper.swiper) {
                    swiper.swiper.update();
                }
            });
        }, 250);
    });
    
});

// Utility functions for external use
window.RTLAnimationFixes = {
    // Function to manually trigger RTL fixes
    refresh: function() {
        const event = new CustomEvent('languageChanged', {
            detail: { direction: document.documentElement.getAttribute('dir') }
        });
        document.dispatchEvent(event);
    },
    
    // Function to check if current direction is RTL
    isRTL: function() {
        return document.documentElement.getAttribute('dir') === 'rtl';
    },
    
    // Function to fix specific carousel
    fixCarousel: function(selector) {
        const carousel = document.querySelector(selector);
        if (carousel && carousel.swiper) {
            carousel.swiper.changeLanguageDirection(this.isRTL() ? 'rtl' : 'ltr');
            carousel.swiper.update();
        }
    }
};
