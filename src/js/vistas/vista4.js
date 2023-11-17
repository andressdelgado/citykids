import { Vista } from './vista.js';

// Esta es la vista en la que se crea una competición

export class Vista4 extends Vista {
    constructor(controlador, base) {
        super(controlador, base);

        // Coger referencias del interfaz
        this.enlace2 = this.base.querySelectorAll('button')[1];
        this.formulario = this.base.querySelectorAll('form')[0];

        // Asociar eventos
        this.enlace2.onclick = this.pulsarEnlace2.bind(this);
        //AÑADE UN EVENTO CUANDO SE CLICA EN EL SUBMIT DEL FORMULARIO QUE LLEVA A LA FUNCION DE VALIDAR FORMULARIO
        this.formulario.onclick = this.formulario.addEventListener('submit', (event) => this.validarFormulario(event));
    }

    pulsarEnlace2() {
        this.controlador.verVista(Vista.VISTA1);
    }

    validarFormulario(event) {
        //QUITA EL EVENTO POR DEFECTO
        event.preventDefault();
        //LLAMA A LA FUNCION VALIDAR FORMULARIO DEL CONTROLADOR
        this.controlador.validarFormulario();
    }
}