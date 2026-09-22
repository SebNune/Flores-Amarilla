async function crearFloresAmarillas() {

    const esMovil =
        window.innerWidth <= 600;

    // En celular ponemos menos para no saturar
    const cantidad =
        esMovil ? 55 : 85;

    const centroX =
        canvas.width / 2;

    const centroY =
        canvas.height / 2 - (esMovil ? 30 : 10);

    const zonaCorazon =
        Math.min(
            canvas.width,
            canvas.height
        ) * (esMovil ? 0.26 : 0.22);

    let creadas = 0;
    let intentos = 0;

    while (
        creadas < cantidad &&
        intentos < cantidad * 30
    ) {

        intentos++;

        const margen =
            esMovil ? 30 : 20;

        const margenInferior =
            esMovil ? 130 : 80;

        const x =
            margen +
            Math.random() *
            (canvas.width - margen * 2);

        const y =
            margen +
            Math.random() *
            (
                canvas.height
                -
                margenInferior
                -
                margen
            );

        const distancia =
            Math.sqrt(
                Math.pow(
                    x - centroX,
                    2
                ) +
                Math.pow(
                    y - centroY,
                    2
                )
            );

        // Dejamos libre el centro
        // para el corazón azul
        if (distancia < zonaCorazon) {
            continue;
        }

        const escala =
            esMovil
                ? 0.45 + Math.random() * 0.35
                : 0.6 + Math.random() * 0.55;

        await dibujarFlorAmarilla(
            x,
            y,
            escala
        );

        creadas++;

        await esperar(
            esMovil ? 3 : 2
        );
    }
}