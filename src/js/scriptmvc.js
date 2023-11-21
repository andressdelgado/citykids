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
  validarFormulario() {
    const claveInput = document.getElementById('crearClave')
    const tituloInput = document.getElementById('crearTitulo')
    const descripcionInput = document.getElementById('crearDescripcion')
    const fechaInput = document.getElementById('crearFechaFin')
  
    //Sacamos los valores introduccidos en el formulario
    const clave = claveInput.value
    const titulo = tituloInput.value
    const descripcion = descripcionInput.value
    const fechaFin = fechaInput.value
  
    //validamos con expresiones regulares
    const claveRegex = /^[A-Za-z]{3}[A-Za-z0-9]{2,9}$/
    const tituloRegex = /^[A-Za-z ]{5,100}$/
    const descripcionRegex = /^[A-Za-z0-9 ]{0,255}$/ // puede ser nulo
    const fechaRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/ // formato fecha
  
    
    const claveValid = claveRegex.test(clave)
    const tituloValid = tituloRegex.test(titulo)
    const descripcionValid = descripcionRegex.test(descripcion)
    const fechaValid = fechaRegex.test(fechaFin)
  
    this.aplicarEstilos(claveInput, claveValid, 'Clave no válida. Debe empezar por 3 letras y contener entre 5 y 10 caracteres.')
    this.aplicarEstilos(tituloInput, tituloValid, 'Título no válido. Debe contener al menos 5 caracteres de letras y como máximo 100.')
    this.aplicarEstilos(descripcionInput, descripcionValid, 'Descripción no válida. No puede contener caracteres especiales y debe ser máximo 255 caracteres.')
    this.aplicarEstilos(fechaInput, fechaValid, 'Fecha no válida.')
  
    // Si todos los campos son válidos, continúa con el resto del código
    if (claveValid && tituloValid && descripcionValid && fechaValid) {
      this.controlador.validarFormulario();
    }
  }
  
  aplicarEstilos(elemento, esValido, mensajeError) {
    const errorSpan = elemento.nextElementSibling;
  
    if (!esValido) {
      elemento.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease';
      elemento.style.border = '1px solid red';
      elemento.style.boxShadow = '2px 2px 2px 2px rgba(255, 0, 0, 0.3)';
  
      if (!errorSpan || !errorSpan.classList.contains('error-message')) {
        const nuevoMensajeError = document.createElement('span');
        nuevoMensajeError.textContent = mensajeError;
        nuevoMensajeError.classList.add('error-message');
        elemento.parentNode.insertBefore(nuevoMensajeError, elemento.nextSibling);
      } else {
        errorSpan.textContent = mensajeError;
      }
    } else {
      elemento.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease';
      elemento.style.border = '1px solid green';
      elemento.style.boxShadow = '2px 2px 2px 2px rgba(0, 255, 0, 0.3)';
  
      if (errorSpan && errorSpan.classList.contains('error-message')) {
        elemento.parentNode.removeChild(errorSpan);
      }
    }
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
		for(const vista of this.vistas.values())
			vista.mostrar(false)
	}
}

window.onload = () => {new Controlador()}
