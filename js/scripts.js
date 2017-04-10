//back-end
var System(){
  this.grid = [];
  this.coords = [];
  //need to initialize data mambers for
  //audio context and oscillator node

}

System.prototype.playSound = function() {}
System.prototype.generateArray = function() {}

//front-end
//this function is for the future. this is where we will generate any DOM elements
var generateDomGrid = function(){}

$(document).ready(function(){
  //new is apparently a bad way of initializing objects
  var system = new System();
});
