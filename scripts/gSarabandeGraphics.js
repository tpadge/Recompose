var audioCtx3;
if (!audioCtx3) {
  audioCtx3 = new (window.AudioContext || window.webkitAudioContext)();
}

let audio3 = new Audio();
audio3.src = "./assets/audio/gregson_1.4.mp3";

const container3 = document.getElementById('play-gs');
const clearer3 = document.getElementById('pause-gs');
const canvas3 = document.getElementById('canvas1');
canvas3.width = window.innerWidth;
canvas3.height = window.innerHeight;
const gsCtx = canvas3.getContext('2d');
let audioSource3;
let analyser3;

clearer3.addEventListener('click', function () {
  const audio3 = document.getElementById('gregsonSarabandeAudio');
  audio3.src = "./assets/audio/gregson_1.4.mp3";
  audio3.pause();
})

function gsPlay() {
  const audio3 = document.getElementById('gregsonSarabandeAudio');
  audio3.src = "./assets/audio/gregson_1.4.mp3";
  audio3.play();
}

container3.addEventListener('click', function () {
  // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const audio3 = document.getElementById('gregsonSarabandeAudio');
  // audio2.src = "../../assets/audio/badzura.mp3";
  // audio2.play(0);

  audio3.onplaying = function () {
    if (audioSource3 == undefined) {
      audioSource3 = audioCtx3.createMediaElementSource(audio3);
    }
    // audioSource2 = audioCtx2.createMediaElementSource(audio2);
    analyser3 = audioCtx3.createAnalyser();
    window.onunload = function () { audioSource3.disconnect(); };
    audioSource3.connect(analyser3);
    analyser3.connect(audioCtx3.destination);
    analyser3.fftSize = 64;
    const bufferLength3 = analyser3.frequencyBinCount;

    const dataArray3 = new Uint8Array(bufferLength3);
    const barWidth3 = canvas3.width / bufferLength3;
    let barHeight3;
    let x3;

    function animateGS() {
      x3 = 0;
      gsCtx.clearRect(0, 0, canvas3.width, canvas3.height);
      analyser3.getByteFrequencyData(dataArray3);
      for (let i = 0; i < bufferLength3; i++) {
        barHeight3 = dataArray3[i];
        gsCtx.fillStyle = 'white';
        gsCtx.fillRect(x3, canvas3.height - barHeight3, barWidth3, barHeight3);
        x3 += barWidth3;
      }
      requestAnimationFrame(animateGS);
    }
    animateGS();
  }
})