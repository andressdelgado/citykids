import { Vista } from './vista.js'

export class MenuRanking extends Vista {

  constructor (controlador, base) {
    super(controlador, base)

    this.rankingGlobal = this.base.querySelectorAll('button')[0]
    this.rankingCompeticion = this.base.querySelectorAll('button')[1]

    this.rankingGlobal.onclick = this.pulsarRankingGlobal.bind(this)
    this.rankingCompeticion.onclick = this.pulsarRankingCompeticion.bind(this)

    this.crearInterfaz()
  }

  crearInterfaz () {
    this.btnVerVista1 = document.createElement('button')
    this.base.appendChild(this.btnVerVista1)
    this.btnVerVista1.textContent = 'VOLVER AL MENÚ'
    this.btnVerVista1.className = 'volverAlJuego'
    this.btnVerVista1.onclick = () => {
      this.controlador.verVista(Vista.vMenuInicial)
    }
  }

  pulsarRankingGlobal () {
    this.controlador.verVista(Vista.vrankingglobal)
  }

  pulsarRankingCompeticion() {
    this.controlador.verVista(Vista.vrankingcompeticion)
  }
}
