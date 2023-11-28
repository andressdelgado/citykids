import { Vista } from './vista.js'

export class RankingGlobal extends Vista {

  constructor (controlador, base) {
    super(controlador, base)

    this.volverAlJuego = this.base.querySelectorAll('button')[0]

    this.volverAlJuego.onclick = this.pulsarvolverAlJuego.bind(this)
  }

  pulsarvolverAlJuego () {
    this.controlador.verVista(Vista.vMenuInicial)
  }
}
