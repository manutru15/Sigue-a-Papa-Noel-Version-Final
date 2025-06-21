document.addEventListener('DOMContentLoaded', () => {
    // Contador regresivo
    const countdownElement = document.getElementById('contador');

    function updateCountdown() {
        const now = new Date();
        const christmas = new Date(now.getFullYear(), 11, 25); // Navidad: 25 de diciembre
        const diff = christmas - now;

        if (diff < 0) {
            countdownElement.textContent = "¡Feliz Navidad!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        countdownElement.textContent = `${days} días ${hours} h ${minutes} min ${seconds} s`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Menú desplegable
    const logo_header = document.getElementById("logo_header");
    const menu_desplegable_header = document.getElementById("menu_desplegable_header");

    logo_header.addEventListener("click", function () {
        menu_desplegable_header.style.display = menu_desplegable_header.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
        if (!menu_desplegable_header.contains(event.target) && event.target !== logo_header) {
            menu_desplegable_header.style.display = "none";
        }
    });

    
    // Selecciona todos los enlaces con la clase "restricted-link"
const restrictedLinks = document.querySelectorAll(".restricted-link");

// Agrega un evento click a cada uno de los enlaces
restrictedLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); // Evita la redirección
        alert("Debes iniciar sesión para acceder a esta sección.");
    });
});




    // Ventanas de recetas
    const recetas = document.querySelectorAll('.receta');
    const ventanasRecetas = document.querySelectorAll('.ventana_receta');
    const botonesAtrasRecetas = document.querySelectorAll('#f_atras_recetas');

    recetas.forEach(receta => {
        receta.addEventListener('click', () => {
            const recetaId = receta.getAttribute('data-receta');
            ventanasRecetas.forEach(ventana => {
                if (ventana.id === `ventana_${recetaId}`) {
                    ventana.classList.add('active');
                    document.body.classList.add('no_scroll'); // Añadir clase para deshabilitar scroll
                } else {
                    ventana.classList.remove('active');
                }
            });
        });
    });

    botonesAtrasRecetas.forEach(boton => {
        boton.addEventListener('click', () => {
            boton.closest('.ventana_receta').classList.remove('active');
            document.body.classList.remove('no_scroll'); // Remover clase para habilitar scroll
        });
    });

    // Ventana del asistente virtual
    const asistenteImg = document.getElementById('asistente');
    const ventanaAsistente = document.getElementById('ventana_asistente');
    const botonAtrasAsistente = document.getElementById('f_atras_asistente');
    const chatBox = document.querySelector(".contenedor_conv");

    asistenteImg.addEventListener('click', () => {
        ventanaAsistente.classList.add('active');
        document.body.classList.add('no_scroll'); // Añadir clase para deshabilitar scroll
    });

    botonAtrasAsistente.addEventListener('click', () => {
        ventanaAsistente.classList.remove('active');
        document.body.classList.remove('no_scroll'); // Remover clase para habilitar scroll
        reiniciarAsistente(); // Reiniciar el asistente virtual
    });

    // Función para reiniciar el asistente virtual
    const reiniciarAsistente = () => {
        // Limpiar el contenido del chat
        chatBox.innerHTML = `
            <div class="mensaje chat">
                <p>¡Hola! Soy el asistente virtual de Papá Noel.<br>¿En qué te puedo ayudar?</p>
            </div>
        `;
    };

    // Chat del asistente virtual
    const options = document.querySelectorAll(".opcion");

    const agregarMensaje = (mensaje, tipo) => {
        const nuevoMensaje = document.createElement("div");
        nuevoMensaje.classList.add("mensaje", tipo);
        nuevoMensaje.innerHTML = mensaje;
        chatBox.appendChild(nuevoMensaje);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
    };

    options.forEach(opcion => {
        opcion.addEventListener("click", () => {
            const texto = opcion.innerText; // Texto del botón clicado
            const respuesta = opcion.getAttribute("data-respuesta"); // Respuesta personalizada

            // Agregar mensaje del usuario
            agregarMensaje(texto, "usuario");

            // Agregar respuesta del asistente
            setTimeout(() => {
                agregarMensaje(respuesta, "chat");
            }, 500); // Simula un pequeño retraso para parecer más "realista"
        });
    });

    // Juegos
    document.getElementById('juego1').addEventListener('click', function () {
        document.getElementById('titulo_juego').textContent = 'Juego 1: ¡Empieza ahora!';
        document.getElementById('juego1_contenedor').style.display = 'block';
        document.getElementById('juego2_contenedor').style.display = 'none';
    });

    document.getElementById('juego2').addEventListener('click', function () {
        document.getElementById('titulo_juego').textContent = 'Piano de Navidad';
        document.getElementById('juego1_contenedor').style.display = 'none';
        document.getElementById('juego2_contenedor').style.display = 'block';
    });
});
