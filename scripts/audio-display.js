function showGregsonGigue() {
  var gregsonGigue = document.getElementById("gregson-gigue");
  if (gregsonGigue.style.display === "none") {
    gregsonGigue.style.display = "block";
  } else {
    gregsonGigue.style.display = "none";
  }
  var audio = document.getElementById("gregsonGigueAudio");
  audio.pause();
  audio.currentTime = 0;
}

function stopGregsonGigue() {
  var gregsonGigue = document.getElementById("gregson-gigue");
  var audio = document.getElementById("gregsonGigueAudio");
  audio.pause();
  audio.currentTime = 0;
  if (gregsonGigue.style.display === "block") {
    gregsonGigue.style.display = "none";
  }
}