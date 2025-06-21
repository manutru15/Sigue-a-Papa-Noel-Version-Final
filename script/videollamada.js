const videoElement = document.getElementById("video_papa_noel");
const llamarButton = document.getElementById("boton_iniciar_videollamada");
const colgarButton = document.getElementById("boton_colgar_videollamada");

const videos = [
    "videos/santa_carta.mp4",
    "videos/santa_arbol.mp4",
    "videos/santa_stare.mp4"
];

function obtenerVideoAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * videos.length);
    return videos[indiceAleatorio];
}

function iniciarLlamada() {
    console.log("Llamada iniciada");
    const videoAleatorio = obtenerVideoAleatorio();
    videoElement.src = videoAleatorio;
    videoElement.style.display = "block";
    videoElement.play();
}

function reproducirSiguienteVideo() {
    console.log("Reproduciendo siguiente video");
    const videoAleatorio = obtenerVideoAleatorio();
    videoElement.src = videoAleatorio;
    videoElement.play();
}

function finalizarLlamada() {
    console.log("Llamada finalizada");
    videoElement.pause();
    videoElement.currentTime = 0;
    videoElement.style.display = "none";
}

llamarButton.addEventListener("click", iniciarLlamada);
llamarButton.addEventListener("touchstart", function(event) {
    event.preventDefault();
    iniciarLlamada();
});

colgarButton.addEventListener("click", finalizarLlamada);
colgarButton.addEventListener("touchstart", function(event) {
    event.preventDefault();
    finalizarLlamada();
});

videoElement.addEventListener("ended", reproducirSiguienteVideo);