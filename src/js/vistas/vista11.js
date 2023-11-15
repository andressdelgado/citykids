import {Vista} from './vista.js'

//Esta es la vista de desarrollo humano y sostenible

export class Vista11 extends Vista{
    constructor(controlador, base){
        super(controlador, base)
        //Coger referecnias del interfaz
        this.enlace1 = this.base.querySelectorAll('button')[0]
        //Asociar eventos
        this.enlace1.onclick = this.pulsarEnlace1.bind(this)
    }
    //Funciones para ver la vista que corresponde segun el boton accionado
    pulsarEnlace1(){
        this.controlador.verVista(Vista.VISTA2)
    } 
}