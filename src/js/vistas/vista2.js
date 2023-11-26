import { Vista } from './vista.js'
import { GeneradorNumeros } from '../clases/generadornumeros.js'

/**
 * Clase que representa la segunda vista de la aplicación.
 * Esta vista permite girar la ruleta al presionar Enter.
 * @extends Vista
 */
export class Vista2 extends Vista {
  /**
     * Constructor de la clase Vista2.
     * @param {Controlador} controlador - Referencia al controlador de la aplicación.
     * @param {HTMLElement} base - Elemento HTML que representa la base de la vista.
     */
  constructor (controlador, base) {
    super(controlador, base)

    // Obtén el elemento divVista2 y asigna a this.divVista2
    this.divVista2 = document.getElementById('divVista2')

    // Este código asegura que el divVista2 sea seleccionable
    this.divVista2.setAttribute('tabindex', '0')

    // Establece el foco en el divVista2 al cargar la página
    this.divVista2.focus()

    // Inicializa el generador de números
    this.generadorNumeros = new GeneradorNumeros()

    // Asociar evento de tecla presionada al divVista2
    this.divVista2.addEventListener('keydown', this.cambiarVista.bind(this))

    // Crea la interfaz al cargar la vista
    this.crearInterfaz()
  }

  /**
     * Crea la interfaz inicial de la vista.
     * Se muestra un mensaje indicando al usuario que haga clic en la pantalla y luego presione Enter.
     */
  crearInterfaz () {
    // Se crea el mensaje dinámicamente y se agrega al DOM
    this.pEnter = document.createElement('p')
    this.base.appendChild(this.pEnter)
    this.pEnter.textContent = 'CLICA EN LA PANTALLA Y LUEGO PULSA ENTER PARA GIRAR LA RULETA'
    this.pEnter.className = 'volverAlJuego'
  }

  /**
     * Crea una interfaz alternativa indicando que ya se han proporcionado todos los ámbitos.
     * Muestra un mensaje y permite al usuario recargar la página para ver otras secciones.
     */
  crearInterfaz2 () {
    // Se crea el mensaje dinámicamente y se agrega al DOM
    this.pEnter = document.createElement('p')
    this.base.appendChild(this.pEnter)
    this.pEnter.textContent = 'Ya se han proporcionado todos los ámbitos. Pulsa F5 y mira los otros apartados. (Esta parte está en desarrollo ya que aquí irán las preguntas)'
    this.pEnter.className = 'volverAlJuego'
  }

  /**
     * Cambia la vista actual al presionar la tecla Enter.
     * Se obtiene un número aleatorio y se redirige a la vista correspondiente.
     * @param {KeyboardEvent} event - Evento de tecla presionada.
     */
  cambiarVista (event) {
    if (event.key === 'Enter') {
      const numero = this.generadorNumeros.obtenerNumeroAleatorio()
      if (numero === 0) {
        console.log('Ya se proporcionaron todos los números.')
        this.crearInterfaz2()
      } else {
        console.log('Número obtenido:', numero)
        switch (numero) {
          case 1:
            console.log('Participacion democractica')
            this.controlador.verVista(Vista.VISTA9)
            break
          case 2:
            console.log('Justicia Social')
            this.controlador.verVista(Vista.VISTA10)
            break
          case 3:
            console.log('Desarrollo Humano y Sostenible')
            this.controlador.verVista(Vista.VISTA11)
            break
          case 4:
            console.log('Interculturalidad e inclusión')
            this.controlador.verVista(Vista.VISTA12)
            break
          case 5:
            console.log('Equidad de género y coeducación')
            this.controlador.verVista(Vista.VISTA13)
            break
          default:
            console.log('Número no válido')
        }
      }
    }
  }
}
