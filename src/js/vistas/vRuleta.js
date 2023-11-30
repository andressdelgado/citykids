import { Vista } from './vista.js'
import { GeneradorNumeros } from '../clases/generadornumeros.js'

export class Ruleta extends Vista {

  constructor (controlador, base) {
    super(controlador, base)
    
    this.divMenuCompeticion = document.getElementById('divMenuCompeticion')
    this.divMenuCompeticion.setAttribute('tabindex', '0')
    this.divMenuCompeticion.focus()
    this.generadorNumeros = new GeneradorNumeros()

    this.divMenuCompeticion.addEventListener('keydown', this.girarRuleta.bind(this))
    this.crearBoton()
  }

  preguntasMostradas = 0 //Para controlar el numero de pregunta que sale 
  ambitosSeleccionados = [] //Para controlar que los ambitos no salen repetidos

  crearBoton() {
    // Se crea el botón dinámicamente y se agrega al DOM
    this.button = document.createElement('button')
    this.base.appendChild(this.button);
    this.button.textContent = 'GIRA LA RULETA'
    this.button.className = 'volverAlJuego'
  
    // Agregar evento de clic al botón
    this.button.addEventListener('click', () => {
      // Seleccionar la imagen de la ruleta y el sonido
      let sonidoRuleta = document.getElementById('audioRuleta')
      let ruletaImg = document.getElementById('ruleta')
  
      // Definir la duración total de la animación en milisegundos (8 segundos = 8000 milisegundos)
      const duracionTotal = 1000
      const velocidadInicial = 15 // Velocidad inicial en grados por intervalo
      const aceleracion = 5 // Aceleración para simular el efecto de arranque lento
  
      let tiempoTranscurrido = 0
      let rotacion = 0
      let velocidad = velocidadInicial
  
      let interval = setInterval(() => {
        ruletaImg.style.transform = `rotate(${rotacion}deg)`
  
        // Reproducir el sonido solo cuando está girando
        if (velocidad > 0) {
          sonidoRuleta.currentTime = 0
          sonidoRuleta.play()
        }
  
        if (tiempoTranscurrido < duracionTotal) {
          rotacion += velocidad
          tiempoTranscurrido += 50 // Incrementar el tiempo transcurrido por el intervalo
          // Reducir la velocidad con la aceleración y un factor de desaceleración gradual
          velocidad -= aceleracion * (1 - tiempoTranscurrido / duracionTotal)
        } else {
          // Detener la animación cuando se alcanza la duración total
          clearInterval(interval)
  
          // Realizar fade-out del sonido al finalizar la animación
          let fadeInterval = setInterval(() => {
            if (sonidoRuleta.volume > 0.05) {
              sonidoRuleta.volume -= 0.05
            } else {
              clearInterval(fadeInterval)
              sonidoRuleta.pause()
              sonidoRuleta.currentTime = 0
              sonidoRuleta.volume = 1
            }
          }, 100)
  
          this.girarRuleta()
          this.cambiarVista(this.ambitosSeleccionados[this.ambitosSeleccionados.length - 1])
        }
      }, 50)
    });
  }
  
  crearInterfaz2() {
    this.button.style.display='none'
    const controlador = this.controlador
    const puntuacion = controlador.obtenerPuntuacion()
    
    // Crear el contenedor div
    const divPuntuacion = document.createElement('div')
    divPuntuacion.className = 'elemento-con-animacion'
    divPuntuacion.style.backgroundColor = '#b8ffd3'
    // Crear el párrafo con el mensaje de puntuación
    const pMensaje = document.createElement('p')
    pMensaje.textContent = `¡Has obtenido ${puntuacion} puntos!`
    
    // Crear el botón para volver al inicio
    const btnVolverInicio = document.createElement('button')
    btnVolverInicio.textContent = 'Volver al inicio'
    btnVolverInicio.className = 'btnSiguienteTiradas'
    
    // Agregar evento al botón para volver al inicio
    btnVolverInicio.addEventListener('click', () => {
      location.reload();
    });
    
    divPuntuacion.appendChild(pMensaje)
    divPuntuacion.appendChild(btnVolverInicio)
    this.base.appendChild(divPuntuacion)
  }

  girarRuleta() {
    if (this.preguntasMostradas < 4) {
      let idAmbitoAleatorio;
      do {
        idAmbitoAleatorio = Math.floor(Math.random() * 5) + 1;
      } while (this.ambitosSeleccionados.includes(idAmbitoAleatorio));
      this.ambitosSeleccionados.push(idAmbitoAleatorio);
      this.preguntasMostradas++;

      const self = this;

      fetch('./js/php/preguntas.php?id_ambito='+idAmbitoAleatorio, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          return response.json();
        })
        .then(preguntas => {
          console.log('Respuesta del servidor:', preguntas);
          self.mostrarPreguntas(idAmbitoAleatorio, preguntas);
        })
        .catch(error => {
          console.error('Hubo un problema con la petición Fetch:', error);
        });
    } else {
      this.crearInterfaz2();
    }
  }
  
  mostrarPreguntas(idAmbitoAleatorio, preguntas) {
    this.controlador.mostrarPreguntas(idAmbitoAleatorio, preguntas)
  }

  cambiarVista (idAmbitoAleatorio) {
        switch (idAmbitoAleatorio) {
          case 1:
            //this.controlador.verVista(Vista.vPartDemo)
            this.controlador.verVista(Vista.vpartdemo)
            break
          case 2:
            this.controlador.verVista(Vista.vjustsocial)
            break
          case 3:
            this.controlador.verVista(Vista.vdeshumano)
            break
          case 4:
            this.controlador.verVista(Vista.vinterculturalidad)
            break
          case 5:
            this.controlador.verVista(Vista.vequidadgenero)
            break
          default:
            console.log('Número no válido')
        }
      } 
    }