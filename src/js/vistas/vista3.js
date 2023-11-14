import {Vista} from './vista.js'

export class Vista3 extends Vista{
    constructor(controlador, base){
        super(controlador, base)
        //Coger referecnias del interfaz
        this.enlace1 = this.base.querySelectorAll('button')[0]
        this.enlace2 = this.base.querySelectorAll('button')[1]
        this.enlace3 = this.base.querySelectorAll('button')[2]
        //Asociar eventos
        this.enlace1.onclick = this.pulsarEnlace1.bind(this)
        this.enlace2.onclick = this.pulsarEnlace2.bind(this)
        this.enlace3.onclick = this.pulsarEnlace3.bind(this)
    }
    pulsarEnlace1(){
        this.controlador.verVista(Vista.VISTA2)
    }
    pulsarEnlace2(){
        this.controlador.verVista(Vista.VISTA3)
    }
    pulsarEnlace3(){
        this.controlador.verVista(Vista.VISTA1)
    }
}