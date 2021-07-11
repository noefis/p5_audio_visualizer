let song;
let fft;
let button;

let ww = window.innerWidth;
let wh = window.innerHeight;
let pow = 12;


function preload() {
  song = loadSound('../../music.m4a');
}

function setup() {
  createCanvas(ww, wh);
  colorMode(HSB);
  button = createButton('toggle');
  button.mousePressed(() => song.isPlaying() ? song.pause() : song.play());
  song.play();
  fft = new p5.FFT(0.9, Math.pow(2, pow));
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  let l = spectrum.length/3;
  noStroke();
  translate(width / 2, height / 2);
  for (var i = 0; i < l; i++) {
    var amp = spectrum[i];
    let x = -ww/2 + (wh/l-3)/2+6 + i * ww/(l+1);
    let y = -amp*Math.pow(i+1, 1/(pow/2))*wh/456 + wh/2;
    let z = (y > 0 ? 0: abs(y/6%360));
    let c = color(abs(z-31%360), 100, z);
    stroke(c);
    fill(c);
    rect(x, 0, wh/l-3, y > 0 ? 0: y/2);
    rect(x, 0, wh/l-3, y > 0 ? 0: -y/2);
  }
}