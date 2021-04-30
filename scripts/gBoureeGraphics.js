// var audioCtx5;
// if (!audioCtx5) {
//   audioCtx5 = new (window.AudioContext || window.webkitAudioContext)();
// }

let audio5 = new Audio();
audio5.src = "./assets/audio/gregson_4.5.mp3";
let gbConnected = false;

const container5 = document.getElementById('play-gb');
const clearer5 = document.getElementById('pause-gb');
const canvas5 = document.getElementById('canvas1');
canvas5.width = window.innerWidth;
canvas5.height = window.innerHeight;
const gbCtx = canvas5.getContext('2d');
let audioSource5;
let analyser5;

clearer5.addEventListener('click', function () {
  const audio5 = document.getElementById('gregsonBoureeAudio');
  audio5.src = "./assets/audio/gregson_4.5.mp3";
  audio5.pause();
})

function gbPlay() {
  const audio5 = document.getElementById('gregsonBoureeAudio');
  audio5.src = "./assets/audio/gregson_4.5.mp3";
  audio5.play();
}

container5.addEventListener('click', function () {
  var audioCtx5;
  if (!audioCtx5) {
    audioCtx5 = new (window.AudioContext || window.webkitAudioContext)();
  }

  const audio5 = document.getElementById('gregsonBoureeAudio');
  // audio2.src = "../../assets/audio/badzura.mp3";
  // audio2.play(0);

  audio5.onplaying = function () {
    if (audioSource5 == undefined) {
      audioSource5 = audioCtx5.createMediaElementSource(audio5);
    }
    // audioSource2 = audioCtx2.createMediaElementSource(audio2);
    if (!gbConnected) {
      analyser5 = audioCtx5.createAnalyser();
      window.onunload = function () { audioSource5.disconnect(); };
      audioSource5.connect(analyser5);
      analyser5.connect(audioCtx5.destination);
      gbConnected = true;
    }

    analyser5.fftSize = 2048;
    const bufferLength5 = analyser5.frequencyBinCount;

    const dataArray5 = new Uint8Array(bufferLength5);
    const barWidth5 = 7.2;
    let barHeight5;
    let x5;

    function animateGB() {
      x5 = 0;
      gbCtx.clearRect(0, 0, canvas5.width, canvas5.height);
      analyser5.getByteFrequencyData(dataArray5);
      drawGB(bufferLength5, x5, barWidth5, barHeight5, dataArray5);
      requestAnimationFrame(animateGB);
    }
    animateGB();
  }
});

function drawGB(bufferLength5, x5, barWidth5, barHeight5, dataArray5) {
  for (let i = 0; i < bufferLength5; i++) {
    barHeight5 = dataArray5[i] * 1.4;
    gbCtx.save();
    gbCtx.translate(canvas5.width / 2, canvas5.height / 2);
    gbCtx.rotate(i * 3.16);
    const hue = i * 4.6;

    gbCtx.lineWidth = barHeight5 / 20;
    gbCtx.strokeStyle = 'hsl(' + hue + ',100%,' + barHeight5 / 4.3 + '%)';
    gbCtx.beginPath();
    gbCtx.moveTo(0, 0);
    gbCtx.lineTo(0, barHeight5);
    gbCtx.stroke();

    gbCtx.fillStyle = 'hsl(' + hue + ',100%,' + barHeight5 / 4.3 + '%)';
    gbCtx.fillRect(0, 0, barWidth5, barHeight5);

    x5 += barWidth5;
    gbCtx.restore();


  }
}