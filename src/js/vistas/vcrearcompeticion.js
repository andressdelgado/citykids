import { Vista } from './vista.js';

export class CrearCompeticion extends Vista {
  constructor(controlador, base) {
    super(controlador, base);

    this.enlace2 = this.base.querySelectorAll('button')[1];
    this.enviar = this.base.querySelectorAll('button')[0];

    this.enlace2.onclick = this.pulsarEnlace2.bind(this);
    this.enviar.addEventListener('click', (event) => {

      const formValid = this.validarFormulario(event);
  
  });

  }

  pulsarEnlace2() {
    this.controlador.verVista(Vista.vmenuinicial);
  }

  validarFormulario(event) {
    event.preventDefault();

    const claveInput = this.base.querySelector('#crearClave');
    const tituloInput = this.base.querySelector('#crearTitulo');
    const descripcionInput = this.base.querySelector('#crearDescripcion');
    const fechaInput = this.base.querySelector('#crearFechaFin');

    const clave = claveInput.value;
    const titulo = tituloInput.value;
    const descripcion = descripcionInput.value;
    const fechaFin = fechaInput.value;

    const claveRegex = /^[A-Za-z]{3}[A-Za-z0-9]{2,9}$/;
    const tituloRegex = /^[A-Za-z ]{5,100}$/;
    const descripcionRegex = /^[A-Za-z0-9 ]{0,255}$/;
    const fechaRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

    const claveValid = claveRegex.test(clave);
    const tituloValid = tituloRegex.test(titulo);
    const descripcionValid = descripcionRegex.test(descripcion);
    const fechaValid = fechaRegex.test(fechaFin);

    this.aplicarEstilos(claveInput, claveValid, 'Clave no válida. Debe empezar por 3 letras y contener entre 5 y 10 caracteres.');
    this.aplicarEstilos(tituloInput, tituloValid, 'Título no válido. Debe contener al menos 5 caracteres de letras y como máximo 100.');
    this.aplicarEstilos(descripcionInput, descripcionValid, 'Descripción no válida. No puede contener caracteres especiales y debe ser máximo 255 caracteres.');
    this.aplicarEstilos(fechaInput, fechaValid, 'Fecha no válida.');

    if (claveValid && tituloValid && descripcionValid && fechaValid) {
      this.enviarFormularioAjax(clave, titulo, descripcion, fechaFin);
      this.mensajeAlerta(); 
    }
  }

  enviarFormularioAjax(clave, titulo, descripcion, fechaFin) {
    const formData = new FormData();
      formData.append('clave', clave);
      formData.append('titulo', titulo);
      formData.append('descripcion', descripcion);
      formData.append('fechaFin', fechaFin);

      fetch('./js/php/competicion.php', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('BIEN:', data);
          // Handle the response data as needed
        })
        .catch(error => {
          console.error('MAL:', error);
          // Handle errors
        });
    
  }

  aplicarEstilos(elemento, esValido, mensajeError) {
    const errorSpan = elemento.nextElementSibling;

    if (!esValido) {
      elemento.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease';
      elemento.style.border = '1px solid red';
      elemento.style.boxShadow = '2px 2px 40px rgba(255, 0, 0, 0.7)'

      if (!errorSpan || !errorSpan.classList.contains('error-message')) {
        const nuevoMensajeError = document.createElement('span');
        nuevoMensajeError.textContent = mensajeError;
        nuevoMensajeError.classList.add('error-message');
        elemento.parentNode.insertBefore(nuevoMensajeError, elemento.nextSibling);
      } else {
        errorSpan.textContent = mensajeError;
      }
    } else {
      elemento.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease';
      elemento.style.border = '1px solid green';
      elemento.style.boxShadow = '2px 2px 40px rgba(0, 255, 0, 0.7)'

      if (errorSpan && errorSpan.classList.contains('error-message')) {
        elemento.parentNode.removeChild(errorSpan);
      }
    }
  }

  mensajeAlerta() {
    // Create a custom modal
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('custom-modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const message = document.createElement('p');
    message.textContent = '¡Competición creada con éxito!';

    const okButton = document.createElement('button');
    okButton.textContent = 'OK';

    okButton.addEventListener('click', () => {
        // Reload the page (perform an F5 refresh)
        location.reload(true);
    });

    modalContent.appendChild(message);
    modalContent.appendChild(okButton);
    modalContainer.appendChild(modalContent);

    // Append the modal to the body
    document.body.appendChild(modalContainer);
}


}
