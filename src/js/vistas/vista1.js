import { Vista } from './vista.js';

/**
 * Clase que representa la vista principal, la pantalla que se muestra inicialmente.
 * @extends Vista
 */
export class Vista1 extends Vista {
    /**
     * Constructor de la clase Vista1.
     * @param {Controlador} controlador - Referencia al controlador de la aplicación.
     * @param {HTMLElement} base - Elemento HTML que representa la base de la vista.
     */
    constructor(controlador, base) {
        super(controlador, base);

        // Coger referencias del interfaz
        this.enlace1 = this.base.querySelectorAll('button')[0];
        this.enlace2 = this.base.querySelectorAll('button')[1];
        this.enlace3 = this.base.querySelectorAll('button')[2];

        // Asociar eventos
        this.enlace1.onclick = this.pulsarEnlace1.bind(this);
        this.enlace2.onclick = this.pulsarEnlace2.bind(this);
        this.enlace3.onclick = this.pulsarEnlace3.bind(this);
    }

    /**
     * Función asociada al evento de hacer clic en el enlace 1.
     * Cambia la vista actual a la vista 2.
     */
    pulsarEnlace1() {
        this.controlador.verVista(Vista.VISTA2);
    }

    /**
     * Función asociada al evento de hacer clic en el enlace 2.
     * Cambia la vista actual a la vista 3.
     */
    pulsarEnlace2() {
        this.controlador.verVista(Vista.VISTA3);
    }

    /**
     * Función asociada al evento de hacer clic en el enlace 3.
     * Cambia la vista actual a la vista 6.
     */
    pulsarEnlace3() {
        this.controlador.verVista(Vista.VISTA6);
    }
}
