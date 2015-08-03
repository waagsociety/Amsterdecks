$(document).ready(init);

function init(){
	// create buttons for loading fields
	Object.keys(fieldSets).forEach(function(name){
    var sideControlContainer = document.getElementById('sideContainer');
    var element = document.createElement('a');

    element.innerHTML = name;
    element.href = "#" + name + "" ;
    element.id = name;
    element.classList.add('btn', 'btn-1','btn-1a', name);
    element.setAttribute('data-setname', name);

    element.onclick = function(e){
      e.preventDefault();
			loadField(fieldSets[this.dataset.setname]);
			return false;
    };
    sideControlContainer.appendChild(element);
	});
}

function loadField(options){

  var mapElement = document.getElementById('map');

  options.path = 'public/fields/';

  fieldsLoader(options, function(err, fields){
    console.log(err || 'starting field system');
    if(err) throw(err);

    //document.querySelector('section').appendChild(motionDisplay.canvas);
    var dynamicGridOptions = {
      width: $(mapElement).innerWidth(),
      height: $(mapElement).innerHeight(),
    },
    importedGridOptions = {
      width: options.x,//1107,//336,
      height: options.y,//1103,//314,
      fields: fields,
      timePassing: true
    };

    var winAspect = $(mapElement).innerWidth() / $(mapElement).innerHeight(),
			fieldAspect = importedGridOptions.width / importedGridOptions.height,
			wider = fieldAspect > winAspect,
			scale = wider ? $(mapElement).innerWidth() / importedGridOptions.width : $(mapElement).innerHeight() / importedGridOptions.height;

    var motionDisplay = new MotionDisplay({
      debugField: false,
      background: 'rgba(76,101,127,'+ trailLenght +')',
      gridOptions: importedGridOptions,
			width: Math.floor(importedGridOptions.width * scale),
			height: Math.floor(importedGridOptions.height * scale),
			clipPath: clipPaths[options.setName]
    });
    window.md = motionDisplay;

    initMotionDisplayControls(motionDisplay);
    initVariationControls(motionDisplay);

    mapElement.appendChild(motionDisplay.canvas);

    motionDisplay.canvas.style.width = Math.floor(importedGridOptions.width * scale) + 'px';
		motionDisplay.canvas.style.height = Math.floor(importedGridOptions.height * scale) + 'px';


    var fieldButton = document.getElementById('fieldBtn');
    fieldButton.onclick=function(){
        md.debugField = !md.debugField;
        if(md.debugField) md.showFieldSpeed = !md.showFieldSpeed;
    };

    $(motionDisplay.canvas).on('click', function(e){
      console.log(motionDisplay.grid.getLocalV({ x: e.offsetX, y: e.offsetY }));
      console.log(motionDisplay.grid.getLocalV({ x: e.offsetX + Math.random(), y: e.offsetY + Math.random() }));
    });
  });
}

function pageLoader(){
  var loaderBox = document.getElementById("loader");
  var loaderPage = document.getElementById("loaderPage");
  loaderPage.remove();
  loaderBox.className = "dark";
};

function loadFirstView(){  
  var firstViewBtn = document.getElementById("grAmsterdam");
  firstViewBtn.click();
  firstViewBtn.className += ' active';
}

function preloadImage(url)
{
    var img=new Image();
    img.src=url;
}  
preloadImage("public/images/intro_loader.gif");
setTimeout(pageLoader, 5000);

window.onload = function(){
  loadFirstView();
}