let mic;
let fft;
let button;

let ww = window.innerWidth;
let wh = window.innerHeight;
let pow = 12;

function setup() {
  createCanvas(ww, wh);
  colorMode(HSB);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT(0.9, Math.pow(2, pow));
  fft.setInput(mic);
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  let l = spectrum.length / 3;


  noStroke();
  translate(width / 2, height / 2);
  for (var i = 0; i < l; i++) {
    var amp = spectrum[i] * 2.1;

    let x = -ww / 2 + (wh / l - 3) / 2 + 6 + i * ww / (l + 1);
    let y = -amp * Math.pow(i + 1, 1 / (pow / 2)) * wh / 456 + wh / 2;
    stroke(255);
    rect(x, wh / 2 - 20, wh / l - 3, y > 0 ? 0 : y);
  }
}
