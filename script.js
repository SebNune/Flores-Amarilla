const boton = document.getElementById("botonAbrir");
const inicio = document.querySelector(".inicio");
const regalo = document.querySelector(".regalo");
const canvas = document.getElementById("lienzoFlor");
const textoFinal = document.querySelector(".texto-final");

const ctx = canvas.getContext("2d");

let ancho;
let alto;


// ======================================================
// CANVAS
// ======================================================

function ajustarCanvas() {
  ancho = window.innerWidth;
  alto = window.innerHeight;

  canvas.width = ancho;
  canvas.height = alto;
}

ajustarCanvas();

window.addEventListener("resize", ajustarCanvas);


// ======================================================
// UTILIDADES
// ======================================================

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function aleatorio(min, max) {
  return Math.random() * (max - min) + min;
}


// ======================================================
// PÉTALO
// ======================================================

function petalo(
  x,
  y,
  angulo,
  distancia,
  largo,
  anchoPetalo,
  color
) {

  ctx.save();

  ctx.translate(x, y);
  ctx.rotate(angulo);

  ctx.beginPath();

  ctx.ellipse(
    distancia,
    0,
    largo,
    anchoPetalo,
    0,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = color;
  ctx.fill();

  ctx.restore();
}


// ======================================================
// FLOR AMARILLA
// ======================================================

function dibujarFlorAmarilla(x, y, escala) {

  /*
    CAPA EXTERIOR
  */

  const cantidadExterior = 12;

  for (let i = 0; i < cantidadExterior; i++) {

    const angulo =
      (Math.PI * 2 / cantidadExterior) * i;

    petalo(
      x,
      y,
      angulo,
      13 * escala,
      12 * escala,
      5.5 * escala,
      "#FFD21F"
    );
  }


  /*
    CAPA INTERIOR
  */

  const cantidadInterior = 10;

  for (let i = 0; i < cantidadInterior; i++) {

    const angulo =
      (Math.PI * 2 / cantidadInterior) * i
      + 0.25;

    petalo(
      x,
      y,
      angulo,
      8 * escala,
      8 * escala,
      4.3 * escala,
      "#FFE55C"
    );
  }


  /*
    CENTRO GRANDE
  */

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    6.3 * escala,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "#8A5417";
  ctx.fill();


  /*
    CENTRO INTERIOR
  */

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    3.7 * escala,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "#5E3610";
  ctx.fill();
}


// ======================================================
// FLOR AZUL
// ======================================================

function dibujarFlorAzul(x, y, escala) {

  /*
    CAPA EXTERIOR
  */

  const cantidadExterior = 10;

  for (let i = 0; i < cantidadExterior; i++) {

    const angulo =
      (Math.PI * 2 / cantidadExterior) * i;

    petalo(
      x,
      y,
      angulo,
      10 * escala,
      9 * escala,
      4.5 * escala,
      "#369BEA"
    );
  }


  /*
    CAPA INTERIOR
  */

  const cantidadInterior = 8;

  for (let i = 0; i < cantidadInterior; i++) {

    const angulo =
      (Math.PI * 2 / cantidadInterior) * i
      + 0.3;

    petalo(
      x,
      y,
      angulo,
      6 * escala,
      6 * escala,
      3.5 * escala,
      "#74C2FF"
    );
  }


  /*
    CENTRO
  */

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    4.5 * escala,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "#174F87";
  ctx.fill();


  ctx.beginPath();

  ctx.arc(
    x,
    y,
    2.2 * escala,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "#082F59";
  ctx.fill();
}


// ======================================================
// FLORES AMARILLAS
// ======================================================

async function crearFloresAmarillas() {

  const movil = ancho <= 600;

  const cantidad =
    movil ? 65 : 90;


  for (let i = 0; i < cantidad; i++) {

    let x;
    let y;

    let intentos = 0;

    do {

      x = aleatorio(
        35,
        ancho - 35
      );

      y = aleatorio(
        35,
        alto - 35
      );

      intentos++;

    } while (

      Math.abs(x - ancho / 2) <
        (movil ? 120 : 210)

      &&

      Math.abs(y - alto * 0.40) <
        (movil ? 150 : 210)

      &&

      intentos < 50

    );


    /*
      AHORA SON MÁS GRANDES.
    */

    const escala =
      movil
        ? aleatorio(0.65, 0.90)
        : aleatorio(0.75, 1.15);


    dibujarFlorAmarilla(
      x,
      y,
      escala
    );


    await esperar(
      movil ? 15 : 18
    );
  }
}


// ======================================================
// CORAZÓN DE FLORES AZULES
// ======================================================

async function crearCorazonAzul() {

  const movil = ancho <= 600;

  const centroX = ancho / 2;

  const centroY =
    movil
      ? alto * 0.38
      : alto * 0.40;


  const tamano =
    movil
      ? Math.min(ancho, alto) * 0.007
      : Math.min(ancho, alto) * 0.010;


  const cantidad =
    movil ? 40 : 48;


  for (let i = 0; i < cantidad; i++) {

    const t =
      (Math.PI * 2 * i) /
      cantidad;


    /*
      ECUACIÓN DEL CORAZÓN
    */

    const hx =
      16 *
      Math.pow(
        Math.sin(t),
        3
      );


    const hy =
      13 * Math.cos(t)
      - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t)
      - Math.cos(4 * t);


    const x =
      centroX +
      hx * tamano;


    const y =
      centroY -
      hy * tamano;


    /*
      Flores azules claramente visibles.
    */

    const escala =
      movil
        ? 0.65
        : 0.75;


    dibujarFlorAzul(
      x,
      y,
      escala
    );


    await esperar(25);
  }
}


// ======================================================
// COMPOSICIÓN
// ======================================================

async function crearComposicion() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  textoFinal.style.display =
    "none";


  await crearFloresAmarillas();


  await esperar(300);


  await crearCorazonAzul();


  await esperar(400);


  textoFinal.style.display =
    "block";


  textoFinal.style.opacity =
    "0";


  requestAnimationFrame(() => {

    textoFinal.style.transition =
      "opacity 1.2s ease";

    textoFinal.style.opacity =
      "1";

  });
}


// ======================================================
// BOTÓN
// ======================================================

boton.addEventListener(
  "click",
  async () => {

    boton.disabled = true;


    inicio.style.opacity =
      "0";


    await esperar(400);


    inicio.style.display =
      "none";


    regalo.classList.remove(
      "oculto"
    );


    ajustarCanvas();


    await crearComposicion();

  }
);