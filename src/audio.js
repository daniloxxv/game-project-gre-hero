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
