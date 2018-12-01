//canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
var y = 0;
function clearCanvas() {
ctx.clearRect(0,0,700,700);
}

function updateCanvas(){

  y += speed;
  clearCanvas();
  ctx.font = "30px Arial";
  ctx.fillText(chosenWord, 400, y); 
  if (y==720) {
    checkGameOver();
  }
  
}
var game = setInterval(updateCanvas, 15);

// refreshing game 

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
  game = setInterval(updateCanvas, 15);
  refreshGame ();
}

//new game button
var startButton = document.getElementById("startbutton");
startButton.onclick = function () {
  newGame();
};


// alternative buttons 

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
  speed = 1;
  multiplier = 5;
};

var normalButton = document.getElementById("normalbutton");
normalButton.onclick = function () {
  speed = 2;
  multiplier = 10;
};

var hardButton = document.getElementById("hardbutton");
hardButton.onclick = function () {
  speed = 3;
  multiplier = 20;
};

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

var activeHearts = document.getElementsByClassName("activeheart");
var heartsCounter = document.getElementById("heartscounter");


function updateHearts() {
  hearts--;
  streak = 0;
  updateStreak ();
  activeHearts[activeHearts.length-1].classList.toggle("activeheart");
}

function resetHearts() {
  heartsCounter.innerHTML = '<span class="glyphicon glyphicon-heart heart activeheart"></span><span class="glyphicon glyphicon-heart heart activeheart"></span><span class="glyphicon glyphicon-heart heart activeheart"></span>';
}

//score 

var scoreCounter = document.getElementById("scorecounter");

// update score 

function updateScore () {
 scoreCounter.innerHTML = points;
}

//streak

var streakCounter = document.getElementById("streakcounter");

// update streak

function updateStreak () {
  streakCounter.innerHTML = streak;
 }