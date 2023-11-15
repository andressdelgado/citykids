import {Vista} from './vista.js'

//Esta es la vista que muestra el menú de competicón, a través de ella, se podrá acceder a las vista de crear competicion o unirse a una competicion

export class Vista3 extends Vista{
    constructor(controlador, base){
        super(controlador, base)
        //Coger referecnias del interfaz
        this.enlace1 = this.base.querySelectorAll('button')[0]
        this.enlace2 = this.base.querySelectorAll('button')[1]

        //Asociar eventos
        this.enlace1.onclick = this.pulsarEnlace1.bind(this)
        this.enlace2.onclick = this.pulsarEnlace2.bind(this)
        //CREA EL INTERFAZ
        this.crearInterfaz()
    }
    crearInterfaz(){
        //SE CREA EL BOTON DINAMICAMENTE QUE LLEVA A LA VISTA1
        this.btnVerVista1 = document.createElement('button')
        this.base.appendChild(this.btnVerVista1)
        this.btnVerVista1.textContent = 'VOLVER AL MENÚ'
        this.btnVerVista1.className = 'volverAlJuego'
        this.btnVerVista1.onclick = () => {
            this.controlador.verVista(Vista.VISTA1)
        }
    }
    //Funciones para ver la vista que corresponde segun el boton accionado
    pulsarEnlace1(){
        this.controlador.verVista(Vista.VISTA4)
    }
    pulsarEnlace2(){
        this.controlador.verVista(Vista.VISTA5)
    }
    pulsarEnlace3(){
        this.controlador.verVista(Vista.VISTA1)
    }
}