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

  crearBoton() {
    // Se crea el botón dinámicamente y se agrega al DOM
    this.button = document.createElement('button');
    this.base.appendChild(this.button);
    this.button.textContent = 'GIRA LA RULETA';
    this.button.className = 'volverAlJuego';
    // Agregar evento de clic al botón
    this.button.addEventListener('click', () => {
      this.girarRuleta();
      this.cambiarVista(this.ambitosSeleccionados[this.ambitosSeleccionados.length - 1]);
    });
  }
  
  mostrarPreguntas(idAmbitoAleatorio, preguntas) {
    this.controlador.mostrarPreguntas(idAmbitoAleatorio, preguntas)
    
  }



crearInterfaz2() {
  // Crear el mensaje dinámicamente y agregarlo al DOM
  this.pEnter = document.createElement('p');
  this.base.appendChild(this.pEnter);
  this.pEnter.textContent = 'Ya se han proporcionado todas las preguntas. Pulsa F5 y mira los otros apartados. (Esta parte está en desarrollo ya que aquí irán las preguntas)';
  this.pEnter.className = 'volverAlJuego';
}

preguntasMostradas = 0; //Para controlar el numero de pregunta que sale 
ambitosSeleccionados = []; //Para controlar que los ambitos no salen repetidos

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
          this.mostrarPreguntas(idAmbitoAleatorio, preguntas);
        } else {
          console.error('Error al obtener las preguntas:', xhttp.statusText);
        }
      }
    };

    xhttp.open('GET', `${urlAbsoluta}?id_ambito=${idAmbitoAleatorio}`, true);
    xhttp.send();
  } else {
    console.log('FIIIINNNN');
    this.crearInterfaz2(); // Llamar a la función para mostrar el mensaje
  }
}
cambiarVista (idAmbitoAleatorio) {
      switch (idAmbitoAleatorio) {
        case 1:
          console.log('Participacion democractica')
          this.controlador.verVista(Vista.vPartDemo)
          break
        case 2:
          console.log('Justicia Social')
          this.controlador.verVista(Vista.vJustSocial)
          break
        case 3:
          console.log('Desarrollo Humano y Sostenible')
          this.controlador.verVista(Vista.vDesHumano)
          break
        case 4:
          console.log('Interculturalidad e inclusión')
          this.controlador.verVista(Vista.vInterculturalidad)
          break
        case 5:
          console.log('Equidad de género y coeducación')
          this.controlador.verVista(Vista.vEquidadGenero)
          break
        default:
          console.log('Número no válido')
      }
    } 
}  