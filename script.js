//canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
var y1 = 0;
function clearCanvas() {
ctx.clearRect(0,0,700,700);
}

function updateCanvas(){
  y1 += 1;
  clearCanvas();
  ctx.font = "30px Arial";
  ctx.fillText(chosenWord, 400, y1); 
 window.requestAnimationFrame(updateCanvas);
}

window.requestAnimationFrame(updateCanvas);


