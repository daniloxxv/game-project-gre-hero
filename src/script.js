 //canvas object

const canvas = {
  canvas: document.getElementById("canvas"),
  ctx: this.canvas.getContext("2d"),
  clearCanvas: function () {
    canvas.ctx.clearRect(0, 0, 350, 450)
  },
  updateCanvas: function () {
    canvas.y += game.speed;
    canvas.clearCanvas();
    canvas.ctx.fillStyle = "#000000"
    canvas.ctx.font = "24px 'Lato'";
    canvas.ctx.fillText(game.chosenWord, 170-game.chosenWord.length*5, canvas.y); 
    canvas.checkWord();
    window.requestAnimationFrame(canvas.updateCanvas); //updating canvas and calling the function again
  },
  //checking if the word hit the bottom of the canvas
  checkWord: function () {
    if (canvas.y>=459 && canvas.y < 461) {
      buttons.showCorrect();
      game.incorrectWord();
      screen.updateAll();
  }
}
}
//buttons object
const buttons = {
  //start button
  newGame: $("#startbutton").click(function () {
  screen.resetHearts();
  buttons.enableButtons();
  screen.hideErrorsList ();
  game.init();
  }),
//mobile start button
  newGameMobile: $("#startbuttonmobile").click(function () {
  screen.resetHearts();
  buttons.enableButtons();
  screen.hideErrorsList();
  game.init();
}),
//change button text
  refreshButtons: function () {
  $(".alternativebuttons").removeClass("btn-danger");
  $(".alternativebuttons").removeClass("btn-success");
  $("#button1").text(game.meanings[0]);
  $("#button2").text(game.meanings[1]);
  $("#button3").text(game.meanings[2]);
  $("#button4").text(game.meanings[3]); 
  },
//update buttons
  updateButtons: function () {
  setTimeout(function(){
    buttons.refreshButtons ();
    }, 600);
   },
// guess word by clicking alternative buttons
guess: $(".alternativebuttons").click(function () { 
  if ($(this).text() == game.chosenObject.meaning) {
    buttons.showCorrect();
  } else {
    $(this).addClass("btn-danger");
    buttons.showCorrect();
  }
  game.guessWord($(this).text());
  screen.updateAll();
}),
// show feedback for incorrect words
  showCorrect: function () {    
    if ($("#button1").text() == game.chosenObject.meaning) {
    $("#button1").addClass("btn-success");}
    else if ($("#button2").text() == game.chosenObject.meaning) {
      $("#button2").addClass("btn-success");
    }
    else if ($("#button3").text() == game.chosenObject.meaning) {
      $("#button3").addClass("btn-success");
    }
    else if ($("#button4").text() == game.chosenObject.meaning) {
      $("#button4").addClass("btn-success")
    }
  },
//disable alternative buttons on game over
  disableButtons: function () {
    $('.alternativebuttons').prop("disabled", true);
  },
  //enable alternative buttons on new game
  enableButtons: function () {
    $('.alternativebuttons').prop("disabled", false);
  },
  // difficulty buttons
  easyMode: $("#easybutton").click(function () {
    game.speed = 0.5;
    game.multiplier = 5;
  }),
  normalMode: $("#normalbutton").click(function () {
    game.speed = 1;
    game.multiplier = 10;
  }),
  hardMode: $("#hardbutton").click(function () {
    game.speed = 2;
    game.multiplier = 20;
  }),
  //mobile difficulty buttons
  mobileDifficulty: $("#difficultymobile").click(function () {
    if ($("#difficultymobile").text() === "Hard Mode") {
      game.speed = 2;
      game.multiplier = 20;
      $("#difficultymobile").text("Normal Mode");} 
    else {
      game.speed = 1;
      game.multiplier = 10;
      $("#difficultymobile").text("Hard Mode");
      }
    })
}
//object for other screen elements
const screen = {
//build and show post-game feedback
  displayErrorsList: function () {
    $("#errorslist").html(`<h2>Thanks for playing!</h2> <h3>Words to review:</h3><ul><li><h4>${game.listErrors[0]}</h4></li><li><h4>${game.listErrors[1]}</h4></li><li><h4>${game.listErrors[2]}</h4></li><li><h4>${game.listErrors[3]}</h4></li></ul><h3><b>HIGH SCORE: ${game.highScore}</b>`)
    $("#errorslist").removeClass("d-none");
    },
//hide errors list on new game
  hideErrorsList: function () {
    $("#errorslist").addClass("d-none");
  },
//update hearts
  updateHearts: function() {
    $(".activeheart").last().removeClass("activeheart");
  },
// reset hearts
  resetHearts: function () {
    $(".heart").addClass("activeheart");
  },

// update score 
  updateScore: function () {
    $("#scorecounter").text(game.points);
  },
  updateStreak: function () {
    $("#streakcounter").text(game.streak);
   },
  // update score & streak
  updateAll: function  () {
  screen.updateScore();
  screen.updateStreak();
  }
}
//starting game
window.onload = function () {
  game.init();
  canvas.updateCanvas();
}