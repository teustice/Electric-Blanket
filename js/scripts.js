//back-end
function Data() {
  this.json = {
    timeSignature: [4, 4],
    tempo: 130,
    instruments: {
      rightHand: {
        name: 'square',
        pack: 'oscillators'
      },
    },
    notes: {
      // Shorthand notation
      rightHand: [
        'sixteenth|B3|tie',
        'sixteenth|E4|tie',
        'sixteenth|G4|tie'
      ],
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
}

System.prototype.initializeConductor = function() {
  this.conductor = new BandJS();
}
System.prototype.reinitializeConductor = function() {
  this.conductor.audioContext.close();
  this.conductor.destroy();
}

System.prototype.staticJSON = function() {
  this.grid[0][0] = new Data();
  this.grid[0][1] = new Data();
  this.grid[0][2] = new Data();
  this.grid[1][0] = new Data();
  this.grid[1][1] = new Data();
  this.grid[1][2] = new Data();
  this.grid[2][0] = new Data();
  this.grid[2][1] = new Data();
  this.grid[2][2] = new Data();

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
  this.player =  this.conductor.load(this.grid[this.coords[0]][this.coords[1]].json);
}

System.prototype.startSound = function() {
  this.player.play();
  this.player.loop(true);
}

System.prototype.stopSound = function() {
  this.player.stop(true);
}

System.prototype.updateCoords = function(x, y) {
  if (x === -1 && this.coords[0] > 0) {
    this.coords[0] += x;
  } else if (y === -1 && this.coords[1] > 0) {
    this.coords[1] += y;
  } else if (x === 1 && this.coords[0] < (this.gridSize - 1)) {
    this.coords[0] += x;
  } else if (y === 1 && this.coords[1] < (this.gridSize - 1)) {
    this.coords[1] += y;
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

//front-end
var generateDomGrid = function() {
  for (var i = 0; i < 3; i++) {
    $(".container").append(`<div class="grid-row" id="row-${i}"></div>`);
    for (var n = 0; n < 3; n++) {
      $(`#row-${i}`).append(`<div class="grid-space" id="${n}${i}"></div>`);
    }
  }
}

var updateDomGrid = function(coords) {
  for (var i = 0; i < 3; i++) {
    for (var n = 0; n < 3; n++) {
      if ($(`#${i}${n}`).hasClass("active")) {
        $(`#${i}${n}`).removeClass("active")
      }
    }
  }
  $(`#${coords[0]}${coords[1]}`).addClass("active");
}

$(document).ready(function() {
  //new is apparently a bad way of initializing objects
  var newSystem = new System();

  newSystem.generateArray();
  newSystem.staticJSON();
  newSystem.initializeConductor();
  newSystem.initializeSounds();
  generateDomGrid();

  $(document).keydown(function(event) {
    var keyCode = event.keyCode;
    //left: 37 right: 39 up: 38 down: 40
    if (keyCode === 37) {
      newSystem.updateCoords(-1, 0);
    } else if (keyCode === 39) {
      newSystem.updateCoords(1, 0);
    } else if (keyCode === 38) {
      newSystem.updateCoords(0, -1);
    } else if (keyCode === 40) {
      newSystem.updateCoords(0, 1);
    }
    // newSystem.updateGrid();
    updateDomGrid(newSystem.coords);
    newSystem.stopSound();
    newSystem.reinitializeConductor();
    newSystem.initializeSounds();
    newSystem.startSound();
  });
});
