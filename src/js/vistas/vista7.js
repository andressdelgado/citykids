import { Vista } from './vista.js'

/**
 * Clase que representa la séptima vista de la aplicación.
 * En esta vista, se muestra el ranking general.
 * @extends Vista
 */
export class Vista7 extends Vista {
  /**
     * Constructor de la clase Vista7.
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
     * Muestra la Vista1 (menú principal) al hacer clic en el enlace.
     */
  pulsarEnlace1 () {
    this.controlador.verVista(Vista.VISTA1)
  }
}
