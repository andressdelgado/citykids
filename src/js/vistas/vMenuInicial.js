import { Vista } from './vista.js'

export class MenuInicial extends Vista {

  constructor (controlador, base) {
    super(controlador, base)

    // Coger referencias del interfaz
    this.config = this.base.querySelectorAll('button')[0]
    this.iniciarPartida = this.base.querySelectorAll('button')[1]
    this.menuCompeticion = this.base.querySelectorAll('button')[2]
    this.verRanking = this.base.querySelectorAll('button')[3]

    // Asociar eventos
    this.iniciarPartida.onclick = this.pulsarIniciarPartida.bind(this)
    this.iniciarPartida.onmouseover = (event) => { this.mensajeCursor(event) }
    this.iniciarPartida.onmouseout = () => { this.eliminarMensaje() }
    this.config.onclick = this.pulsarConfig.bind(this)
    this.menuCompeticion.onclick = this.pulsarMenuCompeticion.bind(this)
    this.verRanking.onclick = this.pulsarVerRanking.bind(this)
  }

  mensajeCursor (event) {
    event.preventDefault()
    this.pDialogo = document.createElement('p')
    this.base.appendChild(this.pDialogo)
    this.pDialogo.textContent = 'Al pulsar este boton, se iniciará la partida'
    this.pDialogo.className = 'volverAlJuego'
  }

  eliminarMensaje () {
    if (this.pDialogo) {
      this.base.removeChild(this.pDialogo)
      this.pDialogo = null
    }
  }

  pulsarConfig(){
    this.controlador.verVista(Vista.vConfig)
  }

  pulsarIniciarPartida () {
    this.controlador.verVista(Vista.vRuleta)
  }

  pulsarMenuCompeticion () {
    this.controlador.verVista(Vista.vMenuCompeticion)
  }

  pulsarVerRanking () {
    this.controlador.verVista(Vista.vMenuRanking)
  }
}
