
const form = document.querySelector('form');
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const subject = document.getElementById('subject');
const mess = document.getElementById('message');
function sendEmail(){
	const bodyMessage = `Full Name: ${fullName.value} <br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Message: ${mess.value}`
	Email.send({
		// SecureToken : "257e3c45-7e6b-4b0c-a39a-bb51ac01c260",
		Host : "smtp.elasticemail.com",
		Username : "baas869.ng@gmail.com",
		Password : "E36672720E3396C8DDC337E37D2E5DD9CDF7",
		// Host : "smtp.email.com",
		// Username : "baas869.ng@gmail.com",
		// Password : "zopfedcoebaxoiwv",
		To : 'baas869.ng@gmail.com',
		From : "baas869.ng@gmail.com",
		Subject : subject,
		Body : bodyMessage
	}).then(
	  message => {
		if( message == 'OK'){
			Swal.fire({
				title: "Success!",
				text: "Message sent successfully!",
				icon: "success"
			  });
		}
	  }
	);
}

function checkInput() {
	const items = document.querySelectorAll('.item');

	for (const item of items){
		if(item.value == ''){
			item.classList.add('error');
			item.parentElement.classList.add('error');
		}
		if(items[1].value != ""){
			checkEmail()
		}
		items[1].addEventListener('keyup', () => {
			checkEmail()
		})
		item.addEventListener("keyup", () => {
			if(item.value != ''){
				item.classList.remove('error');
				item.parentElement.classList.remove('error');
			}
			else{
				item.classList.add('error');
				item.parentElement.classList.add('error');
			}
		});
	}
}

function checkEmail() {
	const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
	const errorTxtEmail = document.querySelector('.error-txt.email')
	if(!email.value.match(emailRegex)){
		email.classList.add('error')
		email.parentElement.classList.add('error')
		if (email.value != ''){
			errorTxtEmail.innerText = 'Enter a valid email address'
		}
		else{
			errorTxtEmail.innerText = "Email Address can't be blank"
		}
	}
	else{
		email.classList.remove('error')
		email.parentElement.classList.remove('error')
	}
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	checkInput();

	if(!fullName.classList.contains('error') && !email.classList.contains('error') && !phone.classList.contains('error') && !subject.classList.contains('error') && !mess.classList.contains('error')){
		sendEmail();
		
		form.reset();
		return false;
	}
	
});



(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

})(jQuery);