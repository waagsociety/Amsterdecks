//$('.sideBar section').click(function(){
//	$(this).addClass('open').find('ul').slideDown();
//});

//$('.sideBar section h1').click(function(){
//	$(this).removeClass('open').find('ul').slideUp();
//});

$(document).on('click', '.sideBar section', function() { 
	if($(this).hasClass('open')){
		$(this).removeClass('closed');
		$(this).addClass('open');
		$(this).find('ul').slideDown();
	}
	if($(this).hasClass('closed')){
		$(this).removeClass('closed');
		$(this).addClass('open');
		$(this).find('ul').slideDown();
	}
});
$(document).on('click', '.open h1', function() { 
	$('.open').removeClass('open').find('ul').slideUp("fast", function(){
     $('.accordionWidget').addClass('closed');
  });
});

