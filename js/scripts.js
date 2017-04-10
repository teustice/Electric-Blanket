//back-end
function System(){
  this.grid = [];
  this.coords = [];
  this.gridSize = 3;
  //need to initialize data mambers for
  //audio context and oscillator node



}

System.prototype.playSound = function(){}
System.prototype.generateArray = function(){
  for (var i = 0; i < this.gridSize; i++){
    this.grid.push([]);
    for (var n = 0; n < this.gridSize; n++){
      this.grid[i].push([]);
    }
  }
  console.log(this.grid);
}

//front-end
var generateDomGrid = function(){
  for (var i = 0; i < 3; i++){
    $(".container").append(`<div class="grid-row" id="row-${i}"></div>`);
    for (var n = 0; n < 3; n++) {
        $(`#row-${i}`).append(`<div class="grid-space" id="${i}${n}"></div>`);
    }
  }
}

$(document).ready(function(){
  //new is apparently a bad way of initializing objects
  var newSystem = new System();

  newSystem.generateArray();
  generateDomGrid();
});
