import { Vista } from './vista.js'

export class FormularioFinal extends Vista {

  constructor (controlador, base) {
    super(controlador, base)

  }
  crearInterfaz () {

    this.btnVolverJuego = document.createElement('button')
    this.base.appendChild(this.btnVolverJuego)
    this.btnVolverJuego.textContent = 'VOLVER AL MENÚ'
    this.btnVolverJuego.className = 'volverAlJuego'

    this.btnVolverJuego.onclick = () => {
      this.controlador.verVista(Vista.vMenuInicial)
    }
  }
}
