import {Modelo} from './modelos/modelo.js'
import {Vista} from './vistas/vista.js'
import {MenuInicial} from './vistas/vMenuInicial.js'
import {Ruleta} from './vistas/vRuleta.js'
import {MenuCompeticion} from './vistas/vMenuCompeticion.js'
import {CrearCompeticion} from './vistas/vCrearCompeticion.js'
import {UnirCompeticion} from './vistas/vUnirCompeticion.js'
import {MenuRanking} from './vistas/vMenuRanking.js'
import {Ranking} from './vistas/vRanking.js'
import {RankingCompeticion} from './vistas/vRankingCompeticion.js'
import {PartDemo} from './vistas/vPartDemo.js'
import {JustSocial} from './vistas/vJustSocial.js'
import {DesHumano} from './vistas/vDesHumano.js'
import {Interculturalidad} from './vistas/vInterculturalidad.js'
import {EquidadGenero} from './vistas/vEquidadGenero.js'

class Controlador {
  /*
	 * Inicializa los atributos del Controlador.
	 * Coge las referencias del interfaz.
	 */
  vistas = new Map()

  constructor () {
    this.modelo = new Modelo()

    //conseguimos la referencia de la interface
    const divMenuInicial = document.getElementById('divMenuInicial')
    const divRuleta = document.getElementById('divRuleta')
    const divMenuCompeticion = document.getElementById('divMenuCompeticion')
    const divCrearCompeticion = document.getElementById('divCrearCompeticion')
    const divUnirCompeticion = document.getElementById('divUnirCompeticion')
    const divMenuRanking = document.getElementById('divMenuRanking')
    const divRanking = document.getElementById('divRanking')
    const divRankingCompeticion = document.getElementById('divRankingCompeticion')
    const divPartDemo = document.getElementById('divPartDemo')
    const divJustSocial = document.getElementById('divJustSocial')
    const divDesHumano = document.getElementById('divDesHumano')
    const divInterculturalidad = document.getElementById('divInterculturalidad')
    const divEquidadGenero = document.getElementById('divEquidadGenero')


    //Creamos las vistas 
    this.vistas.set(Vista.vMenuInicial, new MenuInicial(this, divMenuInicial))
    this.vistas.set(Vista.vRuleta, new Ruleta(this, divRuleta))
    this.vistas.set(Vista.vMenuCompeticion, new MenuCompeticion(this, divMenuCompeticion))
    this.vistas.set(Vista.vCrearCompeticion, new CrearCompeticion(this, divCrearCompeticion))
    this.vistas.set(Vista.vUnirCompeticion, new UnirCompeticion(this, divUnirCompeticion))
    this.vistas.set(Vista.vMenuRanking, new MenuRanking(this, divMenuRanking))
    this.vistas.set(Vista.vRanking, new Ranking(this, divRanking))
    this.vistas.set(Vista.vRankingCompeticion, new RankingCompeticion(this, divRankingCompeticion))
    this.vistas.set(Vista.vPartDemo, new PartDemo(this, divPartDemo))
    this.vistas.set(Vista.vJustSocial, new JustSocial(this, divJustSocial))
    this.vistas.set(Vista.vDesHumano, new DesHumano(this, divDesHumano))
    this.vistas.set(Vista.vInterculturalidad, new Interculturalidad(this, divInterculturalidad))
    this.vistas.set(Vista.vEquidadGenero, new EquidadGenero(this, divEquidadGenero))

    this.verVista(Vista.vMenuInicial)
  }

  	/*
	 * Muestra una vista.
	 * @param vista {Symbol} Símbolo que identifica a la vista.
	 */
  verVista (vista) {
    this.ocultarVistas()
    this.vistas.get(vista).mostrar(true)
  }

  ocultarVistas(){
		for(let vista of this.vistas.values())
			vista.mostrar(false)
	}
}

window.onload = () => {new Controlador()}
