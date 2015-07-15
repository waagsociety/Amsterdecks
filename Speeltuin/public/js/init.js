function init(){
	//document.querySelector('section').appendChild(motionDisplay.canvas);
	var importedGridOptions = {
			width: window.exportX,//1107,//336,
			height: window.exportY,//1103,//314,
			fields: window.exportBuffer,
      timePassing: true
		};

	var motionDisplay = new MotionDisplay({
		//debugField: true,
    background: 'rgba(50,50,50,0.1)',
		gridOptions: importedGridOptions,
    width: importedGridOptions.width * 3,
    height: importedGridOptions.height * 3
	});
	window.md = motionDisplay;
	
  document.getElementById('map').appendChild(motionDisplay.canvas);
  document.getElementById('varButton').onclick = function() {
  
			motionDisplay.grid.nextVariant();
  }
	document.addEventListener('keyup', function(e){
		console.log(e.keyCode);
		if(e.keyCode === 13){
			if(motionDisplay.debugField){
				motionDisplay.debugField = false;
				motionDisplay.start();
			} else {
				motionDisplay.debugField = true;
				motionDisplay.running = false;
			}

			return;
		}

		if(e.keyCode === 86){
			motionDisplay.grid.nextVariant();
			return;
		}

		if(e.keyCode === 84){
			motionDisplay.grid.nextTime();
			return;
		}

		if(e.keyCode === 80){
			motionDisplay.grid.toggleTimePassing();
		}
	});

	$(motionDisplay.canvas).on('click', function(e){
		console.log(motionDisplay.grid.getLocalV({ x: e.offsetX, y: e.offsetY }));
		console.log(motionDisplay.grid.getLocalV({ x: e.offsetX + Math.random(), y: e.offsetY + Math.random() }));
	});
}

$(document).ready(init);