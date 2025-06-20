let musicaIniciada = false;

function reproducirMusica() {
    if (musicaIniciada) return;

    let audio;

    const rutaActual = window.location.pathname;

    // Si estamos en la página de créditos
    if (rutaActual.includes('credits.html')) {
        audio = new Audio('../sounds/music/onARoll.ogg'); // Ruta a tu música de créditos
    } else {
        const canciones = [
            'elfosNocturnos.mp3',
            'humano.mp3',
            'noMuerto.mp3',
            'orco.mp3'
        ];
        const aleatorio = Math.floor(Math.random() * canciones.length);
        audio = new Audio('sounds/music/' + canciones[aleatorio]);
    }

    audio.loop = true;
    audio.volume = 0.5;

    audio.play().then(() => {
        musicaIniciada = true;
        console.log('Música iniciada');
    }).catch(err => {
        console.warn('Error al reproducir audio:', err);
    });
}

// Solo se ejecuta una vez al mover el mouse
window.addEventListener('mousemove', reproducirMusica, { once: true });
