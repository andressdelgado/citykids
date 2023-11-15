import {Modelo} from './modelos/modelo.js'
import {Vista} from './vistas/vista.js'
import {Vista1} from './vistas/vista1.js'
import {Vista2} from './vistas/vista2.js'
import {Vista3} from './vistas/vista3.js'
import {Vista4} from './vistas/vista4.js'
import {Vista5} from './vistas/vista5.js'
import {Vista6} from './vistas/vista6.js'
import {Vista7} from './vistas/vista7.js'
import {Vista8} from './vistas/vista8.js'
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
        const divVista7 = document.getElementById('divVista7')
        const divVista8 = document.getElementById('divVista8')

        //Creo las vistas
        this.vistas.set(Vista.VISTA1, new Vista1(this,divVista1))
        this.vistas.set(Vista.VISTA2, new Vista2(this,divVista2))
        this.vistas.set(Vista.VISTA3, new Vista3(this,divVista3))
        this.vistas.set(Vista.VISTA4, new Vista4(this,divVista4))
        this.vistas.set(Vista.VISTA5, new Vista5(this,divVista5))
        this.vistas.set(Vista.VISTA6, new Vista6(this,divVista6))
        this.vistas.set(Vista.VISTA7, new Vista7(this,divVista7))
        this.vistas.set(Vista.VISTA8, new Vista8(this,divVista8))

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