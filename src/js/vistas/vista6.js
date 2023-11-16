import {Vista} from './vista.js'

//En esta vista se muestra el menu de los rankings, a través de esta vista se puede acceder a la vista de ranking genereal, y a la de ranking por competiciones

export class Vista6 extends Vista{
    constructor(controlador, base){
        super(controlador, base)
        //Coger referecnias del interfaz
        this.enlace1 = this.base.querySelectorAll('button')[0]
        this.enlace2 = this.base.querySelectorAll('button')[1]
        //Asociar eventos
        this.enlace1.onclick = this.pulsarEnlace1.bind(this)
        this.enlace2.onclick = this.pulsarEnlace2.bind(this)
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
    pulsarEnlace1(){
        this.controlador.verVista(Vista.VISTA7)
    } 
    pulsarEnlace2(){
        this.controlador.verVista(Vista.VISTA8)
    } 
    pulsarEnlace3(){
        this.controlador.verVista(Vista.VISTA1)
    } 
    
}