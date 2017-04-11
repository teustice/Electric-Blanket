//back-end
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

System.prototype.staticNotes = function(){
  this.grid[0][0] = "C4";
  this.grid[0][1] = "G4";
  this.grid[0][2] = "D4";
  this.grid[1][0] = "A4";
  this.grid[1][1] = "E3";
  this.grid[1][2] = "E6";
  this.grid[2][0] = "B3";
  this.grid[2][1] = "B2";
  this.grid[2][2] = "A6";
}

System.prototype.staticJSON = function(){
  var json = {
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
  this.grid[0][0] = json;
  this.grid[0][1] = json;
  this.grid[0][2] = json;
  this.grid[1][0] = json;
  this.grid[1][1] = json;
  this.grid[1][2] = json;
  this.grid[2][0] = json;
  this.grid[2][1] = json;
  this.grid[2][2] = json;
}

//we now use json to store the note and more
// System.prototype.updateNote = function(){
//   this.note = this.grid[this.coords[0]][this.coords[1]];
// }
//timeSig is a 2 elem array containing top and bottom values
System.prototype.initializeSounds = function() {
  this.player = this.conductor.load(this.grid[this.coords[0]][this.coords[1]]);

}

System.prototype.startSound = function(){
  this.player.play();
  // this.player.loop(true);
}

System.prototype.stopSound = function(){
  this.player.stop(true);
}

System.prototype.generateArray = function(){
  for (var i = 0; i < this.gridSize; i++){
    this.grid.push([]);
    for (var n = 0; n < this.gridSize; n++){
      this.grid[i].push([]);
    }
  }
  console.log(this.grid);
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



  //Begin sequence
  $("#play").click(function(){
    newSystem.startSound();
  });
  //Stop sequence
  $("#stop").click(function(){
    newSystem.stopSound();
  });

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
    } else if(keyCode === 39){
      newSystem.updateCoords(1,0);
    }else if(keyCode === 38){
      newSystem.updateCoords(0,-1);
    }else if(keyCode === 40){
      newSystem.updateCoords(0,1);
    }
    // newSystem.updateGrid();
    updateDomGrid(newSystem.coords);
    newSystem.stopSound();
    newSystem.reinitializeConductor();
    newSystem.initializeSounds();
    newSystem.startSound();

  });

});
