import { Vista } from './vista.js'

/**
 * Clase que representa la undécima vista de la aplicación.
 * En esta vista, se aborda el tema del desarrollo humano y sostenible.
 * @extends Vista
 */
export class Vista11 extends Vista {
  /**
     * Constructor de la clase Vista11.
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
