import { Vista } from './vista.js'

/**
 * Clase que representa la novena vista de la aplicación.
 * En esta vista, se aborda el tema de la participación democrática.
 * @extends Vista
 */
export class Vista9 extends Vista {
  /**
     * Constructor de la clase Vista9.
     * @param {Controlador} controlador - Referencia al controlador de la aplicación.
     * @param {HTMLElement} base - Elemento HTML que representa la base de la vista.
     */
  constructor (controlador, base) {
    super(controlador, base)

    // Coger referencias del interfaz
    this.enlace1 = this.base.querySelectorAll('button')[0]

    // Asociar eventos
    this.enlace1.onclick = this.pulsarEnlace1.bind(this)
  }

  /**
     * Muestra la Vista2 (juego) al hacer clic en el enlace.
     */
  pulsarEnlace1 () {
    this.controlador.verVista(Vista.VISTA2)
  }
}
