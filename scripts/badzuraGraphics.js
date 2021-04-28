var audioCtx2; 
if(!audioCtx2) {
  audioCtx2 = new (window.AudioContext || window.webkitAudioContext)();
}

let audio2 = new Audio();
audio2.src = "../../assets/audio/badzura.mp3";

const badzuraContainer = document.getElementById('play-badzura');
const badzuraClearer = document.getElementById('pause-badzura');
const badzuraCanvas = document.getElementById('canvas1');
badzuraCanvas.width = window.innerWidth;
badzuraCanvas.height = window.innerHeight;
const badzuraCtx = badzuraCanvas.getContext('2d');
let audioSource2;
let analyser2;

badzuraClearer.addEventListener('click', function () {
  const audio2 = document.getElementById('BadzuraAudio');
  audio2.src = "../../assets/audio/badzura.mp3";
  audio2.pause();
})

function badzuraPlay(){
  const audio2 = document.getElementById('BadzuraAudio');
  audio2.src = "../../assets/audio/badzura.mp3";
  audio2.play();
}

badzuraContainer.addEventListener('click', function () {
  // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  const audio2 = document.getElementById('BadzuraAudio');
  // audio2.src = "../../assets/audio/badzura.mp3";
  // audio2.play(0);

  audio2.onplaying = function() {
    if (audioSource2 == undefined) {
      audioSource2 = audioCtx2.createMediaElementSource(audio2);
    }
  // audioSource2 = audioCtx2.createMediaElementSource(audio2);
  analyser2 = audioCtx2.createAnalyser();
  window.onunload = function () { audioSource2.disconnect(); };
  audioSource2.connect(analyser2);
  analyser2.connect(audioCtx2.destination);
  analyser2.fftSize = 512;
  const bufferLength2 = analyser2.frequencyBinCount;

  const dataArray2 = new Uint8Array(bufferLength2);
  const barWidth2 = (badzuraCanvas.width/2) / bufferLength2;
  let barHeight2;
  let x2;

  function animatebadzura() {
    x2 = 0;
    badzuraCtx.clearRect(0, 0, badzuraCanvas.width, badzuraCanvas.height);
    analyser2.getByteFrequencyData(dataArray2);
    drawB(bufferLength2, x2, barWidth2, barHeight2, dataArray2);
    requestAnimationFrame(animatebadzura);
  }
  animatebadzura();
  }
});

function drawB(bufferLength2, x2, barWidth2, barHeight2, dataArray2) {
  for (let i = 0; i < bufferLength2; i++) {
    barHeight2 = dataArray2[i] * 2.5;
    const red = i * barHeight2/3;
    const green = i * 10;
    const blue = barHeight2 / 1.3;
    badzuraCtx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
    badzuraCtx.fillRect(badzuraCanvas.width/2 - x2, badzuraCanvas.height - barHeight2, barWidth2, barHeight2);
    x2 += barWidth2;
  }
  for (let i = 0; i < bufferLength2; i++) {
    barHeight2 = dataArray2[i] * 2.5;
    const red = i * barHeight2 / 3;
    const green = i * 10;
    const blue = barHeight2 / 1.3;
    badzuraCtx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
    badzuraCtx.fillRect(x2, badzuraCanvas.height - barHeight2, barWidth2, barHeight2);
    x2 += barWidth2;
  }
}


