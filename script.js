const boton = document.getElementById("botonAbrir");
const inicio = document.querySelector(".inicio");
const regalo = document.querySelector(".regalo");
const canvas = document.getElementById("lienzoFlor");
const textoFinal = document.querySelector(".texto-final");

const ctx = canvas.getContext("2d");

let ancho = window.innerWidth;
let alto = window.innerHeight;

function ajustarCanvas() {
  ancho = window.innerWidth;
  alto = window.innerHeight;

  canvas.width = ancho;
  canvas.height = alto;
}

ajustarCanvas();

window.addEventListener("resize", ajustarCanvas);

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function aleatorio(min, max) {
  return Math.random() * (max - min) + min;
}

function dibujarPetalo(x, y, radio, angulo, color) {
  ctx.save();

  ctx.translate(x, y);
  ctx.rotate(angulo);

  ctx.beginPath();

  ctx.moveTo(0, 0);

  ctx.bezierCurveTo(
    radio * 0.6,
    -radio * 0.8,
    radio * 1.2,
    -radio * 0.5,
    radio,
    0
  );

  ctx.bezierCurveTo(
    radio * 1.2,
    radio * 0.5,
    radio * 0.6,
    radio * 0.8,
    0,
    0
  );

  ctx.fillStyle = color;
  ctx.fill();

  ctx.restore();
}

function dibujarFlorAmarilla(x, y, escala = 1) {
  const petalos = 8;
  const radioPetalo = 18 * escala;
  const radioCentro = 8 * escala;

  for (let i = 0; i < petalos; i++) {
    const angulo = (Math.PI * 2 / petalos) * i;

    dibujarPetalo(
      x,
      y,
      radioPetalo,
      angulo,
      "#FFD92F"
    );
  }

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    radioCentro,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "#8B5A2B";
  ctx.fill();
}

function dibujarFlorAzul(x, y, escala = 1) {
  const petalos = 7;
  const radioPetalo = 14 * escala;
  const radioCentro = 6 * escala;

  for (let i = 0; i < petalos; i++) {
    const angulo = (Math.PI * 2 / petalos) * i;

    dibujarPetalo(
      x,
      y,
      radioPetalo,
      angulo,
      "#4A90E2"
    );
  }

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    radioCentro,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "#173F73";
  ctx.fill();
}

async function crearFloresAmarillas() {
  const movil = window.innerWidth <= 600;

  const cantidad = movil ? 75 : 90;

  for (let i = 0; i < cantidad; i++) {
    let x;
    let y;

    let intentos = 0;

    do {
      x = aleatorio(15, ancho - 15);
      y = aleatorio(15, alto - 15);

      intentos++;
    }
    while (
      Math.abs(x - ancho / 2) < (movil ? 85 : 145) &&
      Math.abs(y - alto * 0.43) < (movil ? 110 : 160) &&
      intentos < 30
    );

    const escala = movil
      ? aleatorio(0.28, 0.48)
      : aleatorio(0.5, 0.85);

    dibujarFlorAmarilla(
      x,
      y,
      escala
    );

    await esperar(movil ? 10 : 15);
  }
}

async function crearCorazonAzul() {
  const movil = window.innerWidth <= 600;

  const centroX = ancho / 2;

  const centroY = movil
    ? alto * 0.42
    : alto * 0.44;

  const escalaCorazon = movil
    ? Math.min(ancho, alto) * 0.006
    : Math.min(ancho, alto) * 0.008;

  const cantidad = movil ? 34 : 44;

  for (let i = 0; i < cantidad; i++) {
    const t =
      (Math.PI * 2 * i) /
      cantidad;

    const x =
      16 *
      Math.pow(
        Math.sin(t),
        3
      );

    const y =
      13 * Math.cos(t)
      - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t)
      - Math.cos(4 * t);

    const px =
      centroX +
      x * escalaCorazon;

    const py =
      centroY -
      y * escalaCorazon;

    const escalaFlor = movil
      ? aleatorio(0.34, 0.46)
      : aleatorio(0.45, 0.62);

    dibujarFlorAzul(
      px,
      py,
      escalaFlor
    );

    await esperar(movil ? 20 : 30);
  }
}

async function crearComposicion() {
  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  textoFinal.style.opacity = "0";

  await crearFloresAmarillas();

  await esperar(250);

  await crearCorazonAzul();

  await esperar(300);

  textoFinal.style.display = "block";

  requestAnimationFrame(() => {
    textoFinal.style.transition =
      "opacity 1s ease";

    textoFinal.style.opacity = "1";
  });
}

boton.addEventListener("click", async () => {
  boton.disabled = true;

  inicio.style.opacity = "0";

  await esperar(400);

  inicio.style.display = "none";

  regalo.classList.remove("oculto");

  ajustarCanvas();

  await crearComposicion();
});