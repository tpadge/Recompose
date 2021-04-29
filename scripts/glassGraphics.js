// var audioCtx;
// if (!audioCtx) {
//   audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// }
// console.log(audioCtx);
let audio1 = new Audio();
audio1.src = "./assets/audio/glass.mp3";

const container = document.getElementById('play-glass');
const clearer = document.getElementById('pause-glass');
const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let audioSource;
let analyser;

clearer.addEventListener('click', function(){
  const audio1 = document.getElementById('GlassAudio');
  audio1.src = "./assets/audio/glass.mp3";
  audio1.pause();
})

function glassPlay() {
  const audio1 = document.getElementById('GlassAudio');
  audio1.src = "./assets/audio/glass.mp3";
  audio1.play();
}

container.addEventListener('click', function(){
  var audioCtx;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  const audio1 = document.getElementById('GlassAudio');
  // audio1.src = "../../assets/audio/glass.mp3";
  // audio1.pause();
  // audio1.play(0);

  audio1.onplaying = function () {
    if (audioSource == undefined) {
      audioSource = audioCtx.createMediaElementSource(audio1);
    }
  // audioSource = audioCtx.createMediaElementSource(audio1);
  analyser = audioCtx.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 512;
  const bufferLength = analyser.frequencyBinCount;

  const dataArray = new Uint8Array(bufferLength);
  const barWidth = (canvas.width/bufferLength) / 2;
  let barHeight;
  let x;

  function animate(){
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    drawGlass(bufferLength, x, barWidth, barHeight, dataArray);

    requestAnimationFrame(animate);
  }
  animate();
  }
});

function drawGlass(bufferLength, x, barWidth, barHeight, dataArray) {
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 1.5;
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(i * Math.PI * 4 / bufferLength);
    const hue = i * 15;

    ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
    ctx.fillRect(0, 0, barWidth, barHeight);
    x += barWidth;
    ctx.restore();
  }
  // for (let i = 0; i < bufferLength; i++) {
  //   barHeight = dataArray[i] * 1.5;
  //   ctx.save();
  //   ctx.translate(canvas.width / 2, canvas.height / 2);
  //   ctx.rotate(i * Math.PI / bufferLength);
  //   const hue = i * 15;

  //   ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
  //   ctx.fillRect(0, 0, barWidth, barHeight);
  //   x += barWidth;
  //   ctx.restore();
  // }
}

