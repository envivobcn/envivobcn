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
	}
}


