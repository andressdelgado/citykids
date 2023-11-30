import { Vista } from './vista.js'

export class RankingGlobal extends Vista {

  constructor (controlador, base) {
    super(controlador, base)

    this.volverAlJuego = this.base.querySelectorAll('button')[0]

    this.volverAlJuego.onclick = this.pulsarvolverAlJuego.bind(this)
  }

  mostrarRankingGlobal(data) {
    const rankingTable = document.getElementById('rankingTable');
    const tbody = rankingTable.querySelector('tbody');
    tbody.innerHTML = ''; 

    data.forEach(jugador => {
      const row = document.createElement('tr');
      const nombreCell = document.createElement('td');
      const puntuacionCell = document.createElement('td');
      const fechaCell = document.createElement('td');

      nombreCell.textContent = jugador.nombre;
      puntuacionCell.textContent = jugador.puntuacion;
      fechaCell.textContent = jugador.fecha_hora;

      row.appendChild(nombreCell);
      row.appendChild(puntuacionCell);
      row.appendChild(fechaCell);

      tbody.appendChild(row);
    });
  }

  pulsarvolverAlJuego () {
    this.controlador.verVista(Vista.vmenuinicial)
  }
}
