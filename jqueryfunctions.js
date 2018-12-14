$(document).ready(function (){

$("#button1").click(function () {
  if ($(this).text() == chosenObject.meaning) {
  $(this).toggleClass("btn-success");
  $(this).toggleClass("btn-primary");} else {
    $(this).toggleClass("btn-danger");
    $(this).toggleClass("btn-primary");
  }
});

});