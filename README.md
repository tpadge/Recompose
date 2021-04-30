# Recompose
![apple-touch-icon](https://user-images.githubusercontent.com/65377724/116743078-3cd59a00-a9ad-11eb-82e0-68dfab97d766.png)

Recompose is an audio visualizaton app, inviting users to experience great original works of music and their modern, recomposed counterparts. Each piece of music is accompanied by a bespoke visual, tailored to highlight the excentricities of each work, bringing out unique beauty of each work, so to enhance the user's experience and distinction of both composed and recomposed works of art.

[Live site](https://tpadge.github.io/Recompose/)

### Technologies used:

  * Frontend
    * Vanilla Javascript
      * Frontend functionality 
    * Web Audio API
      * audio analyzation and manipulation
    * Canvas API
      * Creation of visuals
    * HTML
    * CSS

 ## Features
 
**Center Stage Interface**

Upon entering, the user is welcomed to a warm concert hall, with the ability to pick their desired piece. When a piece is selected, listening notes are rendered, as well as interactive audio playback buttons. A design decision in recompose is to make the puase button reset the start time of the track to 0. This is intended to enourage full start-to-finish listenings of the works, so to give users the complete evolution of both the musical work and its visualization.

<img width="1290" alt="Screen Shot 2021-04-30 at 12 19 24 PM" src="https://user-images.githubusercontent.com/65377724/116743810-50cdcb80-a9ae-11eb-9a04-e5c47e9800b5.png">

**Audio Visualization**

Each song has its own visualization, which renders on play. Every visualization was created with extreme attention to detail, so to enhance the character of its audio counterpart and allow for greater comparision and distinction between composed and recomposed pairs.

<img width="1288" alt="Screen Shot 2021-04-30 at 12 22 55 PM" src="https://user-images.githubusercontent.com/65377724/116745143-b4a4c400-a9af-11eb-9f9d-b36461f0dd87.png">

### Code snippets

The Web Audio API was used in conjunction with Canvas API to render the unique visuals. Each visual required distinct animations, as well as audio sources and acompanying coniditional checks to ensure playback and correct loading when dealing with 8 seperate audio visual pairs. Below is the graphical vanilla JS logic for Philip Glass' Etude No. 2

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
      audio1.pause();
    })

    function glassPlay() {
      audio1.play();
    }

    container.addEventListener('click', function(){
     var audioCtx;
     if (!audioCtx) {
     audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    audio1.onplaying = function () {
      if (audioSource == undefined) {
       audioSource = audioCtx.createMediaElementSource(audio1);
     }

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
    }}
    
  ### Musical Credits:
  
  * Bach: 6 Suites for Solo Cello, Pieter Wispelwey, Cello
  * Philip Glass: Piano Works, Vikingur Olafsson Piano, Siggi Quartet
  
  
  
