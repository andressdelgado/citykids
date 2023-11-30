import { Vista } from './vista.js'

export class CrearCompeticion extends Vista {

  constructor (controlador, base) {
    super(controlador, base)

    this.enlace2 = this.base.querySelectorAll('button')[1]
    this.formulario = this.base.querySelectorAll('form')[0]

    this.enlace2.onclick = this.pulsarEnlace2.bind(this)
    this.formulario.addEventListener('submit', (event) => this.validarFormulario(event))
  }

  pulsarEnlace2 () {
    this.controlador.verVista(Vista.vmenuinicial)
  }

  validarFormulario (event) {
    event.preventDefault()

    this.controlador.validarFormulario()
  }
}
