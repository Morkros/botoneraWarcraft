function viewChange(newView, playableSound) {
  const sonido = new Audio(playableSound);
  sonido.play();

  setTimeout(() => {
    const finalView = newView.includes('.html') ? newView : `${newView}.html`;
    window.location.href = finalView;
  }, 120);
}
