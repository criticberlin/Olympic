(function($) {
    "use strict";
    
    $(document).ready(function() {
        // Make sure the elements exist before proceeding
        if ($('.progress-wrap').length === 0) {
            return;
        }

        // Progress circle animation
        var progressPath = document.querySelector('.progress-wrap path');
        var pathLength = progressPath.getTotalLength();
        
        // Set up initial styles
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        
        // Update progress circle based on scroll
        var updateProgress = function() {
            // Calculate how much has been scrolled
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
            
            // Show or hide the progress circle based on scroll position
            if (scroll > 100) {
                $('.progress-wrap').addClass('active-progress');
            } else {
                $('.progress-wrap').removeClass('active-progress');
            }
            
            // Hide the default scroll top button when our new one is visible
            if ($('.scroll_top').length > 0 && scroll > 100) {
                $('.scroll_top').css('opacity', '0');
            } else if ($('.scroll_top').length > 0) {
                $('.scroll_top').css('opacity', '1');
            }
        };
        
        updateProgress();
        $(window).scroll(updateProgress);
        
        // Handle click event
        $('.progress-wrap').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
        
        // Handle special cases for dark/light backgrounds
        // Detect if we're on a section with dark background
        $(window).on('scroll', function() {
            var footerTop = $('.fx-footer-1-area').offset().top;
            if ($(window).scrollTop() + $(window).height() > footerTop) {
                $('.progress-wrap').addClass('on-dark');
            } else {
                $('.progress-wrap').removeClass('on-dark');
            }
        });
    });
    
})(jQuery);
