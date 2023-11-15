import {Vista} from './vista.js'

//En esta vista se muestra el menu de los rankings, a través de esta vista se puede acceder a la vista de ranking genereal, y a la de ranking por competiciones

export class Vista6 extends Vista{
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
    //Funciones para ver la vista que corresponde segun el boton accionado
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