// var audioCtx4;
// if (!audioCtx4) {
//   audioCtx4 = new (window.AudioContext || window.webkitAudioContext)();
// }

let audio4 = new Audio();
audio4.src = "./assets/audio/bach-sarabande.mp3";
let bsConnected = false;

const container4 = document.getElementById('play-bs');
const clearer4 = document.getElementById('pause-bs');
const canvas4 = document.getElementById('canvas1');
canvas4.width = window.innerWidth;
canvas4.height = window.innerHeight;
const bsCtx = canvas4.getContext('2d');
let audioSource4;
let analyser4;

clearer4.addEventListener('click', function () {
  const audio4 = document.getElementById('BachSarabandeAudio');
  audio4.src = "./assets/audio/bach-sarabande.mp3";
  audio4.pause();
})

function bsPlay() {
  const audio4 = document.getElementById('BachSarabandeAudio');
  audio4.src = "./assets/audio/bach-sarabande.mp3";
  audio4.play();
}

container4.addEventListener('click', function () {
  var audioCtx4;
  if (!audioCtx4) {
    audioCtx4 = new (window.AudioContext || window.webkitAudioContext)();
  }

  const audio4 = document.getElementById('BachSarabandeAudio');
  // audio2.src = "../../assets/audio/badzura.mp3";
  // audio2.play(0);

  audio4.onplaying = function () {
    if (audioSource4 == undefined) {
      audioSource4 = audioCtx4.createMediaElementSource(audio4);
    }
    // audioSource2 = audioCtx2.createMediaElementSource(audio2);
    if (!bsConnected) {
      analyser4 = audioCtx4.createAnalyser();
      window.onunload = function () { audioSource4.disconnect(); };
      audioSource4.connect(analyser4);
      analyser4.connect(audioCtx4.destination);
      bsConnected = true;
    }
    analyser4.fftSize = 2048;
    const bufferLength4 = analyser4.frequencyBinCount;
    const dataArray4 = new Uint8Array(bufferLength4);
    
    const barWidth4 = 3;
    let barHeight4;
    let x4;

    function animateBS() {
      x4 = 0;
      bsCtx.clearRect(0, 0, canvas4.width, canvas4.height);
      analyser4.getByteFrequencyData(dataArray4);
      drawBS(bufferLength4, x4, barWidth4, barHeight4, dataArray4);
      requestAnimationFrame(animateBS);
    }
    animateBS();
  }
});

function drawBS(bufferLength4, x4, barWidth4, barHeight4, dataArray4){
  for (let i = 0; i < bufferLength4; i++){
    barHeight4 = dataArray4[i] * 1.5;
    bsCtx.save();
    bsCtx.translate(canvas4.width / 2, canvas4.height / 2);
    bsCtx.rotate(i * 6);
    const hue = i * 4.6;

    //outline
    bsCtx.lineWidth = barHeight4 / 4;
    bsCtx.beginPath();
    bsCtx.moveTo(0, 0);
    bsCtx.lineTo(0, barHeight4);
    bsCtx.stroke();

    //filler
    bsCtx.lineWidth = barHeight4 / 6;
    bsCtx.strokeStyle = 'hsl(' + hue + ',100%,' + barHeight4 / 4.3 + '%)';
    bsCtx.beginPath();
    bsCtx.moveTo(0, 0);
    bsCtx.lineTo(0, barHeight4);
    bsCtx.stroke();

    bsCtx.fillStyle = 'hsl(' + hue + ',100%,' + barHeight4 / 4.3 + '%)';
    bsCtx.fillRect(0, 0, barWidth4, barHeight4);
    x4 += barWidth4;
    bsCtx.restore();
  }
}