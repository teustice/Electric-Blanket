//back-end
function System() {
  this.grid = [];
  this.coords = [];
  //need to initialize data mambers for
  //audio context and oscillator node
}

System.prototype.playSound = function() {
  //initialize band.js
  var conductor = new BandJS();
  conductor.setTimeSignature(4,4);
  conductor.setTempo(120);
  var piano = conductor.createInstrument();

  piano.note('quarter','E4, C4, G4', true);

  //Totals up the duration of the song and returns the Player Class
  var player = conductor.finish();
  player.play();
  player.loop(true);

  return player;
}
System.prototype.generateArray = function() {}

//front-end
//this function is for the future. this is where we will generate any DOM elements
var generateDomGrid = function(){}

$(document).ready(function(){
  //new is apparently a bad way of initializing objects
  var system = new System();

  var playerReturn = null;
  //Begin sequence
  $("#play").click(function(){
    playerReturn = system.playSound();
  });
  //Stop sequence
  $("#stop").click(function(){
    playerReturn.stop(true); //argument is for fading out
  })
});
