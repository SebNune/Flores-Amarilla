const boton = document.getElementById("botonAbrir");
const inicio = document.querySelector(".inicio");
const regalo = document.querySelector(".regalo");
const canvas = document.getElementById("lienzoFlor");
const textoFinal = document.querySelector(".texto-final");

const ctx = canvas.getContext("2d");

let ancho = window.innerWidth;
let alto = window.innerHeight;


// ======================================================
// AJUSTAR CANVAS
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
// PÉTALO REAL
// ======================================================

function dibujarPetalo(
  x,
  y,
  largo,
  anchoPetalo,
  angulo,
  color
) {

  ctx.save();

  ctx.translate(x, y);

  ctx.rotate(angulo);

  ctx.beginPath();

  /*
     Dibujamos una elipse desplazada
     hacia afuera del centro.
  */

  ctx.ellipse(
    largo * 0.58,
    0,
    largo * 0.58,
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

function dibujarFlorAmarilla(
  x,
  y,
  escala = 1
) {

  ctx.save();

  ctx.translate(x, y);

  /*
      Ligera rotación aleatoria
      para que no todas se vean iguales.
  */

  ctx.rotate(
    aleatorio(
      -0.35,
      0.35
    )
  );


  const petalos = 10;

  const largoPetalo =
    22 * escala;

  const anchoPetalo =
    7 * escala;


  /*
      PÉTALOS
  */

  for (
    let i = 0;
    i < petalos;
    i++
  ) {

    const angulo =
      (Math.PI * 2 / petalos) * i;


    dibujarPetalo(
      0,
      0,
      largoPetalo,
      anchoPetalo,
      angulo,
      "#FFD633"
    );

  }


  /*
      CENTRO EXTERIOR
  */

  ctx.beginPath();

  ctx.arc(
    0,
    0,
    8 * escala,
    0,
    Math.PI * 2
  );

  ctx.fillStyle =
    "#9A6817";

  ctx.fill();


  /*
      CENTRO INTERIOR
  */

  ctx.beginPath();

  ctx.arc(
    0,
    0,
    4.5 * escala,
    0,
    Math.PI * 2
  );

  ctx.fillStyle =
    "#6E4312";

  ctx.fill();


  /*
      PUNTITOS DEL CENTRO
  */

  for (
    let i = 0;
    i < 7;
    i++
  ) {

    const angulo =
      Math.random() *
      Math.PI *
      2;

    const distancia =
      aleatorio(
        1,
        5
      ) *
      escala;

    const px =
      Math.cos(angulo) *
      distancia;

    const py =
      Math.sin(angulo) *
      distancia;

    ctx.beginPath();

    ctx.arc(
      px,
      py,
      0.8 * escala,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      "#C58C25";

    ctx.fill();
  }


  ctx.restore();
}


// ======================================================
// FLOR AZUL
// ======================================================

function dibujarFlorAzul(
  x,
  y,
  escala = 1
) {

  ctx.save();

  ctx.translate(x, y);

  ctx.rotate(
    aleatorio(
      -0.4,
      0.4
    )
  );


  const petalos = 8;

  const largoPetalo =
    16 * escala;

  const anchoPetalo =
    5.5 * escala;


  for (
    let i = 0;
    i < petalos;
    i++
  ) {

    const angulo =
      (Math.PI * 2 / petalos) * i;


    dibujarPetalo(
      0,
      0,
      largoPetalo,
      anchoPetalo,
      angulo,
      "#3793E8"
    );

  }


  /*
      Centro azul oscuro
  */

  ctx.beginPath();

  ctx.arc(
    0,
    0,
    5.5 * escala,
    0,
    Math.PI * 2
  );

  ctx.fillStyle =
    "#174A7C";

  ctx.fill();


  /*
      Centro pequeño
  */

  ctx.beginPath();

  ctx.arc(
    0,
    0,
    2.5 * escala,
    0,
    Math.PI * 2
  );

  ctx.fillStyle =
    "#0B3159";

  ctx.fill();


  ctx.restore();
}


// ======================================================
// FLORES AMARILLAS
// ======================================================

async function crearFloresAmarillas() {

  const movil =
    window.innerWidth <= 600;


  /*
      PC: más flores
      Móvil: menos para no saturar
  */

  const cantidad =
    movil ? 62 : 85;


  for (
    let i = 0;
    i < cantidad;
    i++
  ) {

    let x;
    let y;

    let intentos = 0;


    /*
        Intentamos evitar el centro
        donde estará el corazón azul.
    */

    do {

      x = aleatorio(
        30,
        ancho - 30
      );

      y = aleatorio(
        30,
        alto - 30
      );

      intentos++;

    } while (

      Math.abs(
        x - ancho / 2
      ) <
        (
          movil
            ? 110
            : 190
        )

      &&

      Math.abs(
        y - alto * 0.42
      ) <
        (
          movil
            ? 130
            : 190
        )

      &&

      intentos < 50

    );


    /*
        Tamaño de las flores.
    */

    const escala =
      movil
        ? aleatorio(
            0.52,
            0.78
          )
        : aleatorio(
            0.65,
            1.05
          );


    dibujarFlorAmarilla(
      x,
      y,
      escala
    );


    await esperar(
      movil ? 18 : 22
    );
  }
}


// ======================================================
// CORAZÓN DE FLORES AZULES
// ======================================================

async function crearCorazonAzul() {

  const movil =
    window.innerWidth <= 600;


  const centroX =
    ancho / 2;


  const centroY =
    movil
      ? alto * 0.40
      : alto * 0.40;


  /*
      Tamaño general del corazón
  */

  const tamanoCorazon =
    movil
      ? Math.min(
          ancho,
          alto
        ) * 0.0074
      : Math.min(
          ancho,
          alto
        ) * 0.0105;


  /*
      Más puntos =
      corazón más continuo.
  */

  const cantidad =
    movil ? 42 : 52;


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
      ) /
      cantidad;


    /*
        Fórmula clásica de corazón
    */

    const hx =
      16 *
      Math.pow(
        Math.sin(t),
        3
      );


    const hy =
      13 *
        Math.cos(t)

      - 5 *
        Math.cos(
          2 * t
        )

      - 2 *
        Math.cos(
          3 * t
        )

      - Math.cos(
          4 * t
        );


    const x =
      centroX +
      hx *
      tamanoCorazon;


    const y =
      centroY -
      hy *
      tamanoCorazon;


    const escala =
      movil
        ? aleatorio(
            0.48,
            0.60
          )
        : aleatorio(
            0.52,
            0.68
          );


    dibujarFlorAzul(
      x,
      y,
      escala
    );


    await esperar(
      movil ? 25 : 30
    );
  }
}


// ======================================================
// CREAR COMPOSICIÓN
// ======================================================

async function crearComposicion() {

  /*
      Limpiamos canvas.
  */

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  /*
      Ocultamos texto final
      mientras aparecen flores.
  */

  textoFinal.style.opacity =
    "0";


  /*
      Flores amarillas
  */

  await crearFloresAmarillas();


  await esperar(300);


  /*
      Corazón azul
  */

  await crearCorazonAzul();


  await esperar(350);


  /*
      Mostrar mensaje
  */

  textoFinal.style.display =
    "block";


  requestAnimationFrame(
    () => {

      textoFinal.style.transition =
        "opacity 1s ease";

      textoFinal.style.opacity =
        "1";

    }
  );
}


// ======================================================
// BOTÓN INICIAL
// ======================================================

boton.addEventListener(
  "click",
  async () => {

    boton.disabled = true;


    /*
        Desaparecer inicio.
    */

    inicio.style.opacity =
      "0";


    await esperar(400);


    inicio.style.display =
      "none";


    /*
        Mostrar regalo.
    */

    regalo.classList.remove(
      "oculto"
    );


    ajustarCanvas();


    /*
        Comenzar dibujo.
    */

    await crearComposicion();

  }
);