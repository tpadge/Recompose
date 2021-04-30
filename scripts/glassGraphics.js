// var audioCtx;
// if (!audioCtx) {
//   audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// }
// console.log(audioCtx);
let audio1 = new Audio();
audio1.src = "./assets/audio/glass.mp3";
let connected = false;


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
  if (!connected) {
    analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    connected = true;
  }

  
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;

  const dataArray = new Uint8Array(bufferLength);
  const barWidth = (canvas.width/2) / bufferLength;
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
    barHeight = dataArray[i] * 1.6;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(i * 3.16);
    ctx.rotate(Math.PI / 2.4);
    const hue = i * 6;

    ctx.lineWidth = barHeight / 10; //10
    ctx.strokeStyle = 'hsl(' + hue + ',100%,' + barHeight / 3.4 + '%)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, barHeight);
    ctx.stroke();

    ctx.fillStyle = 'hsl(' + hue + ',100%,' + barHeight / 4.3 + '%)';
    ctx.fillRect(0, 0, barWidth, barHeight);
    
    x += barWidth;
    ctx.restore();
  }
}

