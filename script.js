const botonAbrir = document.getElementById("botonAbrir");
const inicio = document.getElementById("inicio");
const regalo = document.getElementById("regalo");

const canvas = document.getElementById("lienzoFlor");
const ctx = canvas.getContext("2d");

const textoFinal = document.getElementById("textoFinal");

let ancho;
let alto;


/* ================================================
   CANVAS
================================================ */

function ajustarCanvas() {

  const dpr = window.devicePixelRatio || 1;

  ancho = window.innerWidth;
  alto = window.innerHeight;

  canvas.width = ancho * dpr;
  canvas.height = alto * dpr;

  canvas.style.width = `${ancho}px`;
  canvas.style.height = `${alto}px`;

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );
}


ajustarCanvas();

window.addEventListener("resize", ajustarCanvas);


/* ================================================
   UTILIDADES
================================================ */

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function random(min, max) {
  return Math.random() * (max - min) + min;
}


/* ================================================
   PÉTALO
================================================ */

function dibujarPetalo(
  largo,
  anchoPetalo,
  color
) {

  ctx.beginPath();

  ctx.moveTo(0, 0);

  ctx.bezierCurveTo(
    largo * 0.3,
    -anchoPetalo,
    largo * 0.75,
    -anchoPetalo,
    largo,
    0
  );

  ctx.bezierCurveTo(
    largo * 0.75,
    anchoPetalo,
    largo * 0.3,
    anchoPetalo,
    0,
    0
  );

  ctx.closePath();

  ctx.fillStyle = color;

  ctx.fill();
}


/* ================================================
   FLOR AMARILLA REAL
================================================ */

function florAmarilla(
  x,
  y,
  escala = 1
) {

  ctx.save();

  ctx.translate(x, y);

  ctx.rotate(
    random(0, Math.PI)
  );


  const petalos = 10;


  // Pétalos exteriores grandes
  for (
    let i = 0;
    i < petalos;
    i++
  ) {

    ctx.save();

    ctx.rotate(
      (Math.PI * 2 / petalos) * i
    );

    dibujarPetalo(
      28 * escala,
      8 * escala,
      "#FFD42A"
    );

    ctx.restore();
  }


  // Pétalos interiores
  for (
    let i = 0;
    i < petalos;
    i++
  ) {

    ctx.save();

    ctx.rotate(
      (Math.PI * 2 / petalos) * i
      +
      Math.PI / petalos
    );

    dibujarPetalo(
      20 * escala,
      6 * escala,
      "#FFE86B"
    );

    ctx.restore();
  }


  // Centro exterior
  ctx.beginPath();

  ctx.arc(
    0,
    0,
    8 * escala,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "#9B6518";

  ctx.fill();


  // Centro interior
  ctx.beginPath();

  ctx.arc(
    0,
    0,
    4.5 * escala,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "#60400D";

  ctx.fill();


  ctx.restore();
}


/* ================================================
   FLOR AZUL REAL
================================================ */

function florAzul(
  x,
  y,
  escala = 1
) {

  ctx.save();

  ctx.translate(x, y);

  ctx.rotate(
    random(0, Math.PI)
  );


  const petalos = 8;


  for (
    let i = 0;
    i < petalos;
    i++
  ) {

    ctx.save();

    ctx.rotate(
      (Math.PI * 2 / petalos) * i
    );

    dibujarPetalo(
      20 * escala,
      6 * escala,
      "#459FE8"
    );

    ctx.restore();
  }


  for (
    let i = 0;
    i < petalos;
    i++
  ) {

    ctx.save();

    ctx.rotate(
      (Math.PI * 2 / petalos) * i
      +
      Math.PI / petalos
    );

    dibujarPetalo(
      14 * escala,
      4.5 * escala,
      "#80CCFF"
    );

    ctx.restore();
  }


  ctx.beginPath();

  ctx.arc(
    0,
    0,
    6 * escala,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "#19548A";

  ctx.fill();


  ctx.beginPath();

  ctx.arc(
    0,
    0,
    3 * escala,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "#092D50";

  ctx.fill();


  ctx.restore();
}


/* ================================================
   FLORES AMARILLAS
================================================ */

async function crearFloresAmarillas() {

  const movil =
    ancho <= 600;


  const cantidad =
    movil
      ? 30
      : 48;


  for (
    let i = 0;
    i < cantidad;
    i++
  ) {

    let x;
    let y;

    let intentos = 0;


    do {

      x = random(
        45,
        ancho - 45
      );

      y = random(
        45,
        alto - 45
      );

      intentos++;

    }
    while (

      Math.abs(
        x - ancho / 2
      )
      <
      (
        movil
          ? 125
          : 230
      )

      &&

      Math.abs(
        y - alto * 0.40
      )
      <
      (
        movil
          ? 160
          : 230
      )

      &&

      intentos < 100

    );


    const escala =
      movil
        ? random(
            0.75,
            1
          )
        : random(
            0.85,
            1.25
          );


    florAmarilla(
      x,
      y,
      escala
    );


    await esperar(
      movil
        ? 35
        : 30
    );
  }

}


/* ================================================
   CORAZÓN DE FLORES AZULES
================================================ */

async function crearCorazon() {

  const movil =
    ancho <= 600;


  const centroX =
    ancho / 2;


  const centroY =
    movil
      ? alto * 0.38
      : alto * 0.39;


  const escalaCorazon =
    movil
      ? Math.min(
          ancho,
          alto
        ) * 0.009

      : Math.min(
          ancho,
          alto
        ) * 0.012;


  // Pocas flores para que SE VEAN
  const cantidad =
    movil
      ? 20
      : 24;


  for (
    let i = 0;
    i < cantidad;
    i++
  ) {

    const t =
      (
        Math.PI *
        2 *
        i
      )
      /
      cantidad;


    const hx =
      16 *
      Math.pow(
        Math.sin(t),
        3
      );


    const hy =
      13 *
      Math.cos(t)

      -

      5 *
      Math.cos(
        2 * t
      )

      -

      2 *
      Math.cos(
        3 * t
      )

      -

      Math.cos(
        4 * t
      );


    const x =
      centroX
      +
      hx *
      escalaCorazon;


    const y =
      centroY
      -
      hy *
      escalaCorazon;


    florAzul(
      x,
      y,
      movil
        ? 0.65
        : 0.80
    );


    await esperar(60);

  }

}


/* ================================================
   ANIMACIÓN
================================================ */

async function iniciarRegalo() {

  botonAbrir.disabled = true;


  inicio.style.opacity = "0";


  await esperar(500);


  inicio.classList.add("oculto");

  regalo.classList.remove("oculto");


  ajustarCanvas();


  ctx.clearRect(
    0,
    0,
    ancho,
    alto
  );


  await crearFloresAmarillas();


  await esperar(300);


  await crearCorazon();


  await esperar(500);


  textoFinal.classList.remove(
    "oculto"
  );

}


/* ================================================
   BOTÓN
================================================ */

botonAbrir.addEventListener(
  "click",
  iniciarRegalo
);