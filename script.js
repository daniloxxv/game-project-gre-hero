 //canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
var y = 0;
function clearCanvas() {
ctx.clearRect(0,0,700,800);
}

function updateCanvas(){

  y += game.speed;
  clearCanvas();
  ctx.font = "30px Arial";
  ctx.fillText(game.chosenWord, 400, y); 
  if (y>=548) {
    game.incorrectWord();
    updateAll();
  }
  window.requestAnimationFrame(updateCanvas);
}
window.onload = function () {
  game.init();
  window.requestAnimationFrame(updateCanvas)
}

// refreshing game 
/*
function refreshGame () {
  meanings = [];
  getWord();
  updateButtons();
  y = 0;
}

//restart game
function newGame () {
  hearts = 3;
  points = 0;
  streak = 0;
  updateScore();
  resetHearts();
  updateStreak();
  wordsArray = wordsList;
  getWord();
  refreshGame ();
  updateCanvas();
} */

//new game button
var startButton = document.getElementById("startbutton");
startButton.onclick = function () {
  resetHearts();
  updateScore;
  updateStreak;
  game.init();
};


// alternative buttons 

var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");
var button4 = document.getElementById("button4");

// updating buttons

function updateButtons () {
  button1.innerHTML = game.meanings[0];
  button2.innerHTML = game.meanings[1];
  button3.innerHTML = game.meanings[2];
  button4.innerHTML = game.meanings[3];
}
updateButtons();

//buttons feedback TESTING

/* function buttonFeedback() {
  if (this.innerHTML == chosenObject.meaning) {
    this.classlist.toggle("btn-success");
    this.classlist.toggle("btn-primary");
  } else {
    this.classlist.toggle("btn-danger");
    this.classlist.toggle("btn-primary");
  }
}
 */
// buttons speed

var easyButton = document.getElementById("easybutton");
easyButton.onclick = function () {
  game.speed = 1;
  game.multiplier = 5;
};

var normalButton = document.getElementById("normalbutton");
normalButton.onclick = function () {
  game.speed = 2;
  game.multiplier = 10;
};

var hardButton = document.getElementById("hardbutton");
hardButton.onclick = function () {
  game.speed = 3;
  game.multiplier = 20;
};

// guessing word

button1.onclick = function () { 
  game.guessWord(button1.innerHTML);
  updateAll();
};
button2.onclick = function () { 
  game.guessWord(button2.innerHTML);
  updateAll();
};
button3.onclick = function () { 
  game.guessWord(button3.innerHTML);
  updateAll();
};
button4.onclick = function () { 
  game.guessWord(button4.innerHTML);
  updateAll();
};

function updateAll () {
  updateScore();
  updateStreak();
  if (this.meaning != game.chosenObject.meaning) {
    updateHearts();
  }
}


// updating hearts

var activeHearts = document.getElementsByClassName("activeheart");
var heartsCounter = document.getElementById("heartscounter");


function updateHearts() {
  activeHearts[activeHearts.length-1].classList.toggle("activeheart");
}

function resetHearts() {
  heartsCounter.innerHTML = '<span class="glyphicon glyphicon-heart heart activeheart"></span><span class="glyphicon glyphicon-heart heart activeheart"></span><span class="glyphicon glyphicon-heart heart activeheart"></span>';
}

//score 

var scoreCounter = document.getElementById("scorecounter");

// update score 

function updateScore () {
 scoreCounter.innerHTML = game.points;
}

//streak

var streakCounter = document.getElementById("streakcounter");

// update streak

function updateStreak () {
  streakCounter.innerHTML = game.streak;
 }