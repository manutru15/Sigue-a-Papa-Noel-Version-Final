
function toggleMenu() {
    const menu = document.getElementById("perfilMenu");
    menu.classList.toggle("mostrar");
}

// Cerrar el menú si se hace clic fuera de él
window.onclick = function (event) {
    const menu = document.getElementById("perfilMenu");
    const botonPerfil = document.getElementById("botonPerfil");
    if (!menu.contains(event.target) && event.target !== botonPerfil) {
        menu.classList.remove("mostrar");
    }
};

// Función para cerrar sesión
function cerrarSesion() {
    const confirmacion = confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmacion) {
        localStorage.removeItem("nombreUsuario");
        localStorage.removeItem("emailUsuario");
        window.location.href = "ej.html";
    }
}


function verificarSesion() {
    return localStorage.getItem('nombreUsuario') && localStorage.getItem('emailUsuario');
}


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("enviarCarta").addEventListener("click", function(event) {
        event.preventDefault();

       
        if (!verificarSesion()) {
            alert("Debe iniciar sesión para enviar una carta.");
            return;
        }

       
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const ciudad = document.getElementById("ciudad").value;
        const pais = document.getElementById("pais").value;
        const cartaPapaNoel = document.getElementById("cartaPapaNoel").value;

        // Valida que el correo electrónico coincida con el del usuario registrado
        const emailRegistrado = localStorage.getItem('emailUsuario');
        if (email !== emailRegistrado) {
            alert("El correo electrónico no coincide con el registrado.");
            return;
        }

        
        if (!nombre || !email || !ciudad || !pais || !cartaPapaNoel) {
            alert("Por favor complete todos los campos requeridos.");
            return;
        }

        // Guarda la carta en localStorage
        let cartasEnviadas = JSON.parse(localStorage.getItem('cartasEnviadas')) || [];
        
      
        const nuevaCarta = {
            nombre: nombre,
            email: email,
            ciudad: ciudad,
            pais: pais,
            mensaje: cartaPapaNoel,
            fechaEnvio: new Date().toLocaleString()
        };

        
        cartasEnviadas.push(nuevaCarta);

        // Actualiza localStorage con el nuevo array de cartas
        localStorage.setItem('cartasEnviadas', JSON.stringify(cartasEnviadas));

     
        alert("Carta enviada exitosamente. ¡Gracias!");
        
    
        document.getElementById("nombre").value = "";
        document.getElementById("email").value = "";
        document.getElementById("ciudad").value = "";
        document.getElementById("pais").value = "";
        document.getElementById("cartaPapaNoel").value = "";
    });
});
