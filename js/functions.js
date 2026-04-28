//Registrar la vista actual si no venimos de un "volver"
function registrarVistaActual() {
  const vieneDeVolver = sessionStorage.getItem('vieneDeVolver');
  if (vieneDeVolver === 'true') {
    sessionStorage.removeItem('vieneDeVolver');
    return; //No registrar para evitar loop
  }

  const historial = JSON.parse(sessionStorage.getItem('historial')) || [];
  const actual = window.location.pathname + window.location.search;

  if (historial[historial.length - 1] !== actual) {
    historial.push(actual);
    sessionStorage.setItem('historial', JSON.stringify(historial));
  }
}

//Cambiar de vista normalmente
function cambiarVista(newView, playableSound) {
  if (!newView) return;

  const sonido = new Audio(playableSound);
  sonido.play();

  registrarVistaActual();

  const finalView = newView.includes('.html') ? newView : `${newView}.html`;

  setTimeout(() => {
    window.location.href = finalView;
  }, 120);
}

//Volver a la vista anterior sin registrar esta vuelta
function volver(sonido) {
  if (sonido) new Audio(sonido).play();

  let historial = JSON.parse(sessionStorage.getItem('historial')) || [];

  //Sacar la vista actual
  if (historial.length > 0) historial.pop();

  const vistaAnterior = historial.pop();

  sessionStorage.setItem('historial', JSON.stringify(historial));

  //Indicar que la siguiente carga es por "volver"
  sessionStorage.setItem('vieneDeVolver', 'true');

  const destino = vistaAnterior || window.location.origin + '/index.html';

  setTimeout(() => {
    window.location.href = destino;
  }, 120);
}

let audioActual = null;

function reproducirSonido(ruta) {
  //si ya hay un audio sonando, detenerlo
  if (audioActual) {
    audioActual.pause();
    audioActual.currentTime = 0;
  }

  //crear y reproducir nuevo audio
  audioActual = new Audio(ruta);
  audioActual.play();
}

//Registrar la vista actual al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  registrarVistaActual();
});
