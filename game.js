const game = {
    //start game
    init: function () {
        $("#startbutton").prop("disabled", true);
        $("#startbuttonmobile").prop("disabled", true);
        game.wordsArray = wordsList; //from words.js
        game.meanings = [];
        game.listErrors = [];
        game.getWord();
        refreshButtons();
        y = -15; //sets word position at the very top of the canvas
        game.hearts = 3;
        game.speed = 1;
        game.points = 0;
        game.multiplier = 10;
        game.streak = 0;
        updateAll();
      },  
    //method for getting new word
    getWord: function () {
                var randomNumber = Math.floor((Math.random() * game.wordsArray.length));
                game.chosenObject = game.wordsArray[randomNumber];
                game.wordsArray.splice(randomNumber, 1);
                game.chosenWord = game.chosenObject.word.toUpperCase();
                game.getMeanings();
                },
    //push meaning of chosen word and three other unique meanings into an array
    getMeanings: function () {
            game.meanings.push(game.chosenObject.meaning);
            var meaning1 = game.wordsArray[Math.floor((Math.random() * game.wordsArray.length))].meaning;
            game.meanings.push(meaning1)
            var meaning2 = game.wordsArray[Math.floor((Math.random() * game.wordsArray.length))].meaning;
            while (meaning2 == meaning1) {
                meaning2 = game.wordsArray[Math.floor((Math.random() * game.wordsArray.length))].meaning;
            };
            game.meanings.push(meaning2);
            var meaning3 = game.wordsArray[Math.floor((Math.random() * game.wordsArray.length))].meaning;
            while (meaning3 == meaning1 || meaning3 == meaning2) {
                meaning3 = game.wordsArray[Math.floor((Math.random() * game.wordsArray.length))].meaning;}
            game.meanings.push(meaning3)
            game.shuffle(game.meanings);
          },
    //shuffle meanings
    shuffle: function (array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
            }
            return array;
        },
    //method for guessing word
    guessWord: function (meaning) {
                if (meaning == game.chosenObject.meaning) {
                game.correctWord();
            } else {
                game.incorrectWord();
            }
        },
    correctWord: function () {
        playCorrectSound();
        game.points += game.multiplier*(game.streak+1);
        game.streak++;
        game.refreshGame();
        return true;
    },
    incorrectWord: function () {
        playIncorrectSound();
        game.updateErrors();
        game.checkGameOver();
        game.hearts--;
        updateHearts();
        game.streak = 0;
        return false;
    },

    //list mistakes
    updateErrors: function () {
        if (game.listErrors.length < 4) {
        game.listErrors.push(`${game.chosenWord} - ${game.chosenObject.meaning}`)
        }
    },
    //calculate high score
    highScore: localStorage.getItem('highscore') || 0,

    updateHighScore: function () {
    if (game.points > game.highScore) {
        game.highScore = game.points;   
        localStorage.setItem('highscore', JSON.stringify(game.highScore)) }
    },

    //refresh game
    refreshGame: function () {
            if (game.wordsArray.length === 0) { //to reset word list in the unlikely event that the user guesses all 350 words
                game.wordsArray = wordsList;
            };
            game.meanings = [];
            game.getWord();
            updateButtons();
            y = -15;
        },
    //check if the game is over
    checkGameOver: function () {
            if (game.hearts <= 0) {
            disableButtons();
            game.updateHighScore();
            y = 999; //to remove the word from the canvas and avoid audio feedback
            displayErrorsList ();
            $("#startbutton").prop("disabled", false);
            $("#startbuttonmobile").prop("disabled", false);
            return true;
            } else {
            game.refreshGame();
            return false;
            }
        }
}