$(document).on('click', '.navbar-toggler[aria-expanded="false"]', function(){
	$('header .container').addClass('fixed-top');
	$('body').css({'height': '100%', 'overflow': 'hidden'});
	var h = $('header .container').height();
	$('#main').css('margin-top', h);
});

$(document).on('click', '.navbar-toggler[aria-expanded="true"]', function(){
	$('header .container').removeClass('fixed-top');
	$('body').css({'height': 'initial', 'overflow': 'initial'});
	$('#main').css('margin-top', '0');
});

$(document).on('click', '#districtList a, #musicGenresList a', function(){
	$('.sitemap-header').addClass('collapsed');
	$('#districtList, #musicGenresList').removeClass('show');
});

/* $(document).on('click', 'a', function(){
	document.cookie = "cookieconsent_status=allow";
	$('.cc-banner').fadeOut(0);
}); */