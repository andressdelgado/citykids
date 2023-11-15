import {Vista} from './vista.js'

//Esta es la vista de rankings por competiciones

export class Vista8 extends Vista{
    constructor(controlador, base){
        super(controlador, base)
        //Coger referecnias del interfaz
        this.enlace2 = this.base.querySelectorAll('button')[1]
        //Asociar eventos
        this.enlace2.onclick = this.pulsarEnlace2.bind(this)
    }
    //Funciones para ver la vista que corresponde segun el boton accionado
    pulsarEnlace2(){
        this.controlador.verVista(Vista.VISTA1)
    }  
}