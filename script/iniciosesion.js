document.addEventListener("DOMContentLoaded", function() {
    // Referencias a los elementos del DOM
    const ventana_iniciar = document.getElementById("ventana_iniciar");
    const ventana_registrar = document.getElementById("ventana_registrar");
    const botonIniciar = document.getElementById("boton_header_iniciar");
    const formInicio = document.getElementById("formulario_iniciar");
    const usuario_inicio = document.getElementById("usuario_inicio");
    const contraseña_inicio = document.getElementById("contraseña_inicio");
    const botonCancelar = document.getElementById("cancelar_inicio");
    const botonPerfil = document.getElementById("botonPerfil");

    // Al cargar la página, verifica si existe un usuario logueado
    const nombreUsuarioLogueado = localStorage.getItem('nombreUsuario');
    if (nombreUsuarioLogueado && botonPerfil) {
        // Cambia el texto del botón de perfil al nombre del usuario
        botonPerfil.innerText = nombreUsuarioLogueado;
    }

    // Mostrar ventana de inicio de sesión
    if (botonIniciar) {
        botonIniciar.addEventListener("click", function() {
            if (ventana_registrar && ventana_registrar.style.display === "flex") {
                ventana_registrar.style.display = "none";
                ventana_registrar.classList.remove("activa");
            }

            ventana_iniciar.style.display = "flex";
            setTimeout(() => {
                ventana_iniciar.classList.add("activa");
            }, 6);
            document.body.classList.add("no_scroll");
        });
    }

    // Evento "submit" del formulario de inicio de sesión
    if (formInicio) {
        formInicio.addEventListener("submit", function(event) {
            event.preventDefault();

            const nombreUsuario = usuario_inicio.value;
            const contrasena = contraseña_inicio.value;

            // Recupera los usuarios guardados en localStorage
            const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
            // Busca el usuario y contraseña en la lista
            const usuarioEncontrado = usuariosRegistrados.find(
                user => user.usuario === nombreUsuario && user.contraseña === contrasena
            );

            if (usuarioEncontrado) {
                // Inicio de sesión exitoso
                localStorage.setItem('nombreUsuario', usuarioEncontrado.usuario);
                localStorage.setItem('emailUsuario', usuarioEncontrado.email);

                // Actualiza el botón de perfil con el nombre de usuario, si existe en la página
                if (botonPerfil) {
                    botonPerfil.innerText = usuarioEncontrado.usuario;
                }

                // Ahora redirige a perfilUsuario.html
                window.location.href = 'perfilUsuario.html';
            } else {
                alert('Error: Usuario o contraseña incorrectos.');
            }
        });
    }

    // Botón Cancelar: cierra la ventana de inicio
    if (botonCancelar) {
        botonCancelar.addEventListener('click', () => {
            ventana_iniciar.classList.remove("activa");
            setTimeout(() => {
                ventana_iniciar.style.display = "none";
                document.body.classList.remove("no_scroll");
            }, 500);
        });
    }
});
