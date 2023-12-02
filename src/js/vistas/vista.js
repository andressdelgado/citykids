/**
 * Clase base para la creación de vistas como símbolos con nombres asociados.
 * @class
 */
export class Vista {
  /**
     * Enumeración de símbolos asociados a nombres de vistas.
     * @enum {Symbol}
     */
  static {
    Vista.VISTA1 = Symbol('Inicio')
    Vista.VISTA2 = Symbol('Juego')
    Vista.VISTA3 = Symbol('Menu Competicion')
    Vista.VISTA4 = Symbol('Crear Competicion')
    Vista.VISTA5 = Symbol('Unirse Competicion')
    Vista.VISTA6 = Symbol('Menu Ranking')
    Vista.VISTA7 = Symbol('Ranking Global')
    Vista.VISTA8 = Symbol('Ranking Competiciones')
    Vista.VISTA9 = Symbol('Participación Democrática')
    Vista.VISTA10 = Symbol('Justicia Social')
    Vista.VISTA11 = Symbol('Desarrollo Humano y Sostenible')
    Vista.VISTA12 = Symbol('Interculturalidad e Inclusión')
    Vista.VISTA13 = Symbol('Equidad de género y Coeducación')
  }

  /**
     * Constructor de la clase Vista.
     * @constructor
     * @param {Controlador} controlador - Referencia al controlador de la aplicación.
     * @param {HTMLElement} base - Elemento HTML que representa la base de la vista.
     */
  constructor (controlador, base) {
    /**
         * Referencia al controlador de la aplicación.
         * @type {Controlador}
         */
    this.controlador = controlador

    /**
         * Elemento HTML que representa la base de la vista.
         * @type {HTMLElement}
         */
    this.base = base
  }

  /**
     * Muestra u oculta la vista.
     * @param {Boolean} ver - Indica si la vista debe mostrarse (true) u ocultarse (false).
     */
  mostrar (ver) {
    if (ver) {
      this.base.style.display = 'block'
    } else {
      this.base.style.display = 'none'
    }
  }
}
