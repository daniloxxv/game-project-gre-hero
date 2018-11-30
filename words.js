//words constructor comes here

var wordsArray = [];
var chosenObject;
var chosenWord;
var meanings = [];
var randomNumber;

function Word (word, meaning) {
  this.word = word;
  this.meaning = meaning;

  wordsArray.push(this);
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

//getting word

function getWord() {
  randomNumber = Math.floor((Math.random() * wordsArray.length));
  chosenObject = wordsArray[randomNumber];
  wordsArray.slice(randomNumber, 1);
  chosenWord = chosenObject.word.toUpperCase();
  getMeanings(chosenObject);
}

//testing getWord
getWord();

// getting meanings -- TODO: remove meanigns which are already in the array
function getMeanings (object) {
  meanings.push(object.meaning);
  meanings.push(wordsArray[Math.floor((Math.random() * wordsArray.length))].meaning);
  meanings.push(wordsArray[Math.floor((Math.random() * wordsArray.length))].meaning);
  meanings.push(wordsArray[Math.floor((Math.random() * wordsArray.length))].meaning);
}

console.log(meanings);

// guessing word

function guessWord (meaning){
  if (meaning == chosenObject.meaning) {
    return true;
  } else {
    return false;
  }
}




