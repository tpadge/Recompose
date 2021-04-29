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

  
  analyser.fftSize = 128;
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
    barHeight = dataArray[i] * 2.3;
    const red = i * barHeight/2;
    const green = i * 10;
    const blue = barHeight / 1.3;
    ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
    ggCtx.fillRect(canvas.width / 2 - x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth;
  }
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 2.3;
    const red = i * barHeight/2 ;
    const green = i * 8;
    const blue = barHeight / 1.7;
    ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
    ggCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth;
  }
}

