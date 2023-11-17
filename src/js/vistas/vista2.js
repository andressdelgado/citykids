import {Vista} from './vista.js'
import { GeneradorNumeros} from '../clases/generadornumeros.js';
export class Vista2 extends Vista {
    constructor(controlador, base) {
        super(controlador, base);
        // Obtén el elemento divVista2 y asigna a this.divVista2
        this.divVista2 = document.getElementById('divVista2');

        //Este codigo se asegura de q el divVista2 sea seleccionable
        this.divVista2.setAttribute('tabindex', '0');

        // Establece el foco en el divVista2 al cargar la página
        this.divVista2.focus();

        this.generadorNumeros = new GeneradorNumeros();

        //solo funciona clicando en la vista2
        this.divVista2.addEventListener('keydown', this.cambiarVista.bind(this))
        // FUNCIONA SIIN CLICAR PERO SE CAMBIA DESDE CUALQUIER PANTALLA
        //document.addEventListener('keydown', this.cambiarVista.bind(this))
        this.crearInterfaz()
    }
    crearInterfaz(){
        //SE CREA EL BOTON DINAMICAMENTE QUE LLEVA A LA VISTA1
        this.pEnter = document.createElement('p')
        this.base.appendChild(this.pEnter)
        this.pEnter.textContent = 'CLICA EN LA PANTALLA Y LUEGO PULSA ENTER PARA GIRAR LA RULETA'
        this.pEnter.className = 'volverAlJuego'
    }
    crearInterfaz2(){
        //SE CREA EL BOTON DINAMICAMENTE QUE LLEVA A LA VISTA1
        this.pEnter = document.createElement('p')
        this.base.appendChild(this.pEnter)
        this.pEnter.textContent = 'Ya se han proporcionado todos los ambitos, pulsa f5 y mira los otros apartados. (Esta parte está en desarrollo ya que aqui irán las preguntas)'
        this.pEnter.className = 'volverAlJuego'
    }
    cambiarVista(event){
        if (event.key === 'Enter') {
            const numero = this.generadorNumeros.obtenerNumeroAleatorio();
            if (numero === 0) {
                console.log("Ya se proporcionaron todos los números.");
                this.crearInterfaz2()
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

