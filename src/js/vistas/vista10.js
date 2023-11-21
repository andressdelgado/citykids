import { Vista } from './vista.js'

/**
 * Clase que representa la décima vista de la aplicación.
 * En esta vista, se aborda el tema de la justicia social.
 * @extends Vista
 */
export class Vista10 extends Vista {
  /**
     * Constructor de la clase Vista10.
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