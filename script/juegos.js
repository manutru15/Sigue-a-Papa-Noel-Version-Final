const juego1 = document.getElementById('juego1');
const juego2 = document.getElementById('juego2');
const juego3 = document.getElementById('juego3');
const temporizador = document.getElementById('temporizador');
const puntuacion = document.getElementById('puntuacion');
const botonEmpezar = document.getElementById('boton-empezar');
const botonJuego = document.getElementById('boton-juego');


let puntos = 0;
let tiempo = 90;
let intervaloTiempo;

function iniciarJuego() {
    botonJuego.style.display = 'block';
    puntuacion.style.display = 'block';
    temporizador.style.display = 'block';
    botonEmpezar.style.display = 'none';
    // Limpia el tablero

    // Inicializa el temporizador
    tiempo = 90;
    // Inicializa la puntuación
    puntos = 0;
    // Actualiza la puntuación en el HTML
    puntuacion.textContent = "Puntuación: " + puntos;
    // Actualiza el temporizador en el HTML
    temporizador.textContent = "Tiempo restante: " + tiempo;
    intervaloTiempo = setInterval(actualizarTiempo, 1000);
    botonJuego.style.top = "50%";
    botonJuego.style.left = "50%";
    botonJuego.style.transform = "translate(-50%, -50%)";
    botonJuego.style.transition = "top 1s, left 1s";
}

function actualizarTiempo() {
    tiempo--;
    temporizador.textContent = "Tiempo restante: " + tiempo;
    if (tiempo <= 0) {
        puntuacion.style.display = 'none';
        temporizador.style.display = 'none';
        botonJuego.style.display = 'none';
        console.log('Fin del juego');
        clearInterval(intervaloTiempo);
        botonEmpezar.style.display = 'block';

    }
}

function clicEnCirculo() {
    actualizarPuntuacion();
    nuevaPosicionCirculo();
}

function actualizarPuntuacion() {
    puntos++;
    puntuacion.textContent = "Puntuación: " + puntos;
}

function nuevaPosicionCirculo() {
    // porcentajes max y mins para que no se salga de la pantalla
    let maxTop = 85;
    let maxLeft = 85;
    let minTop = 15;
    let minLeft = 15;
    // aparecera siempre por debajo de los marcadores
    // y no se saldra del div por lo que hay que actualizar los max y mins
    // let altoMarcadores = puntuacion.clientHeight;
    // let altoDiv = juego.clientHeight;
    // let radioCirculo = botonJuego.clientHeight;
    // let radiusBoton = botonJuego.cli
    // let anchoDiv = juego.clientWidth;


    // console.log("alto marcadores "+ altoMarcadores);
    // console.log("alto div " + altoDiv);
    // console.log("ancho div " + anchoDiv);
    // hay que tener en cuenta el tamaño del circulo para que no salga de la pantalla
    // console.log("radio circulo " + radioCirculo);
    // minTop = Math.floor((altoMarcadores/altoDiv)*100);

    // console.log((altoMarcadores/altoDiv)*100);
    // random top y left con los max y mins
    // console.log("min top " + minTop);
    // console.log("max top " + maxTop);
    // console.log("max left " + maxLeft);

    let top = Math.floor(Math.random() * (maxTop - minTop) + minTop);
    let left = Math.floor(Math.random() * (maxLeft - minLeft) + minLeft);

    console.log("top " + top);
    console.log("left " + left);

    botonJuego.style.top = top + "%";
    botonJuego.style.left = left + "%";
    botonJuego.style.transform = "None";

}

// JUEGO 2 ----------------------------------------------------------
// Crear objetos de audio para cada nota
const audioFiles = {
    'do': new Audio('./audio/do.mp3'),
    'do#': new Audio('./audio/dosos.mp3'),
    're': new Audio('./audio/re.mp3'),
    're#': new Audio('./audio/resos.mp3'),
    'mi': new Audio('./audio/mi.mp3'),
    'fa': new Audio('./audio/fa.mp3'),
    'fa#': new Audio('./audio/fasos.mp3'),
    'sol': new Audio('./audio/sol.mp3'),
    'sol#': new Audio('./audio/solsos.mp3'),
    'la': new Audio('./audio/la.mp3'),
    'la#': new Audio('./audio/lasos.mp3'),
    'si': new Audio('./audio/si.mp3')
};

// Definir la secuencia de la canción (Jingle Bells simplificada)
const cancion = [
    'do', 're', 'mi',
    'do', 're', 'fa',
    'mi', 'do', 're',
    'do'
];

let indiceActual = 0;
let cancionActiva = false;

// Función para resaltar la tecla actual
function resaltarTeclaActual() {
    // Primero, eliminar el resaltado de todas las teclas
    document.querySelectorAll('.tecla').forEach(tecla => {
        tecla.style.backgroundColor = tecla.classList.contains('negra') ? 'black' : 'white';
    });

    if (cancionActiva && indiceActual < cancion.length) {
        // Resaltar la tecla actual
        const teclasActuales = document.querySelectorAll(`[data-nota="${cancion[indiceActual]}"]`);
        teclasActuales.forEach(tecla => {
            tecla.style.backgroundColor = '#47D16C'; // Verde navideño
        });
    }
}

// Modificar el evento click de las teclas
document.querySelectorAll('.tecla').forEach(tecla => {
    tecla.addEventListener('click', () => {
        const nota = tecla.getAttribute('data-nota');

        if (audioFiles[nota]) {
            audioFiles[nota].currentTime = 0;
            audioFiles[nota].play();

            // Verificar si es la tecla correcta en la secuencia
            if (cancionActiva && nota === cancion[indiceActual]) {
                indiceActual++;
                if (indiceActual >= cancion.length) {
                    // La canción ha terminado
                    cancionActiva = false;
                    indiceActual = 0;
                    // Eliminar el resaltado verde de todas las teclas
                    document.querySelectorAll('.tecla').forEach(t => {
                        t.style.backgroundColor = t.classList.contains('blanca') ? 'white' : 'black';
                    });
                    alert('¡Felicidades! Has completado la canción');
                } else {
                    // Resaltar la siguiente tecla
                    resaltarTeclaActual();
                }
            }
        }
    });
});

// Añadir el evento click al botón de play
document.getElementById('boton_play').addEventListener('click', () => {
    cancionActiva = true;
    indiceActual = 0;
    resaltarTeclaActual();
});