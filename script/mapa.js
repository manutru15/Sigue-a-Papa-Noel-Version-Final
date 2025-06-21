const santaIcon = document.getElementById("santa-icon");

function updateSantaLocation() {
  // Genera una nueva posición aleatoria para Papá Noel dentro del mapa
  const mapContainer = document.getElementById("map-container");
  const maxWidth = mapContainer.offsetWidth - santaIcon.offsetWidth;
  const maxHeight = mapContainer.offsetHeight - santaIcon.offsetHeight;

  const newLeft = Math.random() * maxWidth;
  const newTop = Math.random() * maxHeight;

  // Actualiza la posición del ícono de Papá Noel
  santaIcon.style.left = `${newLeft}px`;
  santaIcon.style.top = `${newTop}px`;
}
