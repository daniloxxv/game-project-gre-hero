 //canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
var y = -15;
function clearCanvas() {
ctx.clearRect(0,0,500,450);
}
function updateCanvas () {
  y += game.speed;
  clearCanvas();
  ctx.font = "24px 'Lato'";
  ctx.fillText(game.chosenWord, 170-game.chosenWord.length*5, y); 
  //checking if the word hit the bottom of the canvas
  if (y>=449 && y < 451) {
    showCorrect();
    game.incorrectWord();
    updateAll();
  }; 
  window.requestAnimationFrame(updateCanvas); //updating canvas and calling the function again
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
  hideErrorsList ();
  game.init();
});

$("#startbuttonmobile").click(function () {
  resetHearts();
  enableButtons();
  hideErrorsList();
  game.init();
});

//refreshing buttons

function refreshButtons () {
  $(".alternativebuttons").removeClass("btn-danger");
  $(".alternativebuttons").removeClass("btn-success");
  $("#button1").text(game.meanings[0]);
  $("#button2").text(game.meanings[1]);
  $("#button3").text(game.meanings[2]);
  $("#button4").text(game.meanings[3]); 
  }
// alternative buttons (with feedback)
function updateButtons () {
  setTimeout(function(){
  refreshButtons ();
 }, 600);
}

// guessing word

$(".alternativebuttons").click(function () { 
  if ($(this).text() == game.chosenObject.meaning) {
    showCorrect();
  } else {
    $(this).addClass("btn-danger");
    showCorrect();
  }
  game.guessWord($(this).text());
  updateAll();
});

// feedback

  function showCorrect() {
    if ($("#button1").text() == game.chosenObject.meaning) {
      $("#button1").addClass("btn-success");
    }
    else if ($("#button2").text() == game.chosenObject.meaning) {
      $("#button2").addClass("btn-success");
    }
    else if ($("#button3").text() == game.chosenObject.meaning) {
      $("#button3").addClass("btn-success");
    }
    else if ($("#button4").text() == game.chosenObject.meaning) {
      $("#button4").addClass("btn-success")
    }
  }
//build and show post-game feedback
function displayErrorsList () {
$("#errorslist").html(`<h2>Thanks for playing!</h2> <h3>Here are the words you got wrong:</h3><ul><li><h4>${game.listErrors[0]}</h4></li><li><h4>${game.listErrors[1]}</h4></li><li><h4>${game.listErrors[2]}</h4></li><li><h4>${game.listErrors[3]}</h4></li></ul><h3>HIGH SCORE: ${game.highScore}`)
$("#errorslist").removeClass("d-none");
}

//hide errors list

function hideErrorsList () {
  $("#errorslist").addClass("d-none");
  }

//disable and enable buttons
function disableButtons() {
  $('.alternativebuttons').prop("disabled", true);
 }
 function enableButtons() {
  $('.alternativebuttons').prop("disabled", false);
}

// difficulty buttons

$("#easybutton").click(function () {
  game.speed = 0.5;
  game.multiplier = 5;
});

$("#normalbutton").click(function () {
  game.speed = 1;
  game.multiplier = 10;
});

$("#hardbutton").click(function () {
  game.speed = 2;
  game.multiplier = 20;
});

$("#difficultymobile").click(function () {
  if ($("#difficultymobile").text() === "Hard Mode") {
  game.speed = 2;
  game.multiplier = 20;
  $("#difficultymobile").text("Normal Mode");} 
  else {
  game.speed = 1;
  game.multiplier = 10;
  $("#difficultymobile").text("Hard Mode");
  }
});


// update and reset hearts

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
// updating score & streak
 function updateAll () {
  updateScore();
  updateStreak();
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

console.log(game.listErrors)