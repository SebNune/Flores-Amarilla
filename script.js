const canvas = document.getElementById("lienzoFlor");
const ctx = canvas.getContext("2d");

const btnIniciar = document.getElementById("btnIniciar");
const inicio = document.querySelector(".inicio");
const textoFinal = document.querySelector(".texto-final");

let ancho = window.innerWidth;
let alto = window.innerHeight;

function ajustarCanvas() {
  ancho = window.innerWidth;
  alto = window.innerHeight;

  canvas.width = ancho;
  canvas.height = alto;
}

ajustarCanvas();

window.addEventListener("resize", () => {
  ajustarCanvas();
});


// ==============================
// UTILIDADES
// ==============================

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function numeroAleatorio(min, max) {
  return Math.random() * (max - min) + min;
}


// ==============================
// DIBUJAR PÉTALO
// ==============================

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


// ==============================
// FLOR AMARILLA
// ==============================

function dibujarFlorAmarilla(x, y, escala = 1) {

  const cantidadPetalos = 8;

  const radioPetalo = 18 * escala;
  const radioCentro = 8 * escala;

  for (let i = 0; i < cantidadPetalos; i++) {

    const angulo =
      (Math.PI * 2 / cantidadPetalos) * i;

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


// ==============================
// FLOR AZUL
// ==============================

function dibujarFlorAzul(x, y, escala = 1) {

  const cantidadPetalos = 7;

  const radioPetalo = 14 * escala;
  const radioCentro = 6 * escala;

  for (let i = 0; i < cantidadPetalos; i++) {

    const angulo =
      (Math.PI * 2 / cantidadPetalos) * i;

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


// ==============================
// CREAR FLORES AMARILLAS
// ==============================

async function crearFloresAmarillas() {

  const esMovil = window.innerWidth <= 600;

  const cantidad = esMovil ? 75 : 90;

  const margenCentroX = ancho / 2;
  const margenCentroY = alto / 2;

  for (let i = 0; i < cantidad; i++) {

    let x;
    let y;

    let intentos = 0;

    do {

      x = numeroAleatorio(20, ancho - 20);
      y = numeroAleatorio(20, alto - 20);

      intentos++;

    } while (

      Math.abs(x - margenCentroX) <
        (esMovil ? 95 : 150)

      &&

      Math.abs(y - margenCentroY) <
        (esMovil ? 125 : 170)

      &&

      intentos < 30
    );


    const escala = esMovil
      ? numeroAleatorio(0.28, 0.52)
      : numeroAleatorio(0.50, 0.90);


    dibujarFlorAmarilla(
      x,
      y,
      escala
    );


    await esperar(
      esMovil ? 12 : 18
    );
  }
}


// ==============================
// CORAZÓN DE FLORES AZULES
// ==============================

async function crearCorazonAzul() {

  const esMovil = window.innerWidth <= 600;

  const centroX = ancho / 2;

  const centroY = esMovil
    ? alto * 0.42
    : alto * 0.45;


  const escalaCorazon = esMovil
    ? Math.min(ancho, alto) * 0.006
    : Math.min(ancho, alto) * 0.008;


  const puntos = [];

  const cantidadPuntos = esMovil ? 34 : 44;


  for (let i = 0; i < cantidadPuntos; i++) {

    const t =
      (Math.PI * 2 * i) /
      cantidadPuntos;


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


    puntos.push({

      x:
        centroX +
        x *
        escalaCorazon,

      y:
        centroY -
        y *
        escalaCorazon

    });
  }


  for (const punto of puntos) {

    const escalaFlor = esMovil
      ? numeroAleatorio(0.35, 0.48)
      : numeroAleatorio(0.45, 0.65);


    dibujarFlorAzul(
      punto.x,
      punto.y,
      escalaFlor
    );


    await esperar(
      esMovil ? 25 : 35
    );
  }
}


// ==============================
// LIMPIAR CANVAS
// ==============================

function limpiarCanvas() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );
}


// ==============================
// ANIMACIÓN PRINCIPAL
// ==============================

async function iniciarAnimacion() {

  btnIniciar.disabled = true;

  inicio.style.opacity = "0";

  await esperar(500);

  inicio.style.display = "none";


  limpiarCanvas();


  await crearFloresAmarillas();


  await esperar(300);


  await crearCorazonAzul();


  await esperar(400);


  textoFinal.style.display = "block";

  textoFinal.style.opacity = "0";


  requestAnimationFrame(() => {

    textoFinal.style.transition =
      "opacity 1.2s ease";

    textoFinal.style.opacity = "1";

  });
}


// ==============================
// BOTÓN
// ==============================

btnIniciar.addEventListener(
  "click",
  iniciarAnimacion
);