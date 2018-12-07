const game = {
    //interface functionalities
    hearts: 3,
    speed: 2,
    points: 0,
    multiplier: 10,
    streak: 0,
    //list of words from database.js
    wordsArray: wordsList,
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
            for (var i = 0; i < 3; i++) {game.meanings.push(game.wordsArray[Math.floor((Math.random() * game.wordsArray.length))].meaning);}
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
        game.points += game.multiplier*(game.streak+1);
        game.streak++;
        game.refreshGame();
        return true;
    },
    incorrectWord: function () {
        game.checkGameOver();
        game.hearts--;
        updateHearts();
        game.streak = 0;
        return false;
    },
    //refreshing game
    refreshGame: function () {
            game.meanings = [];
            game.getWord();
            updateButtons();
            y = 0;
        },
    //checking if the game is over
    checkGameOver: function () {
            if (game.hearts == 0) {
            alert("play again?");
            return true;
            } else {
            game.refreshGame();
            return false;
            }
        },
    //starting game
    init: function () {
        game.hearts = 3;
        game.points = 0;
        game.streak = 0;
        game.wordsArray = wordsList;
        game.getWord();
        game.refreshGame();
      }  
      
}