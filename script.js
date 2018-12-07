 //canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
var y = 0;
function clearCanvas() {
ctx.clearRect(0,0,700,800);
}
function updateCanvas () {
  y += game.speed;
  clearCanvas();
  ctx.font = "30px Arial";
  ctx.fillText(game.chosenWord, 375, y); 
  //checking if the word hit the bottomm of the canvas
  if (y>=499) {
    game.incorrectWord();
    updateAll();
  };
  window.requestAnimationFrame(updateCanvas);
}

//starting game
window.onload = function () {
  game.init();
  updateCanvas();
}
//new game button

$("#startbutton").click(function () {
  resetHearts();
  enableButtons();
  game.init();
});
// alternative buttons
function updateButtons () {
  $("#button1").text(game.meanings[0]);
  $("#button2").text(game.meanings[1]);
  $("#button3").text(game.meanings[2]);
  $("#button4").text(game.meanings[3]);
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
// difficulty buttons

$("#easyButton").click(function () {
  game.speed = 1;
  game.multiplier = 5;
});

$("#normalButton").click(function () {
  game.speed = 2;
  game.multiplier = 10;
});

$("#hardButton").click(function () {
  game.speed = 3;
  game.multiplier = 20;
});

// guessing word

$(".alternativebuttons").click(function () { 
  game.guessWord(this.innerHTML);
  updateAll();
});

function updateAll () {
  updateScore();
  updateStreak();
}

// updating hearts

function updateHearts() {
  $(".activeheart").last().removeClass("activeheart");
}

function resetHearts() {
  $("#heartscounter").html('<span class="glyphicon glyphicon-heart heart activeheart"></span><span class="glyphicon glyphicon-heart heart activeheart"></span><span class="glyphicon glyphicon-heart heart activeheart"></span>');
}

// update score 
function updateScore () {
 $("#scorecounter").text(game.points);
}

// update streak

function updateStreak () {
  $("#streakcounter").text(game.streak);
 }
//disable and enable buttons
 function disableButtons() {
  $('.alternativebuttons').prop("disabled", true);
 }
 function enableButtons() {
  $('.alternativebuttons').prop("disabled", false);
}