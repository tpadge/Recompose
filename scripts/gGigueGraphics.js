// var audioCtx7;
// if (!audioCtx7) {
//   audioCtx7 = new (window.AudioContext || window.webkitAudioContext)();
// }

let audio7 = new Audio();
audio7.src = "./assets/audio/gregson_6.6.mp3";
let ggConnected = false;

const container7 = document.getElementById('play-gg');
const clearer7 = document.getElementById('pause-gg');
const canvas7 = document.getElementById('canvas1');
canvas7.width = window.innerWidth;
canvas7.height = window.innerHeight;
const ggCtx = canvas7.getContext('2d');
let audioSource7;
let analyser7;

clearer7.addEventListener('click', function () {
  const audio7 = document.getElementById('gregsonGigueAudio');
  audio7.src = "./assets/audio/gregson_6.6.mp3";
  audio7.pause();
})

function ggPlay() {
  const audio7 = document.getElementById('gregsonGigueAudio');
  audio7.src = "./assets/audio/gregson_6.6.mp3";
  audio7.play();
}

container7.addEventListener('click', function () {
  var audioCtx7;
  if (!audioCtx7) {
    audioCtx7 = new (window.AudioContext || window.webkitAudioContext)();
  }

  const audio7 = document.getElementById('gregsonGigueAudio');
  // if (audioSource7 == undefined) {
  //   audioSource7 = audioCtx7.createMediaElementSource(audio7);
  // }

  // const audio7 = document.getElementById('gregsonGigueAudio');

  audio7.onplaying = function () {
    if (audioSource7 == undefined) {
      audioSource7 = audioCtx7.createMediaElementSource(audio7);
    }
     // const audio7 = document.getElementById('gregsonGigueAudio');
    if (!ggConnected) {
      analyser7 = audioCtx7.createAnalyser();
      // window.onunload = function () { audioSource7.disconnect(); };
      audioSource7.connect(analyser7);
      analyser7.connect(audioCtx7.destination);
      ggConnected = true;
    }

    analyser7.fftSize = 512;
    const bufferLength7 = analyser7.frequencyBinCount;

    const dataArray7 = new Uint8Array(bufferLength7);
    const barWidth7 = 15;
    let barHeight7;
    let x7;

    function animateGG() {
      x7 = 0;
      ggCtx.clearRect(0, 0, canvas7.width, canvas7.height);
      analyser7.getByteFrequencyData(dataArray7);
      drawGG(bufferLength7, x7, barWidth7, barHeight7, dataArray7);
      requestAnimationFrame(animateGG);
    }
    animateGG();
  }
});

function drawGG(bufferLength7, x7, barWidth7, barHeight7, dataArray7) {
  for (let i = 0; i < bufferLength7; i++) {
    barHeight7 = dataArray7[i] * 1.5;
    ggCtx.save();
    ggCtx.translate(canvas7.width / 2, canvas7.height / 2);
    ggCtx.rotate(i * 3.2);
    const hue = i * 0.3;
    ggCtx.fillStyle = 'hsl(' + hue + ',100%' + ',90%)';
    ggCtx.fillRect(0, 0, barWidth7, barHeight7);
    x7 += barWidth7;
    ggCtx.restore();
  }
}