//canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
var y = 0;
function clearCanvas() {
ctx.clearRect(0,0,700,700);
}

function updateCanvas(){
  y += 1;
  clearCanvas();
  ctx.font = "30px Arial";
  ctx.fillText(chosenWord, 400, y); 
 window.requestAnimationFrame(updateCanvas);
}
window.requestAnimationFrame(updateCanvas);


// buttons 

var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");
var button4 = document.getElementById("button4");

// updating buttons

function updateButtons () {
  button1.innerHTML = meanings[0];
  button2.innerHTML = meanings[1];
  button3.innerHTML = meanings[2];
  button4.innerHTML = meanings[3];
}
updateButtons();

// guessing word

button1.onclick = function () { 
  guessWord(button1.innerHTML);
};
button2.onclick = function () { 
  guessWord(button2.innerHTML);
};
button3.onclick = function () { 
  guessWord(button3.innerHTML);
};
button4.onclick = function () { 
  guessWord(button4.innerHTML);
};


// updating hearts

function updateHearts() {
  var heartsCounter = document.getElementsByClassName("activeheart");
  heartsCounter[heartsCounter.length-1].classList.toggle("activeheart");
}

