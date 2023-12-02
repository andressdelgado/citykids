/**
 * Clase que representa un generador de números aleatorios.
 */
export class GeneradorNumeros {
  /**
     * Inicializa un nuevo generador de números con una lista predefinida.
     */
  constructor () {
    /** @type {number[]} - Lista de números disponibles para ser generados aleatoriamente. */
    this.numerosDisponibles = [1, 2, 3, 4, 5]
  }

  /**
     * Obtiene un número aleatorio de la lista de números disponibles.
     * @returns {number} - Número aleatorio obtenido.
     */
  obtenerNumeroAleatorio () {
    // Verifica si no hay más números disponibles
    if (this.numerosDisponibles.length === 0) {
      return 0 // Si no hay números disponibles, retorna 0 o un valor que indique la falta de números.
    }

    // Genera un índice aleatorio
    const indiceAleatorio = Math.floor(Math.random() * this.numerosDisponibles.length)

    // Obtiene el número aleatorio y lo elimina de la lista de números disponibles
    const numeroAleatorio = this.numerosDisponibles.splice(indiceAleatorio, 1)[0]

    // Retorna el número aleatorio obtenido
    return numeroAleatorio
  }
}
