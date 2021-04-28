function showGregsonGigue() {
  var gregsonGigue = document.getElementById("gregson-gigue");
  if (gregsonGigue.style.display === "none") {
    gregsonGigue.style.display = "block";
  } else {
    gregsonGigue.style.display = "none";
  }
  // var audio = document.getElementById("gregsonGigueAudio");
  // audio.pause();
  // audio.currentTime = 0;
}

function stopGregsonGigue() {
  var gregsonGigue = document.getElementById("gregson-gigue");
  // var audio = document.getElementById("gregsonGigueAudio");
  // audio.pause();
  // audio.currentTime = 0;
  if (gregsonGigue.style.display === "block") {
    gregsonGigue.style.display = "none";
  }
}

function showGregsonBouree() {
  var gregsonBouree = document.getElementById("gregson-bouree");
  if (gregsonBouree.style.display === "none") {
    gregsonBouree.style.display = "block";
  } else {
    gregsonBouree.style.display = "none";
  }
  // var audio = document.getElementById("gregsonBoureeAudio");
  // audio.pause();
  // audio.currentTime = 0;
}

function stopGregsonBouree() {
  var gregsonGigue = document.getElementById("gregson-bouree");
  // var audio = document.getElementById("gregsonBoureeAudio");
  // audio.pause();
  // audio.currentTime = 0;
  if (gregsonGigue.style.display === "block") {
    gregsonGigue.style.display = "none";
  }
}

function showGregsonSarabande() {
  var gregsonSarabande = document.getElementById("gregson-sarabande");
  if (gregsonSarabande.style.display === "none") {
    gregsonSarabande.style.display = "block";
  } else {
    gregsonSarabande.style.display = "none";
  }
  // var audio = document.getElementById("gregsonSarabandeAudio");
  // audio.pause();
  // audio.currentTime = 0;
}

function stopGregsonSarabande() {
  var gregsonSarabande = document.getElementById("gregson-sarabande");
  // var audio = document.getElementById("gregsonSarabandeAudio");
  // audio.pause();
  // audio.currentTime = 0;
  if (gregsonSarabande.style.display === "block") {
    gregsonSarabande.style.display = "none";
  }
}

function showBadzura() {
  var badzura = document.getElementById("badzura-two");
  if (badzura.style.display === "none") {
    badzura.style.display = "block";
  } else {
    badzura.style.display = "none";
  }
  // var audio = document.getElementById("BadzuraAudio");
  // audio.pause();
  // audio.currentTime = 0;
}

function stopBadzura() {
  var badzura = document.getElementById("badzura-two");
  // var audio = document.getElementById("BadzuraAudio");
  // audio.pause();
  // audio.currentTime = 0;
  if (badzura.style.display === "block") {
    badzura.style.display = "none";
  }
}

function showBachGigue() {
  var bachGigue = document.getElementById("bach-gigue");
  if (bachGigue.style.display === "none") {
    bachGigue.style.display = "block";
  } else {
    bachGigue.style.display = "none";
  }
  // var audio = document.getElementById("BachGigueAudio");
  // audio.pause();
  // audio.currentTime = 0;
}

function stopBachGigue() {
  var bachGigue = document.getElementById("bach-gigue");
  // var audio = document.getElementById("BachGigueAudio");
  // audio.pause();
  // audio.currentTime = 0;
  if (bachGigue.style.display === "block") {
    bachGigue.style.display = "none";
  }
}

function showBachBouree() {
  var bach = document.getElementById("bach-bouree");
  if (bach.style.display === "none") {
    bach.style.display = "block";
  } else {
    bach.style.display = "none";
  }
  // var audio = document.getElementById("BachBoureeAudio");
  // audio.pause();
  // audio.currentTime = 0;
}

function stopBachBouree() {
  var bach = document.getElementById("bach-bouree");
  // var audio = document.getElementById("BachBoureeAudio");
  // audio.pause();
  // audio.currentTime = 0;
  if (bach.style.display === "block") {
    bach.style.display = "none";
  }
}

function showBachSarabande() {
  var bach = document.getElementById("bach-sarabande");
  if (bach.style.display === "none") {
    bach.style.display = "block";
  } else {
    bach.style.display = "none";
  }
  // var audio = document.getElementById("BachSarabandeAudio");
  // audio.pause();
  // audio.currentTime = 0;
}

function stopBachSarabande() {
  var bach = document.getElementById("bach-sarabande");
  // var audio = document.getElementById("BachSarabandeAudio");
  // audio.pause();
  // audio.currentTime = 0;
  if (bach.style.display === "block") {
    bach.style.display = "none";
  }
}

function showGlass() {
  var glass = document.getElementById("glass");
  if (glass.style.display === "none") {
    glass.style.display = "block";
  } else {
    glass.style.display = "none";
  }
  
  // var audio = document.getElementById("GlassAudio");
  // audio.pause();
  // audio.currentTime = 0;
}

function stopGlass() {
  var glass = document.getElementById("glass");
  // var audio = document.getElementById("GlassAudio");
  // audio.pause();
  // audio.currentTime = 0;
  if (glass.style.display === "block") {
    glass.style.display = "none";
  }
}

 function stopSounds() {
  var sounds = document.getElementsByTagName('audio');
  for (i = 0; i < sounds.length; i++) {
    sounds[i].pause();
    sounds[i].currentTime = 0;
  }
};