//back-end
function System(){
  this.grid = [];
  this.coords = [0,0];
  this.gridSize = 3;
  this.player = null;
}

System.prototype.initializeSounds = function(timeSig, tempo, notes) {
  var conductor = new BandJS();
  conductor.setTimeSignature(4,4);
  conductor.setTempo(120);

  var piano = conductor.createInstrument();
  piano.note('quarter','E4, C4, G4', true);

  this.player = conductor.finish();
}

System.prototype.startSound = function(){
  this.player.play();
  this.player.loop(true);
}

System.prototype.stopSound = function(){
  this.player.stop(true);
}

System.prototype.generateArray = function(){
  for (var i = 0; i < this.gridSize; i++){
    this.grid.push([]);
    for (var n = 0; n < this.gridSize; n++){
      this.grid[i].push(`-`);
    }
  }
}

System.prototype.updateCoords = function(x,y){
  if(x === -1 && this.coords[0] > 0){
    this.coords[0] += x;
  } else if(y === -1 && this.coords[1] > 0) {
    this.coords[1] += y;
  } else if(x === 1 && this.coords[0] < (this.gridSize-1)) {
    this.coords[0] += x;
  } else if(y === 1 && this.coords[1] < (this.gridSize-1)) {
    this.coords[1] += y;
  }
}

System.prototype.generateArray = function(){
  for (var i = 0; i < this.gridSize; i++){
    this.grid.push([]);
    for (var n = 0; n < this.gridSize; n++){
      this.grid[i].push(`-`);
    }
  }
}

System.prototype.updateCoords = function(x,y){
  if(x === -1 && this.coords[0] > 0){
    this.coords[0] += x;
  } else if(y === -1 && this.coords[1] > 0) {
    this.coords[1] += y;
  } else if(x === 1 && this.coords[0] < (this.gridSize-1)) {
    this.coords[0] += x;
  } else if(y === 1 && this.coords[1] < (this.gridSize-1)) {
    this.coords[1] += y;
  }
}

System.prototype.updateGrid = function(){
  for (var i = 0; i < this.gridSize; i++){
    for (var n = 0; n < this.gridSize; n++){
      this.grid[i][n] = "-";
    }
  }
  this.grid[this.coords[0]][this.coords[1]] = "X"
}

//front-end
var generateDomGrid = function(){
  for (var i = 0; i < 3; i++){
    $(".container").append(`<div class="grid-row" id="row-${i}"></div>`);
    for (var n = 0; n < 3; n++) {
        $(`#row-${i}`).append(`<div class="grid-space" id="${n}${i}"></div>`);
    }
  }
}

var updateDomGrid = function(coords){
  for (var i = 0; i < 3; i++){
    for (var n = 0; n < 3; n++) {
      if($(`#${i}${n}`).hasClass("active")){
        $(`#${i}${n}`).removeClass("active")
      }
    }
  }
  $(`#${coords[0]}${coords[1]}`).addClass("active");
}

$(document).ready(function(){
  //new is apparently a bad way of initializing objects
  var newSystem = new System();
  newSystem.initializeSounds();

  //Begin sequence
  $("#play").click(function(){
    newSystem.startSound();
  });
  //Stop sequence
  $("#stop").click(function(){
    newSystem.stopSound();
  });

  newSystem.generateArray();
  generateDomGrid();

  $(document).keydown(function(event){
    var keyCode = event.keyCode;
    //left: 37 right: 39 up: 38 down: 40
    if(keyCode === 37){
      newSystem.updateCoords(-1,0);
    } else if(keyCode === 39){
      newSystem.updateCoords(1,0);
    }else if(keyCode === 38){
      newSystem.updateCoords(0,-1);
    }else if(keyCode === 40){
      newSystem.updateCoords(0,1);
    }
    newSystem.updateGrid();
    updateDomGrid(newSystem.coords);
  });

});
