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

  preguntasMostradas = 0; //Para controlar el numero de pregunta que sale 
  ambitosSeleccionados = []; //Para controlar que los ambitos no salen repetidos

  crearBoton() {
    // Se crea el botón dinámicamente y se agrega al DOM
    this.button = document.createElement('button');
    this.base.appendChild(this.button);
    this.button.textContent = 'GIRA LA RULETA';
    this.button.className = 'volverAlJuego';
  
    // Agregar evento de clic al botón
    this.button.addEventListener('click', () => {
      // Seleccionar la imagen de la ruleta y el sonido
      let sonidoRuleta = document.getElementById('audioRuleta');
      let ruletaImg = document.getElementById('ruleta');
  
      // Definir la duración total de la animación en milisegundos (8 segundos = 8000 milisegundos)
      const duracionTotal = 8000;
      const velocidadInicial = 15; // Velocidad inicial en grados por intervalo
      const aceleracion = 5; // Aceleración para simular el efecto de arranque lento
  
      let tiempoTranscurrido = 0;
      let rotacion = 0;
      let velocidad = velocidadInicial;
  
      let interval = setInterval(() => {
        ruletaImg.style.transform = `rotate(${rotacion}deg)`;
  
        // Reproducir el sonido solo cuando está girando
        if (velocidad > 0) {
          sonidoRuleta.currentTime = 0;
          sonidoRuleta.play();
        }
  
        if (tiempoTranscurrido < duracionTotal) {
          rotacion += velocidad;
          tiempoTranscurrido += 50; // Incrementar el tiempo transcurrido por el intervalo
          // Reducir la velocidad con la aceleración y un factor de desaceleración gradual
          velocidad -= aceleracion * (1 - tiempoTranscurrido / duracionTotal);
        } else {
          // Detener la animación cuando se alcanza la duración total
          clearInterval(interval);
  
          // Realizar fade-out del sonido al finalizar la animación
          let fadeInterval = setInterval(() => {
            if (sonidoRuleta.volume > 0.05) {
              sonidoRuleta.volume -= 0.05;
            } else {
              clearInterval(fadeInterval);
              sonidoRuleta.pause();
              sonidoRuleta.currentTime = 0;
              sonidoRuleta.volume = 1;
            }
          }, 100); // Intervalo para reducir gradualmente la opacidad del sonido
  
          // Realizar las acciones después de la animación (aquí puedes llamar a tus funciones)
          this.girarRuleta();
          this.cambiarVista(this.ambitosSeleccionados[this.ambitosSeleccionados.length - 1]);
        }
      }, 50); // Intervalo de animación (ajustable para suavidad)
    });
  }
  
   
  
 
  crearInterfaz2() {
    // Crear el mensaje dinámicamente y agregarlo al DOM
    this.pEnter = document.createElement('p');
    this.base.appendChild(this.pEnter);
    this.pEnter.textContent = 'Ya se han proporcionado todas las preguntas. Pulsa F5 y mira los otros apartados. (Esta parte está en desarrollo ya que aquí irán las preguntas)';
    this.pEnter.className = 'volverAlJuego';
  }
  
  girarRuleta() {
    if (this.preguntasMostradas < 5) {
      let idAmbitoAleatorio;
      do {
        idAmbitoAleatorio = Math.floor(Math.random() * 5) + 1;
      } while (this.ambitosSeleccionados.includes(idAmbitoAleatorio)); // Verificar si el ámbito ya ha sido seleccionado
  
      this.ambitosSeleccionados.push(idAmbitoAleatorio); // Agregar el ámbito seleccionado al arreglo
      this.preguntasMostradas++;
      const urlAbsoluta = 'http://localhost/carlos/citykids/src/js/preguntas.php'; // URL absoluta a preguntas.php
  
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
            const preguntas = JSON.parse(xhttp.responseText);
            this.mostrarPreguntas(idAmbitoAleatorio, preguntas); //enviarle los datos a script
          } else {
            console.error('Error al obtener las preguntas:', xhttp.statusText);
          }
        }
      };
  
      xhttp.open('GET', `${urlAbsoluta}?id_ambito=${idAmbitoAleatorio}`, true);
      xhttp.send();
    } else {
      console.log('FIN');
      this.crearInterfaz2(); // Llamar a la función para mostrar el mensaje
    }
  }

  mostrarPreguntas(idAmbitoAleatorio, preguntas) {
    this.controlador.mostrarPreguntas(idAmbitoAleatorio, preguntas)
  }

  cambiarVista (idAmbitoAleatorio) {
        switch (idAmbitoAleatorio) {
          case 1:
            console.log('Participacion democractica')
            this.controlador.verVista(Vista.vPartDemo)
            console.log('ESTOY EN LA VISTA PD')
            break
          case 2:
            console.log('Justicia Social')
            this.controlador.verVista(Vista.vJustSocial)
            console.log('ESTOY EN LA VISTA PD')
            break
          case 3:
            console.log('Desarrollo Humano y Sostenible')
            this.controlador.verVista(Vista.vDesHumano)
            console.log('ESTOY EN LA VISTA DH')
            break
          case 4:
            console.log('Interculturalidad e inclusión')
            this.controlador.verVista(Vista.vInterculturalidad)
            console.log('ESTOY EN LA VISTA IE')
            break
          case 5:
            console.log('Equidad de género y coeducación')
            this.controlador.verVista(Vista.vEquidadGenero)
            console.log('ESTOY EN LA VISTA EG')
            break
          default:
            console.log('Número no válido')
        }
      } 
    }