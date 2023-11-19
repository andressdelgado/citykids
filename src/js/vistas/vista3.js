import { Vista } from './vista.js'

/**
 * Clase que representa la tercera vista de la aplicación.
 * Esta vista muestra el menú de competición y permite acceder a las vistas de crear competición o unirse a una competición.
 * @extends Vista
 */
export class Vista3 extends Vista {
  /**
     * Constructor de la clase Vista3.
     * @param {Controlador} controlador - Referencia al controlador de la aplicación.
     * @param {HTMLElement} base - Elemento HTML que representa la base de la vista.
     */
  constructor (controlador, base) {
    super(controlador, base)

    // Obtener referencias del interfaz
    this.enlace1 = this.base.querySelectorAll('button')[0]
    this.enlace2 = this.base.querySelectorAll('button')[1]

    // Asociar eventos a los botones
    this.enlace1.onclick = this.pulsarEnlace1.bind(this)
    this.enlace2.onclick = this.pulsarEnlace2.bind(this)

    // Crear interfaz al cargar la vista
    this.crearInterfaz()
  }

  /**
     * Crea la interfaz de la vista, agregando un botón dinámicamente.
     * El botón lleva a la Vista1 (menú principal).
     */
  crearInterfaz () {
    // Crear el botón dinámicamente y agregarlo al DOM
    this.btnVerVista1 = document.createElement('button')
    this.base.appendChild(this.btnVerVista1)
    this.btnVerVista1.textContent = 'VOLVER AL MENÚ'
    this.btnVerVista1.className = 'volverAlJuego'

    // Asociar evento al botón para volver al menú principal (Vista1)
    this.btnVerVista1.onclick = () => {
      this.controlador.verVista(Vista.VISTA1)
    }
  }

  /**
     * Muestra la Vista4 (Crear Competición) al hacer clic en el primer enlace.
     */
  pulsarEnlace1 () {
    this.controlador.verVista(Vista.VISTA4)
  }

  /**
     * Muestra la Vista5 (Unirse a Competición) al hacer clic en el segundo enlace.
     */
  pulsarEnlace2 () {
    this.controlador.verVista(Vista.VISTA5)
  }
}
