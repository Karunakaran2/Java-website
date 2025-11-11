/*!
 * Developed by: Sivanand G Kamath
 * GitHub: https://github.com/sgk125
 * Project: Custom CMS Frontend Interactions
 * Date: July 21, 2025
 * Description: Handles dynamic UI interactions, animations, and AJAX calls for the CMS dashboard.
 */
$(document).ready(function() {
	const cards = document.querySelectorAll(".k-card-2");
	const sk_attr = "RGV2ZWxvcGVkIEJ5IFNpdmFuYW5k";
	const el = document.getElementById("cloneTriangle");
	let maxHeight = 0;

	cards.forEach(card => {
		card.style.height = "auto"; // Reset height first
		if (card.offsetHeight > maxHeight) {
			maxHeight = card.offsetHeight;
		}
	});
	if (el) {
		const mark = document.createComment(atob(sk_attr));
		el.prepend(mark);
	}
	cards.forEach(card => {
		card.style.height = maxHeight + "px";
	});

	(function($) {
		"use strict";

		// =================
		// Country Card 
		// =================

		// Initialize the first child as active on page load
		$('.country-area ul li:first-child').addClass('active');
		// Mouse enter event for country-area div
		$('.country-area').on("mouseenter", function() {
			// Remove active class from all li elements except the first child
			$('.country-area ul li:not(:first-child)').removeClass('active');
		});
		// Mouse leave event for country-area div
		$('.country-area').on("mouseleave", function() {
			// Remove active class from all li elements except the first child
			$('.country-area ul li:not(:first-child)').removeClass('active');
			// Add active class to the first child
			$('.country-area ul li:first-child').addClass('active');
		});
		// Hover event for li elements
		$('.country-area ul li').on(
			{
				mouseenter: function() {
					// Add active class to the current li and remove from siblings
					$(this).addClass('active').siblings().removeClass('active');
				}
			}
		);

		// Home3 Banner Hover
		$(".banner-hover").on("mouseenter", function() { // Changes the .image-holder's img src to the src defined in .list a's data attribute.
			var value = $(this).attr('data-src');
			document.getElementById("home3-banner-bg").style.background = "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%) ,url('" + value + "')";
		});
		// Home5 Services Hover
		$(".services-list ul li").on({
			mouseenter: function() {
				// Remove the 'active' class from all content list items
				$(".services-list ul li").removeClass("active");
				// Add the 'active' class to the hovered content list item
				$(this).addClass("active");
				// Get the index of the hovered content list item
				var index = $(this).index();
				// Remove the 'active' class from all image list items
				$(".services-img ul li").removeClass("active");
				// Add the 'active' class to the corresponding image list item
				$(".services-img ul li:eq(" + index + ")").addClass("active");
			},
		});

		// text-add remove
		$(".moreless-button").addClass("bi bi-chevron-down");
		$(document).on("click", '.moreless-button', function() {
			$('.moretext').slideToggle();
			if ($('.moreless-button').text() == "Read More") {
				$(this).text("Read less")
				$(this).addClass("bi bi-chevron-up")
				$(this).removeClass("bi bi-chevron-down")
			} else {
				$(this).text("Read More")
				$(this).addClass("bi bi-chevron-down")
				$(this).removeClass("bi bi-chevron-up")
			}
		});

		$(document).on("click", function(e) {
			if (!$(e.target).closest(".search-input, .search-btn, .lang-btn").length) {
				$(".search-input, .lang-card").removeClass("active");
			}
		});
		$(".serch-close").on("click", function(e) {
			$(".search-input").removeClass("active");
		});
		// Preloader 
		jQuery(window).on('load', function() {
			$(".preloader").delay(1600).fadeOut("slow");
		});
		// sidebar
		$('.sidebar-btn2').on("click", function() {
			$('.header-sidebar').addClass('slide');
		});
		$('.close-btn').on("click", function() {
			$('.header-sidebar').removeClass('slide');
		});

		jQuery('.dropdown-icon').on('click', function() {
			jQuery(this).toggleClass('active').next('ul').slideToggle();
			jQuery(this).parent().siblings().children('ul').slideUp();
			jQuery(this).parent().siblings().children('.active').removeClass('active');
		});

		//Counter up
		$('.counter').counterUp({
			delay: 10,
			time: 1000
		});

		$('.sidebar-button').on("click", function() {
			$(this).toggleClass('active');
		});
		// ====================
		// Progrees Bar
		// ====================
		var skillPers = document.querySelectorAll(".subscription-bar-per");

		skillPers.forEach(function(skillPer) {
			var per = parseFloat(skillPer.getAttribute("data-per"));
			skillPer.style.width = per + "%";

			var animatedValue = 0;
			var startTime = null;

			function animate(timestamp) {
				if (!startTime) startTime = timestamp;
				var progress = timestamp - startTime;
				var stepPercentage = progress / 1000; // Dividing by duration in milliseconds (1000ms = 1s)

				if (stepPercentage < 1) {
					animatedValue = per * stepPercentage;
					skillPer.setAttribute("data-per", Math.floor(animatedValue) + "%");
					requestAnimationFrame(animate);
				} else {
					animatedValue = per;
					skillPer.setAttribute("data-per", Math.floor(animatedValue) + "%");
				}
			}
			requestAnimationFrame(animate);
		});

		//Active menu
		const currentLocation = location.href;
		const menuItem = document.querySelectorAll('ul li a');
		const menuLength = menuItem.length;
		for (let i = 0; i < menuLength; i++) {
			if (menuItem[i].href === currentLocation) {
				menuItem[i].className = "active";
			}
		}


		// ====================
		// Sliders
		// ====================
		// most-search-slider

		var swiper = new Swiper(".banner3-slider", {
			slidesPerView: 1,
			speed: 1500,
			spaceBetween: 0,
			navigation: {
				nextEl: ".next-1",
				prevEl: ".prev-1",
			},

			breakpoints: {
				280: {
					slidesPerView: 1,
				},
				386: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},
				1400: {
					slidesPerView: 4
				},
			}
		});

		// testimonial Slider

		var swiper = new Swiper(".home5-banner-slider", {
			slidesPerView: 1,
			speed: 1500,
			spaceBetween: 25,
			effect: 'fade',             // Use the fade effect
			fadeEffect: {
				crossFade: true           // Enable cross-fade transition
			},
			navigation: {
				nextEl: ".next-10",
				prevEl: ".prev-10",
			},
		});
		var swiper = new Swiper(".banner4-slider", {
			slidesPerView: 1,
			speed: 1500,
			spaceBetween: 25,
			loop: true,
			effect: 'fade',             // Use the fade effect
			fadeEffect: {
				crossFade: true           // Enable cross-fade transition
			},
			autoplay: {
				delay: 4000, // Autoplay duration in milliseconds
				disableOnInteraction: false,
			}
		});
		var swiper = new Swiper(".event-speakers-slider", {
			slidesPerView: 1,
			speed: 1500,
			spaceBetween: 25,
			loop: true,
			effect: 'fade',             // Use the fade effect
			fadeEffect: {
				crossFade: true           // Enable cross-fade transition
			},
			autoplay: {
				delay: 4000, // Autoplay duration in milliseconds
				disableOnInteraction: false,
			},
			pagination: {
				el: '.event-fractional-pagination',
				type: "fraction",
			},
			navigation: {
				nextEl: ".next-4",
				prevEl: ".prev-4",
			},
		});
		var swiper = new Swiper(".testimonial-slider", {
			slidesPerView: 1,
			speed: 1500,
			spaceBetween: 25,
			loop: true,
			effect: 'fade',             // Use the fade effect
			fadeEffect: {
				crossFade: true           // Enable cross-fade transition
			},
			autoplay: {
				delay: 4000, // Autoplay duration in milliseconds
				disableOnInteraction: false,
			},
			pagination: {
				el: '.franctional-pagi1',
				type: "fraction",
			},
			navigation: {
				nextEl: ".next-2",
				prevEl: ".prev-2",
			},
		});
		// testimonial Slider
		var swiper = new Swiper(".testimonial-slider2", {
			slidesPerView: 1,
			speed: 1500,
			spaceBetween: 25,
			// loop: true,
			effect: 'fade',             // Use the fade effect
			fadeEffect: {
				crossFade: true           // Enable cross-fade transition
			},
			autoplay: {
				delay: 2500, // Autoplay duration in milliseconds
				disableOnInteraction: false,
			},
			// pagination: {
			//     el: '.franctional-pagi2',
			//     type: "fraction",
			// },
			navigation: {
				nextEl: ".next-3",
				prevEl: ".prev-3",
			},
		});
		// testimonial Slider
		var swiper = new Swiper(".testimonial-slider3", {
			slidesPerView: 1,
			speed: 1500,
			spaceBetween: 25,
			loop: true,
			effect: 'fade',             // Use the fade effect
			fadeEffect: {
				crossFade: true           // Enable cross-fade transition
			},
			autoplay: {
				delay: 2500, // Autoplay duration in milliseconds
				disableOnInteraction: false,
			},
			pagination: {
				el: '.pagination-3',
				clickable: true,
			},
			navigation: {
				nextEl: ".next-3",
				prevEl: ".prev-3",
			},
		});
		// testimonial Slider
		var swiper = new Swiper(".testimonial-slider5", {
			slidesPerView: 1,
			speed: 1500,
			spaceBetween: 25,
			loop: true,
			effect: 'fade',             // Use the fade effect
			fadeEffect: {
				crossFade: true           // Enable cross-fade transition
			},
			autoplay: {
				delay: 2500, // Autoplay duration in milliseconds
				disableOnInteraction: false,
			},
			pagination: {
				el: '.franctional-pagi5',
				type: "fraction",
			},
			navigation: {
				nextEl: ".next-3",
				prevEl: ".prev-3",
			},
		});
		var swiper = new Swiper(".event-slider", {
			slidesPerView: 1,
			speed: 1500,
			spaceBetween: 25,
			loop: true,
			effect: 'fade',             // Use the fade effect
			fadeEffect: {
				crossFade: true           // Enable cross-fade transition
			},
			autoplay: {
				delay: 2500, // Autoplay duration in milliseconds
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: ".next-7",
				prevEl: ".prev-7",
			},
		});

		$('.casestudy-slider').slick({
			centerMode: true,
			infinite: true,
			centerPadding: '0',
			autoplay: true,
			autoplaySpeed: 2500,
			speed: 1500,
			variableWidth: true,
			responsive: [{
				breakpoint: 1200,
				settings: {
					arrows: false,
					slidesToShow: 5

				}
			}, {
				breakpoint: 991,
				settings: {
					arrows: false,
					variableWidth: false,
				}
			}, {
				breakpoint: 768,
				settings: {
					arrows: false,
					variableWidth: false,
					slidesToShow: 1
				}
			}, {
				breakpoint: 576,
				settings: {
					arrows: false,
					variableWidth: false,
					slidesToShow: 1,
				}
			}, {
				breakpoint: 480,
				settings: {
					arrows: false,
					variableWidth: false,
					slidesToShow: 1
				}
			}, {
				breakpoint: 350,
				settings: {
					arrows: false,
					variableWidth: false,
					slidesToShow: 1
				}
			}]
		});


		// Portfolio Slider
		var swiper = new Swiper(".project-slider", {
			slidesPerView: "auto",
			speed: 2000,
			spaceBetween: 24,
			loop: true,
			autoplay: {
				delay: 3500, // Autoplay duration in milliseconds
				disableOnInteraction: false,
			},
			breakpoints: {
				280: {
					slidesPerView: 1,
				},
				386: {
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
					slidesPerView: 4
				},
			}
		});
		// Portfolio Slider
		var swiper = new Swiper(".cover-slider-with-progress", {
			speed: 1500,
			spaceBetween: 30,
			autoplay: {
				delay: 2500, // Autoplay duration in milliseconds
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: ".next-4",
				prevEl: ".prev-4",
			},
			pagination: {
				el: ".progress-pagination2",
				type: "progressbar",
			},

			breakpoints: {
				280: {
					slidesPerView: 1,
				},
				386: {
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
					slidesPerView: 4
				},
			}
		});
		// Portfolio Slider
		var swiper = new Swiper(".portfolio-slider", {
			speed: 1500,
			spaceBetween: 30,
			autoplay: {
				delay: 2500, // Autoplay duration in milliseconds
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: ".next-4",
				prevEl: ".prev-4",
			},
			pagination: {
				el: ".progress-pagination",
				type: "progressbar",
			},

			breakpoints: {
				280: {
					slidesPerView: 1,
				},
				386: {
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
					slidesPerView: 3
				},
			}
		});

		// Portfolio Slider
		var swiper = new Swiper(".bolg-slider", {
			speed: 1500,
			spaceBetween: 30,
			autoplay: {
				delay: 2500, // Autoplay duration in milliseconds
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: ".next-5",
				prevEl: ".prev-5",
			},
			pagination: {
				el: ".progress-pagination",
				type: "progressbar",
			},

			breakpoints: {
				280: {
					slidesPerView: 1,
				},
				386: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},
				1400: {
					slidesPerView: 4
				},
			}
		});

		var swiper = new Swiper(".event-img-slider", {
			speed: 1500,
			spaceBetween: 30,
			autoplay: {
				delay: 2500, // Autoplay duration in milliseconds
				disableOnInteraction: false,
			},
			effect: 'fade',             // Use the fade effect
			fadeEffect: {
				crossFade: true           // Enable cross-fade transition
			},
			pagination: {
				el: ".event-pagination",
				clickable: 'true',
			},
		});

		var swiper = new Swiper(".gallery-slider", {
			speed: 5000,
			spaceBetween: 30,
			autoplay: {
				delay: 100, // Autoplay duration in milliseconds
				disableOnInteraction: false,
			},

			breakpoints: {
				280: {
					slidesPerView: 1,
				},
				386: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 4
				},
			}
		});

		document.querySelector('.sidebar-button').addEventListener('click', () =>
			document.querySelector('.main-menu, .header-area.style-3').classList.toggle('show-menu'));

		$('.btn-hover').on('mouseenter', function(e) {
			var parentOffset = $(this).offset(),
				relX = e.pageX - parentOffset.left,
				relY = e.pageY - parentOffset.top;
			$(this).find('span').css({ top: 0, left: 0 })
			$(this).find('span').css({ top: relY, left: relX })
		})
			.on('mouseout', function(e) {
				var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
				$(this).find('span').css({ top: 0, left: 0 })
				$(this).find('span').css({ top: relY, left: relX })
			});

		// scroll up button
		document.addEventListener("DOMContentLoaded", function(event) {

			let offset = 50;
			let circleContainer = document.querySelector(".circle-container");
			let circlePath = document.querySelector('.circle-container path');
			let pathLength = circlePath.getTotalLength();
			circlePath.style.transition = circlePath.style.WebkitTransition = 'none';
			circlePath.style.strokeDasharray = pathLength;
			circlePath.style.strokeDashoffset = pathLength;
			circlePath.getBoundingClientRect();
			circlePath.style.transition = circlePath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

			let updateLoader = () => {

				let scrollTop = window.scrollY;
				let docHeight = document.body.offsetHeight;
				let winHeight = window.innerHeight;
				let height = docHeight - winHeight;
				let progress = pathLength - (scrollTop * pathLength / height);
				circlePath.style.strokeDashoffset = progress;

				if (scrollTop > offset) {
					circleContainer.classList.add("active");
				} else {
					circleContainer.classList.remove("active");
				}

			}
			circleContainer.onclick = function() {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}

			window.onscroll = () => {
				updateLoader();
			}
			updateLoader();
		});



	}(jQuery));
});