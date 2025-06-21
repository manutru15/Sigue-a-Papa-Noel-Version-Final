document.addEventListener("DOMContentLoaded", () => {
    const breadcrumbs = document.querySelectorAll(".breadcrumb");
    const formSteps = document.querySelectorAll(".form-step");
    const nextButtons = document.querySelectorAll(".next-btn");
    const prevButtons = document.querySelectorAll(".prev-btn");
    const submitBtn = document.getElementById("submit-btn");
    const arrivalDateInput = document.getElementById("arrival-date");
    const departureDateInput = document.getElementById("departure-date");
    const selectedArrivalDateElement = document.getElementById("selected-arrival-date");
    const selectedDepartureDateElement = document.getElementById("selected-departure-date");
    const selectedAdultsElement = document.getElementById("selected-adults");
    const selectedChildrenElement = document.getElementById("selected-children");
    const selectedArrivalTimeElement = document.getElementById("selected-arrival-time");
    const selectedDepartureTimeElement = document.getElementById("selected-departure-time");

    let currentStep = 1;

    // Actualizar pasos del formulario
    function updateSteps() {
        formSteps.forEach(step => {
            step.classList.toggle("active", parseInt(step.dataset.step) === currentStep);
        });

        breadcrumbs.forEach(breadcrumb => {
            breadcrumb.classList.toggle("active", parseInt(breadcrumb.dataset.step) === currentStep);
        });

        // Actualizar detalles en el paso de confirmación
        if (currentStep === 3) {
            selectedArrivalDateElement.textContent = arrivalDateInput.value || "No seleccionada";
            selectedDepartureDateElement.textContent = departureDateInput.value || "No seleccionada";
            selectedAdultsElement.textContent = document.getElementById("adults").value || "0";
            selectedChildrenElement.textContent = document.getElementById("children").value || "0";
            selectedArrivalTimeElement.textContent = document.getElementById("arrival-time").value || "No seleccionada";
            selectedDepartureTimeElement.textContent = document.getElementById("departure-time").value || "No seleccionada";
        }
    }

    // Validar que la fecha de salida no sea anterior a la fecha de llegada
    function validateDates() {
        const arrivalDate = new Date(arrivalDateInput.value);
        const departureDate = new Date(departureDateInput.value);

        if (departureDate < arrivalDate) {
            alert("Error: La fecha de salida no puede ser anterior a la fecha de llegada.");
            return false;
        }
        return true;
    }

    // Guardar datos del viaje en localStorage
    function saveTripData() {
        const nombreUsuario = localStorage.getItem("nombreUsuario");

        if (!nombreUsuario) {
            alert("Error: No se encontró un usuario logueado. Inicia sesión primero.");
            return false;
        }

        const tripData = {
            adults: document.getElementById("adults").value,
            children: document.getElementById("children").value,
            arrivalTime: document.getElementById("arrival-time").value,
            departureTime: document.getElementById("departure-time").value,
            arrivalDate: arrivalDateInput.value,
            departureDate: departureDateInput.value
        };

        // Recuperar datos existentes o inicializar un array
        const viajes = JSON.parse(localStorage.getItem(`viajes_${nombreUsuario}`)) || [];

        // Agregar el nuevo viaje
        viajes.push(tripData);

        // Guardar en localStorage
        localStorage.setItem(`viajes_${nombreUsuario}`, JSON.stringify(viajes));

        return true;
    }

    // Navegar a pasos haciendo clic en migas de pan
    breadcrumbs.forEach((breadcrumb, index) => {
        breadcrumb.addEventListener("click", () => {
            if (index + 1 === 3 && !validateDates()) {
                return; // No avanzar al paso 3 si la validación de fechas falla
            }
            currentStep = index + 1; // Actualizamos el paso actual
            updateSteps(); // Actualizamos la vista
        });
    });

    nextButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (currentStep === 2 && !validateDates()) {
                return; // No avanzar si las fechas son inválidas
            }
            if (currentStep < formSteps.length) {
                currentStep++;
                updateSteps();
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (currentStep > 1) {
                currentStep--;
                updateSteps();
            }
        });
    });

    submitBtn.addEventListener("click", () => {
        const adults = document.getElementById("adults").value;
        const children = document.getElementById("children").value;
        const arrivalTime = document.getElementById("arrival-time").value;
        const departureTime = document.getElementById("departure-time").value;
        const arrivalDate = arrivalDateInput.value;
        const departureDate = departureDateInput.value;

        if (!adults || !children || !arrivalTime || !departureTime || !arrivalDate || !departureDate) {
            alert("Por favor, completa todos los campos obligatorios (*)");
        } else if (!validateDates()) {
            return; // No permitir enviar si las fechas son inválidas
        } else if (saveTripData()) {
            alert(`Reserva confirmada y guardada:
Adultos: ${adults}
Niños: ${children}
Llegada: ${arrivalTime} (${arrivalDate})
Salida: ${departureTime} (${departureDate})`);
            window.location.href = "perfilUsuario.html";
        }
    });

    updateSteps();
});
