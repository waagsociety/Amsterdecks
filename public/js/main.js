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




// Slider Controls
var marcrofytenval = $('#macrofyten-slider').val();
$("#macrofyten-slider").noUiSlider({
		start: [ 100 ],
		range: {
			'min': [   0 ],
			'max': [ 100 ]
		}
});
$("#macrofyten-slider").on({
	change: function(){
		marcrofytenval = $('#macrofyten-slider').val();
		if( marcrofytenval < 30){
			d3.selectAll(".prinsengracht rect").style("fill", "red");	
		}
		else{
			d3.selectAll(".prinsengracht rect").style("fill", "blue");	
		}
	}
});


$("#macrofyten-slider").Link('lower').to($("#macrofyten-val"));

$("#plantminnend-slider").noUiSlider({
		range: {
				'min': 0,
				'10%': 10,
				'20%': 20,
				'30%': 30,
				'40%': 40,
				'50%': 50,
				'60%': 60,
				'70%': 70,
				'80%': 80,
				'90%': 90,
				'max': 100
		},
		format: {
			to: function ( value ) {
			return value + '%';
			},
			from: function ( value ) {
			return value.replace(',-', '');
			}
		},
		snap: true,
		start: [0, 100]
});
$("#plantminnend-slider").Link('lower').to($("#plantminnend-skip-value-lower"));
$("#plantminnend-slider").Link('upper').to($("#plantminnend-skip-value-upper"));
			

$("#zuurstoftolerante-slider").noUiSlider({
		range: {
				'min': 0,
				'10%': 10,
				'20%': 20,
				'30%': 30,
				'40%': 40,
				'50%': 50,
				'60%': 60,
				'70%': 70,
				'80%': 80,
				'90%': 90,
				'max': 100
		},
		format: {
			to: function ( value ) {
			return value + '%';
			},
			from: function ( value ) {
			return value.replace(',-', '');
			}
		},
		snap: true,
		start: [0, 100]
});

$("#zuurstoftolerante-slider").Link('lower').to($("#zuurstoftolerante-skip-value-lower"));
$("#zuurstoftolerante-slider").Link('upper').to($("#zuurstoftolerante-skip-value-upper"));