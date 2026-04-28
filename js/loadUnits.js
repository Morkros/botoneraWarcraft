const razaURL = new URLSearchParams(window.location.search);
const razaIngresada = razaURL.get('raza');

let unidades = [];
let paginaActual = 0;
const unidadesPorPagina = 9;

let botonAnteriorClase = document.getElementById('botonAnterior');
let botonSiguienteClase = document.getElementById('botonSiguiente');

// Cargar las unidades
fetch('../js/races.json')
  .then(res => res.json())
  .then(data => {
    unidades = data.razas[razaIngresada].unidades;
    document.getElementById('nombreRaza').textContent = data.razas[razaIngresada].nombre;
    renderUnidades();
  })
  .catch(err => console.error('Error al cargar las unidades:', err));

function renderUnidades() {
  const contenedor = document.getElementById('unidadLista');
  contenedor.innerHTML = '';

  const inicio = paginaActual * unidadesPorPagina;
  const fin = inicio + unidadesPorPagina;

  const unidadesArray = Object.entries(unidades);
  const unidadesPagina = unidadesArray.slice(inicio, fin);

  unidadesPagina.forEach(([claveUnidad, unidad]) => {
    console.log('claveunidad: ', claveUnidad, 'Unidad actual:', unidad);

    const contenedorUnidad = document.createElement('div');
    contenedorUnidad.className = 'iconoTexto';

    const img = document.createElement('img');
    img.src = unidad.icono;
    img.alt = unidad.nombre;
    img.className = 'iconoImg';

    const texto = document.createElement('div');
    texto.className = 'nombreIcono';
    texto.textContent = unidad.nombre;

    contenedorUnidad.appendChild(img);
    contenedorUnidad.appendChild(texto);
    contenedor.appendChild(contenedorUnidad);

    contenedorUnidad.onclick = () => {
      const url = `sounds.html?raza=${encodeURIComponent(razaIngresada)}&unidad=${encodeURIComponent(claveUnidad)}`;
      window.location.href = url;
    };
  });

  if (paginaActual > 0) {
    botonAnteriorClase.className = 'botonAnterior';
  } else {
    botonAnteriorClase.className = 'botonAnteriorInactivo';
  }

  if ((paginaActual + 1) * unidadesPorPagina >= unidadesArray.length) {
    botonSiguienteClase.className = 'botonSiguienteInactivo';
  } else {
    botonSiguienteClase.className = 'botonSiguiente';
  }
}

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
      renderUnidades();
    }, 120);
  }
});

document.getElementById('botonSiguiente').addEventListener('click', () => {
  if (botonSiguienteClase.className === 'botonSiguiente') {
    new Audio('../sounds/interface/mouseClick.wav').play();
  } else {
    new Audio('../sounds/interface/error.wav').play();
  }

  if ((paginaActual + 1) * unidadesPorPagina < Object.keys(unidades).length) {
    setTimeout(() => {
      paginaActual++;
      renderUnidades();
    }, 120);
  }
});