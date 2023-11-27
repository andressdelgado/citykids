/**
 * Clase para gestionar la creación y eliminación dinámica de respuestas incorrectas.
 */
class RespuestasIncorrectasManager {
    /**
     * Constructor de la clase.
     */
    constructor() {
        /**
         * Contador de respuestas incorrectas, inicia en 3, ya que al ser las 'extra', las estáticas ocupan el 0, el 1 y el 2
         * @type {number}
         */
        this.contadorRespuestasIncorrectas = 3;

        /**
         * Contenedor HTML tipo DIV donde se añadirán y eliminarán las respuestas incorrectas.
         * @type {HTMLElement}
         */
        this.container = document.getElementById('respuestas_incorrectas_container');
    }

    /**
     * Agrega una nueva respuesta incorrecta al formulario.
     */
    agregarRespuestaIncorrecta() {
        /**
         * Crea un nuevo elemento <label> para la nueva respuesta incorrecta.
         * @type {HTMLLabelElement}
         */
        const label = document.createElement('label');
        label.setAttribute('for', 'texto_respuesta_incorrecta' + this.contadorRespuestasIncorrectas);
        label.textContent = 'Texto de la Respuesta Incorrecta ' + this.contadorRespuestasIncorrectas + ':';

        /**
         * Crea un nuevo elemento <input> para la nueva respuesta incorrecta.
         * @type {HTMLInputElement}
         */
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'texto_respuesta_incorrecta' + this.contadorRespuestasIncorrectas);
        input.setAttribute('name', 'texto_respuesta_incorrecta' + this.contadorRespuestasIncorrectas);

        // añado los elementos al contenedor, label, input y el salto de línea
        this.container.appendChild(label);
        this.container.appendChild(input);
        this.container.appendChild(document.createElement('br')); // Salto de línea

        // incremento el contador para la próxima respuesta
        this.contadorRespuestasIncorrectas++;
    }

    /**
     * Elimina la última respuesta incorrecta del formulario.
     */
    eliminarRespuestaIncorrecta() {
        console.log("borrado");

        // verifico que haya al menos 3 respuestas incorrectas antes de eliminar. si no, al ser el minimo, no borro
        if (this.contadorRespuestasIncorrectas > 3) {
            this.contadorRespuestasIncorrectas--;

            // elimino los elementos del contenedor en orden inverso (último agregado, primero eliminado)
            this.container.removeChild(this.container.lastChild); // <br>
            this.container.removeChild(this.container.lastChild); // input
            this.container.removeChild(this.container.lastChild); // label
        } else {
            console.log("No puedo bajar de 3");
        }
    }
}

/**
 * Instancia la clase RespuestasIncorrectasManager al cargar el documento.
 */
const respuestasManager = new RespuestasIncorrectasManager();

/**
 * Función externa para agregar una respuesta incorrecta.
 */
function agregarRespuestaIncorrecta() {
    respuestasManager.agregarRespuestaIncorrecta();
}

/**
 * Función externa para eliminar la última respuesta incorrecta.
 */
function eliminarRespuestaIncorrecta() {
    respuestasManager.eliminarRespuestaIncorrecta();
}
