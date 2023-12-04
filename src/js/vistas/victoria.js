import { Vista } from './vista.js'

export class Victoria extends Vista {

  constructor (controlador, base) {
    super(controlador, base)
    this.crearInterfaz2()
  }

  crearInterfaz2() {
    const puntuacion = this.controlador.obtenerPuntuacion();
    // Crear el contenedor div
    const divPuntuacion = document.createElement('div')
    divPuntuacion.className = 'elemento-con-animacion'
    divPuntuacion.style.backgroundColor = '#b8ffd3'
  
    // Crear el párrafo con el mensaje de puntuación
    const pMensaje = document.createElement('p')
    pMensaje.textContent = `¡Has obtenido ${puntuacion} puntos!`
  
    // Crear el campo de entrada tipo texto
    const inputTexto = document.createElement('input')
    inputTexto.type = 'text'
    inputTexto.placeholder = 'Ingresa tu nombre' // Puedes añadir un placeholder opcional
  
    // Crear el botón para enviar el formulario
    const btnEnviar = document.createElement('button')
    btnEnviar.textContent = 'Enviar'
    btnEnviar.className = 'btnEnviarFormulario'
  
    // Agregar evento al botón para enviar el formulario
    btnEnviar.addEventListener('click', () => {
      const nombre = inputTexto.value; // Obtener el valor del campo de entrada
      const puntuacion = this.controlador.obtenerPuntuacion(); // Obtener la puntuación
      // Llamada a la función para enviar datos por AJAX
      this.enviarFormularioAjax(nombre, puntuacion);
      
    });
  
    // Crear el botón para volver al inicio
    const btnVolverInicio = document.createElement('button')
    btnVolverInicio.textContent = 'Volver al inicio'
    btnVolverInicio.className = 'btnSiguienteTiradas'
  
    // Agregar evento al botón para volver al inicio
    btnVolverInicio.addEventListener('click', () => {
      location.reload();
    });
  
    divPuntuacion.appendChild(pMensaje)
    divPuntuacion.appendChild(inputTexto) // Agregar el campo de entrada al contenedor
    divPuntuacion.appendChild(btnEnviar) // Agregar el botón de enviar al contenedor
    divPuntuacion.appendChild(btnVolverInicio)
    this.base.appendChild(divPuntuacion)
  }

  enviarFormularioAjax(nombre, puntuacion) {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('puntuacion', puntuacion);

    fetch('./js/php/puntuacion.php', {
      method: 'POST', // Cambiar a método POST
      body: formData,
    })
    .then(response => response.json())
  }
}
