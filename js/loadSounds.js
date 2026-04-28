const razaURL = new URLSearchParams(window.location.search);
const razaIngresada = razaURL.get('raza');
const unidadIngresada = razaURL.get('unidad');

let audios = [];
let paginaActual = 0;
const frasesPorPagina = 4;

let botonAnteriorClase = document.getElementById('botonAnterior');
let botonSiguienteClase = document.getElementById('botonSiguiente');

// Cargar los sonidos de la unidad
fetch('../js/races.json')
  .then(res => res.json())
  .then(data => {
    audios = Object.values(data.razas[razaIngresada].unidades[unidadIngresada].frases);
    document.getElementById('nombreUnidad').textContent = data.razas[razaIngresada].unidades[unidadIngresada].nombre;
    renderAudios();
  })
  .catch(err => console.error('Error al cargar las frases:', err));

function renderAudios() {
  const contenedor = document.getElementById('unidadSonidos');
  contenedor.innerHTML = '';

  const inicio = paginaActual * frasesPorPagina;
  const fin = inicio + frasesPorPagina;
  const pagina = audios.slice(inicio, fin);

  Object.entries(audios.slice(inicio, fin)).forEach(([claveUnidad, unidad]) => {
    const contenedorUnidad = document.createElement('div');
    contenedorUnidad.className = 'contenedorFrase';

    //contenedor de frase
    const textoFrase = document.createElement('div');
    textoFrase.textContent = unidad.texto;
    textoFrase.className = 'textoFrase';

    //contenedor de botones
    const botonera = document.createElement('div');
    botonera.className = 'contenedorBotonera';

    //botón de descargar audio
    const botonDescargar = document.createElement('button');
    botonDescargar.className = 'botonDescargar';
  
    //botón de reproducir audio
    const botonReproductor = document.createElement('button');
    botonReproductor.className = 'botonPlay';
    botonReproductor.onclick = () => {
      reproducirSonido(unidad.audio);
    };

    botonera.appendChild(botonReproductor);
    botonera.appendChild(botonDescargar);

    contenedorUnidad.appendChild(textoFrase);
    contenedorUnidad.appendChild(botonera);
    contenedor.appendChild(contenedorUnidad);
  })
};

// Event listeners de paginación
document.getElementById('botonAnterior').addEventListener('click', () => {
  if (botonAnteriorClase.className === 'botonAnterior') {
    new Audio('../sounds/interface/mouseClick.wav').play();
  } else {
    new Audio('../sounds/interface/error.wav').play();
  }

  if (paginaActual > 0) {
    setTimeout(() => {
      paginaActual--;
      renderAudios();
    }, 120);
  }
});

document.getElementById('botonSiguiente').addEventListener('click', () => {
  if (botonSiguienteClase.className === 'botonSiguiente') {
    new Audio('../sounds/interface/mouseClick.wav').play();
  } else {
    new Audio('../sounds/interface/error.wav').play();
  }

  if ((paginaActual + 1) * frasesPorPagina < audios.length) {
    setTimeout(() => {
      paginaActual++;
      renderAudios();
    }, 120);
  }
});