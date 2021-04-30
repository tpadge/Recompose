// var audioCtx8;
// if (!audioCtx8) {
//   audioCtx8 = new (window.AudioContext || window.webkitAudioContext)();
// }

let audio8 = new Audio();
audio8.src = "./assets/audio/bach_6.6.mp3";
let bgConnected = false;

const container8 = document.getElementById('play-bg');
const clearer8 = document.getElementById('pause-bg');
const canvas8 = document.getElementById('canvas1');
canvas8.width = window.innerWidth;
canvas8.height = window.innerHeight;
const bgCtx = canvas8.getContext('2d');
let audioSource8;
let analyser8;

clearer8.addEventListener('click', function () {
  const audio8 = document.getElementById('BachGigueAudio');
  audio8.src = "./assets/audio/bach_6.6.mp3";
  audio8.pause();
})

function bgPlay() {
  const audio8 = document.getElementById('BachGigueAudio');
  audio8.src = "./assets/audio/bach_6.6.mp3";
  audio8.play();
}

container8.addEventListener('click', function () {
  var audioCtx8;
  if (!audioCtx8) {
    audioCtx8 = new (window.AudioContext || window.webkitAudioContext)();
  }

  const audio8 = document.getElementById('BachGigueAudio');
  // audio2.src = "../../assets/audio/badzura.mp3";
  // audio2.play(0);

  audio8.onplaying = function () {
    if (audioSource8 == undefined) {
      audioSource8 = audioCtx8.createMediaElementSource(audio8);
    }
    // audioSource2 = audioCtx2.createMediaElementSource(audio2);
    if (!bgConnected) {
      analyser8 = audioCtx8.createAnalyser();
      window.onunload = function () { audioSource8.disconnect(); };
      audioSource8.connect(analyser8);
      analyser8.connect(audioCtx8.destination);
      bgConnected = true;
    }

    analyser8.fftSize = 2048;
    const bufferLength8 = analyser8.frequencyBinCount;

    const dataArray8 = new Uint8Array(bufferLength8);
    const barWidth8 = 10;
    let barHeight8;
    let x8;

    function animateBG() {
      x8 = 0;
      bgCtx.clearRect(0, 0, canvas8.width, canvas8.height);
      analyser8.getByteFrequencyData(dataArray8);
      drawBG(bufferLength8, x8, barWidth8, barHeight8, dataArray8)
      requestAnimationFrame(animateBG);
    }
    animateBG();
  }
});

function drawBG(bufferLength8, x8, barWidth8, barHeight8, dataArray8) {
  for (let i = 0; i < bufferLength8; i++) {
    barHeight8 = dataArray8[i] * 1.6;
    bgCtx.save();
    bgCtx.translate(canvas8.width / 2, canvas8.height / 2);
    bgCtx.rotate(i * 3.16);
    bgCtx.rotate(Math.PI / 0.8);
    const hue = i * 6;

    bgCtx.lineWidth = barHeight8 / 20;
    bgCtx.beginPath();
    bgCtx.moveTo(0, 0);
    bgCtx.lineTo(0, barHeight8);
    bgCtx.stroke();

    bgCtx.lineWidth8 = barHeight8 / 2; //10
    bgCtx.strokeStyle = 'hsl(' + hue + ',100%,' + barHeight8 / 3.4 + '%)';
    bgCtx.beginPath();
    bgCtx.moveTo(0, 0);
    bgCtx.lineTo(0, barHeight8);
    bgCtx.stroke();

    bgCtx.fillStyle = 'hsl(' + hue + ',100%,' + barHeight8 / 4.3 + '%)';
    bgCtx.fillRect(0, 0, barWidth8, barHeight8);

    x8 += barWidth8;
    bgCtx.restore();


  }
}