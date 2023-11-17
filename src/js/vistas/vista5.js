import { Vista } from './vista.js'

/**
 * Clase que representa la quinta vista de la aplicación.
 * En esta vista, se puede unir a una competición.
 * @extends Vista
 */
export class Vista5 extends Vista {
  /**
     * Constructor de la clase Vista5.
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
     * Muestra la Vista1 (menú principal) al hacer clic en el segundo enlace.
     */
  pulsarEnlace2 () {
    this.controlador.verVista(Vista.VISTA1)
  }
}
