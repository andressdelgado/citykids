import { Vista } from './vista.js'

export class Personajes extends Vista {

  constructor (controlador, base) {
    super(controlador, base)
    this.volverAlJuego = this.base.querySelectorAll('button')[0]
    this.volverAlJuego.onclick = this.pulsarbtnVolver.bind(this)
}

    pulsarbtnVolver () {
    this.controlador.verVista(Vista.vmenuinicial)
    }
}
