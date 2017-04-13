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
    },
    notes: {
      rightHand: [],
    }
  };
}

function System() {
  this.grid = [];
  this.coords = [0, 0];
  this.gridSize = 3;
  this.conductor = null;
  this.player = null;
  this.keys = [];
}

System.prototype.initializeConductor = function() {
  this.conductor = new BandJS();
}

System.prototype.reinitializeConductor = function() {
  this.conductor.audioContext.close();
  this.conductor.destroy();
}

System.prototype.staticJSON = function() {
  this.grid[0][0] = new Data("rgb(234,120,98)");
  this.grid[0][1] = new Data(" rgb(254,240,145) ");
  this.grid[0][2] = new Data("rgb(53,209,133)");
  this.grid[1][0] = new Data("rgb(246,86,71)");
  this.grid[1][1] = new Data("rgba(240,240,240,1)");
  this.grid[1][2] = new Data("rgb(86,185,199)");
  this.grid[2][0] = new Data("rgb(214,105,137)");
  this.grid[2][1] = new Data("rgb(105,96,160)");
  this.grid[2][2] = new Data("rgb(83,129,217)");

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

System.prototype.loadSounds = function() {
  this.player = this.conductor.load(this.grid[this.coords[0]][this.coords[1]].json);
}

System.prototype.startSound = function() {
  this.player.play();
  this.player.loop(true);
}

System.prototype.stopSound = function() {
  this.player.stop(true);
}

System.prototype.getCoords = function(){
  return this.coords;
}

System.prototype.updateCoords = function(){
  if(this.keys.includes(37) && this.keys.includes(38)){
    this.coords = [0,0]
  } else if(this.keys.includes(38) && this.keys.includes(39)) {
    this.coords = [2,0]
  } else if(this.keys.includes(39) && this.keys.includes(40)) {
    this.coords = [2,2]
  } else if(this.keys.includes(40) && this.keys.includes(37)) {
    this.coords = [0,2]
  } else if(this.keys[this.keys.length-1] === 38) {
    this.coords = [1,0]
  } else if(this.keys[this.keys.length-1] === 39) {
    this.coords = [2,1]
  } else if(this.keys[this.keys.length-1] === 40) {
    this.coords = [1,2]
  } else if(this.keys[this.keys.length-1] === 37) {
    this.coords = [0,1]
  } else if(this.keys.length === 0) {
    this.coords = [1,1]
  }
}

System.prototype.generateArray = function() {
  for (var i = 0; i < this.gridSize; i++) {
    this.grid.push([]);
    for (var n = 0; n < this.gridSize; n++) {
      this.grid[i].push(`-`);
    }
  }
}

System.prototype.addKeys = function(key){
  if(!this.keys.includes(key)){
    if(this.keys.length < 2){
      this.keys.push(key);
    } else {
      this.keys.shift();
      this.keys.push(key);
    }
  }
}

System.prototype.removeKeys = function(key){
  var toRemove = 0;
  if(this.keys.indexOf(key) === 0){
    toRemove = this.keys.shift();
  } else {
    toRemove = this.keys.pop();
  }
  return toRemove;
}

//front-end
var generateDomGrid = function(){
  for (var i = 0; i < 3; i++){
    $(".container").append(`<div class="grid-row" id="row-${i}"></div>`);
    for (var n = 0; n < 3; n++) {
        $(`#row-${i}`).append(`<div class="grid-space" id="s${n}${i}"><div class="circle-boy"></div></div>`);
    }
  }
}

var updateDomGrid = function(coords) {
  for (var i = 0; i < 3; i++) {
    for (var n = 0; n < 3; n++) {
      if ($(`#s${i}${n}`).hasClass("active")) {
        $(`#s${i}${n}`).removeClass("active")
      }
    }
  }
  $(`#s${coords[0]}${coords[1]}`).addClass("active");
}

var highlight = function(system){
  var coords = system.getCoords();
  var color = system.grid[coords[0]][coords[1]].color;

  $("body, .circle-boy").css({
    // "background-color": color,
    // transition: "background-color .4s ease-in-out"
  })
  $(`#s${coords[0]}${coords[1]} .circle-boy`).css({
    // "background-color": `${system.grid[coords[0]][coords[1]].color}`,
    width: "100%",
    height: "100%",
    "margin" : 0
  });
}
// "box-shadow": `inset 5px 5px 20px -3px black`,
// transition: "box-shadow .2s ease-in-out",

var resetHighlight = function(system){
  var coords = system.getCoords();
  $(`.circle-boy`).css({
    width: "60%",
    height: "60%",
    "margin" : "20%",
    // "box-shadow": "inset 0 0 0 0"
  });
  if(coords[0] === 1 && coords[1] === 1) {
    $(`#s11 .circle-boy`).css({
      width: "100%",
      height: "100%",
      "margin" : "0%"
    });
  }
}

var clearInstructions = function(){
  $("#instructions").hide();
  return false;
}

$(document).ready(function() {
  var newSystem = new System();
  var instructions = true;
  newSystem.generateArray();
  newSystem.initializeConductor();
  newSystem.staticJSON();
  newSystem.loadSounds();
  generateDomGrid();

  $(document).keydown(function(event) {
    if(instructions){instructions = clearInstructions(instructions);}
    var keyCode = event.keyCode;
    if(!newSystem.keys.includes(keyCode)){
      //left: 37 right: 39 up: 38 down: 40
      newSystem.addKeys(keyCode);
      newSystem.updateCoords();
      resetHighlight(newSystem);
      highlight(newSystem);
      newSystem.stopSound();
      newSystem.reinitializeConductor();
      newSystem.loadSounds();
      newSystem.startSound();
    }
  });

  $(document).keyup(function(event){
    var keyCode = event.keyCode;
    var toRemove = 0;
    //left: 37 right: 39 up: 38 down: 40
    if(newSystem.keys.includes(keyCode)){
      toRemove = newSystem.removeKeys(keyCode);
      newSystem.updateCoords();
      resetHighlight(newSystem);
      highlight(newSystem);
      newSystem.stopSound();
      newSystem.reinitializeConductor();
      newSystem.loadSounds();
      newSystem.startSound();
    }
  });
});
