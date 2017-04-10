
var updateGrid = function(grid) {
  var len = grid.length;
  var i;
  var n;

  for(var i = 0; i < len; i++){
    for(var n = 0; n < len; n++){
      if(grid[i][n] === 1) {
        $(".row-" + i + " .col-" + n).addClass("active");
      } else {
        $(".row-" + i + " .col-" + n).removeClass("active");
      }
    }
  }
}

var generateGridArray = function(length) {
  var grid = [];

  for(var i=0;i<length;i++){
    grid[i] = [];
    for(var n=0;n<length;n++){
      grid[i][n] = 0;
    }
  }
  return grid;
}

var generateGrid = function(length){
  for(var i=0;i<length;i++){
    $("#grid").append('<div class="row-'+i+' a-row clearfix">');
    for(var n=0;n<length;n++){
      $(".row-"+i).append('<div class="col-'+n+' a-col"></div>');
    }
  }
}

$(document).ready(function(){
  var index = [0,0];
  var length;
  var grid;
  var keyCode;


  $("#size").submit(function(event){
    event.preventDefault();
    length = parseInt($("#size-val").val());
    $("#size").hide();
    grid = generateGridArray(length);
    generateGrid(length);

    var size = ((((window.screen.width-1000)/length).toFixed().toString())+ "px");
    $(".a-row .a-col").css("width", size);
    $(".a-row .a-col").css("height", size);
    $(".a-row").css("height", size);


  });



  $(document).keydown(function(event) {
    keyCode = event.keyCode;
    if(keyCode === 37){
      if(index[1] > 0) {
        index[1] -= 1;
        grid[index[0]][index[1]] = 1;
        grid[index[0]][index[1]+1] = 0;
        updateGrid(grid);
      }
    } else if (keyCode === 39) {
      if(index[1] < length-1){
        index[1] += 1;
        grid[index[0]][index[1]] = 1;
        grid[index[0]][index[1]-1] = 0;
        updateGrid(grid);
      }
    } else if (keyCode === 38) {
      if(index[0] > 0){
        index[0] -= 1;
        grid[index[0]][index[1]] = 1;
        grid[index[0]+1][index[1]] = 0;
        updateGrid(grid);
      }
    } else if (keyCode === 40) {
      if(index[0] < length-1){
        index[0] += 1;
        grid[index[0]][index[1]] = 1;
        grid[index[0]-1][index[1]] = 0;
        updateGrid(grid);
      }
    }

    // console.log(event.keyCode);
  });


  // $("#button-left").click(function(event) {
  //   if(index[1] > 0) {
  //     index[1] -= 1;
  //     grid[index[0]][index[1]] = 1;
  //     grid[index[0]][index[1]+1] = 0;
  //     updateGrid(grid);
  //   }
  //   console.log("index ["+index[0]+","+index[1]+"]");
  // });
  //
  // $("#button-right").click(function(event) {
  //   if(index[1] < length-1){
  //     index[1] += 1;
  //     grid[index[0]][index[1]] = 1;
  //     grid[index[0]][index[1]-1] = 0;
  //     updateGrid(grid);
  //   }
  //   console.log("index ["+index[0]+","+index[1]+"]");
  // });
  //
  // $("#button-down").click(function(event) {
  //   if(index[0] < length-1){
  //     index[0] += 1;
  //     grid[index[0]][index[1]] = 1;
  //     grid[index[0]-1][index[1]] = 0;
  //     updateGrid(grid);
  //   }
  // });
  //
  // $("#button-up").click(function(event) {
  //   if(index[0] > 0){
  //     index[0] -= 1;
  //     grid[index[0]][index[1]] = 1;
  //     grid[index[0]+1][index[1]] = 0;
  //     updateGrid(grid);
  //   }
  // });

  //
  //
  // grid.push(0);
  // grid.push(1);
  // grid.push(0);
  // grid.push(1);
  // grid.push(0);
  //
  // console.log("grid: " + grid);
  //
  // console.lo
  //
  //
  //
  // for(i=0;i<length;i++){
  //   console.log(grid[i]===1);
  //   if(grid[i]===1){
  //
  //   }
  // }

});
