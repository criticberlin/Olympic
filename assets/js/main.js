/*
	Template Name: Forgex - Industrial & Factory HTML Template
	Author: https://themexriver.com/
	Version: 1.0
*/


(function ($) {
"use strict";



/* 
	lenis-smooth-scroll-activation
*/

const lenis = new Lenis({
	duration: .9, 
	easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
	direction: 'vertical', 
	smooth: true, 
	smoothTouch: false, 
  });
  
  function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
  }
  
  requestAnimationFrame(raf);
  $('a[href^="#"]').on('click', function (e) {
	e.preventDefault(); 
  
	const target = $(this.getAttribute('href')); 
  
	if (target.length) {
	  lenis.scrollTo(target[0], {
		duration: 1.2, 
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
	  });
	}
  });

/* 
	preloader
*/

document.addEventListener("DOMContentLoaded", function () {

	let preloader = document.querySelector("#preloader");

	window.addEventListener('load', function(){

		if (preloader) {
			preloader.classList.add("preloaded");
			setTimeout(function () {
				  preloader.remove();
			}, 1000 ) ;

		}

		setTimeout(function() {
			/* 
				home-1-hero
			*/
			if($('.fx-hero-1-active').length) {
				let slider = new Swiper('.fx-hero-1-active', {
					loop: true,
					spaceBetween: 0,
					speed: 500,
					effect: "fade",
					fadeEffect: {
						crossFade: true
					},
					autoplay: {
						delay: 4000,
					},
			
					pagination: {
						el: ".fx-hero-1-pagination",
						clickable: true,
					},
			
			
				});
			}

			/* 
				home-2-hero
			*/
			if($('.fx-hero-2-active').length) {
				let slider = new Swiper('.fx-hero-2-active', {
					loop: true,
					spaceBetween: 0,
					speed: 500,
					autoplay: {
						delay: 4000,
					},
			
					pagination: {
						el: ".fx-hero-2-pagination",
						clickable: true,
					  },
			
			
				});
			}

			/* 
				home-3-hero
			*/
			if($('.fx-hero-3-active').length) {
				let slider = new Swiper('.fx-hero-3-active', {
					loop: true,
					spaceBetween: 0,
					speed: 500,
					autoplay: {
						delay: 4000,
					},
			
					pagination: {
						el: ".fx-hero-3-pagination",
						clickable: true,
					},
			
					navigation: {
						nextEl: ".fx-h3-slider-next",
						prevEl: ".fx-h3-slider-prev",
					},
			
				});
			}

			/* 
				home-4-hero
			*/
			if($('.fx-hero-4-active').length) {
				let slider = new Swiper('.fx-hero-4-active', {
					loop: true,
					spaceBetween: 0,
					speed: 500,
					autoplay: {
						delay: 4000,
					},

			
					pagination: {
						el: ".fx-hero-4-pagination",
						clickable: true,
					},
			

				});
			}

			/* 
				home-5-hero
			*/
			if($('.fx-h5-active').length) {
				let slider = new Swiper('.fx-h5-active', {
					loop: false,
					spaceBetween: 40,
					speed: 0,
					direction: "vertical",
					mousewheel: false,
					autoplay: false,
					allowTouchMove: false,
			
					pagination: {
						el: ".fx-hero-5-pagination",
						clickable: false,
					},
			
			
				});
			}

			/* 
				home-3-hero
			*/
			if($('.fx-h6-active').length) {
				let slider = new Swiper('.fx-h6-active', {
					loop: true,
					spaceBetween: 0,
					speed: 500,
					autoplay: {
						delay: 4000,
					},
			
				});
			}

			if($('.fx-h6-active2').length) {
				let slider = new Swiper('.fx-h6-active2', {
					loop: true,
					spaceBetween: 0,
					speed: 500,
					autoplay: {
						delay: 5000,
					},
			
					navigation: {
						nextEl: ".fx-h6-slider-next",
						prevEl: ".fx-h6-slider-prev",
					},
			
				});
			}

			var fxh6imgglow = gsap.timeline();
			fxh6imgglow.to(".fx-hero-6-bg-glow" , { opacity: .7,  duration:1 })
			fxh6imgglow.to(".fx-hero-6-img-glow" , { xPercent: -100,  duration:1 },"<.5")
			fxh6imgglow.to(".fx-hero-6-img-glow-2" , { xPercent: -100,  duration:1 , })

			/* 
				breadcrumb
			*/
			var breadcrumb = gsap.timeline();
			breadcrumb.to(".breadcrumb-title .split-line div" , { yPercent: -100, delay: -.5, })
			breadcrumb.to(".breadcrumb-slideup" , { yPercent: -100, })

		}, 500);

		/* 
			title-animation
		*/
		if($('[data-txaa-split-text-1]').length) {
			var txasplit1 = $('[data-txaa-split-text-1]');
			if(txasplit1.length == 0) return; gsap.registerPlugin(SplitText); txasplit1.each(function(index, el) {
				el.split = new SplitText(el, { 
				type: "lines,words",
				linesClass: "split-line"
				});
			});
		}

		
		if($('.txaa-split-text-2').length) {
			var txasplit2 = $(".txaa-split-text-2");

			if(txasplit2.length == 0) return; gsap.registerPlugin(SplitText); txasplit2.each(function(index, el) {
			
				el.split = new SplitText(el, { 
					type: "lines,words,chars",
					linesClass: "split-line"
				});
			
				if( $(el).hasClass('txaa-split-text-2-ani') ){
					gsap.set(el.split.chars, {
						opacity: 0,
						x: "-5",
					});
				}
			
				el.anim = gsap.to(el.split.chars, {
					scrollTrigger: {
						trigger: el,
						start: "top 90%",
						end: "top 60%",
						markers: false,
						scrub: 1,
					},
			
					x: "0",
					y: "0",
					opacity: 1,
					duration: .7,
					stagger: 0.2,
				});
			
			});
		}

		if($('.txaa-split-text-3').length) {
			var txasplit2 = $(".txaa-split-text-3");

			if(txasplit2.length == 0) return; gsap.registerPlugin(SplitText); txasplit2.each(function(index, el) {
			
				el.split = new SplitText(el, { 
					type: "lines,words,chars",
					linesClass: "split-line"
				});
			
				if( $(el).hasClass('txaa-split-text-3-ani') ){
					gsap.set(el.split.chars, {
						opacity: .2,
						x: "-5",
					});
				}
			
				el.anim = gsap.to(el.split.chars, {
					scrollTrigger: {
						trigger: el,
						start: "top 90%",
						end: "top 60%",
						markers: false,
						scrub: 1,
					},
			
					x: "0",
					y: "0",
					opacity: 1,
					duration: .7,
					stagger: 0.2,
				});
			
			});
		}




	})

});

/* 
	sticky-header
*/

function glystickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $('.txa_sticky_header');
    var headerHeight = $header.outerHeight() + 30;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();

      if (windowTop >= headerHeight) {
        $header.addClass('txa_sticky');
        $header.addClass('sticky-menu-active');
      } else {
        $header.removeClass('txa_sticky');
        $header.removeClass('txa_sticky_show');
        $header.removeClass('sticky-menu-active');
      }

      if ($header.hasClass('txa_sticky')) {
        if (windowTop < lastScrollTop) {
          $header.addClass('txa_sticky_show');
        } else {
          $header.removeClass('txa_sticky_show');
        }
      }

      lastScrollTop = windowTop;
    });
}

glystickyHeader();
  

/* 
	offcanvas-start
*/

$('.offcanvas_toggle').on('click', function() {
    $('.overlay, .offcanvas_box_active').addClass('active');
});

$('.overlay, .offcanvas_box_close').on('click', function() {
    $('.offcanvas_box_active').removeClass('active');
    $('.overlay').removeClass('active');
});

$(document).on('keydown', function(event) {
    if (event.key === 'Escape') {
        $('.offcanvas_box_active').removeClass('active');
        $('.overlay').removeClass('active');
    }
});

/* 
	mobile-menu
*/

jQuery(".mobile-main-navigation li.dropdown").append('<span class="dropdown-btn"><i class="fa-solid fa-angle-right"></i></span>'),
	jQuery(".mobile-main-navigation li .dropdown-btn").on("click", function () {
		jQuery(this).hasClass("active")
		? (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"), jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle())
		: (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"),
			jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle(),
			jQuery(this).toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").slideToggle());
});

/* 
	footer-menu
*/

var dropdownLinks = document.querySelectorAll('.dropdown-link');

dropdownLinks.forEach(function(link) {
	link.addEventListener('click', function(event) {
		event.preventDefault();
		var dropdown = this.nextElementSibling;
		if (dropdown.style.display === 'block') {
			dropdown.style.display = 'none';
		} else {
			// Hide all other dropdowns
			document.querySelectorAll('.has-dropdown').forEach(function(ul) {
				ul.style.display = 'none';
			});
			dropdown.style.display = 'block';
		}
	});
});

/* 
	search-popup-start
*/

$('.search_btn_toggle').on('click', function() {
    $('.overlay, .search_box_active').addClass('active');
});

$('.overlay, .search_box_close').on('click', function() {
    $('.search_box_active').removeClass('active');
    $('.overlay').removeClass('active');
});

$(document).on('keydown', function(event) {
    if (event.key === 'Escape') {
        $('.search_box_active').removeClass('active');
        $('.overlay').removeClass('active');
    }
});


/* 
	hero-5-slider
*/

if($('.fx-noscrolling').length) {
	const fxnoscrollcontent = document.querySelector('.fx-noscrolling');
	const fxh5 = document.body;
	
	fxnoscrollcontent.addEventListener('mouseenter', function() {
	
		fxh5.classList.add('lenis');
	});
	fxnoscrollcontent.addEventListener('mouseleave', function() {
	
		fxh5.classList.remove('lenis');
	
	});
}


/* 
	offcanvas-start
*/

function sideBox() {
	$("body").removeClass("open-sidebar");
	$(document).on("click", ".sidebar-trigger", function (e) {
		e.preventDefault();
		$("body").toggleClass("open-sidebar");
	});
	$(document).on("click", ".sidebar-trigger.close, #sidebar-overlay", function (e) {
		e.preventDefault();
		$("body.open-sidebar").removeClass("open-sidebar");
	});
}

sideBox();


/* 
	gsap-config
*/

gsap.config({
	nullTargetWarn: false,
});

gsap.utils.toArray(".txxascale1").forEach(function(container) {
    let image = container.querySelector("img");
  
    let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
		  start: "top 90%",
		  toggleActions: 'play none none reverse',
		  markers: false,
        },
      }); 

      tl.from(image, {
        scale: 2,
		duration: 1,
      }).to(image, {
		scale: 1,
		duration: 1,
      }); 

});

gsap.utils.toArray(".txxaslideup").forEach(function(container) {
    let image = container.querySelector(".txxaslideup-item");
  
    let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
		  start: "top 90%",
		  toggleActions: 'play none none reverse',
		  markers: false,
		  stagger: 0.3,
        },
      }); 

      tl.from(image, {
        yPercent: 100,
		duration: .5,
		stagger: 0.3,
      }).to(image, {
		yPercent: 0,
		duration: .5,
		stagger: 0.3,
      }); 

});

gsap.utils.toArray(".txxaslidedown").forEach(function(container) {
    let image = container.querySelector(".txxaslidedown-item");
  
    let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
		  start: "top 90%",
		  toggleActions: 'play none none reverse',
		  markers: false,
		  stagger: 0.3,
        },
      }); 

      tl.from(image, {
        yPercent: -100,
		duration: .5,
		stagger: 0.3,
      }).to(image, {
		yPercent: 0,
		duration: .5,
		stagger: 0.3,
      }); 

});

gsap.utils.toArray(".txxaimgdown").forEach(function(container) {
    let image = container.querySelector(".txxaimgdown-item");
  
    let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
		  start: "top 90%",
		  end: "top 0%",
		  toggleActions: 'play none none reverse',
		  markers: false,
		  scrub: 2,
		  stagger: 0.3,
        },
      }); 

      tl.from(image, {
        yPercent: -20,
		duration: .5,
		stagger: 0.3,
      }); 

});


gsap.utils.toArray(".txaaimgpllx").forEach(function(container) {
    let image = container.querySelector("img");
  
    let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
		  start: "top 90%",
		  end: "top 40%",
          scrub: 3,
          pin: false,
		  markers: false,
        },
      }); 
      tl.from(image, {
        yPercent: -30,
      }).to(image, {
        yPercent: 0,
      }); 
});

const txaaredius = gsap.utils.toArray('.txaaredius');
txaaredius.forEach((box, i) => {
	const anim = gsap.fromTo(box, 
		
	{ borderRadius: "0", marginLeft: "0", marginRight: "0", duration: .5, }, 
	{ borderRadius: "16px" , marginLeft: "12px",  marginRight: "12px", duration: .5, });

	ScrollTrigger.create({
		trigger: box,
		start: "top 80%",
		animation: anim,
		toggleActions: 'play none none reverse',
		once: false,
		markers: false,

	});
});

const txaascale0 = gsap.utils.toArray('.txaascale0');
txaascale0.forEach((box, i) => {
	const anim = gsap.fromTo(box, 
		
	{ scaleX: 0, duration: 1, }, 
	{ scaleX: 1, duration: 1, });

	ScrollTrigger.create({
		trigger: box,
		start: "top 90%",
		animation: anim,
		toggleActions: 'play none none reverse',
		once: false,
		markers: false,

	});
});

const txaaslideup = gsap.utils.toArray('.txaaslideup');
txaaslideup.forEach((box, i) => {
	const anim = gsap.from(box, 
		
	{ yPercent: 20, duration: .5, });

	ScrollTrigger.create({
		trigger: box,
		start: "top 80%",
		animation: anim,
		toggleActions: 'play none none reverse',
		once: false,
		markers: false,

	});
});

const txaaslideright = gsap.utils.toArray('.txaaslideright');
txaaslideright.forEach((box, i) => {
	const anim = gsap.from(box, 
		
	{ xPercent: 100, duration: .5, });

	ScrollTrigger.create({
		trigger: box,
		start: "top 80%",
		animation: anim,
		toggleActions: 'play none none reverse',
		once: false,
		markers: false,

	});
});


/* 
	about-3
*/

var fxa3 = gsap.timeline({

	scrollTrigger: {
	  animation: fxa3,
	  trigger: '.fx-about-3-quality',
	  start: "top 80%",
	  end: "top 20%",
	  scrub: 2,
	  toggleActions: "play reverse play reverse",
	  markers: false
	}
});
	
fxa3.from(".fx-about-3-quality" , { height: 200,  duration:1 })
		 

/* 
	solution-4
*/

var fxa3 = gsap.timeline({

	scrollTrigger: {
	  animation: fxa3,
	  trigger: '[data-fx-so4-tri]',
	  start: "top 80%",
	  end: "top 10%",
	  scrub: 2,
	  toggleActions: "play reverse play reverse",
	  markers: false
	}
});
	
fxa3.from("[data-fx-so4-tri-item]" , { xPercent: 100, yPercent: -100 })

/* 
	about-6
*/

var fxa6 = gsap.timeline({

	scrollTrigger: {
	  animation: fxa6,
	  trigger: '.fx-about-6-wrap',
	  start: "top 50%",
	  end: "top -100%",
	  scrub: 1,
	  toggleActions: "play reverse play reverse",
	  markers: false
	}
});
	
fxa6.from(".fx-about-6-pop-img" , { yPercent: 50 })

var fxa6t2 = gsap.timeline({

	scrollTrigger: {
	  animation: fxa6t2,
	  trigger: '.fx-about-6-wrap',
	  start: "top -20%",
	  toggleActions: "play none play reverse",
	  markers: false
	}
});
	
fxa6t2.to(".fx-about-6-area" , { background: "#000" })
fxa6t2.to(".fx-about-6-scn-title-big" , { color: "#DFE1E5" }, "<=")



if (window.innerWidth >= 992) {
	var fxa6t3 = gsap.timeline({

		scrollTrigger: {
		  animation: fxa6t3,
		  trigger: '.fx-about-6-content',
		  start: "top 80%",
		  end: "top -50%",
		  scrub: 1,
		  toggleActions: "play reverse play reverse",
		  markers: false
		}
	});
		
	fxa6t3.to(".fx-about-6-content-img" , { yPercent: -50 })

}



var fxa6t3 = gsap.timeline({

	scrollTrigger: {
	  animation: fxa6t3,
	  trigger: '.fx-about-6-experi',
	  start: "top -10%",
	  toggleActions: "play none play reverse",
	  markers: false
	}
});
	
fxa6t3.to(".fx-about-6-area" , { background: "#fff" })
fxa6t3.to(".fx-about-6-experi-year-title" , { color: "#000" }, "<=")
fxa6t3.to(".fx-about-6-experi-year-text" , { color: "#000" }, "<=")
fxa6t3.to(".fx-about-6-experi-title" , { color: "#000" }, "<=")


if (window.innerWidth >= 992) {
	const fxa6t4 =  gsap.timeline({
		scrollTrigger: {
			trigger: ".fx-about-6-experi-year",
			start: "top 0%",
			end:'bottom 0%',
			scrub: 1,
			pinSpacing: false, 
			pin: ".fx-about-6-experi-year",
			toggleActions: "play pause reverse reset",
			markers: false,
		}
	});
	
	fxa6t4.to(".fx-about-6-experi-year-text", {
		y: -500,
		duration: 1,
	})
	
	fxa6t4.to(".fx-about-6-experi-year", {
		scale: 3,
		xPercent: -50,
		opacity: 0,
		duration: 1,
		display: "none"
	}, "<=.5")

}

/* 
	skill-progress
*/

var progress = gsap.timeline({

	scrollTrigger: {
	  animation: progress,
	  trigger: '[data-progress-trigger]',
	  start: "top 90%",
	  toggleActions: "play none none reverse",
	  markers: false
	}
});
	
progress.from("[data-progress-trigger-item]" , { xPercent: -100 , duration: 1 })

/* 
	error
*/

gsap.from(".fx-error-content .img-1" ,
	{
		yPercent: -100,
		delay: 1.5,
	}
);


/* 
	serve-1-slider
*/

if($('.fx-serve-1-active').length) {
	let slider = new Swiper('.fx-serve-1-active', {
		loop: true,
		spaceBetween: 32,
		speed: 500,
		slidesPerView: 4,

		autoplay: {
			delay: 3000,
		},

		navigation: {
			nextEl: ".fx-serve-1-slider-next",
			prevEl: ".fx-serve-1-slider-prev",
		},

		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 3,
			},
			1400: {
				slidesPerView: 3,
			},
			1600: {
				slidesPerView: 4,
			},
		},
	});
}

/* 
	services-1-slider
*/

if($('.fx-services-1-active').length) {
	let slider = new Swiper('.fx-services-1-active', {
		loop: true,
		spaceBetween: 0,
		speed: 500,
		slidesPerView: 1,

		autoplay: {
			delay: 3000,
		},

		navigation: {
			nextEl: ".fx-services-1-slider-next",
			prevEl: ".fx-services-1-slider-prev",
		},

		pagination: {
			el: ".fx-services-1-slider-pagination",
			type: "fraction",
		},

	});
}

/* 
	testimonial-1-slider
*/

if($('.fx-testimonial-1-active-1').length) {
	let slider = new Swiper('.fx-testimonial-1-active-1', {
		loop: true,
		spaceBetween: 0,
		speed: 500,
		slidesPerView: 1,
		allowTouchMove: false,

		autoplay: {
			delay: 4000,
		},

		navigation: {
			nextEl: ".fx-testimonial-1-slider-next",
			prevEl: ".fx-testimonial-1-slider-prev",
		},

		pagination: {
			el: ".fx-t1-slider-pagination",
			clickable: true,
		},
	});
}

/* 
	about-2-slider
*/

if($('.fx-about-2-active').length) {
	let slider = new Swiper('.fx-about-2-active', {
		loop: true,
		spaceBetween: 0,
		speed: 500,
		slidesPerView: 1,

		autoplay: {
			delay: 4000,
		},

		navigation: {
			nextEl: ".fx-a1-slider-next",
			prevEl: ".fx-a1-slider-prev",
		},

		pagination: {
			el: ".fx-a2-pagination",
			clickable: true,
		},
	});
}

/* 
	core-1-slider
*/

if($('.fx-core-1-active').length) {
	let slider = new Swiper('.fx-core-1-active', {
		loop: true,
		spaceBetween: 0,
		speed: 500,
		slidesPerView: 1,

		autoplay: {
			delay: 400000000,
		},

		navigation: {
			nextEl: ".fx-core1-slider-next",
			prevEl: ".fx-core1-slider-prev",
		},

		pagination: {
			el: ".fx-core1-pagination",
			clickable: true,
		},
	});
}

/* 
	team-1-slider
*/

if($('.fx-t1-active').length) {
	let slider = new Swiper('.fx-t1-active', {
		loop: true,
		spaceBetween: 32,
		speed: 500,
		slidesPerView: 4,

		autoplay: {
			delay: 4000,
		},

		navigation: {
			nextEl: ".fx-t1-slider-next",
			prevEl: ".fx-t1-slider-prev",
		},

		pagination: {
			el: ".fx-t1-pagination",
			clickable: true,
		},

		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		},
	});
}

/* 
	team-2-slider
*/

if($('.fx-t4-active').length) {
	let slider = new Swiper('.fx-t4-active', {
		loop: true,
		spaceBetween: 32,
		speed: 500,
		slidesPerView: 4,

		autoplay: {
			delay: 4000,
		},


		pagination: {
			el: ".fx-t4-pagination",
			clickable: true,
		},

		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 3,
			},
			1400: {
				slidesPerView: 4,
			},
		},
	});
}

/* 
	project-2-slider
*/

if($('.fx-p2-active').length) {
	let slider = new Swiper('.fx-p2-active', {
		loop: true,
		spaceBetween: 0,
		speed: 500,
		slidesPerView: 1,
		allowTouchMove: false,

		autoplay: {
			delay: 4000,
		},

		navigation: {
			nextEl: ".fx-p2-slider-next",
			prevEl: ".fx-p2-slider-prev",
		},

		scrollbar: {
			el: ".fx-p2-scrollbar",
		},

	});
}

/* 
	client-1-slider
*/

if($('.fx-c1-active').length) {
	let slider = new Swiper('.fx-c1-active', {
		loop: true,
		spaceBetween: 0,
		speed: 500,
		slidesPerView: 1,
		loopAdditionalSlides: 3, // Increased for smoother loop
		watchSlidesProgress: true,
		preventInteractionOnTransition: false,
		touchStartPreventDefault: false,
		loopPreventsSliding: false,
		
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},

		navigation: {
			nextEl: ".fx-c1-slider-next",
			prevEl: ".fx-c1-slider-prev",
		},

		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: 3,
			},
			768: {
				slidesPerView: 4,
			},
			992: {
				slidesPerView: 5,
			},
			1200: {
				slidesPerView: 6,
			},
		},

		// Event handlers to manage wrapper duplication and prevent flickering
		on: {
			beforeLoopFix: function () {
				// Add transitioning class and clean up before loop fix
				this.el.classList.add('swiper-transitioning');
			},
			afterLoopFix: function () {
				// Clean up duplicate wrappers after loop fix
				const wrappers = this.el.querySelectorAll('.swiper-wrapper');
				if (wrappers.length > 1) {
					// Keep only the first wrapper, remove duplicates
					for (let i = 1; i < wrappers.length; i++) {
						wrappers[i].remove();
					}
				}
				setTimeout(() => {
					this.el.classList.remove('swiper-transitioning');
				}, 50);
			},
			init: function () {
				// Ensure clean initialization
				const wrappers = this.el.querySelectorAll('.swiper-wrapper');
				if (wrappers.length > 1) {
					for (let i = 1; i < wrappers.length; i++) {
						wrappers[i].remove();
					}
				}
			},
			observerUpdate: function () {
				// Clean up duplicates on any DOM update
				const wrappers = this.el.querySelectorAll('.swiper-wrapper');
				if (wrappers.length > 1) {
					for (let i = 1; i < wrappers.length; i++) {
						wrappers[i].remove();
					}
				}
			}
		}

	});
}

/* 
	testimonial-1-slider
*/

if($('.fx-t2-active').length) {
	let slider = new Swiper('.fx-t2-active', {
		loop: true,
		spaceBetween: 32,
		speed: 500,
		slidesPerView: 1,

		autoplay: {
			delay: 4000,
		},
		pagination: {
			el: ".fx-ts2-pagination",
			clickable: true,
		},

		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 2,
			},
			1200: {
				slidesPerView: 3,
			},
			1400: {
				slidesPerView: 3,
			},
			1600: {
				slidesPerView: 4,
			},
		},

	});
}

/* 
	blog-2-slider
*/

if($('.fx-b2-active').length) {
	let slider = new Swiper('.fx-b2-active', {
		loop: true,
		spaceBetween: 32,
		speed: 500,
		slidesPerView: 1,

		autoplay: {
			delay: 4000,
		},

		navigation: {
			nextEl: ".fx-b2-slider-next",
			prevEl: ".fx-b2-slider-prev",
		},

		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 3,
			},
			1400: {
				slidesPerView: 3,
			},

		},

	});
}


/* 
	services-3-slider
*/

// Services-3-slider with LTR consistency for both directions
function initServicesSlider() {
	if($('.fx-s3-active').length) {
		// Always use LTR direction for services slider as requested by user
		let slider = new Swiper('.fx-s3-active', {
			loop: true,
			spaceBetween: 32,
			speed: 500,
			slidesPerView: 6,
			direction: 'horizontal',
			rtl: false, // Always LTR
			allowTouchMove: true,
			
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},

			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 4,
				},
				1200: {
					slidesPerView: 5,
				},
				1400: {
					slidesPerView: 6,
				},
				1600: {
					slidesPerView: 7,
				},
			},
			
			// Ensure consistent card sizing
			on: {
				init: function() {
					// Ensure all slides have consistent sizing
					this.slides.forEach(slide => {
						slide.style.height = 'auto';
						slide.style.display = 'flex';
						slide.style.alignItems = 'stretch';
					});
				},
				resize: function() {
					// Maintain consistency on resize
					this.slides.forEach(slide => {
						slide.style.height = 'auto';
						slide.style.display = 'flex';
						slide.style.alignItems = 'stretch';
					});
				}
			}

		});
		
		// Store reference for RTL fixes
		window.servicesSlider = slider;
	}
}

// Initialize services slider
initServicesSlider();

// Make the function available globally for RTL fixes
window.initServicesSlider = initServicesSlider;

/* 
	services-3-slider
*/

if($('.fx-t3-active').length) {
	let slider = new Swiper('.fx-t3-active', {
		loop: true,
		spaceBetween: 0,
		speed: 500,

		autoplay: {
			delay: 4000,
		},

	});
}


/* 
	services-6-slider
*/

if($('.fx-s6-active').length) {
	let slider = new Swiper('.fx-s6-active', {
		loop: true,
		spaceBetween: 32,
		speed: 500,
		slidesPerView: 7,

		autoplay: {
			delay: 4000,
		},

		pagination: {
			el: ".fx-s6-pagination",
			clickable: true,
		},

		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
			1400: {
				slidesPerView: 5,
			},
			1600: {
				slidesPerView: 5,
			},
			1800: {
				slidesPerView: 6,
			},
		},
	});
}

/* 
	career-img-slider
*/

if($('.fx-career-active').length) {
	let slider = new Swiper('.fx-career-active', {
		loop: true,
		spaceBetween: 30,
		speed: 500,

		autoplay: {
			delay: 4000,
		},

		navigation: {
			nextEl: ".fx-career-slider-next",
			prevEl: ".fx-career-slider-prev",
		},

	});
}

/* 
	blog-img
*/

if($('.fx-blog-slide').length) {
	let slider = new Swiper('.fx-blog-slide', {
		loop: true,
		spaceBetween: 0,
		speed: 500,
		autoplay: {
			delay: 4000,
		},

		navigation: {
			nextEl: ".blog_img_next",
			prevEl: ".blog_img_prev",
		},

	});
}

/* 
	project-7
*/

if($(".grid").length) {

	var $grid = $('.grid').imagesLoaded( function() {
		$grid.masonry({
			percentPosition: true,
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer'
		}); 
	});

	var $grid = $(".grid").isotope({
		itemSelector: ".grid-item",
		layoutMode: "fitRows"
	});

	var filterFns = {
		numberGreaterThan50: function() {
			var number = $(this)
			.find(".number")
			.text();
			return parseInt(number, 10) > 50;
		},
		ium: function() {
			var name = $(this)
			.find(".name")
			.text();
			return name.match(/ium$/);
		}
	};

	$(".button-group").on("click", "button", function() {
		var filterValue = $(this).attr("data-filter");
		filterValue = filterFns[filterValue] || filterValue;
		$grid.isotope({ filter: filterValue });
	});

	$(".button-group").each(function(i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on("click", "button", function() {
			$buttonGroup.find(".is-checked").removeClass("is-checked");
			$(this).addClass("is-checked");
		});
	});
}

/* 
	cursor-follow
*/

var mWrap = $(".fx-video-1");

/* 
	parallax-effect
*/

function parallaxIt(e, target, movement = 1) {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var boundingRect = target[0].getBoundingClientRect();
  var relX = e.pageX - boundingRect.left;
  var relY = e.pageY - boundingRect.top;

  gsap.to(target.find("#magnetic-content"), {
    x: (relX - boundingRect.width / 2) * movement,
    y: (relY - boundingRect.height / 2 - scrollTop) * movement,
    duration: 1,
    ease: "power1.out",
  });
}

/* 
	parallax-effect-event-listener
*/

mWrap.each(function () {
  var mContent = $(this).find("#magnetic-content");
  var mArea = $(this).find("#magnetic-area");

  mArea.on("mousemove", function (e) {
    parallaxIt(e, $(this).closest(".fx-video-1"));
  });

  mArea.on("mouseleave", function () {
    gsap.to(mContent, {
      scale: 1,
      x: 0,
      y: 0,
      duration: 1,
      ease: "power1.out",
    });
  });
});


/*
	marquee-activation
*/
$('.js-marquee-wrapper').marquee({
	speed: 50,
	gap: 65,
	delayBeforeStart: 0,
	direction: 'left',
	duplicated: true,
	pauseOnHover: true,
	startVisible:true,
})

/* 
	bootstrap-tooltip
*/

$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})

/* 
	back-to-top 
*/
var backtotop = $('.scroll_top');


backtotop.on('click', function(e) {
	e.preventDefault();
	$('html, body').animate({scrollTop:0}, '700');
});


/* 
	counter-activation
*/

// Global counter state management to prevent reset during language switch
window.counterStates = {};
window.counterInitialized = false;

function initializeCounters() {
	if (window.counterInitialized) return;
	
	$('.counter').each(function(index) {
		const $counter = $(this);
		const targetValue = parseInt($counter.text()) || 0;
		const counterId = 'counter-' + index;
		
		// Store initial target value
		window.counterStates[counterId] = {
			targetValue: targetValue,
			currentValue: 0,
			element: $counter[0],
			isAnimating: false
		};
		
		// Store counter ID on element for reference
		$counter.attr('data-counter-id', counterId);
	});
	
	// Initialize counterUp
	$('.counter').counterUp({
		delay: 10,
		time: 3000,
		formatter: function (n) {
			// Update stored current value during animation
			const counterId = $(this).attr('data-counter-id');
			if (counterId && window.counterStates[counterId]) {
				window.counterStates[counterId].currentValue = parseInt(n);
				window.counterStates[counterId].isAnimating = true;
			}
			return n.toString();
		}
	});
	
	// Mark counters as initialized
	window.counterInitialized = true;
	
	// Set completion state after animation time
	setTimeout(() => {
		$('.counter').each(function() {
			const counterId = $(this).attr('data-counter-id');
			if (counterId && window.counterStates[counterId]) {
				window.counterStates[counterId].isAnimating = false;
				window.counterStates[counterId].currentValue = window.counterStates[counterId].targetValue;
			}
		});
	}, 3500); // Slightly longer than animation time
}

// Function to preserve counter values during language switch
window.preserveCounterValues = function() {
	$('.counter').each(function() {
		const $counter = $(this);
		const counterId = $counter.attr('data-counter-id');
		
		if (counterId && window.counterStates[counterId]) {
			const state = window.counterStates[counterId];
			// Keep the current displayed value instead of resetting
			const currentDisplayValue = parseInt($counter.text()) || state.currentValue;
			
			// Store the current value
			state.currentValue = currentDisplayValue;
			
			// Prevent counterUp from re-animating
			$counter.removeClass('counter').addClass('counter-preserved');
			
			// Also disable GSAP ScrollTrigger animations temporarily for this element
			const $animationContainer = $counter.closest('.txxaslideup');
			if ($animationContainer.length > 0) {
				$animationContainer.addClass('animation-paused');
				// Store original ScrollTrigger instances to restore later
				if (typeof ScrollTrigger !== 'undefined') {
					ScrollTrigger.getAll().forEach(st => {
						if (st.trigger === $animationContainer[0]) {
							st.disable();
							$animationContainer.attr('data-st-disabled', 'true');
						}
					});
				}
			}
		}
	});
};

// Function to restore counter values after language switch
window.restoreCounterValues = function() {
	$('.counter-preserved').each(function() {
		const $counter = $(this);
		const counterId = $counter.attr('data-counter-id');
		
		if (counterId && window.counterStates[counterId]) {
			const state = window.counterStates[counterId];
			// Restore the preserved value without animation
			$counter.text(state.currentValue);
			
			// Restore counter class but prevent re-initialization
			$counter.removeClass('counter-preserved').addClass('counter');
			
			// Re-enable GSAP ScrollTrigger animations
			const $animationContainer = $counter.closest('.txxaslideup');
			if ($animationContainer.length > 0 && $animationContainer.hasClass('animation-paused')) {
				$animationContainer.removeClass('animation-paused');
				
				// Re-enable ScrollTrigger instances
				if (typeof ScrollTrigger !== 'undefined' && $animationContainer.attr('data-st-disabled') === 'true') {
					ScrollTrigger.getAll().forEach(st => {
						if (st.trigger === $animationContainer[0]) {
							st.enable();
						}
					});
					$animationContainer.removeAttr('data-st-disabled');
				}
			}
		}
	});
};

// Initialize counters when page loads
$(document).ready(function() {
	// Delay initialization to ensure all elements are ready
	setTimeout(initializeCounters, 100);
});

// Integration with language toggle system
window.addEventListener('beforeLanguageToggle', function() {
	if (typeof window.preserveCounterValues === 'function') {
		window.preserveCounterValues();
	}
	if (typeof window.preserveGSAPCounters === 'function') {
		window.preserveGSAPCounters();
	}
});

window.addEventListener('afterLanguageToggle', function() {
	setTimeout(() => {
		if (typeof window.restoreCounterValues === 'function') {
			window.restoreCounterValues();
		}
		if (typeof window.restoreGSAPCounters === 'function') {
			window.restoreGSAPCounters();
		}
	}, 100);
});

// Add CSS styles for animation pausing
$('<style>')
	.text(`
		.animation-paused .txxaslideup-item {
			transition: none !important;
			animation: none !important;
		}
		
		.counter-preserved {
			position: relative !important;
			z-index: 999 !important;
		}
	`)
	.appendTo('head');

// Enhanced counter preservation for GSAP-animated elements
window.preserveGSAPCounters = function() {
	// Find all counter elements within GSAP animation containers
	$('.txxaslideup .counter, .txxaslidedown .counter').each(function() {
		const $counter = $(this);
		const currentValue = parseInt($counter.text()) || 0;
		
		// Store the value in a data attribute as backup
		$counter.attr('data-preserved-value', currentValue);
		
		// Also store in a global backup object
		if (!window.gsapCounterBackup) {
			window.gsapCounterBackup = {};
		}
		
		const elementId = $counter.attr('id') || 'counter-' + $('.txxaslideup .counter, .txxaslidedown .counter').index($counter);
		if (!$counter.attr('id')) {
			$counter.attr('id', elementId);
		}
		
		window.gsapCounterBackup[elementId] = currentValue;
	});
};

// Enhanced counter restoration for GSAP-animated elements
window.restoreGSAPCounters = function() {
	// Restore from backup values
	$('.txxaslideup .counter, .txxaslidedown .counter').each(function() {
		const $counter = $(this);
		const backupValue = $counter.attr('data-preserved-value');
		const elementId = $counter.attr('id');
		
		if (backupValue) {
			$counter.text(backupValue);
			$counter.removeAttr('data-preserved-value');
		} else if (elementId && window.gsapCounterBackup && window.gsapCounterBackup[elementId]) {
			$counter.text(window.gsapCounterBackup[elementId]);
		}
	});
};

/* 
	data-bg-activation
*/

$("[data-background]").each(function(){
	$(this).css("background-image","url("+$(this).attr("data-background") + ") ")
})

/* 
	wow-splitting-text
*/

Splitting();

/* 
	wow-activation
*/

if($('.wow').length){
	var wow = new WOW(
	{
		boxClass:     'wow',
		animateClass: 'animated',
		offset:       0,
		mobile:       true,
		live:         true
	}
	);
	wow.init();
};


/*
	popup-video-activation
*/

if($('.popup-video').length) {
	$('.popup-video').magnificPopup({
		type: 'iframe'
	});
}


/*
	popup-img-activation
*/

if($('.popup_img').length) {
	$('.popup_img').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true,
		},
	});
}

/*
	popup-img-activation
*/
if($('.nice-select').length) {
	$('.nice-select select').niceSelect();
}

/* 
	parallax-img
*/

$('.parallax-img').parallaxie({  
	speed: 0.5,    
});


})(jQuery);