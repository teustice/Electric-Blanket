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
//this function is for the future. this is where we will generate any DOM elements
var generateDomGrid = function(){}

$(document).ready(function(){
  //new is apparently a bad way of initializing objects
  var newSystem = new System();

  newSystem.generateArray();
});
