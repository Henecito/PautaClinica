document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const submitButton = document.getElementById('submitRole');

    modal.style.display = 'block';

    submitButton.addEventListener('click', function () {
        const role = document.getElementById('role').value;
        if (role === 'medico' || role === 'enfermero' || role === 'tecnico') {
            modal.style.display = 'none';
            document.querySelector('.content').style.display = 'block';
        } else {
            alert('Por favor, selecciona una opción válida.');
        }
    });

    const antibioticHeadings = document.querySelectorAll('.antibiotic-heading');
    const navbarTime = document.querySelector('.navbar-time');
    let currentOpenAntibioticInfo = null;

    antibioticHeadings.forEach(function (heading) {
        heading.addEventListener('click', function () {
            const antibioticInfo = this.nextElementSibling;

            if (currentOpenAntibioticInfo && currentOpenAntibioticInfo !== antibioticInfo) {
                currentOpenAntibioticInfo.style.display = 'none';
            }

            if (antibioticInfo.style.display === 'block') {
                antibioticInfo.style.display = 'none';
                currentOpenAntibioticInfo = null;
            } else {
                antibioticInfo.style.display = 'block';
                currentOpenAntibioticInfo = antibioticInfo;
            }
        });
    });

    const abbreviationElements = document.querySelectorAll('.abbreviation');

   abbreviationElements.forEach((element) => {
       element.addEventListener('mouseover', () => {
           const tooltipText = element.getAttribute('data-tooltip');
           if (tooltipText) {
               const tooltip = document.createElement('div');
               tooltip.textContent = tooltipText;
               tooltip.classList.add('tooltip');
               document.body.appendChild(tooltip);
               const rect = element.getBoundingClientRect();
               tooltip.style.left = rect.left + 'px';
               tooltip.style.top = rect.bottom + 'px';
           }
       });

       element.addEventListener('mouseout', () => {
           const tooltip = document.querySelector('.tooltip');
           if (tooltip) {
               tooltip.remove();
           }
       });
   });

    // Función para actualizar la hora actual
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        navbarTime.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Actualizar la hora cada segundo
    updateClock();
    setInterval(updateClock, 1000);

    // Función para buscar remedios por nombre
    function searchRemedies() {
        var input = document.getElementById('searchInput').value.toLowerCase();
        antibioticHeadings.forEach(function (heading) {
            const remedyName = heading.textContent.toLowerCase();
            const antibioticInfo = heading.nextElementSibling;

            if (input === '') {
                heading.style.display = 'block';
                antibioticInfo.style.display = 'none'; // Oculta la información si el campo de búsqueda está en blanco
            } else if (remedyName.includes(input)) {
                heading.style.display = 'block';
                antibioticInfo.style.display = 'block';
            } else {
                heading.style.display = 'none';
                antibioticInfo.style.display = 'none';
            }
        });
    }

    document.getElementById('searchInput').addEventListener('input', searchRemedies);
});
