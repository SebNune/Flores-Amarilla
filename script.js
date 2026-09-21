const boton = document.getElementById("botonAbrir");
const inicio = document.querySelector(".inicio");
const regalo = document.querySelector(".regalo");

const canvas = document.getElementById("lienzoFlor");
const ctx = canvas.getContext("2d");


// ==========================
// AJUSTAR CANVAS
// ==========================
function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

ajustarCanvas();

window.addEventListener("resize", ajustarCanvas);


// ==========================
// BOTÓN
// ==========================
boton.addEventListener("click", () => {

    inicio.style.display = "none";

    regalo.classList.remove("oculto");

    crearComposicion();
});


// ==========================
// ESPERAR
// ==========================
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// ==========================
// LÍNEA ESTILO TURTLE
// ==========================
async function dibujarLinea(
    x1,
    y1,
    x2,
    y2,
    color,
    grosor = 3
) {

    const pasos = 20;

    let anteriorX = x1;
    let anteriorY = y1;

    for (let i = 1; i <= pasos; i++) {

        const progreso = i / pasos;

        const x =
            x1 + (x2 - x1) * progreso;

        const y =
            y1 + (y2 - y1) * progreso;

        ctx.beginPath();

        ctx.moveTo(
            anteriorX,
            anteriorY
        );

        ctx.lineTo(
            x,
            y
        );

        ctx.strokeStyle = color;
        ctx.lineWidth = grosor;
        ctx.lineCap = "round";

        ctx.stroke();

        anteriorX = x;
        anteriorY = y;

        await esperar(1);
    }
}


// ==========================
// PÉTALO AMARILLO
// ==========================
async function dibujarPetaloAmarillo(
    cx,
    cy,
    angulo,
    escala
) {

    const largo =
        30 * escala;

    const ancho =
        13 * escala;

    const rad =
        angulo * Math.PI / 180;

    ctx.save();

    ctx.translate(cx, cy);

    ctx.rotate(rad);

    ctx.beginPath();

    ctx.moveTo(0, 0);

    ctx.bezierCurveTo(
        ancho,
        -10 * escala,
        largo,
        -10 * escala,
        largo,
        0
    );

    ctx.bezierCurveTo(
        largo,
        10 * escala,
        ancho,
        10 * escala,
        0,
        0
    );

    ctx.fillStyle = "#FFD52A";

    ctx.fill();

    ctx.strokeStyle = "#E1A600";

    ctx.lineWidth = 1.2;

    ctx.stroke();

    ctx.restore();

    await esperar(5);
}


// ==========================
// FLOR AMARILLA
// ==========================
async function dibujarFlorAmarilla(
    x,
    y,
    escala
) {

    const altoTallo =
        50 +
        Math.random() * 80;

    const baseY =
        Math.min(
            canvas.height,
            y + altoTallo
        );


    // TALLO
    await dibujarLinea(
        x,
        baseY,
        x,
        y + 5,
        "#3D8B37",
        3 * escala
    );


    // PÉTALOS
    for (
        let angulo = 0;
        angulo < 360;
        angulo += 45
    ) {

        await dibujarPetaloAmarillo(
            x,
            y,
            angulo,
            escala
        );
    }


    // CENTRO
    ctx.beginPath();

    ctx.arc(
        x,
        y,
        10 * escala,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#7A4B20";

    ctx.fill();

    await esperar(3);
}


// ==========================
// CLAVEL AZUL
// ==========================
async function dibujarClavelAzul(
    x,
    y,
    escala
) {

    // Tallo pequeño
    await dibujarLinea(
        x,
        y + 35 * escala,
        x,
        y + 8,
        "#2E7D32",
        2 * escala
    );


    const capas = [

        {
            radio: 22,
            cantidad: 12,
            tamano: 8
        },

        {
            radio: 16,
            cantidad: 10,
            tamano: 8
        },

        {
            radio: 10,
            cantidad: 8,
            tamano: 7
        }

    ];


    for (const capa of capas) {

        for (
            let i = 0;
            i < capa.cantidad;
            i++
        ) {

            const angulo =
                (Math.PI * 2 /
                    capa.cantidad) *
                i;


            const px =
                x +
                Math.cos(angulo) *
                capa.radio *
                escala;


            const py =
                y +
                Math.sin(angulo) *
                capa.radio *
                escala;


            ctx.beginPath();

            ctx.arc(
                px,
                py,
                capa.tamano * escala,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = "#2F6BFF";

            ctx.fill();

            ctx.strokeStyle = "#1744B5";

            ctx.lineWidth = 1;

            ctx.stroke();

            await esperar(2);
        }
    }


    ctx.beginPath();

    ctx.arc(
        x,
        y,
        9 * escala,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#2456D8";

    ctx.fill();
}


// ==========================
// FORMA DEL CORAZÓN
// ==========================
function obtenerPuntosCorazon(
    centroX,
    centroY,
    escala
) {

    const puntos = [];

    for (
        let t = 0;
        t < Math.PI * 2;
        t += 0.22
    ) {

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
                x * escala,

            y:
                centroY -
                y * escala

        });
    }

    return puntos;
}


// ==========================
// 85 FLORES AMARILLAS
// ==========================
async function crearFloresAmarillas() {

    const cantidad = 85;

    const centroX =
        canvas.width / 2;

    const centroY =
        canvas.height / 2 - 15;


    const zonaCorazon =
        Math.min(
            canvas.width,
            canvas.height
        ) * 0.22;


    let creadas = 0;

    let intentos = 0;


    while (
        creadas < cantidad &&
        intentos < 3000
    ) {

        intentos++;


        const x =
            20 +
            Math.random() *
            (canvas.width - 40);


        const y =
            20 +
            Math.random() *
            (canvas.height - 100);


        const distancia =
            Math.sqrt(

                Math.pow(
                    x - centroX,
                    2
                )

                +

                Math.pow(
                    y - centroY,
                    2
                )

            );


        // Evita tapar el corazón
        if (
            distancia <
            zonaCorazon
        ) {

            continue;
        }


        const escala =
            0.55 +
            Math.random() * 0.5;


        await dibujarFlorAmarilla(
            x,
            y,
            escala
        );


        creadas++;

        await esperar(2);
    }
}


// ==========================
// CORAZÓN DE CLAVELES
// ==========================
async function crearCorazonAzul() {

    const centroX =
        canvas.width / 2;

    const centroY =
        canvas.height / 2 - 20;


    const escalaCorazon =
        window.innerWidth < 600
            ? 6.5
            : 10;


    const puntos =
        obtenerPuntosCorazon(
            centroX,
            centroY,
            escalaCorazon
        );


    for (
        const punto of puntos
    ) {

        await dibujarClavelAzul(

            punto.x,

            punto.y,

            window.innerWidth < 600
                ? 0.5
                : 0.65

        );

        await esperar(3);
    }
}


// ==========================
// TODO JUNTO
// ==========================
async function crearComposicion() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    await crearFloresAmarillas();


    await esperar(300);


    await crearCorazonAzul();
}
