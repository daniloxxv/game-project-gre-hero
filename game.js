const game = {
    //placeholders for chosen words and meanings
    chosenObject: {},
    chosenWord: "",
    meanings: [],
    //method for getting new word
    getWord: function () {
                var randomNumber = Math.floor((Math.random() * game.wordsArray.length));
                game.chosenObject = game.wordsArray[randomNumber];
                game.wordsArray.splice(randomNumber, 1);
                game.chosenWord = game.chosenObject.word.toUpperCase();
                game.getMeanings();
                },
    //pushing meaning of chosen word and three others into an array
    getMeanings: function () {
            game.meanings.push(game.chosenObject.meaning);
            for (var i = 0; i < 3; i++) {
                game.meanings.push(game.wordsArray[Math.floor((Math.random() * game.wordsArray.length))].meaning);
                }
            game.shuffle(game.meanings);
          },
    //shuffling meanings
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
    listErrors: [],
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

    //refreshing game
    refreshGame: function () {
            game.meanings = [];
            game.getWord();
            updateButtons();
            y = -15;
        },
    //checking if the game is over
    checkGameOver: function () {
            if (game.hearts <= 0) {
            disableButtons();
            game.updateHighScore();
            displayErrorsList ();
            $("#startbutton").prop("disabled", false);
            return true;
            } else {
            game.refreshGame();
            return false;
            }
        },
    //starting game
    init: function () {
        $("#startbutton").prop("disabled", true);
        game.wordsArray = wordsList; //from words.js
        game.meanings = [];
        game.getWord();
        refreshButtons();
        y = -15;
        game.hearts = 3;
        game.speed = 1;
        game.points = 0;
        game.multiplier = 10;
        game.streak = 0;
        updateAll();
      }  
}