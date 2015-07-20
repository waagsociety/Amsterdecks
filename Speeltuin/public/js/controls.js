var sideBarWidth = document.getElementById('sideBar').offsetWidth;
var trailLenght = 0.75;

var controls = function() {
  
};

function initMotionDisplayControls(motionDisplay) {
  var control = new controls();
  var gui = new dat.GUI({ autoPlace: false, width: sideBarWidth - 1, load: JSON });

  
    
  gui.remember(control);

  gui.add(motionDisplay, 'timeStep').min(0).max(0.1).onChange(function(val){
    motionDisplay.grid.timePassing = true;
    return val;
  });

  gui.add(motionDisplay.grid, 'T').min(0).max(motionDisplay.grid.variant.length).listen().onChange(function(newValue) {
    motionDisplay.grid.timePassing = false;
    motionDisplay.grid.setT(newValue);
  });

  gui.add(defaults.motionDisplay, 'particleSpdFactor').min(0.02).max(.9).onChange(function(newValue) {
    console.log("Value changed to:  ", newValue);
  });
  
  gui.add(window, 'trailLenght').min(0.5).max(0.95).onChange(function(newValue) {
    var background = motionDisplay.background,
        split = background.split(',');

    split.pop();
    
    split.push(1 - newValue + ')');
    motionDisplay.background = split.join(',');
    console.log(split);
    console.log(background);
  });

  var customContainer = document.getElementById('my-gui-container');
  customContainer.appendChild(gui.domElement);
}

function initVariationControls(motionDisplay){
  var wetBtn = document.getElementById('wetButton'), 
      dryBtn = document.getElementById('dryButton'),
      avgBtn = document.getElementById('avgButton');
  
  wetBtn.onclick = function() {
    this.classList.add("active");
    dryBtn.classList.remove('active');
    avgBtn.classList.remove('active');
    motionDisplay.grid.nextVariant('wet');
  },
  dryBtn.onclick = function() {
    this.classList.add("active");
    wetBtn.classList.remove('active');
    avgBtn.classList.remove('active');
    motionDisplay.grid.nextVariant('dry');
  },
  avgBtn.onclick = function() {
    this.classList.add("active");
    wetBtn.classList.remove('active');
    dryBtn.classList.remove('active');
    motionDisplay.grid.nextVariant('avg');
  }
}

//function perspectiveView(motionDisplay) {
//    motionDisplay.canvas.style.transform = "rotateX(5deg) translateY( -100% ) scale(1.1)"; 
//}