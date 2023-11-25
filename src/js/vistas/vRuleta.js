import { Vista } from './vista.js'
import { GeneradorNumeros } from '../clases/generadornumeros.js'

/**
 * Clase que representa una vista de la ruleta.
 * @extends Vista
 */

export class Ruleta extends Vista {
/**
   * Crea una instancia de Ruleta.
   * @param {Controlador} controlador - El controlador de la ruleta.
   * @param {HTMLElement} base - El elemento base para la vista de la ruleta.
   */
  constructor (controlador, base) {
    super(controlador, base)

    /** @type {HTMLElement} */
    this.divMenuCompeticion = document.getElementById('divMenuCompeticion')
    this.divMenuCompeticion.setAttribute('tabindex', '0')
    this.divMenuCompeticion.focus()

      /** @type {GeneradorNumeros} */
    this.generadorNumeros = new GeneradorNumeros()

/**
     * Listener para el evento keydown en divMenuCompeticion.
     * @param {KeyboardEvent} event - Evento del teclado.
     */

    this.divMenuCompeticion.addEventListener('keydown', this.girarRuleta.bind(this))
    this.crearBoton()
  }

  /** @type {number} - Para controlar el número de pregunta que sale. */
  preguntasMostradas = 0
  /** @type {number[]} - Para controlar que los ámbitos no salen repetidos. */
  ambitosSeleccionados = []

  crearBoton() {
    // Se crea el botón dinámicamente y se agrega al DOM
    this.button = document.createElement('button')
    this.base.appendChild(this.button);
    this.button.textContent = 'GIRA LA RULETA'
    this.button.className = 'volverAlJuego'
  
    // Agregar evento de clic al botón
    this.button.addEventListener('click', () => {
      // Seleccionar la imagen de la ruleta y el sonido
      let sonidoRuleta = document.getElementById('audioRuleta')
      let ruletaImg = document.getElementById('ruleta')
  
      // Definir la duración total de la animación en milisegundos (8 segundos = 8000 milisegundos)
      const duracionTotal = 8000
      const velocidadInicial = 15 // Velocidad inicial en grados por intervalo
      const aceleracion = 5 // Aceleración para simular el efecto de arranque lento
  
      let tiempoTranscurrido = 0
      let rotacion = 0
      let velocidad = velocidadInicial
  
      let interval = setInterval(() => {
        ruletaImg.style.transform = `rotate(${rotacion}deg)`
  
        // Reproducir el sonido solo cuando está girando
        if (velocidad > 0) {
          sonidoRuleta.currentTime = 0
          sonidoRuleta.play()
        }
  
        if (tiempoTranscurrido < duracionTotal) {
          rotacion += velocidad
          tiempoTranscurrido += 50 // Incrementar el tiempo transcurrido por el intervalo
          // Reducir la velocidad con la aceleración y un factor de desaceleración gradual
          velocidad -= aceleracion * (1 - tiempoTranscurrido / duracionTotal)
        } else {
          // Detener la animación cuando se alcanza la duración total
          clearInterval(interval)
  
          // Realizar fade-out del sonido al finalizar la animación
          let fadeInterval = setInterval(() => {
            if (sonidoRuleta.volume > 0.05) {
              sonidoRuleta.volume -= 0.05
            } else {
              clearInterval(fadeInterval)
              sonidoRuleta.pause()
              sonidoRuleta.currentTime = 0
              sonidoRuleta.volume = 1
            }
          }, 100)
  
          this.girarRuleta()
          this.cambiarVista(this.ambitosSeleccionados[this.ambitosSeleccionados.length - 1])
        }
      }, 50)
    });
  }
  
 /**
   * Crea una interfaz alternativa y muestra la puntuación obtenida.
   */

  crearInterfaz2() {
    this.button.style.display='none'
    const controlador = this.controlador
    const puntuacion = controlador.obtenerPuntuacion()
    
    // Crear el contenedor div
    const divPuntuacion = document.createElement('div')
    divPuntuacion.className = 'elemento-con-animacion'
    divPuntuacion.style.backgroundColor = '#b8ffd3'
    // Crear el párrafo con el mensaje de puntuación
    const pMensaje = document.createElement('p')
    pMensaje.textContent = `¡Has obtenido ${puntuacion} puntos!`
    
    // Crear el botón para volver al inicio
    const btnVolverInicio = document.createElement('button')
    btnVolverInicio.textContent = 'Volver al inicio'
    btnVolverInicio.className = 'btnSiguienteTiradas'
    
    // Agregar evento al botón para volver al inicio
    btnVolverInicio.addEventListener('click', () => {
      location.reload();
    });
    
    divPuntuacion.appendChild(pMensaje)
    divPuntuacion.appendChild(btnVolverInicio)
    this.base.appendChild(divPuntuacion)
  }

/**
   * Función que se ejecuta al girar la ruleta.
   * @param {KeyboardEvent} [event] - Evento de teclado opcional.
   */

 girarRuleta() {
  if (this.preguntasMostradas < 4) {
    let idAmbitoAleatorio
    do {
      idAmbitoAleatorio = Math.floor(Math.random() * 5) + 1;
    } while (this.ambitosSeleccionados.includes(idAmbitoAleatorio))
    this.ambitosSeleccionados.push(idAmbitoAleatorio)
    this.preguntasMostradas++

    const self = this;
    const url = `http://localhost/Carlos/citykids/src/js/php/preguntas.php?id_ambito=${idAmbitoAleatorio}`; // Ruta relativa
    // const url = `https://01.2daw.esvirgua.com/ABP/ABP/src/js/php/preguntas.php?id_ambito=${idAmbitoAleatorio}`; // Ruta relativa

    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not ok.')
        }
        return response.json()
      })
      .then(function (preguntas) {
        console.log('Respuesta del servidor:', preguntas)
        self.mostrarPreguntas(idAmbitoAleatorio, preguntas)
      })
      .catch(function (error) {
        console.error('Hubo un problema con la petición Fetch:', error)
      });
  } else {
    this.crearInterfaz2()
  }
}

  
  
/**
   * Muestra las preguntas correspondientes a un ámbito.
   * @param {number} idAmbitoAleatorio - El ID del ámbito.
   * @param {any[]} preguntas - Lista de preguntas obtenidas.
   */
  mostrarPreguntas(idAmbitoAleatorio, preguntas) {
    this.controlador.mostrarPreguntas(idAmbitoAleatorio, preguntas)
  }


  /**
   * Cambia la vista según el ID del ámbito.
   * @param {number} idAmbitoAleatorio - El ID del ámbito.
   */
  cambiarVista (idAmbitoAleatorio) {
        switch (idAmbitoAleatorio) {
          case 1:
            //this.controlador.verVista(Vista.vPartDemo)
            this.controlador.verVista(Vista.vPartDemo)
            break
          case 2:
            this.controlador.verVista(Vista.vJustSocial)
            break
          case 3:
            this.controlador.verVista(Vista.vDesHumano)
            break
          case 4:
            this.controlador.verVista(Vista.vInterculturalidad)
            break
          case 5:
            this.controlador.verVista(Vista.vEquidadGenero)
            break
          default:
            console.log('Número no válido')
        }
      } 
    }