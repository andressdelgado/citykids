import { Vista } from './vista.js'

/**
 * Clase que representa la octava vista de la aplicación.
 * En esta vista, se muestra el ranking por competiciones.
 * @extends Vista
 */
export class Vista8 extends Vista {
  /**
     * Constructor de la clase Vista8.
     * @param {Controlador} controlador - Referencia al controlador de la aplicación.
     * @param {HTMLElement} base - Elemento HTML que representa la base de la vista.
     */
  constructor (controlador, base) {
    super(controlador, base)

    // Coger referencias del interfaz
    this.enlace2 = this.base.querySelectorAll('button')[1]

    // Asociar eventos
    this.enlace2.onclick = this.pulsarEnlace2.bind(this)
  }

  /**
     * Muestra la Vista1 (menú principal) al hacer clic en el enlace.
     */
  pulsarEnlace2 () {
    this.controlador.verVista(Vista.VISTA1)
  }
}
