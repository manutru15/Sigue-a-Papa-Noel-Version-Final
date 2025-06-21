document.addEventListener("DOMContentLoaded", function() {
    const ventana_registrar = document.getElementById("ventana_registrar");
    const botonRegistro = document.getElementById("boton_header_registrar");
    const botonCancelar = document.getElementById("cancelar_registro");
    const botonLimpiar = document.getElementById("limpiar");
    const formRegistro = document.getElementById("formulario_registrar");
    const hijosInput = document.getElementById("hijos");
    const contenedorHijos = document.getElementById("contenedor_hijos");

    // Función para establecer una cookie con expiración en días
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Mostrar el pop-up de registro al hacer clic en el botón "Registrarse"
    if (botonRegistro) {
        botonRegistro.addEventListener("click", () => {
            ventana_registrar.style.display = "flex";
            setTimeout(() => {
                ventana_registrar.classList.add("activa");
            }, 6);
            document.body.classList.add("no_scroll");
        });
    }

    // Botón Cancelar en el formulario de registro
    if (botonCancelar) {
        botonCancelar.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que quieres cancelar?")) {
                ventana_registrar.classList.remove("activa");
                setTimeout(() => {
                    ventana_registrar.style.display = "none";
                    document.body.classList.remove("no_scroll");
                }, 500);
                formRegistro.reset();
                formRegistro.scrollTop = 0;
                contenedorHijos.innerHTML = "";
            }
        });
    }

    // Botón Limpiar para resetear el formulario de registro
    if (botonLimpiar) {
        botonLimpiar.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que quieres limpiar todos los campos?")) {
                formRegistro.reset();
                formRegistro.scrollTop = 0;
                contenedorHijos.innerHTML = "";
            }
        });
    }

    // Escucha los cambios en el campo de número de hijos para añadir campos adicionales
    if (hijosInput) {
        hijosInput.addEventListener("input", function () {
            const num_hijos = parseInt(this.value);
            contenedorHijos.innerHTML = "";

            if (num_hijos > 0) {
                for (let i = 0; i < num_hijos; i++) {
                    const nombre_titulo = document.createElement("label");
                    nombre_titulo.innerText = `Nombre del hijo/hija ${i + 1}`;
                    const nombre_input = document.createElement("input");
                    nombre_input.type = "text";
                    nombre_input.placeholder = "Nombre";
                    nombre_input.required = true;

                    const edad_titulo = document.createElement("label");
                    edad_titulo.innerText = `Edad del hijo/hija ${i + 1}`;
                    const edad_input = document.createElement("input");
                    edad_input.type = "number";
                    edad_input.placeholder = "Edad";
                    edad_input.min = "0";
                    edad_input.required = true;

                    const juguetes_titulo = document.createElement("label");
                    juguetes_titulo.innerText = `Juguetes favoritos del hijo/hija ${i + 1}`;
                    const juguetes_input = document.createElement("input");
                    juguetes_input.type = "text";
                    juguetes_input.placeholder = "Juguetes favoritos";
                    juguetes_input.required = true;

                    contenedorHijos.appendChild(nombre_titulo);
                    contenedorHijos.appendChild(nombre_input);
                    contenedorHijos.appendChild(edad_titulo);
                    contenedorHijos.appendChild(edad_input);
                    contenedorHijos.appendChild(juguetes_titulo);
                    contenedorHijos.appendChild(juguetes_input);
                }
            }
        });
    }

    // Validar y enviar el formulario, guardando en localStorage y en cookies
    if (formRegistro) {
        formRegistro.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevenir el envío por defecto del formulario

            const usuario_registro = document.getElementById("usuario_registro").value;
            const contraseña_registro = document.getElementById("contraseña_registro").value;
            const contraseña_confirmada = document.getElementById("contraseña_confirmada").value;
            const email = document.getElementById("email").value;
            const ciudad = document.getElementById("ciudad").value;
            const pais = document.getElementById("pais").value;
            const genero = document.getElementById("genero").value;
            const hijos = parseInt(document.getElementById("hijos").value) || 0;

            // Validaciones
            if (usuario_registro.length < 3) {
                alert("El nombre de usuario debe tener al menos 3 caracteres.");
                return;
            }

            let contraseña_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d)(?=.*[\W_]).{12,}$/;
            if (!contraseña_regex.test(contraseña_registro)) {
                alert("La contraseña debe tener al menos 12 caracteres, con al menos 2 números, 1 carácter especial, 1 letra mayúscula y 1 letra minúscula.");
                return;
            }

            if (contraseña_registro !== contraseña_confirmada) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            let email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!email_regex.test(email)) {
                alert("Introduce un correo electrónico válido (nombre@dominio.ext).");
                return;
            }

            if (ciudad.length < 3) {
                alert("La ciudad debe tener al menos 3 caracteres.");
                return;
            }

            if (pais.length < 3) {
                alert("El país debe tener al menos 3 caracteres.");
                return;
            }

            const inputsHijos = contenedorHijos.querySelectorAll("input");
            const datos_hijos = [];
            let indice = 0;
            for (let i = 0; i < hijos; i++) {
                const nombre_hijo = inputsHijos[indice++].value;
                const edad_hijo = inputsHijos[indice++].value;
                const juguetes_hijo = inputsHijos[indice++].value;

                if (nombre_hijo.length < 3) {
                    alert(`El nombre del hijo/hija ${i + 1} debe tener al menos 3 caracteres.`);
                    return;
                }

                if (parseInt(edad_hijo) < 0) {
                    alert(`La edad del hijo/hija ${i + 1} debe ser un número positivo.`);
                    return;
                }

                if (juguetes_hijo.length < 3) {
                    alert(`El campo de juguetes favoritos del hijo/hija ${i + 1} debe tener al menos 3 caracteres.`);
                    return;
                }

                datos_hijos.push({ nombre: nombre_hijo, edad: edad_hijo, juguetes: juguetes_hijo });
            }

            // Verifica si el usuario ya existe en localStorage
            let usuarios_registrados = JSON.parse(localStorage.getItem("usuarios")) || [];
            if (usuarios_registrados.some(persona => persona.usuario === usuario_registro)) {
                alert("Este nombre de usuario ya está registrado. Por favor, elige otro.");
                return;
            }

            // Guarda el nuevo usuario en localStorage
            const datos_usuario = {
                usuario: usuario_registro,
                contraseña: contraseña_registro,
                email,
                ciudad,
                pais,
                genero,
                hijos: datos_hijos,
                cartas: []
            };
            usuarios_registrados.push(datos_usuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios_registrados));

            // Guarda también en una cookie (por ejemplo, por 7 días)
            setCookie("datosUsuario", JSON.stringify(datos_usuario), 7);

            // Mostrar confirmación y redirigir a la página principal
            alert("¡Registro completado con éxito!");
            ventana_registrar.classList.remove("activa");
            setTimeout(() => {
                ventana_registrar.style.display = "none";
                document.body.classList.remove("no_scroll");
                window.location.href = "ej.html";
            }, 500);
            formRegistro.reset();
            formRegistro.scrollTop = 0;
            contenedorHijos.innerHTML = "";
        });
    }
});
