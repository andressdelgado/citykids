import {Modelo} from './modelos/modelo.js'
import {Vista} from './vistas/vista.js'
import {MenuInicial} from './vistas/vmenuinicial.js'
import {Ruleta} from './vistas/vruleta.js' //SERGIO
import {MenuCompeticion} from './vistas/vmenucompeticion.js'
import {CrearCompeticion} from './vistas/vcrearcompeticion.js' //SERGIO
//import {UnirCompeticion} from './vistas/vunircompeticion.js'
import {MenuRanking} from './vistas/vmenuranking.js'  //SERGIO
import {RankingGlobal} from './vistas/vrankingglobal.js' //SERGIO
import {RankingCompeticion} from './vistas/vrankingcompeticion.js'  //SERGIO
import {PartDemo} from './vistas/vpartdemo.js'
import {JustSocial} from './vistas/vjustsocial.js'
import {DesHumano} from './vistas/vdeshumano.js'
import {Interculturalidad} from './vistas/vInterculturalidad.js'
import {EquidadGenero} from './vistas/vequidadgenero.js'
import { Victoria } from './vistas/victoria.js'
import { Configuracion } from './vistas/vconfig.js'

/**
 * Clase Controlador para gestionar la lógica y negociaciones del juego.
 */
class Controlador {
  /*
	 * Inicializa los atributos del Controlador.
	 * Coge las referencias del interfaz.
	 */
  vistas = new Map()
  indicePregunta =0;
  respuestaBtn
  preguntasCorrectas = 0

  constructor () {
    this.modelo = new Modelo()
    this.preguntasCorrectas =0;

    //conseguimos la referencia de la interface
    const divMenuInicial = document.getElementById('divMenuInicial')
    const divRuleta = document.getElementById('divRuleta') //SERGIO
    const divMenuCompeticion = document.getElementById('divMenuCompeticion')
    const divCrearCompeticion = document.getElementById('divCrearCompeticion') //SERGIO
    //const divUnirCompeticion = document.getElementById('divUnirCompeticion')
    const divMenuRanking = document.getElementById('divMenuRanking')  //SERGIO
    const divRankingGlobal = document.getElementById('divRankingGlobal') //SERGIO
    const divRankingCompeticion = document.getElementById('divRankingCompeticion')  //SERGIO
    const divPartDemo = document.getElementById('divPartDemo')
    const divJustSocial = document.getElementById('divJustSocial')
    const divDesHumano = document.getElementById('divDesHumano')
    const divInterculturalidad = document.getElementById('divInterculturalidad')
    const divEquidadGenero = document.getElementById('divEquidadGenero')
    const divVictoria = document.getElementById('divVictoria')
    const divConfig = document.getElementById('divConfig')


    //Creamos las vistas 
    this.vistas.set(Vista.vmenuinicial, new MenuInicial(this, divMenuInicial))
    this.vistas.set(Vista.vruleta, new Ruleta(this, divRuleta)); //SERGIO
    this.vistas.set(Vista.vmenucompeticion, new MenuCompeticion(this, divMenuCompeticion))
    this.vistas.set(Vista.vcrearcompeticion, new CrearCompeticion(this, divCrearCompeticion)) //SERGIO
    //this.vistas.set(Vista.vunircompeticion, new UnirCompeticion(this, divUnirCompeticion))
    this.vistas.set(Vista.vmenuranking, new MenuRanking(this, divMenuRanking)) //SERGIO
    this.vistas.set(Vista.vrankingglobal, new RankingGlobal(this, divRankingGlobal)) //SERGIO
    this.vistas.set(Vista.vrankingcompeticion, new RankingCompeticion(this, divRankingCompeticion)) //SERGIO
    this.vistas.set(Vista.vpartdemo, new PartDemo(this, divPartDemo))
    this.vistas.set(Vista.vjustsocial, new JustSocial(this, divJustSocial))
    this.vistas.set(Vista.vdeshumano, new DesHumano(this, divDesHumano))
    this.vistas.set(Vista.vinterculturalidad, new Interculturalidad(this, divInterculturalidad))
    this.vistas.set(Vista.vequidadgenero, new EquidadGenero(this, divEquidadGenero))
    this.vistas.set(Vista.divVictoria, new Victoria(this, divVictoria))
    this.vistas.set(Vista.vconfig, new Configuracion(this, divConfig))

    this.verVista(Vista.vmenuinicial)
  }

  /**
   * Detiene o reproduce el elemento de audio según su estado actual.
   */
  stopAudio() {
    const audioElement = document.getElementById('audioElementId');
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }
  /**
   * Muestra las preguntas y respuestas en la interfaz del juego.
   * @param {number} ambito - Número que representa el ámbito de las preguntas.
   * @param {Array} datosPreguntas - Array de objetos que contiene las preguntas y respuestas.
   */

  mostrarPreguntas(ambito, datosPreguntas) {
    const preguntasArea = document.getElementById('preguntasArea'+ambito);
    const preguntaTexto = document.getElementById('preguntaTexto'+ambito);
    const respuestasArea = document.getElementById('respuestas'+ambito);
    const divRespuesta = document.createElement('div');
    const botonSiguienteTirada = document.createElement('button');
    const textoRespuesta = document.createElement('p');
    botonSiguienteTirada.classList.add('btnSiguienteTiradas')

    if (datosPreguntas.length > 0) {
      //Te lanza una pregunta aleatoria del ambito
      const indiceAleatorio = Math.floor(Math.random() * datosPreguntas.length);
      const preguntaAleatoria = datosPreguntas[indiceAleatorio]; //ESTO LO HAGO PORQUE SI NO LE DIGO QUE PREGUNTA QUIERO MOSTRAR,
      // ME MUESTRA TODAS LAS PREGUNTAS QUE TIENE ASIGNADO ESE AAMBITO

      // Mostrar la pregunta y las opciones de respuesta
      preguntaTexto.textContent = preguntaAleatoria.pregunta;
      const respuestasAleatorias = preguntaAleatoria.respuestas.sort(()=> Math.random() - 0.5)

      respuestasAleatorias.forEach((opcion) => {
        const respuestaBtn = document.createElement('button');
        respuestaBtn.textContent = opcion.texto_respuesta;
        respuestaBtn.classList.add('respuestaBtn');
        respuestaBtn.addEventListener('click', () => {


            respuestaBtn.style.pointerEvents = 'none'

            if (opcion.num_respuesta === 1) {
                this.obtenerPuntuacion()
                divRespuesta.style.display = 'block';
                textoRespuesta.textContent = '¡CORRECTO!';
                textoRespuesta.classList.add('texto-elemento')
                divRespuesta.style.backgroundColor = 'rgb(153, 255, 131)'
                divRespuesta.style.boxShadow = '2px 2px 40px rgba(0, 255, 0, 0.7)'
                divRespuesta.style.border = '2px solid rgba(0, 255, 0, 0.7)'
                divRespuesta.classList.add('elemento-con-animacion')
                document.body.appendChild(divRespuesta);
                botonSiguienteTirada.textContent = 'Seguir Jugando';
                botonSiguienteTirada.addEventListener('click', () => {
                divRespuesta.style.display = 'none';
                this.verVista(Vista.vruleta)

                });
                divRespuesta.appendChild(textoRespuesta)
                divRespuesta.appendChild(botonSiguienteTirada)
            } else {
                divRespuesta.style.display = 'block';
                textoRespuesta.textContent = 'INCORRECTO';
                textoRespuesta.classList.add('texto-elemento')
                divRespuesta.style.backgroundColor = 'rgb(255, 68, 68)'
                divRespuesta.style.boxShadow = '2px 2px 40px rgba(255, 0, 0, 0.7)'
                divRespuesta.style.border = '2px solid rgba(255, 0, 0, 0.7)'
                divRespuesta.classList.add('elemento-con-animacion')
                document.body.appendChild(divRespuesta);
                botonSiguienteTirada.textContent = 'Seguir Jugando';
                botonSiguienteTirada.addEventListener('click', () => {
                  divRespuesta.style.display = 'none';
                  this.verVista(Vista.vruleta)
                });
                divRespuesta.appendChild(textoRespuesta)
                divRespuesta.appendChild(botonSiguienteTirada)
            }
        });
        respuestasArea.appendChild(respuestaBtn);
        
    });
    
    } else {
      preguntaTexto.textContent = 'No hay preguntas disponibles en este momento.';
    }
  }

  /**
   * Obtiene la puntuación acumulada por preguntas correctas.
   * @returns {number} - Puntuación acumulada.
   */
  obtenerPuntuacion() {
    this.preguntasCorrectas = this.preguntasCorrectas + 20;
    return this.preguntasCorrectas;
  }

  /**
   * Cambia la vista actual del juego.
   * @param {string} vista - Identificador de la vista a mostrar.
   */
  verVista (vista) {
    this.ocultarVistas()
    this.vistas.get(vista).mostrar(true)

    if (vista === Vista.vrankingglobal) {
      this.obtenerRankingGlobal();
    }
  }

  /**
   * Oculta todas las vistas del juego.
   */
  ocultarVistas(){
		for(const vista of this.vistas.values())
			vista.mostrar(false)
	}


  /**
   * Obtiene el ranking global mediante una solicitud AJAX.
   */
  obtenerRankingGlobal() {
    fetch('./js/php/ranking.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener el ranking');
        }
        return response.json();
      })
      .then(data => {
        this.vistas.get(Vista.vrankingglobal).mostrarRankingGlobal(data);
      })
      .catch(error => console.error('Error:', error));
  }

  

}

/**
 * Función que se ejecuta al cargar la página para inicializar el juego.
 */
window.onload = () => {new Controlador()}