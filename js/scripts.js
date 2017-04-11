//back-end
function Data() {

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
  this.grid[0][0] = {
    timeSignature: [4, 4],
    tempo: 100,
    instruments: {
      rightHand: {
          name: 'square',
          pack: 'oscillators'
      },
    },
    notes: {
      // Shorthand notation
      rightHand: [
          'quarter|C5|tie'
      ],
    }
  };
  this.grid[0][1] = {
    timeSignature: [4, 4],
    tempo: 100,
    instruments: {
      rightHand: {
          name: 'square',
          pack: 'oscillators'
      },
    },
    notes: {
      // Shorthand notation
      rightHand: [
          'quarter|D5|tie'
      ],
    }
  };

  this.grid[0][2] = {
    timeSignature: [4, 4],
    tempo: 100,
    instruments: {
      rightHand: {
          name: 'square',
          pack: 'oscillators'
      },
    },
    notes: {
      // Shorthand notation
      rightHand: [
          'quarter|E5|tie'
      ],
    }
  };

  this.grid[1][0] = {
    timeSignature: [4, 4],
    tempo: 100,
    instruments: {
      rightHand: {
          name: 'square',
          pack: 'oscillators'
      },
    },
    notes: {
      // Shorthand notation
      rightHand: [
          'quarter|F5|tie'
      ],
    }
  };

  this.grid[1][1] = {
    timeSignature: [4, 4],
    tempo: 100,
    instruments: {
      rightHand: {
          name: 'square',
          pack: 'oscillators'
      },
    },
    notes: {
      // Shorthand notation
      rightHand: [
          'quarter|G5|tie'
      ],
    }
  };

  this.grid[1][2] = {
    timeSignature: [4, 4],
    tempo: 100,
    instruments: {
      rightHand: {
          name: 'square',
          pack: 'oscillators'
      },
    },
    notes: {
      // Shorthand notation
      rightHand: [
          'quarter|A5|tie'
      ],
    }
  };

  this.grid[2][0] = {
    timeSignature: [4, 4],
    tempo: 100,
    instruments: {
      rightHand: {
          name: 'square',
          pack: 'oscillators'
      },
    },
    notes: {
      // Shorthand notation
      rightHand: [
          'quarter|B5|tie'
      ],
    }
  };

  this.grid[2][1] = {
    timeSignature: [4, 4],
    tempo: 100,
    instruments: {
      rightHand: {
          name: 'square',
          pack: 'oscillators'
      },
    },
    notes: {
      // Shorthand notation
      rightHand: [
          'quarter|C5|tie'
      ],
    }
  };

  this.grid[2][2] = {
    timeSignature: [4, 4],
    tempo: 100,
    instruments: {
      rightHand: {
          name: 'square',
          pack: 'oscillators'
      },
    },
    notes: {
      // Shorthand notation
      rightHand: [
          'quarter|A5|tie'
      ],
    }
  };

}

System.prototype.initializeSounds = function() {
  this.player = this.conductor.load(this.grid[this.coords[0]][this.coords[1]]);
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
