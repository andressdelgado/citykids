import { Vista } from './vista.js'

export class Configuracion extends Vista {

  constructor (controlador, base) {
    super(controlador, base)
    this.volverMenu = this.base.querySelectorAll('button')[0]

    this.volverMenu.onclick = this.pulsarVolverMenu.bind(this)
  }
  pulsarVolverMenu () {
    this.controlador.verVista(Vista.vMenuInicial)
  }
}
