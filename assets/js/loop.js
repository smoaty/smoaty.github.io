jQuery( function($){

	/*----------------------/
	/* PAGE LOADER
	/*---------------------*/

	if( $('body.no-preloader').length <= 0 ) {
		$('body').jpreLoader({
			showSplash: false,
			loaderVPos: "50%"
		});
	}


	/*----------------------/
	/* MAIN NAVIGATION
	/*---------------------*/
	
	// navbar and logo switch related with scroll position
	$(window).on('scroll', function(){
		if( $(window).width() > 1024 ) {
			if( $(document).scrollTop() > 150 ) {
				setNavbarLight();
			}else {
				setNavbarTransparent();
			}
		}
	});
	
	// navbar and logo switch related with screen width
	function toggleNavbar() {
		if( ($(window).width() > 1024) && ($(document).scrollTop() <= 150) ) {
			setNavbarTransparent();
		} else {
			setNavbarLight();
		}
	}

	toggleNavbar();

	$(window).resize( function() {
		toggleNavbar();	
	});

	/* navbar setting functions */
	function setNavbarLight() {
		$('.navbar').addClass('navbar-light');
		
	}

	function setNavbarTransparent() {
		$('.navbar').removeClass('navbar-light');
		
	}

	// hide collapsible menu
	$('.navbar-nav li a').click( function() {
		if($(this).parents('.navbar-collapse.collapse').hasClass('in')) {
			$('#main-nav').collapse('hide');
		}
	});

	$('#main-nav a, .hero-buttons a').on('click', function(e) {
		e.preventDefault();

		var target = $($(this).attr('href'));

		$('html, body').animate({
			scrollTop: target.offset().top
		}, 1000, 'easeInOutExpo');
	});




	/*----------------------/
	/* PARALLAX
	/*---------------------*/

	$('.full-width-parallax').parallax(0, 0.1);

	function setParallax() {
		if( $(window).width() > 1024 ) {
			$('.full-width-parallax').parallax(0, 0.1);
		}
	}

	setParallax();

	$(window).resize( function() {
		setParallax();
	});


	/*----------------------/
	/* SKILLS
	/*---------------------*/

	$('#skills').waypoint( function() {
		$('.chart').each( function() {
			$(this).easyPieChart({
				size: 150,
				barColor: '#ffae3f',
				trackColor: '#eee',
				scaleColor: false,
				lineWidth: 2,
				easing: 'easeOutExpo',
				animate: 2000
			});
		});
	},
	{
		offset: '70%'
	});


	


	/*----------------------/
	/* SCROLL TO TOP
	/*---------------------*/

	if( $(window).width() > 992 ) {
		$(window).scroll( function() {
			if( $(this).scrollTop() > 300 ) {
				$('.back-to-top').fadeIn();
			} else {
				$('.back-to-top').fadeOut();
			}
		});

		$('.back-to-top').click( function(e) {
			e.preventDefault();

			$('body, html').animate({
				scrollTop: 0
			}, 800, 'easeInOutExpo');
		});
	}


	/*----------------------/
	/* WORKS
	/*---------------------*/

	var $container = $('.work-item-list');

	new imagesLoaded( $container, function() {
		$container.isotope({
			itemSelector: '.work-item'
		});
	});

	$('#profile').on('click', function () {
        	window.open("http://www.profile.team", '_blank');
    	});

    	$('#collegenowgc').on('click', function () {
       		window.open("https://www.collegenowgc.org/find-scholarships/", '_blank');
    	});

    	$('#snapp').on('click', function () {
        	window.open("http://mainstream.snappdigital.com/", '_blank');
    	});
	
	$('#crowd').on('click', function () {
        	window.open("https://www.crowdpleaser.com.au/", '_blank');
    	});
    

	$('.work-item-filters a').click( function(e) {

		var selector = $(this).attr('data-filter');
		$container.isotope({
			filter: selector
		});		



		$('.work-item-filters a').removeClass('active');
		$(this).addClass('active');

		return false;
	});

	var originalTitle, currentItem;

	$('.media-popup').magnificPopup({
		type: 'image',
		callbacks: {
			beforeOpen: function() {

				// modify item title to include description
				currentItem = $(this.items)[this.index];
				originalTitle = currentItem.title;
				currentItem.title = '<h3>' + originalTitle + '</h3>' + '<p>' + $(currentItem).parents('.work-item').find('img').attr('alt') + '</p>';

				// adding animation
				this.st.mainClass = 'mfp-fade'; 
			},
			close: function() {
				currentItem.title = originalTitle; 
			}
		}
		
	});


	/*----------------------/
	/* SOCIAL NETWORK
	/*---------------------*/

	if( $(window).width() > 1024 ) {
		wow = new WOW({
			animateClass: 'animated'
		});

		wow.init();
	} else {
		$('.wow').attr('class', '');
	}


	/*----------------------/
	/* TOOLTIP
	/*---------------------*/

	if( $(window).width() > 1024 ) {
		$('body').tooltip({
			selector: "[data-toggle=tooltip]",
			container: "body"
		});
	}


	/*----------------------/
	/* AJAX CONTACT FORM
	/*---------------------*/

	$('#contact-form').parsley();

	$('.contact-form form').submit( function(e) {
		
		e.preventDefault();

		if( !$(this).parsley('isValid') )
			return;

		$theForm = $(this);
		$btn = $(this).find('#submit-button');
		$btnText = $btn.text();
		$alert = $(this).parent().find('.alert');

		$btn.find('.loading-icon').addClass('fa-spinner fa-spin ');
		$btn.prop('disabled', true).find('span').text("Sending...");

		$.post('contact.php', $(this).serialize(), function(data){
			
			$message = data.message;
			
			if( data.result == true ){
				$theForm.slideUp('medium', function() {
					$alert.removeClass('alert-danger');
					$alert.addClass('alert-success').html($message).slideDown('medium');
				});
			}else {
				$alert.addClass('alert-danger').html($message).slideDown('medium');
			}

			$btn.find('.loading-icon').removeClass('fa-spinner fa-spin ');
			$btn.prop('disabled', false).find('span').text($btnText);

		})
		.fail(function() { console.log('AJAX Error'); });

	});


	// init scrollspy except on Opera, it doesn't work because body has 100% height
	if ( !navigator.userAgent.match("Opera/") ) {
		$('body').scrollspy({
			target: '#main-nav'
		});
	}else {
		$('#main-nav .nav li').removeClass('active');
	}

});
