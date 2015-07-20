var sideBarWidth = document.getElementById('sideBar').offsetWidth;
var trailLenght = 0.75;
var controls = function() {
  
};

function initMotionDisplayControls(motionDisplay) {
  var gui = new dat.GUI({ autoPlace: false, width: sideBar });
  var control = new controls();
  gui.add(motionDisplay, 'timeStep').min(0).max(0.1).onChange(function(val){
    motionDisplay.grid.timePassing = true;
    return val;
  });
  gui.add(motionDisplay.grid, 'T').min(0).max(motionDisplay.grid.variant.length).onChange(function(newValue) {
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
    motionDisplay.grid.nextVariant();
  },
  dryBtn.onclick = function() {
    this.classList.add("active");
    motionDisplay.grid.nextVariant();
  },
  avgBtn.onclick = function() {
    this.classList.add("active");
    motionDisplay.grid.nextVariant();
  }
}