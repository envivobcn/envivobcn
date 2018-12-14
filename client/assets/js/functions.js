$(document).on('click', '.navbar-toggler[aria-expanded="false"]', function(){
	$('header .container').addClass('fixed-top');
	$('body').css({'height': '100%', 'overflow': 'hidden'});
});

$(document).on('click', '.navbar-toggler[aria-expanded="true"]', function(){
	$('header .container').removeClass('fixed-top');
	$('body').css({'height': 'initial', 'overflow': 'initial'});
});