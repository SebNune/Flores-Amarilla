document.addEventListener("DOMContentLoaded", () => {

  // =====================================================
  // ELEMENTOS
  // =====================================================

  const botonAbrir = document.getElementById("botonAbrir");
  const inicio = document.getElementById("inicio");
  const regalo = document.getElementById("regalo");
  const canvas = document.getElementById("lienzoFlor");
  const textoFinal = document.getElementById("textoFinal");

  if (!botonAbrir || !inicio || !regalo || !canvas || !textoFinal) {
    console.error("Falta uno de los elementos necesarios en el HTML.");
    return;
  }

  const ctx = canvas.getContext("2d");

  let ancho = window.innerWidth;
  let alto = window.innerHeight;


  // =====================================================
  // CANVAS
  // =====================================================

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

  window.addEventListener("resize", () => {
    ajustarCanvas();
  });


  // =====================================================
  // UTILIDADES
  // =====================================================

  function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }


  // =====================================================
  // ESCALA RESPONSIVE
  // =====================================================
  // ÚNICO OBJETIVO:
  // mantener exactamente el mismo diseño,
  // pero reducirlo proporcionalmente en celular.
  // =====================================================

  function obtenerFactorResponsive() {

    if (window.innerWidth > 600) {
      return 1;
    }

    /*
      390px aprox. = 0.56
      360px aprox. = 0.51

      No dejamos que baje demasiado
      para que las flores sigan siendo visibles.
    */

    return Math.max(
      0.50,
      Math.min(
        0.62,
        window.innerWidth / 700
      )
    );
  }


  // =====================================================
  // PÉTALO
  // =====================================================

  function dibujarPetalo(
    largo,
    anchoPetalo,
    color
  ) {

    ctx.beginPath();

    ctx.moveTo(0, 0);

    ctx.bezierCurveTo(
      largo * 0.35,
      -anchoPetalo,

      largo * 0.78,
      -anchoPetalo,

      largo,
      0
    );

    ctx.bezierCurveTo(
      largo * 0.78,
      anchoPetalo,

      largo * 0.35,
      anchoPetalo,

      0,
      0
    );

    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();
  }


  // =====================================================
  // FLOR AMARILLA
  // =====================================================

  function dibujarFlorAmarilla(
    x,
    y,
    escala = 1
  ) {

    ctx.save();

    ctx.translate(x, y);

    ctx.rotate(
      random(0, Math.PI)
    );


    const cantidadPetalos = 10;


    // CAPA EXTERIOR

    for (
      let i = 0;
      i < cantidadPetalos;
      i++
    ) {

      ctx.save();

      ctx.rotate(
        (Math.PI * 2 / cantidadPetalos) * i
      );

      dibujarPetalo(
        30 * escala,
        9 * escala,
        "#FFD633"
      );

      ctx.restore();
    }


    // CAPA INTERIOR

    for (
      let i = 0;
      i < cantidadPetalos;
      i++
    ) {

      ctx.save();

      ctx.rotate(
        (Math.PI * 2 / cantidadPetalos) * i
        +
        Math.PI / cantidadPetalos
      );

      dibujarPetalo(
        21 * escala,
        6.5 * escala,
        "#FFE977"
      );

      ctx.restore();
    }


    // CENTRO EXTERIOR

    ctx.beginPath();

    ctx.arc(
      0,
      0,
      9 * escala,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "#9A6317";
    ctx.fill();


    // CENTRO INTERIOR

    ctx.beginPath();

    ctx.arc(
      0,
      0,
      5 * escala,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "#5F3910";
    ctx.fill();


    ctx.restore();
  }


  // =====================================================
  // FLOR AZUL
  // =====================================================

  function dibujarFlorAzul(
    x,
    y,
    escala = 1
  ) {

    ctx.save();

    ctx.translate(x, y);

    ctx.rotate(
      random(0, Math.PI)
    );


    const cantidadPetalos = 8;


    // CAPA EXTERIOR

    for (
      let i = 0;
      i < cantidadPetalos;
      i++
    ) {

      ctx.save();

      ctx.rotate(
        (Math.PI * 2 / cantidadPetalos) * i
      );

      dibujarPetalo(
        23 * escala,
        7 * escala,
        "#3D9BEA"
      );

      ctx.restore();
    }


    // CAPA INTERIOR

    for (
      let i = 0;
      i < cantidadPetalos;
      i++
    ) {

      ctx.save();

      ctx.rotate(
        (Math.PI * 2 / cantidadPetalos) * i
        +
        Math.PI / cantidadPetalos
      );

      dibujarPetalo(
        16 * escala,
        5 * escala,
        "#82CEFF"
      );

      ctx.restore();
    }


    // CENTRO EXTERIOR

    ctx.beginPath();

    ctx.arc(
      0,
      0,
      7 * escala,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "#1C568C";
    ctx.fill();


    // CENTRO INTERIOR

    ctx.beginPath();

    ctx.arc(
      0,
      0,
      3.5 * escala,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "#092F55";
    ctx.fill();


    ctx.restore();
  }


  // =====================================================
  // FLORES AMARILLAS
  // =====================================================

  async function crearFloresAmarillas() {

    const movil = ancho <= 600;

    const factorResponsive =
      obtenerFactorResponsive();


    /*
      NO TOCAMOS la cantidad.
      Queda exactamente como la tienes.
    */

    const cantidad = movil
      ? 28
      : 46;


    for (
      let i = 0;
      i < cantidad;
      i++
    ) {

      let x;
      let y;

      let intentos = 0;


      // Dejar libre la zona del corazón

      do {

        x = random(
          50,
          ancho - 50
        );

        y = random(
          50,
          alto - 50
        );

        intentos++;

      } while (

        Math.abs(
          x - ancho / 2
        )
        <
        (
          movil
            ? 130
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


      /*
        MISMA escala original.
        Solo se multiplica por el factor
        cuando estamos en celular.
      */

      const escalaOriginal = movil
        ? random(
            0.70,
            0.95
          )
        : random(
            0.85,
            1.20
          );


      const escala =
        escalaOriginal *
        factorResponsive;


      dibujarFlorAmarilla(
        x,
        y,
        escala
      );


      await esperar(
        movil
          ? 40
          : 32
      );

    }

  }


  // =====================================================
  // CORAZÓN DE FLORES AZULES
  // =====================================================

  async function crearCorazonAzul() {

    const movil = ancho <= 600;

    const factorResponsive =
      obtenerFactorResponsive();


    const centroX =
      ancho / 2;


    const centroY =
      movil
        ? alto * 0.38
        : alto * 0.40;


    /*
      MISMO tamaño del corazón.
      Solo escalado proporcionalmente
      en celular.
    */

    const escalaCorazonOriginal =
      movil
        ? Math.min(
            ancho,
            alto
          ) * 0.0095
        : Math.min(
            ancho,
            alto
          ) * 0.012;


    const escalaCorazon =
      escalaCorazonOriginal *
      factorResponsive;


    // MISMA cantidad que ya tienes

    const cantidad =
      movil
        ? 18
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
        13 * Math.cos(t)
        -
        5 * Math.cos(2 * t)
        -
        2 * Math.cos(3 * t)
        -
        Math.cos(4 * t);


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


      /*
        MISMO tamaño original de cada
        flor azul, reducido proporcionalmente.
      */

      const escalaFlorOriginal =
        movil
          ? 0.65
          : 0.80;


      const escalaFlor =
        escalaFlorOriginal *
        factorResponsive;


      dibujarFlorAzul(
        x,
        y,
        escalaFlor
      );


      await esperar(65);

    }

  }


  // =====================================================
  // MOSTRAR REGALO
  // =====================================================

  async function mostrarRegalo() {

    botonAbrir.disabled = true;


    // Desaparece la tarjeta inicial

    inicio.style.opacity = "0";


    await esperar(450);


    inicio.classList.add("oculto");

    regalo.classList.remove("oculto");


    ajustarCanvas();


    ctx.clearRect(
      0,
      0,
      ancho,
      alto
    );


    textoFinal.classList.add("oculto");


    // Flores amarillas

    await crearFloresAmarillas();


    await esperar(250);


    // Corazón azul

    await crearCorazonAzul();


    await esperar(450);


    // Texto final

    textoFinal.classList.remove("oculto");

  }


  // =====================================================
  // BOTÓN
  // =====================================================

  botonAbrir.addEventListener(
    "click",
    mostrarRegalo
  );

});