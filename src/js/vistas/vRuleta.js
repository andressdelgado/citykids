import { Vista } from './vista.js'
import { GeneradorNumeros } from '../class/generadornumeros.js'

export class Ruleta extends Vista {

  constructor (controlador, base) {
    super(controlador, base)

    this.divMenuCompeticion = document.getElementById('divMenuCompeticion')

    this.divMenuCompeticion.setAttribute('tabindex', '0')

    this.divMenuCompeticion.focus()

    this.generadorNumeros = new GeneradorNumeros()

    this.divMenuCompeticion.addEventListener('keydown', this.cambiarVista.bind(this))

    this.crearInterfaz()
  }

  crearInterfaz () {
    // Se crea el mensaje dinámicamente y se agrega al DOM
    this.pEnter = document.createElement('p')
    this.base.appendChild(this.pEnter)
    this.pEnter.textContent = 'CLICA EN LA PANTALLA Y LUEGO PULSA ENTER PARA GIRAR LA RULETA'
    this.pEnter.className = 'volverAlJuego'
  }

  crearInterfaz2 () {
    // Se crea el mensaje dinámicamente y se agrega al DOM
    this.pEnter = document.createElement('p')
    this.base.appendChild(this.pEnter)
    this.pEnter.textContent = 'Ya se han proporcionado todos los ámbitos. Pulsa F5 y mira los otros apartados. (Esta parte está en desarrollo ya que aquí irán las preguntas)'
    this.pEnter.className = 'volverAlJuego'
  }

  cambiarVista (event) {
    if (event.key === 'Enter') {
      const numero = this.generadorNumeros.obtenerNumeroAleatorio()
      if (numero === 0) {
        console.log('Ya se proporcionaron todos los números.')
        this.crearInterfaz2()
      } else {
        console.log('Número obtenido:', numero)
        switch (numero) {
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
  }
}
