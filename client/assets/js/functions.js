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

$(document).on('click', '#artists-go-places', function(){
	$('html').animate({
    scrollTop: $("#place-list-artists-results").offset().top
 	}, 600);
});

$(document).on('click', '#places-filters-mob-trigger', function(){
	$('#places-filters-mob-results').removeClass('d-none');
  $('#places-filters').removeClass('d-none').addClass('position-absolute').css({'z-index':'998', 'top':0, 'left':0, 'margin-bottom':'100px'});
  $('#places-results, footer, #places-filters-mob-trigger').addClass('d-none');
  window.scrollTo(0, 0);
});

$(document).on('click', '#places-filters-mob-results', function(){
	$('#places-filters-mob-results').addClass('d-none');
  $('#places-filters').addClass('d-none').removeClass('position-absolute').css({'z-index':'1', 'top':'inherit'});
  $('#places-results, footer, #places-filters-mob-trigger').removeClass('d-none');
  window.scrollTo(0, 0);
});

$(document).on('scroll', function(){

	if($('#place-list-artists-intro').length > 0){
		placesFiltersMobArtists();
	}else if($('.place-list').length > 0){
		placesFiltersMobPlaces();
	}else{
		return false;
	}

});

function placesFiltersMobArtists(){
	var h = $('#place-list-artists-intro').height();
	var hList = $('.place-list').height();
	var p = $(window).scrollTop();
	if(p >= h){
		$('#places-filters-mob').removeClass('d-none');
		if(p > hList){
			$('#places-filters-mob').addClass('d-none');
	  }else{
	    $('#places-filters-mob').removeClass('d-none');
	  }
	}else if(p <= h && hList != 0){
		$('#places-filters-mob').addClass('d-none');
	}
}

function placesFiltersMobPlaces() {
	var fl = $('#places-filters-mob').length;

	if(fl > 0){
	  $(document).on('scroll', function(){
	    var h = $('.place-list').height();
	    var p = $(window).scrollTop() + 480;
	    if(p > h && h != 0){
	      $('#places-filters-mob').addClass('d-none');
	    }else{
	      $('#places-filters-mob').removeClass('d-none');
	    }
	    return false;
	  });
	}else{
	  $('#places-filters-mob').fadeIn(0);
	}	
}



