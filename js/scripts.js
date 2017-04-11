//back-end
function Data() {
  this.json = {
    timeSignature: [4, 4],
    tempo: 100,
    instruments: {
      rightHand: {
          name: 'square',
          pack: 'oscillators'
      },
      leftHand: {
          name: 'triangle',
          pack: 'oscillators'
      }
    },
    notes: {
      // Shorthand notation
      rightHand: [
        'quarter|E5, F#4|tie',
        'quarter|rest',
        'quarter|E5, F#4',
        'quarter|rest'
      ],
      // More verbose notation
      leftHand: [
          {
            type: 'note',
            pitch: 'C4',
            rhythm: 'half'
          }
      ]
    }
  };
}

function System(){
  this.grid = [];
  this.coords = [0,0];
  this.gridSize = 3;
  this.conductor = null;
  this.player = null;
}

System.prototype.initializeConductor = function(){
  this.conductor = new BandJS();
}
System.prototype.reinitializeConductor = function(){
  this.conductor.audioContext.close();
  this.conductor.destroy();
}

System.prototype.staticJSON = function(){
  this.grid[0][0] = new Data();
  this.grid[0][1] = new Data();
  this.grid[0][2] = new Data();
  this.grid[1][0] = new Data();
  this.grid[1][1] = new Data();
  this.grid[1][2] = new Data();
  this.grid[2][0] = new Data();
  this.grid[2][1] = new Data();
  this.grid[2][2] = new Data();
}

System.prototype.initializeSounds = function() {
  this.player = this.conductor.load(this.grid[this.coords[0]][this.coords[1]].json);
}

System.prototype.startSound = function(){
  this.player.play();
  this.player.loop(true);
}

System.prototype.stopSound = function(){
  this.player.stop(true);
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

//front-end
var generateDomGrid = function(){
  for (var i = 0; i < 3; i++){
    $(".wrapper").append(`<div class="grid-row" id="row-${i}"></div>`);
    for (var n = 0; n < 3; n++) {
        $(`#row-${i}`).append(`<div class="grid-space" id="s${n}${i}"></div>`);
    }
  }
}

var updateDomGrid = function(coords){
  for (var i = 0; i < 3; i++){
    for (var n = 0; n < 3; n++) {
      if($(`#s${i}${n}`).hasClass("active")){
        $(`#s${i}${n}`).removeClass("active")
      }
    }
  }
  $(`#s${coords[0]}${coords[1]}`).addClass("active");
}

var moveLR = function(direction) {
  var displacement = $(`#s0${1}`).css("width");
  displacement = direction * parseInt(displacement.replace(/px/, ""),10);
  console.log(displacement);
  var current = 0;
  var total = 0;
  for (var i = 0; i < 3; i++){
    for (var n = 0; n < 3; n++) {
      current = parseInt(($(`#s${i}${n}`).css("left")).replace(/px/, ""),10);
      total = current+displacement;
      // $(`#s${i}${n}`).css("left", total);
      $(`#s${i}${n}`).animate({left:total}, 400);
    }
  }
}

var moveUD = function(direction) {
  var displacement = $(`#s0${1}`).css("height");
  displacement = direction * parseInt(displacement.replace(/px/, ""),10);
  console.log(displacement);
  var current = 0;
  var total = 0;
  for (var i = 0; i < 3; i++){
    for (var n = 0; n < 3; n++) {
      current = parseInt(($(`#s${i}${n}`).css("top")).replace(/px/, ""),10);
      total = current+displacement;
      // $(`#s${i}${n}`).css("top", total);
      $(`#s${i}${n}`).animate({top:total}, 400);
    }
  }
}

$(document).ready(function(){
  //new is apparently a bad way of initializing objects
  var newSystem = new System();

  newSystem.generateArray();
  newSystem.staticJSON();
  newSystem.initializeConductor();
  newSystem.initializeSounds();
  generateDomGrid();

  $(document).keydown(function(event){
    var keyCode = event.keyCode;
    //left: 37 right: 39 up: 38 down: 40
    if(keyCode === 37){
      newSystem.updateCoords(-1,0);
      moveLR(1);
    } else if(keyCode === 39){
      newSystem.updateCoords(1,0);
      moveLR(-1);
    }else if(keyCode === 38){
      newSystem.updateCoords(0,-1);
      moveUD(1);
    }else if(keyCode === 40){
      newSystem.updateCoords(0,1);
      moveUD(-1);
    }

    //back-end
    // newSystem.updateGrid();
    updateDomGrid(newSystem.coords);
    // newSystem.stopSound();
    // newSystem.reinitializeConductor();
    // newSystem.initializeSounds();
    // newSystem.startSound();
  });
});
