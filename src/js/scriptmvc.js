import {Modelo} from './modelos/modelo.js'
import {Vista} from './vistas/vista.js'
import {MenuInicial} from './vistas/vmenuinicial.js'
import {Ruleta} from './vistas/vruleta.js'
import {MenuCompeticion} from './vistas/vmenucompeticion.js'
import {CrearCompeticion} from './vistas/vcrearcompeticion.js'
import {UnirCompeticion} from './vistas/vunircompeticion.js'
import {MenuRanking} from './vistas/vmenuranking.js'  //SERGIO
import {RankingGlobal} from './vistas/vrankingglobal.js' //SERGIO
import {RankingCompeticion} from './vistas/vrankingcompeticion.js'  //SERGIO
import {PartDemo} from './vistas/vpartdemo.js'
import {JustSocial} from './vistas/vjustsocial.js'
import {DesHumano} from './vistas/vdeshumano.js'
import {Interculturalidad} from './vistas/vInterculturalidad.js'
import {EquidadGenero} from './vistas/vequidadgenero.js'
import { FormularioFinal } from './vistas/vformulariofinal.js'
import { Configuracion } from './vistas/vconfig.js'

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
    const divRuleta = document.getElementById('divRuleta')
    const divMenuCompeticion = document.getElementById('divMenuCompeticion')
    const divCrearCompeticion = document.getElementById('divCrearCompeticion')
    const divUnirCompeticion = document.getElementById('divUnirCompeticion')
    const divMenuRanking = document.getElementById('divMenuRanking')
    const divRankingGlobal = document.getElementById('divRankingGlobal') //SERGIO
    const divRankingCompeticion = document.getElementById('divRankingCompeticion')
    const divPartDemo = document.getElementById('divPartDemo')
    const divJustSocial = document.getElementById('divJustSocial')
    const divDesHumano = document.getElementById('divDesHumano')
    const divInterculturalidad = document.getElementById('divInterculturalidad')
    const divEquidadGenero = document.getElementById('divEquidadGenero')
    const divFormulario = document.getElementById('divFormulario')
    const divConfig = document.getElementById('divConfig')


    //Creamos las vistas 
    this.vistas.set(Vista.vMenuInicial, new MenuInicial(this, divMenuInicial))
    this.vistas.set(Vista.vRuleta, new Ruleta(this, divRuleta));
    this.vistas.set(Vista.vMenuCompeticion, new MenuCompeticion(this, divMenuCompeticion))
    this.vistas.set(Vista.vCrearCompeticion, new CrearCompeticion(this, divCrearCompeticion))
    this.vistas.set(Vista.vUnirCompeticion, new UnirCompeticion(this, divUnirCompeticion))
    this.vistas.set(Vista.vMenuRanking, new MenuRanking(this, divMenuRanking))
    this.vistas.set(Vista.vrankingglobal, new RankingGlobal(this, divRankingGlobal)) //SERGIO
    this.vistas.set(Vista.vrankingcompeticion, new RankingCompeticion(this, divRankingCompeticion))
    this.vistas.set(Vista.vPartDemo, new PartDemo(this, divPartDemo))
    this.vistas.set(Vista.vJustSocial, new JustSocial(this, divJustSocial))
    this.vistas.set(Vista.vDesHumano, new DesHumano(this, divDesHumano))
    this.vistas.set(Vista.vInterculturalidad, new Interculturalidad(this, divInterculturalidad))
    this.vistas.set(Vista.vEquidadGenero, new EquidadGenero(this, divEquidadGenero))
    this.vistas.set(Vista.vFormularioFinal, new FormularioFinal(this, divFormulario))
    this.vistas.set(Vista.vConfig, new Configuracion(this, divConfig))

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
      elemento.style.boxShadow = '2px 2px 40px rgba(255, 0, 0, 0.7)'

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
      elemento.style.boxShadow = '2px 2px 40px rgba(0, 255, 0, 0.7)'

      if (errorSpan && errorSpan.classList.contains('error-message')) {
        elemento.parentNode.removeChild(errorSpan);
      }
    }
  }
 
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
      console.log('PREGUNTA DEL AMBITO '+ambito+' : ' + preguntaAleatoria.pregunta);

      // Mostrar la pregunta y las opciones de respuesta
      preguntaTexto.textContent = preguntaAleatoria.pregunta;
      console.log('EN LA VISTA CONTROLADOR :' +preguntaAleatoria)
      console.log('EN LA VISTA CONTROLADOR PREGUNTA:' +preguntaAleatoria.pregunta)
      const respuestasAleatorias = preguntaAleatoria.respuestas.sort(()=> Math.random() - 0.5)
      respuestasAleatorias.forEach((opcion) => {
        const respuestaBtn = document.createElement('button');
        respuestaBtn.textContent = opcion.texto_respuesta;
        respuestaBtn.classList.add('respuestaBtn');
        console.log('RESPUESTA :' +preguntaAleatoria.texto_respuesta)
        respuestaBtn.addEventListener('click', () => {

            respuestaBtn.style.pointerEvents = 'none'

            if (opcion.num_respuesta === '1') {
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
                this.verVista(Vista.vRuleta)

                });
                divRespuesta.appendChild(textoRespuesta)
                divRespuesta.appendChild(botonSiguienteTirada)
            } else {
                console.log("INCORRECTA");
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
                  this.verVista(Vista.vRuleta)
                });
                divRespuesta.appendChild(textoRespuesta)
                divRespuesta.appendChild(botonSiguienteTirada)
            }
        });
        respuestasArea.appendChild(respuestaBtn);
        
    });
    
    } else {
      console.log(datosPreguntas)
      preguntaTexto.textContent = 'No hay preguntas disponibles en este momento.';
    }
  }

  obtenerPuntuacion() {
    this.preguntasCorrectas = this.preguntasCorrectas + 20;
    return this.preguntasCorrectas;
  }

  verVista (vista) {
    this.ocultarVistas()
    this.vistas.get(vista).mostrar(true)

    if (vista === Vista.vrankingglobal) {
      this.obtenerRankingGlobal();
    }
  }

  ocultarVistas(){
		for(const vista of this.vistas.values())
			vista.mostrar(false)
	}


  obtenerRankingGlobal() { 
    console.log("wololo") 
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
window.onload = () => {new Controlador()}