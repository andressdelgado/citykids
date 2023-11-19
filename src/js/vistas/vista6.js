import { Vista } from './vista.js'

/**
 * Clase que representa la sexta vista de la aplicación.
 * En esta vista, se muestra el menú de rankings, desde donde se puede acceder a la vista de ranking general y a la de ranking por competiciones.
 * @extends Vista
 */
export class Vista6 extends Vista {
  /**
     * Constructor de la clase Vista6.
     * @param {Controlador} controlador - Referencia al controlador de la aplicación.
     * @param {HTMLElement} base - Elemento HTML que representa la base de la vista.
     */
  constructor (controlador, base) {
    super(controlador, base)

    // Coger referencias del interfaz
    this.enlace1 = this.base.querySelectorAll('button')[0]
    this.enlace2 = this.base.querySelectorAll('button')[1]

    // Asociar eventos
    this.enlace1.onclick = this.pulsarEnlace1.bind(this)
    this.enlace2.onclick = this.pulsarEnlace2.bind(this)

    // Crea el interfaz adicional
    this.crearInterfaz()
  }

  /**
     * Crea dinámicamente un botón que lleva de vuelta al menú principal (Vista1).
     */
  crearInterfaz () {
    this.btnVerVista1 = document.createElement('button')
    this.base.appendChild(this.btnVerVista1)
    this.btnVerVista1.textContent = 'VOLVER AL MENÚ'
    this.btnVerVista1.className = 'volverAlJuego'
    this.btnVerVista1.onclick = () => {
      this.controlador.verVista(Vista.VISTA1)
    }
  }

  /**
     * Muestra la Vista7 (ranking global) al hacer clic en el primer enlace.
     */
  pulsarEnlace1 () {
    this.controlador.verVista(Vista.VISTA7)
  }

  /**
     * Muestra la Vista8 (ranking por competiciones) al hacer clic en el segundo enlace.
     */
  pulsarEnlace2 () {
    this.controlador.verVista(Vista.VISTA8)
  }
}
