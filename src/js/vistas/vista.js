//AQUI SE CREAN LAS VISTAS COMO SIMBOLOS, Y SE LES DA UN NOMBRE
export class Vista{
    static{
        Vista.VISTA1 = Symbol('Inicio')
        Vista.VISTA2 = Symbol('Juego')
        Vista.VISTA3 = Symbol('Menu Competicion')
        Vista.VISTA4 = Symbol('Crear Competicion')
        Vista.VISTA5 = Symbol('Unirse Competicion')
        Vista.VISTA6 = Symbol('Menu Ranking')
        Vista.VISTA7 = Symbol('Ranking Global')
        Vista.VISTA8 = Symbol('Ranking Competiciones')
        Vista.VISTA9 = Symbol('Participación Democrática')
        Vista.VISTA10 = Symbol('Justicia Social')
        Vista.VISTA11 = Symbol('Desarrollo Humano y Sostenible')
        Vista.VISTA12 = Symbol('Interculturalidad e Inclusión')
        Vista.VISTA13 = Symbol('Equidad de género y Coeducación')
    }
    constructor(controlador, base){
        this.controlador = controlador
        this.base = base
    }
    /*Muestra u oculta la vista.
    * @param ver {Boolean} Indica si la vista debe mostrarse (true) u ocultar (false)
    */
    mostrar(ver){
        if(ver)
            this.base.style.display = 'block'
        else
            this.base.style.display = 'none'
    }
}