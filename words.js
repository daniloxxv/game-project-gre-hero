//words constructor comes here
var speed = 2;
var hearts = 3;
var points = 0;
var multiplier = 10;
var streak = 0;
var wordsList= [];
var wordsArray = wordsList;
var chosenObject;
var chosenWord;
var meanings = [];

function Word (word, meaning) {
  this.word = word;
  this.meaning = meaning;

  wordsList.push(this);
}
//adding words//

new Word ("anomaly", "something unusual");
new Word ("equivocal", "not easily understood");
new Word ("lucid", "easily understandable");
new Word ("precipitate", "cause a sudden change");
new Word ("assuage", "alleviate");
new Word ("erudite", "knowledgeable, wise");
new Word ("opaque", "nontransparent");
new Word ("prodigal", "wastefully extravagant");
new Word ("fervid", "intensely passionate");
new Word ("placate", "appease, pacify");
new Word ("zeal", "passion, devotion");
new Word ("abstain", "restrain oneself");
new Word ("audacious", "courageous, brave");
new Word ("desiccate", "dry up");
new Word ("gullible", "easily fooled");
new Word ("laudable", "deserving praise");
new Word ("adulterate", "contaminate, taint");
new Word ("vacillate", "hesitate");
new Word ("capricious", "given to mood swings");
new Word ("engender", "produce, cause");
new Word ("homogenous", "of the same kind");
new Word ("loquacious", "talkative, wordy");
new Word ("pragmatic", "practical, sensible");
new Word ("volatile", "likely to change quickly");
new Word ("apathy", "lack of interest");
new Word ("corroborate", "confirm");
new Word ("ephemeral", "brief, transitory");
new Word ("laconic", "concise, monosyllabic");
new Word ("mitigate", "make less severe");
new Word ("advocate", "support publicly");
new Word ("cacophony", "unpleasant sounds");
new Word ("enervate", "weaken mentally");
new Word ("ingenuous", "innocent, naive");
new Word ("misanthrope", "someone who hates people");
new Word ("paradoxical", "self-contradicting");
new Word ("venerate", "admire greatly");
new Word ("deride", "insult, criticize");


//getting word

function getWord() {
  var randomNumber = Math.floor((Math.random() * wordsArray.length));
  chosenObject = wordsArray[randomNumber];
  wordsArray.splice(randomNumber, 1);
  chosenWord = chosenObject.word.toUpperCase();
  getMeanings();
}

//testing getWord
getWord();

// getting meanings -- currently drawing a new random number in case of duplicity. TODO: consider creating a temporary array of meanings and removing each pick
function getMeanings () {
  meanings.push(chosenObject.meaning);
  var randomNumber1, randomNumber2, randomNumber3;
  randomNumber1 = Math.floor((Math.random() * wordsArray.length));
  meanings.push(wordsArray[randomNumber1].meaning);
  randomNumber2 = Math.floor((Math.random() * wordsArray.length));
  if (randomNumber2 === randomNumber1) {
    randomNumber2 = Math.floor((Math.random() * wordsArray.length));
  }
  meanings.push(wordsArray[randomNumber2].meaning);
  randomNumber3 = Math.floor((Math.random() * wordsArray.length));
  if (randomNumber3 === randomNumber1 || randomNumber3 === randomNumber2) {
    randomNumber3 = Math.floor((Math.random() * wordsArray.length));
  }
  meanings.push(wordsArray[randomNumber3].meaning);

  shuffle(meanings);
}

console.log(meanings);

//shuffle meanings 

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// guessing word

function guessWord (meaning){
  if (meaning == chosenObject.meaning) {
    points += multiplier*(streak+1);
    updateScore ();
    streak++;
    updateStreak ();
    refreshGame();
    return true;
    
  } else {
    checkGameOver();
    return false;
  }
}

// check if the game is over

function checkGameOver () {
  if (hearts == 0) {
    alert(`Your final score is ${points}. Click New Game to play again.`);
    return true;
  } else {
    updateHearts();
    refreshGame();
    return false;
  }
}

// 