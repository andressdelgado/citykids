import {Modelo} from './modelos/modelo.js'
import {Vista} from './vistas/vista.js'
import {Vista1} from './vistas/vista1.js'
import {Vista2} from './vistas/vista2.js'
import {Vista3} from './vistas/vista3.js'

class Controlador{
    /*
    * Incializa los atributos.
    * Coge las preferencias del interfaz.
    */
    vistas = new Map()

    constructor(){
        this.modelo = new Modelo()

        //Consigo las referencias del interfaz
        const divVista1 = document.getElementById('divVista1')
        const divVista2 = document.getElementById('divVista2')
        const divVista3 = document.getElementById('divVista3')
        const divVista4 = document.getElementById('divVista4')
        const divVista5 = document.getElementById('divVista5')
        const divVista6 = document.getElementById('divVista6')

        //Creo las vistas
        this.vistas.set(Vista.VISTA1, new Vista1(this,divVista1))
        this.vistas.set(Vista.VISTA2, new Vista2(this,divVista2))
        this.vistas.set(Vista.VISTA3, new Vista3(this,divVista3))
        this.vistas.set(Vista.VISTA4, new Vista1(this,divVista4))
        this.vistas.set(Vista.VISTA5, new Vista2(this,divVista5))
        this.vistas.set(Vista.VISTA6, new Vista3(this,divVista6))

    this.verVista(Vista.VISTA1)
    }
    verVista(vista){
        this.ocultarVistas()
        this.vistas.get(vista).mostrar(true)
    }
    ocultarVistas(){
        for(let vista of this.vistas.values())
            vista.mostrar(false)
    }

}

window.onload = () => {new Controlador()}