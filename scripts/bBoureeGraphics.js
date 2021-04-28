var audioCtx6;
if (!audioCtx6) {
  audioCtx6 = new (window.AudioContext || window.webkitAudioContext)();
}

let audio6 = new Audio();
audio6.src = "../../assets/audio/bach-bouree.mp3";

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
  audio6.src = "../../assets/audio/bach-bouree.mp3";
  audio6.pause();
})

function bbPlay() {
  const audio6 = document.getElementById('BachBoureeAudio');
  audio6.src = "../../assets/audio/bach-bouree.mp3";
  audio6.play();
}

container6.addEventListener('click', function () {
  // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const audio6 = document.getElementById('BachBoureeAudio');
  // audio2.src = "../../assets/audio/badzura.mp3";
  // audio2.play(0);

  audio6.onplaying = function () {
    if (audioSource6 == undefined) {
      audioSource6 = audioCtx6.createMediaElementSource(audio6);
    }
    // audioSource2 = audioCtx2.createMediaElementSource(audio2);
    analyser6 = audioCtx6.createAnalyser();
    window.onunload = function () { audioSource6.disconnect(); };
    audioSource6.connect(analyser6);
    analyser6.connect(audioCtx6.destination);
    analyser6.fftSize = 64;
    const bufferLength6 = analyser6.frequencyBinCount;

    const dataArray6 = new Uint8Array(bufferLength6);
    const barWidth6 = canvas6.width / bufferLength6;
    let barHeight6;
    let x6;

    function animateBB() {
      x6 = 0;
      bbCtx.clearRect(0, 0, canvas6.width, canvas6.height);
      analyser6.getByteFrequencyData(dataArray6);
      for (let i = 0; i < bufferLength6; i++) {
        barHeight6 = dataArray6[i];
        bbCtx.fillStyle = 'white';
        bbCtx.fillRect(x6, canvas6.height - barHeight6, barWidth6, barHeight6);
        x6 += barWidth6;
      }
      requestAnimationFrame(animateBB);
    }
    animateBB();
  }
})