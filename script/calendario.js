document.addEventListener("DOMContentLoaded", () => {
    const days = document.querySelectorAll(".day");
    const currentUser = localStorage.getItem("nombreUsuario");

    if (!currentUser) {
        alert("Debes iniciar sesión para usar el calendario.");
        return;
    }

    const storageKey = `selectedDays_${currentUser}`;
    const selectedDays = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Marca los días ya seleccionados como gris al cargar la página
    selectedDays.forEach((day) => {
        const dayElement = document.querySelector(`.day[data-day="${day}"]`);
        if (dayElement) {
            dayElement.style.backgroundColor = "gray";
            dayElement.style.color = "white";
        }
    });

    // Agrega evento de clic a cada día
    days.forEach((dayElement) => {
        dayElement.addEventListener("click", () => {
            const day = dayElement.getAttribute("data-day");

            // Verifica si el día ya fue seleccionado
            if (!selectedDays.includes(day)) {
                dayElement.style.backgroundColor = "gray";
                dayElement.style.color = "white";

                selectedDays.push(day);
                localStorage.setItem(storageKey, JSON.stringify(selectedDays));

                showContent(day);
            } else {
                // Si el día ya fue seleccionado, aún muestra el mensaje
                showContent(day);
            }
        });
    });
});

function showContent(day) {
    const messages = [
        "¡Feliz Día 1! 🎄",
        "¡Día 2! Que tengas un gran día 🎅",
        "¡Día 3! Ya casi es Navidad ❄️",
        "¡Día 4! 🎁 Sigue disfrutando del Adviento.",
        "¡Día 5! 🌟 Mantente feliz.",
        "¡Día 6! 🎅 Un día más cerca de la magia.",
        "¡Día 7! 🎄 Que la alegría te acompañe.",
        "¡Día 8! ❄️ La Navidad está en el aire.",
        "¡Día 9! 🎁 Sorpréndete con la magia.",
        "¡Día 10! 🌟 Sonríe, es Navidad.",
        "¡Día 11! 🎄 Qué día tan especial.",
        "¡Día 12! 🎅 La cuenta atrás sigue.",
        "¡Día 13! 🎄 Que la felicidad no falte.",
        "¡Día 14! ❄️ Abre tu corazón.",
        "¡Día 15! 🎁 Un día lleno de sorpresas.",
        "¡Día 16! 🌟 Mantente lleno de esperanza.",
        "¡Día 17! 🎄 Que cada día sea especial.",
        "¡Día 18! 🎅 Regala amor y felicidad.",
        "¡Día 19! 🎄 Cada día es un regalo.",
        "¡Día 20! ❄️ Sigue brillando.",
        "¡Día 21! 🎁 Estamos muy cerca.",
        "¡Día 22! 🌟 Que la Navidad te ilumine.",
        "¡Día 23! 🎄 Casi es el día mágico.",
        "¡Día 24! 🎁 ¡Feliz Navidad!"
    ];

    // Mostrar mensaje en el contenedor
    const container = document.getElementById("message-container");
    const title = document.getElementById("message-title");
    const text = document.getElementById("message-text");

    // Actualiza el contenido del mensaje
    title.innerText = `Día ${day}`;
    text.innerText = messages[day - 1] || "¡Disfruta del Adviento!";

    container.style.display = "block";
}

function closeMessage() {
    const container = document.getElementById("message-container");
    container.style.display = "none";
}
