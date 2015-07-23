$(document).ready(init);

function init(){
	// create buttons for loading fields
	Object.keys(fieldSets).forEach(function(name){
		var $element = $('<a href="#' + name + '" >' + name + '</a>');
		$element.attr('data-setname', name).on('click', function(e){

			e.preventDefault();
			loadField(fieldSets[this.dataset.setname]);
			$(this).blur(); // or else pressing enter while in the overlay will trigger load again
			return false;

		}).appendTo(document.body);
	});

	document.addEventListener('keyup', function(e){
		console.log(e.keyCode);
		if(e.keyCode === 13){
			md.debugField = !md.debugField;
			if(md.debugField) md.showFieldSpeed = !md.showFieldSpeed;

			return;
		}

		if(e.keyCode === 86){
			md.grid.nextVariant();
			return;
		}

		if(e.keyCode === 84){
			md.grid.nextTime();
			return;
		}

		if(e.keyCode === 80){
			md.grid.toggleTimePassing();
		}
	});
}

function loadField(options){

	fieldsLoader(options, function(err, fields){
		console.log(err || 'all fields loaded');
		if(err) return;

		var $overlay = $('body').overlay().css({
			overflow: 'scroll'
		});

		var dynamicGridOptions = {
				width: $overlay.innerWidth(),
				height: $overlay.innerHeight(),	
			},
			importedGridOptions = {
				width: options.x,
				height: options.y,
				fields: fields,
				timePassing: true
			};

		var winAspect = $overlay.innerWidth / $overlay.innerHeight(),
			fieldAspect = importedGridOptions.width / importedGridOptions.height,
			wider = fieldAspect > winAspect,
			scale = wider ? $overlay.innerWidth() / importedGridOptions.width : $overlay.innerHeight() / importedGridOptions.height;

		var motionDisplay = new MotionDisplay({
			debugField: false,
			//gridOptions: dynamicGridOptions
			gridOptions: importedGridOptions,
			width: Math.floor(importedGridOptions.width * scale),
			height: Math.floor(importedGridOptions.height * scale),
			clipPath: clipPaths[options.setName]
		});
		window.md = motionDisplay;
		
		$overlay.append(motionDisplay.canvas);

		motionDisplay.canvas.style.width = Math.floor(importedGridOptions.width * scale) + 'px';
		motionDisplay.canvas.style.height = Math.floor(importedGridOptions.height * scale) + 'px';

		$(motionDisplay.canvas).on('click', function(e){
			console.log(motionDisplay.grid.getLocalV(
				e.offsetX / (motionDisplay.width / motionDisplay.grid.width),
				e.offsetY / (motionDisplay.height / motionDisplay.grid.height)
			));
		});

		$overlay.on('remove', function(e){
			motionDisplay.stop();
		});

	});
}