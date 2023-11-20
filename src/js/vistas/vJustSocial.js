import { Vista } from './vista.js'

export class JustSocial extends Vista {

  constructor (controlador, base) {
    super(controlador, base)

    this.enlace1 = this.base.querySelectorAll('button')[0]

    this.enlace1.onclick = this.pulsarEnlace1.bind(this)
  }

  pulsarEnlace1 () {
    this.controlador.verVista(Vista.vRuleta)
  }
}
