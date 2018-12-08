 //canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
var y = -15;
function clearCanvas() {
ctx.clearRect(0,0,500,500);
}
function updateCanvas () {
  y += game.speed;
  clearCanvas();
  ctx.font = "30px Arial";
  ctx.fillText(game.chosenWord, 180, y); 
  //checking if the word hit the bottom of the canvas
  if (y>=499 && y < 501) {
    game.incorrectWord();
    showCorrect();
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
  setTimeout(function(){
  $("#button1").text(game.meanings[0]);
  $("#button2").text(game.meanings[1]);
  $("#button3").text(game.meanings[2]);
  $("#button4").text(game.meanings[3]); 
  $(".alternativebuttons").removeClass("btn-danger");
  $(".alternativebuttons").removeClass("btn-success");}, 400);
}

// guessing word

$(".alternativebuttons").click(function () { 
  if ($(this).text() == game.chosenObject.meaning) {
    showCorrect();
  } else {
    $(this).toggleClass("btn-danger");
    showCorrect();
  }
  game.guessWord($(this).text());
  updateAll();
});

// feedback

  function showCorrect() {
    if ($("#button1").text() == game.chosenObject.meaning) {
      $("#button1").toggleClass("btn-success");
    }
    else if ($("#button2").text() == game.chosenObject.meaning) {
      $("#button2").toggleClass("btn-success");
    }
    else if ($("#button3").text() == game.chosenObject.meaning) {
      $("#button3").toggleClass("btn-success");
    }
    else if ($("#button4").text() == game.chosenObject.meaning) {
      $("#button4").toggleClass("btn-success")
    }
  }

// difficulty buttons

$("#easybutton").click(function () {
  game.speed = 1;
  game.multiplier = 5;
});

$("#normalbutton").click(function () {
  game.speed = 1.5;
  game.multiplier = 10;
});

$("#hardbutton").click(function () {
  game.speed = 2;
  game.multiplier = 20;
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
  $(".heart").addClass("activeheart");
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

// audio

var bgMusic = document.getElementById("bgmusic");
bgMusic.loop = true;
var correctSound = document.getElementById("correctsound");
var incorrectSound = document.getElementById("incorrectsound");

// audio control 

var musicOn = document.getElementById("musiccheckbox");
var soundOn = document.getElementById("soundcheckbox");
var musicControl = document.getElementById("musiclabel");

// audio functions



function playCorrectSound () {
  if (soundOn.checked == true) {
    correctSound.play();
  }
}

function playIncorrectSound () {
  if (soundOn.checked == true) {
    incorrectSound.play();
  }
}

musicControl.onclick = function () {
  if (musicOn.checked == true) {
    bgMusic.play();
} else {
  bgMusic.pause();
}};