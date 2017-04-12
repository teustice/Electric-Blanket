//back-end
function Data(color) {
  this.color = color;
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
      rightHand: [],
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

System.prototype.getColors = function(){
  var arr = [];
  arr.push(this.grid[this.coords[0]][this.coords[1]].color);

  if(this.grid[this.coords[0]][this.coords[1]-1]) {
    arr.push(this.grid[this.coords[0]][this.coords[1]-1].color);
  } else {
    arr.push("white");
  }

  if(this.grid[this.coords[0]][this.coords[1]+1]) {
    arr.push(this.grid[this.coords[0]][this.coords[1]+1].color);
  } else {
    arr.push("white");
  }

  if(this.grid[this.coords[0]-1]) {
    arr.push(this.grid[this.coords[0]-1][this.coords[1]].color);
  } else {
    arr.push("white");
  }

  if(this.grid[this.coords[0]+1]) {
    arr.push(this.grid[this.coords[0]+1][this.coords[1]].color);
  } else {
    arr.push("white");
  }

  return arr;
}

System.prototype.initializeConductor = function(){
  this.conductor = new BandJS();
}
System.prototype.reinitializeConductor = function(){
  this.conductor.audioContext.close();
  this.conductor.destroy();
}

System.prototype.staticJSON = function(){

  this.grid[0][0] = new Data("lightblue");
  this.grid[0][1] = new Data("blue");
  this.grid[0][2] = new Data("navy");
  this.grid[1][0] = new Data("lightgreen");
  this.grid[1][1] = new Data("green");
  this.grid[1][2] = new Data("darkgreen");
  this.grid[2][0] = new Data("lightpink");
  this.grid[2][1] = new Data("salmon");
  this.grid[2][2] = new Data("red");

  this.grid[0][0].json.notes.rightHand = ['sixteenth|B2|tie', 'sixteenth|D3|tie', 'sixteenth|G3|tie'];
  this.grid[0][1].json.notes.rightHand = ['sixteenth|B2|tie', 'sixteenth|E3|tie', 'sixteenth|G3|tie'];
  this.grid[0][2].json.notes.rightHand = ['sixteenth|A2|tie', 'sixteenth|D3|tie', 'sixteenth|F3|tie'];
  this.grid[1][0].json.notes.rightHand = ['sixteenth|G3|tie', 'sixteenth|B3|tie', 'sixteenth|D4|tie'];
  this.grid[1][1].json.notes.rightHand = ['sixteenth|C3|tie', 'sixteenth|E3|tie', 'sixteenth|G3|tie'];
  this.grid[1][2].json.notes.rightHand = ['sixteenth|B2|tie', 'sixteenth|D3|tie', 'sixteenth|G3|tie'];
  this.grid[2][0].json.notes.rightHand = ['sixteenth|B2|tie', 'sixteenth|D3|tie', 'sixteenth|F3|tie'];
  this.grid[2][1].json.notes.rightHand = ['sixteenth|C3|tie', 'sixteenth|F3|tie', 'sixteenth|A3|tie'];
  this.grid[2][2].json.notes.rightHand = ['sixteenth|B2|tie', 'sixteenth|D3|tie', 'sixteenth|F3|tie'];
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

var generateCircle = function(){
  $(".container").append(`<div id="circle"></div>`);
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


var moveCircle = function(system) {
  var colors = system.getColors();
  $(`#circle`).css("background-color", colors[0]);
  $(`#circle`).css("border-top-color", colors[1]);
  $(`#circle`).css("border-bottom-color", colors[2]);
  $(`#circle`).css("border-left-color", colors[3]);
  $(`#circle`).css("border-right-color", colors[4]);

}

$(document).ready(function(){
  //new is apparently a bad way of initializing objects
  var newSystem = new System();

  newSystem.generateArray();
  newSystem.staticJSON();
  newSystem.initializeConductor();
  newSystem.initializeSounds();
  generateCircle();
  // generateDomGrid();
  moveCircle(newSystem);

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

    moveCircle(newSystem);
    //back-end
    // updateDomGrid(newSystem.coords);
    newSystem.stopSound();
    newSystem.reinitializeConductor();
    newSystem.initializeSounds();
    newSystem.startSound();
  });
});
