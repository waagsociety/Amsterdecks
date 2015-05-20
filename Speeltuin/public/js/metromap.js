$('.views .metromap').click(function(){
	// SVG Map
	var watermap = document.getElementById("map");
		d3.xml("data/metromap.svg", function(xml) {
			watermap.appendChild(xml.documentElement);
			$(document).on('click', '.open li p', function() { 
				d3.selectAll("rect").style("display", "none");	
				d3.selectAll(".prinsengracht rect").style("display", "block");	
				d3.selectAll(".prinsengracht rect").style("fill", "red");	
				
				d3.selectAll(".prinsengracht rect").style("position", "absolute");	
			});
	});
});

$(document).on('click', '.open h1', function() { 
	$('.open').removeClass('open').find('ul').slideUp("fast", function(){
     $('.accordionWidget').addClass('closed');
  });
});
