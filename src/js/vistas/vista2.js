import {Vista} from './vista.js'
import { GeneradorNumeros} from '../modelos/modelo2.js';
export class Vista2 extends Vista {
    constructor(controlador, base) {
        super(controlador, base);
        // Obtén el elemento divVista2 y asigna a this.divVista2
        this.divVista2 = document.getElementById('divVista2');

        // Asegúrate de que el divVista2 sea seleccionable
        this.divVista2.setAttribute('tabindex', '0');

        // Establece el foco en el divVista2 al cargar la página
        this.divVista2.focus();

        // Inicializa un generador de números
        this.generadorNumeros = new GeneradorNumeros();
        document.addEventListener('keydown', this.cambiarVista.bind(this))
        // Agrega el event listener para el evento 'keydown' al divVista2
    }
    cambiarVista(event){
        if (event.key === 'Enter') {
            // Reemplaza el alert con el código para obtener números aleatorios
            const numero = this.generadorNumeros.obtenerNumeroAleatorio();
            if (numero === 0) {
                console.log("Ya se proporcionaron todos los números.");
            } else {
                console.log("Número obtenido:", numero);
                //this.controlador.verVista(Vista.VISTA+numero);
                switch (numero) {
                    case 1:
                        console.log("Participacion democractica")
                        this.controlador.verVista(Vista.VISTA9);
                        break;
                    case 2:
                        console.log("Justicia Social")
                        this.controlador.verVista(Vista.VISTA10);
                        break;
                    case 3:
                        console.log("Desarrollo Humano y Sostenible")
                        this.controlador.verVista(Vista.VISTA11);
                        break;
                    case 4:
                        console.log("Interculturalidad e inclusión");
                        this.controlador.verVista(Vista.VISTA12);
                        break;
                    case 5:
                        console.log("Equidad de género y coeducación");
                        this.controlador.verVista(Vista.VISTA13);
                        break;
                    default:
                        console.log("Número no válido");
                }
            }
        }
    }
}

