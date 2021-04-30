// var audioCtx6;
// if (!audioCtx6) {
//   audioCtx6 = new (window.AudioContext || window.webkitAudioContext)();
// }
let audio6 = new Audio();
audio6.src = "./assets/audio/bach-bouree.mp3";
let bbConnected = false;

const container6 = document.getElementById('play-bb');
const clearer6 = document.getElementById('pause-bb');
const canvas6 = document.getElementById('canvas1');
canvas6.width = window.innerWidth;
canvas6.height = window.innerHeight;
const bbCtx = canvas6.getContext('2d');

let audioSource6;
let analyser6;

clearer6.addEventListener('click', function () {
  const audio6 = document.getElementById('BachBoureeAudio');
  audio6.src = "./assets/audio/bach-bouree.mp3";
  audio6.pause();
})

function bbPlay() {
  const audio6 = document.getElementById('BachBoureeAudio');
  audio6.src = "./assets/audio/bach-bouree.mp3";
  audio6.play();
}

container6.addEventListener('click', function () {
  var audioCtx6;
  if (!audioCtx6) {
    audioCtx6 = new (window.AudioContext || window.webkitAudioContext)();
  }

  const audio6 = document.getElementById('BachBoureeAudio');
  // audio2.src = "../../assets/audio/badzura.mp3";


  audio6.onplaying = function () {
    if (audioSource6 == undefined) {
      audioSource6 = audioCtx6.createMediaElementSource(audio6);
    }
    // audioSource2 = audioCtx2.createMediaElementSource(audio2);
    if (!bbConnected) {
      analyser6 = audioCtx6.createAnalyser();
      window.onunload = function () { audioSource6.disconnect(); };
      audioSource6.connect(analyser6);
      analyser6.connect(audioCtx6.destination);
      bbConnected = true;
    }
    
    analyser6.fftSize = 2048;
    const bufferLength6 = analyser6.frequencyBinCount;

    const dataArray6 = new Uint8Array(bufferLength6);
    const barWidth6 = 7;
    let barHeight6;
    let x6;

    function animateBB() {
      x6 = 0;
      bbCtx.clearRect(0, 0, canvas6.width, canvas6.height);
      analyser6.getByteFrequencyData(dataArray6);
      drawBB(bufferLength6, x6, barWidth6, barHeight6, dataArray6);
      requestAnimationFrame(animateBB);
    }
    animateBB();
  }
});

function drawBB(bufferLength6, x6, barWidth6, barHeight6, dataArray6){
for (let i = 0; i < bufferLength6; i++) {
  barHeight6 = dataArray6[i] * 1.3;
  bbCtx.save();
  bbCtx.translate(canvas6.width / 2, canvas6.height / 2);
  bbCtx.rotate(i * 10);
  const hue = i * 16; 

  bbCtx.lineWidth = barHeight6 / 8;
  bbCtx.beginPath();
  bbCtx.moveTo(0, 0);
  bbCtx.lineTo(0, barHeight6);
  bbCtx.stroke();

  bbCtx.lineWidth = 12;
  bbCtx.strokeStyle = 'hsl(' + hue + ',100%,' + barHeight6 / 4.3 + '%)';
  bbCtx.beginPath();
  bbCtx.moveTo(0, 0);
  bbCtx.lineTo(0, barHeight6);
  bbCtx.stroke();

  bbCtx.fillStyle = 'hsl(' + hue + ',100%,' + barHeight6 / 4.3 + '%)';
  bbCtx.fillRect(0, 0, barWidth6, barHeight6);
  x6 += barWidth6;
  bbCtx.restore();
}
}