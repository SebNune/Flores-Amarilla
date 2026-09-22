document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // ELEMENTOS
    // =========================================================

    const botonAbrir =
        document.getElementById("botonAbrir");

    const inicio =
        document.getElementById("inicio");

    const regalo =
        document.getElementById("regalo");

    const canvas =
        document.getElementById("lienzoFlor");

    const textoFinal =
        document.getElementById("textoFinal");


    if (
        !botonAbrir ||
        !inicio ||
        !regalo ||
        !canvas ||
        !textoFinal
    ) {

        console.error(
            "Falta algún elemento del HTML."
        );

        return;
    }


    const ctx =
        canvas.getContext("2d");


    let ancho =
        window.innerWidth;

    let alto =
        window.innerHeight;


    // =========================================================
    // CANVAS
    // =========================================================

    function ajustarCanvas() {

        const dpr =
            window.devicePixelRatio || 1;

        ancho =
            window.innerWidth;

        alto =
            window.innerHeight;


        canvas.width =
            ancho * dpr;

        canvas.height =
            alto * dpr;


        canvas.style.width =
            ancho + "px";

        canvas.style.height =
            alto + "px";


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


    window.addEventListener(
        "resize",
        ajustarCanvas
    );


    // =========================================================
    // UTILIDADES
    // =========================================================

    function esperar(ms) {

        return new Promise(
            resolve =>
                setTimeout(resolve, ms)
        );
    }


    function aleatorio(
        min,
        max
    ) {

        return (
            Math.random() *
            (max - min)
            +
            min
        );
    }


    // =========================================================
    // DIBUJAR TALLO
    // =========================================================

    function dibujarTallo(
        x,
        y,
        escala
    ) {

        const largo =
            38 * escala;


        ctx.save();


        ctx.beginPath();

        ctx.moveTo(
            x,
            y + 5 * escala
        );


        ctx.bezierCurveTo(

            x - 4 * escala,
            y + largo * 0.35,

            x + 5 * escala,
            y + largo * 0.7,

            x,
            y + largo
        );


        ctx.strokeStyle =
            "#4F8A3A";

        ctx.lineWidth =
            3 * escala;

        ctx.lineCap =
            "round";

        ctx.stroke();


        // HOJITA IZQUIERDA

        ctx.beginPath();

        ctx.moveTo(
            x,
            y + largo * 0.55
        );

        ctx.quadraticCurveTo(

            x - 16 * escala,
            y + largo * 0.45,

            x - 19 * escala,
            y + largo * 0.62
        );

        ctx.quadraticCurveTo(

            x - 8 * escala,
            y + largo * 0.67,

            x,
            y + largo * 0.55
        );

        ctx.fillStyle =
            "#6FAF4B";

        ctx.fill();


        // HOJITA DERECHA

        ctx.beginPath();

        ctx.moveTo(
            x,
            y + largo * 0.72
        );

        ctx.quadraticCurveTo(

            x + 17 * escala,
            y + largo * 0.62,

            x + 20 * escala,
            y + largo * 0.78
        );

        ctx.quadraticCurveTo(

            x + 8 * escala,
            y + largo * 0.84,

            x,
            y + largo * 0.72
        );

        ctx.fillStyle =
            "#5E9C42";

        ctx.fill();


        ctx.restore();
    }


    // =========================================================
    // PÉTALO
    // =========================================================

    function dibujarPetalo(
        largo,
        anchoPetalo,
        color
    ) {

        ctx.beginPath();

        ctx.moveTo(
            0,
            0
        );


        ctx.bezierCurveTo(

            largo * 0.30,
            -anchoPetalo,

            largo * 0.75,
            -anchoPetalo,

            largo,
            0
        );


        ctx.bezierCurveTo(

            largo * 0.75,
            anchoPetalo,

            largo * 0.30,
            anchoPetalo,

            0,
            0
        );


        ctx.closePath();


        ctx.fillStyle =
            color;

        ctx.fill();
    }


    // =========================================================
    // FLOR AMARILLA
    // =========================================================

    async function dibujarFlorAmarilla(
        x,
        y,
        escala = 1
    ) {

        // TALLO PRIMERO
        // para que la flor quede encima

        dibujarTallo(
            x,
            y,
            escala
        );


        ctx.save();


        ctx.translate(
            x,
            y
        );


        ctx.rotate(
            aleatorio(
                -0.25,
                0.25
            )
        );


        const petalos =
            10;


        // CAPA EXTERIOR

        for (
            let i = 0;
            i < petalos;
            i++
        ) {

            ctx.save();


            ctx.rotate(

                (
                    Math.PI *
                    2 /
                    petalos
                )
                *
                i
            );


            dibujarPetalo(

                26 * escala,

                7.5 * escala,

                "#FFD42A"
            );


            ctx.restore();
        }


        // CAPA INTERIOR

        for (
            let i = 0;
            i < petalos;
            i++
        ) {

            ctx.save();


            ctx.rotate(

                (
                    Math.PI *
                    2 /
                    petalos
                )
                *
                i

                +

                Math.PI /
                petalos
            );


            dibujarPetalo(

                18 * escala,

                5.5 * escala,

                "#FFE76A"
            );


            ctx.restore();
        }


        // CENTRO

        ctx.beginPath();

        ctx.arc(

            0,
            0,

            8 * escala,

            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            "#9A6218";

        ctx.fill();


        ctx.beginPath();

        ctx.arc(

            0,
            0,

            4.5 * escala,

            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            "#633A0D";

        ctx.fill();


        ctx.restore();
    }


    // =========================================================
    // FLOR AZUL
    // =========================================================

    async function dibujarFlorAzul(
        x,
        y,
        escala = 1
    ) {

        ctx.save();


        ctx.translate(
            x,
            y
        );


        ctx.rotate(
            aleatorio(
                -0.35,
                0.35
            )
        );


        const petalos =
            8;


        for (
            let i = 0;
            i < petalos;
            i++
        ) {

            ctx.save();


            ctx.rotate(

                (
                    Math.PI *
                    2 /
                    petalos
                )
                *
                i
            );


            dibujarPetalo(

                18 * escala,

                5.5 * escala,

                "#3D9BEA"
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

                (
                    Math.PI *
                    2 /
                    petalos
                )
                *
                i

                +

                Math.PI /
                petalos
            );


            dibujarPetalo(

                12 * escala,

                4 * escala,

                "#82CEFF"
            );


            ctx.restore();
        }


        ctx.beginPath();

        ctx.arc(

            0,
            0,

            5.5 * escala,

            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            "#1A568E";

        ctx.fill();


        ctx.beginPath();

        ctx.arc(

            0,
            0,

            2.8 * escala,

            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            "#092E54";

        ctx.fill();


        ctx.restore();
    }


    // =========================================================
    // FLORES AMARILLAS
    // =========================================================

    async function crearFloresAmarillas() {

        const esMovil =
            ancho <= 600;


        // TU CONFIGURACIÓN ORIGINAL
        // 85 EN PC

        const cantidad =
            esMovil
                ? 45
                : 85;


        const centroX =
            ancho / 2;


        const centroY =
            esMovil
                ? alto * 0.38
                : alto / 2 - 10;


        const zonaCorazon =

            Math.min(
                ancho,
                alto
            )

            *

            (
                esMovil
                    ? 0.27
                    : 0.22
            );


        let creadas =
            0;

        let intentos =
            0;


        while (

            creadas <
            cantidad

            &&

            intentos <
            cantidad * 30

        ) {

            intentos++;


            const margenX =
                esMovil
                    ? 28
                    : 20;


            const margenSuperior =
                esMovil
                    ? 30
                    : 20;


            // Dejamos bastante espacio
            // para mensaje abajo

            const margenInferior =
                esMovil
                    ? 150
                    : 110;


            const x =

                margenX

                +

                Math.random()

                *

                (
                    ancho
                    -
                    margenX * 2
                );


            const y =

                margenSuperior

                +

                Math.random()

                *

                (
                    alto
                    -
                    margenSuperior
                    -
                    margenInferior
                );


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


            // CENTRO LIBRE

            if (
                distancia <
                zonaCorazon
            ) {

                continue;
            }


            const escala =

                esMovil

                    ?

                    0.46
                    +
                    Math.random()
                    *
                    0.28

                    :

                    0.6
                    +
                    Math.random()
                    *
                    0.55;


            await dibujarFlorAmarilla(

                x,
                y,
                escala
            );


            creadas++;


            await esperar(
                esMovil
                    ? 6
                    : 2
            );
        }
    }


    // =========================================================
    // CORAZÓN AZUL
    // =========================================================

    async function crearCorazonAzul() {

        const esMovil =
            ancho <= 600;


        const centroX =
            ancho / 2;


        const centroY =
            esMovil

                ? alto * 0.36

                : alto * 0.40;


        const escalaCorazon =

            Math.min(
                ancho,
                alto
            )

            *

            (
                esMovil
                    ? 0.0087
                    : 0.0105
            );


        const cantidad =
            esMovil
                ? 22
                : 30;


        for (
            let i = 0;
            i < cantidad;
            i++
        ) {

            const t =

                (
                    Math.PI
                    *
                    2
                    *
                    i
                )

                /

                cantidad;


            const hx =

                16

                *

                Math.pow(
                    Math.sin(t),
                    3
                );


            const hy =

                13 *
                Math.cos(t)

                -

                5 *
                Math.cos(2 * t)

                -

                2 *
                Math.cos(3 * t)

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


            await dibujarFlorAzul(

                x,
                y,

                esMovil
                    ? 0.58
                    : 0.70
            );


            await esperar(
                35
            );
        }
    }


    // =========================================================
    // INICIAR REGALO
    // =========================================================

    async function iniciarRegalo() {

        botonAbrir.disabled =
            true;


        // Desvanecer inicio

        inicio.style.opacity =
            "0";


        await esperar(
            450
        );


        inicio.classList.add(
            "oculto"
        );


        regalo.classList.remove(
            "oculto"
        );


        ajustarCanvas();


        // LIMPIAR

        ctx.clearRect(

            0,
            0,
            ancho,
            alto
        );


        // ocultar texto mientras dibuja

        textoFinal.classList.add(
            "oculto"
        );


        // FLORES AMARILLAS

        await crearFloresAmarillas();


        await esperar(
            250
        );


        // CORAZÓN

        await crearCorazonAzul();


        await esperar(
            400
        );


        // MENSAJE FINAL

        textoFinal.classList.remove(
            "oculto"
        );


        textoFinal.style.opacity =
            "0";


        textoFinal.style.transform =
            "translateX(-50%) translateY(15px)";


        requestAnimationFrame(
            () => {

                textoFinal.style.transition =
                    "opacity 1s ease, transform 1s ease";


                textoFinal.style.opacity =
                    "1";


                textoFinal.style.transform =
                    "translateX(-50%) translateY(0)";
            }
        );
    }


    // =========================================================
    // BOTÓN
    // =========================================================

    botonAbrir.addEventListener(
        "click",
        iniciarRegalo
    );

});