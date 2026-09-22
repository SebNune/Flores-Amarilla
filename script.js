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

/* =====================================================
   DIBUJAR FLOR REAL
===================================================== */

function dibujarFlor(x, y, escala, colorPetalo1, colorPetalo2, colorCentro1, colorCentro2, petalos = 8) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(aleatorio(0, Math.PI));

  // Capa exterior de pétalos
  for (let i = 0; i < petalos; i++) {
    const angulo = (Math.PI * 2 / petalos) * i;

    ctx.save();
    ctx.rotate(angulo);

    ctx.beginPath();
    ctx.ellipse(
      16 * escala,   // desplazamiento desde el centro
      0,
      12 * escala,   // ancho del pétalo
      5.5 * escala,  // alto del pétalo
      0,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = colorPetalo1;
    ctx.fill();
    ctx.restore();
  }

  // Capa interior de pétalos
  for (let i = 0; i < petalos; i++) {
    const angulo = (Math.PI * 2 / petalos) * i + (Math.PI / petalos);

    ctx.save();
    ctx.rotate(angulo);

    ctx.beginPath();
    ctx.ellipse(
      10 * escala,
      0,
      8 * escala,
      4 * escala,
      0,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = colorPetalo2;
    ctx.fill();
    ctx.restore();
  }

  // Centro exterior
  ctx.beginPath();
  ctx.arc(0, 0, 7 * escala, 0, Math.PI * 2);
  ctx.fillStyle = colorCentro1;
  ctx.fill();

  // Centro interior
  ctx.beginPath();
  ctx.arc(0, 0, 4 * escala, 0, Math.PI * 2);
  ctx.fillStyle = colorCentro2;
  ctx.fill();

  ctx.restore();
}

function dibujarFlorAmarilla(x, y, escala) {
  dibujarFlor(
    x,
    y,
    escala,
    "#FFD52A",
    "#FFE76A",
    "#8B5519",
    "#5F3710",
    8
  );
}

function dibujarFlorAzul(x, y, escala) {
  dibujarFlor(
    x,
    y,
    escala,
    "#3D9BEB",
    "#7CCBFF",
    "#174D80",
    "#0A2F57",
    8
  );
}

/* =====================================================
   FLORES AMARILLAS DEL FONDO
===================================================== */

async function crearFloresAmarillas() {
  const movil = ancho <= 600;

  // Menos flores, más grandes
  const cantidad = movil ? 28 : 42;

  for (let i = 0; i < cantidad; i++) {
    let x;
    let y;
    let intentos = 0;

    do {
      x = aleatorio(50, ancho - 50);
      y = aleatorio(50, alto - 50);
      intentos++;
    } while (
      Math.abs(x - ancho / 2) < (movil ? 130 : 220) &&
      Math.abs(y - alto * 0.40) < (movil ? 160 : 220) &&
      intentos < 80
    );

    const escala = movil
      ? aleatorio(0.75, 1.0)
      : aleatorio(0.9, 1.25);

    dibujarFlorAmarilla(x, y, escala);

    await esperar(movil ? 40 : 30);
  }
}

/* =====================================================
   CORAZÓN DE FLORES AZULES
===================================================== */

async function crearCorazonAzul() {
  const movil = ancho <= 600;

  const centroX = ancho / 2;
  const centroY = movil ? alto * 0.38 : alto * 0.40;

  const tamano = movil
    ? Math.min(ancho, alto) * 0.0085
    : Math.min(ancho, alto) * 0.0115;

  // Menos flores, para que cada una se vea
  const cantidad = movil ? 24 : 30;

  for (let i = 0; i < cantidad; i++) {
    const t = (Math.PI * 2 * i) / cantidad;

    const hx = 16 * Math.pow(Math.sin(t), 3);
    const hy =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    const x = centroX + hx * tamano;
    const y = centroY - hy * tamano;

    const escala = movil ? 0.55 : 0.65;

    dibujarFlorAzul(x, y, escala);

    await esperar(45);
  }
}

/* =====================================================
   COMPOSICIÓN
===================================================== */

async function crearComposicion() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  textoFinal.style.display = "none";
  textoFinal.style.opacity = "0";

  await crearFloresAmarillas();
  await esperar(250);
  await crearCorazonAzul();
  await esperar(300);

  textoFinal.style.display = "block";

  requestAnimationFrame(() => {
    textoFinal.style.transition = "opacity 1s ease";
    textoFinal.style.opacity = "1";
  });
}

/* =====================================================
   BOTÓN
===================================================== */

boton.addEventListener("click", async () => {
  boton.disabled = true;

  inicio.style.opacity = "0";
  await esperar(400);
  inicio.style.display = "none";

  regalo.classList.remove("oculto");

  ajustarCanvas();
  await crearComposicion();
});