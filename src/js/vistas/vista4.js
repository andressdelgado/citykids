import { Vista } from './vista.js'

/**
 * Clase que representa la cuarta vista de la aplicación.
 * En esta vista se crea una competición.
 * @extends Vista
 */
export class Vista4 extends Vista {
  /**
     * Constructor de la clase Vista4.
     * @param {Controlador} controlador - Referencia al controlador de la aplicación.
     * @param {HTMLElement} base - Elemento HTML que representa la base de la vista.
     */
  constructor (controlador, base) {
    super(controlador, base)

    // Coger referencias del interfaz
    this.enlace2 = this.base.querySelectorAll('button')[1]
    this.formulario = this.base.querySelectorAll('form')[0]

    // Asociar eventos
    this.enlace2.onclick = this.pulsarEnlace2.bind(this)
    this.formulario.addEventListener('submit', (event) => this.validarFormulario(event))
  }

  /**
     * Muestra la Vista1 (menú principal) al hacer clic en el segundo enlace.
     */
  pulsarEnlace2 () {
    this.controlador.verVista(Vista.VISTA1)
  }

  /**
     * Valida el formulario al hacer clic en el botón de envío.
     * @param {Event} event - Objeto de evento asociado al clic del botón de envío del formulario.
     */
  validarFormulario (event) {
    // Prevenir el envío automático del formulario
    event.preventDefault()

    // Llamar a la función validarFormulario del controlador
    this.controlador.validarFormulario()
  }
}
