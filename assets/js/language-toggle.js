// Create a global object to expose translation functions
window.languageToggleTranslate = function(element) {
    // This will be defined later in the code
    // It's just a placeholder for now that will be filled when the DOM is loaded
};

// Global state management
window.languageToggleState = {
    isToggling: false,
    preservedCounters: {},
    translationCache: {}
};

document.addEventListener("DOMContentLoaded", function() {
    // Default language is English (en)
    const defaultLang = 'en';
    
    // Get the current language from localStorage or use the default
    let currentLang = localStorage.getItem('selectedLanguage') || defaultLang;
    
    // Arabic numeral conversion map
    const arabicNumerals = {
        '0': '٠',
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩'
    };
    
    /**
     * Convert Western numerals to Arabic numerals with enhanced protection
     * @param {string} str - String containing Western numerals
     * @param {HTMLElement} element - The element being processed (optional)
     * @returns {string} - String with Arabic numerals (or original if protected)
     */
    function convertToArabicNumerals(str, element = null) {
        if (typeof str !== 'string') {
            str = String(str);
        }
        
        // Enhanced protection for phone numbers, emails, and specific content
        if (element && isProtectedFromTranslation(element)) {
            return str;
        }
        
        // Protect phone number patterns
        if (/^[\+]?[0-9\-\(\)\s]+$/.test(str.trim()) || 
            /^[0-9]{10,15}$/.test(str.replace(/[\-\(\)\s]/g, ''))) {
            return str;
        }
        
        // Protect email patterns
        if (/@/.test(str) || /\.(com|org|net|gov|edu)/.test(str)) {
            return str;
        }
        
        return str.replace(/[0-9]/g, match => arabicNumerals[match]);
    }
    
    /**
     * Check if an element should be protected from numeral translation
     * @param {HTMLElement} element - The element to check
     * @returns {boolean} - True if should be protected
     */
    function isProtectedFromTranslation(element) {
        if (!element) return false;
        
        // Check for explicit protection attributes/classes
        if (element.hasAttribute('data-no-arabic-numerals') ||
            element.classList.contains('keep-western-numerals') ||
            element.classList.contains('latin-font') ||
            element.classList.contains('english-content')) {
            return true;
        }
        
        // Check for phone/email related attributes and content
        const protectedSelectors = [
            '[href^="tel:"]',
            '[href^="mailto:"]',
            '[data-i18n*="phone"]',
            '[data-i18n*="email"]',
            '[data-i18n*="Phone"]',
            '[data-i18n*="Email"]'
        ];
        
        for (let selector of protectedSelectors) {
            if (element.matches(selector) || element.closest(selector)) {
                return true;
            }
        }
        
        return false;
    }
    
    // Set initial language
    setLanguage(currentLang);
    
    // Find all language toggle containers (they will be added to each page)
    const langToggleBtns = document.querySelectorAll('.lang-toggle');
    
    // Add click event listener to individual language items
    langToggleBtns.forEach(container => {
        const langItems = container.querySelectorAll('.lang-item');
        
        langItems.forEach(item => {
            item.addEventListener('click', function() {
                // Prevent rapid clicking
                if (window.languageToggleState.isToggling) return;
                
                const targetLang = this.getAttribute('data-lang');
                
                // Only toggle if clicking on a different language
                if (targetLang !== currentLang) {
                    setLanguage(targetLang);
                    currentLang = targetLang;
                }
            });
        });
        
        // Set initial active state
        updateLanguageState(container, currentLang);
    });
    
    /**
     * Set the language for the page with smooth transitions and counter preservation
     * @param {string} lang - The language code ('ar' or 'en')
     */
    function setLanguage(lang) {
        // Set toggling state
        window.languageToggleState.isToggling = true;
        
        // Dispatch beforeLanguageToggle event for main.js integration
        window.dispatchEvent(new CustomEvent('beforeLanguageToggle', { detail: { lang } }));
        
        // Preserve counter values before language switch
        preserveCountersBeforeToggle();
        
        // Store the selected language in localStorage
        localStorage.setItem('selectedLanguage', lang);
        
        // Set the HTML dir attribute for RTL/LTR support with faster, smoother transition
        document.body.style.transition = 'all 0.15s ease-out';
        document.documentElement.style.transition = 'all 0.15s ease-out';
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);
        
        // Handle CSS file switching
        toggleStylesheets(lang);
        
        // Update all language toggle states
        const langToggleBtns = document.querySelectorAll('.lang-toggle');
        langToggleBtns.forEach(container => {
            updateLanguageState(container, lang);
        });
        
        // Get the current page path to determine which translations to load
        const pagePath = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
        
        // Map page names to translation folders
        const translationMap = {
            '404': '404',
            'about': 'About',
            'coming-soon': 'Coming Soon',
            'contact': 'Contact',
            'new-contact': 'Contact',
            'faqs': 'FAQs',
            'index': 'Home',
            'index-4': 'Home',
            'services': 'Our Services'
        };
        
        // Determine the translation folder to use
        const translationFolder = translationMap[pagePath] || 'Home';
        
        // Load translations
        loadTranslations(translationFolder, lang);
    }
    
    /**
     * Toggle between main.css (LTR) and language-toggle.css (RTL) stylesheets
     * @param {string} lang - The language code ('ar' or 'en')
     */
    function toggleStylesheets(lang) {
        // Get the main.css and language-toggle.css link elements
        const mainStylesheet = document.querySelector('link[href*="main.css"]');
        const rtlStylesheet = document.querySelector('link[href*="language-toggle.css"]');
        
        if (lang === 'ar') {
            // For Arabic (RTL), enable language-toggle.css and disable main.css
            if (mainStylesheet) mainStylesheet.disabled = true;
            if (rtlStylesheet) rtlStylesheet.disabled = false;
        } else {
            // For English (LTR), enable main.css and disable language-toggle.css
            if (mainStylesheet) mainStylesheet.disabled = false;
            if (rtlStylesheet) rtlStylesheet.disabled = true;
        }
    }
    
    /**
     * Update the active state of the language toggle
     * @param {HTMLElement} container - The language toggle container
     * @param {string} lang - The current language code
     */
    function updateLanguageState(container, lang) {
        const langItems = container.querySelectorAll('.lang-item');
        
        langItems.forEach(item => {
            const itemLang = item.getAttribute('data-lang');
            if (itemLang === lang) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    /**
     * Preserve counter values before language toggle
     */
    function preserveCountersBeforeToggle() {
        // Use main.js counter preservation if available
        if (typeof window.preserveCounterValues === 'function') {
            window.preserveCounterValues();
        }
        if (typeof window.preserveGSAPCounters === 'function') {
            window.preserveGSAPCounters();
        }
        
        // Backup counter values in our own system as well
        document.querySelectorAll('.counter').forEach((counter, index) => {
            const counterId = counter.getAttribute('data-counter-id') || `counter-${index}`;
            const currentValue = parseInt(counter.textContent) || 0;
            window.languageToggleState.preservedCounters[counterId] = {
                element: counter,
                value: currentValue,
                originalText: counter.textContent
            };
        });
    }
    
    /**
     * Restore counter values after language toggle
     */
    function restoreCountersAfterToggle() {
        // Use main.js counter restoration if available
        if (typeof window.restoreCounterValues === 'function') {
            window.restoreCounterValues();
        }
        if (typeof window.restoreGSAPCounters === 'function') {
            window.restoreGSAPCounters();
        }
        
        // Restore from our backup system
        Object.keys(window.languageToggleState.preservedCounters).forEach(counterId => {
            const counterData = window.languageToggleState.preservedCounters[counterId];
            if (counterData.element && counterData.element.parentNode) {
                const finalValue = currentLang === 'ar' ? 
                    convertToArabicNumerals(counterData.value.toString(), counterData.element) : 
                    counterData.value.toString();
                counterData.element.textContent = finalValue;
            }
        });
        
        // Clear the backup
        window.languageToggleState.preservedCounters = {};
    }
    
    /**
     * Load translations for a specific page and language with optimizations
     * @param {string} page - The page/section name
     * @param {string} lang - The language code
     */
    function loadTranslations(page, lang) {
        // Check cache first for better performance
        const cacheKey = `${page}_${lang}`;
        if (window.languageToggleState.translationCache[cacheKey]) {
            processTranslations(window.languageToggleState.translationCache[cacheKey]);
            return;
        }
        
        // Fetch the appropriate translation file
        fetch(`assets/translations/${page}/${lang}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load translations: ${response.status}`);
                }
                return response.json();
            })
            .then(translations => {
                // Cache the translations
                window.languageToggleState.translationCache[cacheKey] = translations;
                processTranslations(translations);
            })
            .catch(error => {
                console.error(`Error loading translations:`, error);
                // Reset toggling state on error
                window.languageToggleState.isToggling = false;
            });
    }
    
    /**
     * Process loaded translations with counter preservation
     * @param {Object} translations - The translation data
     */
    function processTranslations(translations) {
        // Store the translations globally so they can be used by other scripts
        window.currentTranslations = translations;
        
        // Apply translations to elements with data-i18n attribute
        applyTranslations(translations);
        
        // Restore counter values after translation
        setTimeout(() => {
            restoreCountersAfterToggle();
            
            // Dispatch afterLanguageToggle event for main.js integration
            window.dispatchEvent(new CustomEvent('afterLanguageToggle', { detail: { lang: currentLang } }));
            
            // Reset toggling state after a shorter delay for faster response
            window.languageToggleState.isToggling = false;
        }, 100);
        
        // Define the global translation function now that we have translations
        window.languageToggleTranslate = function(element) {
            if (element && element.hasAttribute('data-i18n') && window.currentTranslations) {
                const key = element.getAttribute('data-i18n');
                const translation = getNestedTranslation(window.currentTranslations, key);
                
                if (translation) {
                    let finalTranslation = translation;
                    
                    // Convert numbers to Arabic if needed with enhanced protection
                    if (currentLang === 'ar' && !isProtectedFromTranslation(element) &&
                        typeof finalTranslation === 'string' && /[0-9]/.test(finalTranslation)) {
                        finalTranslation = convertToArabicNumerals(finalTranslation, element);
                    }
                    
                    // Update data attributes if present
                    if (element.hasAttribute('data-back') && element.hasAttribute('data-front')) {
                        element.setAttribute('data-back', finalTranslation);
                        element.setAttribute('data-front', finalTranslation);
                    } 
                    // Otherwise update text content
                    else {
                        element.textContent = finalTranslation;
                    }
                }
            }
        };
    }
    
    /**
     * Apply translations to elements with data-i18n attribute with enhanced protection
     * @param {Object} translations - The translation data
     * @param {string} prefix - Optional prefix for nested objects
     */
    function applyTranslations(translations, prefix = '') {
        // Get all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        
        // Process all numeric content elements when in Arabic mode (with protection)
        if (currentLang === 'ar') {
            // Convert numbers in the page to Arabic numerals with protection
            const textNodes = [];
            const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
            let node;
            
            while (node = walk.nextNode()) {
                // Skip scripts, style elements, and protected elements
                if (node.parentNode.tagName === 'SCRIPT' || 
                    node.parentNode.tagName === 'STYLE' ||
                    isProtectedFromTranslation(node.parentNode)) continue;
                
                const text = node.nodeValue;
                // Only process nodes that contain numbers and are not counters
                if (/[0-9]/.test(text) && !node.parentNode.classList.contains('counter')) {
                    textNodes.push(node);
                }
            }
            
            // Apply Arabic numerals to found text nodes with protection
            textNodes.forEach(node => {
                if (!isProtectedFromTranslation(node.parentNode)) {
                    const convertedText = convertToArabicNumerals(node.nodeValue, node.parentNode);
                    // Only update if the text actually changed (to avoid unnecessary DOM updates)
                    if (convertedText !== node.nodeValue) {
                        node.nodeValue = convertedText;
                    }
                }
            });
        }
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getNestedTranslation(translations, key);
            
            if (translation) {
                let finalTranslation = translation;
                
                // Convert any numbers in the translation to Arabic numerals if in Arabic mode
                // Use the enhanced protection system
                if (currentLang === 'ar' && !isProtectedFromTranslation(element) && 
                    typeof finalTranslation === 'string' && /[0-9]/.test(finalTranslation)) {
                    finalTranslation = convertToArabicNumerals(finalTranslation, element);
                }
                
                // If the element has data-back and data-front attributes (for special buttons)
                if (element.hasAttribute('data-back') && element.hasAttribute('data-front')) {
                    element.setAttribute('data-back', finalTranslation);
                    element.setAttribute('data-front', finalTranslation);
                } 
                // For normal elements (skip counters as they're handled separately)
                else if (!element.classList.contains('counter')) {
                    element.textContent = finalTranslation;
                }
            }
        });
    }
    
    /**
     * Get a nested translation value using a dot notation key
     * @param {Object} obj - The translations object
     * @param {string} path - The dot notation key path
     * @returns {string|null} The translation or null if not found
     */
    function getNestedTranslation(obj, path) {
        if (!path) return null;
        
        const keys = path.split('.');
        let result = obj;
        
        for (const key of keys) {
            if (result && typeof result === 'object' && key in result) {
                result = result[key];
            } else {
                return null;
            }
        }
        
        // Handle array items in translations (like services.0, services.1)
        if (typeof result === 'object' && !Array.isArray(result)) {
            return result;
        }
        
        return result;
    }
    
    // Add preloader state persistence for language
    const originalPreloaderHide = window.hidePreloader;
    if (typeof originalPreloaderHide === 'function') {
        window.hidePreloader = function() {
            originalPreloaderHide();
            // Re-apply language after preloader is hidden
            setLanguage(currentLang);
        };
    }
});

