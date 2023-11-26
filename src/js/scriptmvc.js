import { Modelo } from './modelos/modelo.js'
import { Vista } from './vistas/vista.js'
import { Vista1 } from './vistas/vista1.js'
import { Vista2 } from './vistas/vista2.js'
import { Vista3 } from './vistas/vista3.js'
import { Vista4 } from './vistas/vista4.js'
import { Vista5 } from './vistas/vista5.js'
import { Vista6 } from './vistas/vista6.js'
import { Vista7 } from './vistas/vista7.js'
import { Vista8 } from './vistas/vista8.js'
import { Vista9 } from './vistas/vista9.js'
import { Vista10 } from './vistas/vista10.js'
import { Vista11 } from './vistas/vista11.js'
import { Vista12 } from './vistas/vista12.js'
import { Vista13 } from './vistas/vista13.js'

/**
 * Clase principal que controla la lógica de la aplicación.
 */
class Controlador {
  /**
     * Inicializa los atributos y crea instancias de modelos y vistas.
     */
  vistas = new Map()
  constructor () {
    /** @type {Modelo} - La instancia del modelo de la aplicación. */
    this.modelo = new Modelo()

    // Consigue las referencias del interfaz
    const divVista1 = document.getElementById('divVista1')
    const divVista2 = document.getElementById('divVista2')
    const divVista3 = document.getElementById('divVista3')
    const divVista4 = document.getElementById('divVista4')
    const divVista5 = document.getElementById('divVista5')
    const divVista6 = document.getElementById('divVista6')
    const divVista7 = document.getElementById('divVista7')
    const divVista8 = document.getElementById('divVista8')
    const divVista9 = document.getElementById('divVista9')
    const divVista10 = document.getElementById('divVista10')
    const divVista11 = document.getElementById('divVista11')
    const divVista12 = document.getElementById('divVista12')
    const divVista13 = document.getElementById('divVista13')

    // Crea instancias de vistas y las agrega al mapa de vistas
    this.vistas.set(Vista.VISTA1, new Vista1(this, divVista1))
    this.vistas.set(Vista.VISTA2, new Vista2(this, divVista2))
    this.vistas.set(Vista.VISTA3, new Vista3(this, divVista3))
    this.vistas.set(Vista.VISTA4, new Vista4(this, divVista4))
    this.vistas.set(Vista.VISTA5, new Vista5(this, divVista5))
    this.vistas.set(Vista.VISTA6, new Vista6(this, divVista6))
    this.vistas.set(Vista.VISTA7, new Vista7(this, divVista7))
    this.vistas.set(Vista.VISTA8, new Vista8(this, divVista8))
    this.vistas.set(Vista.VISTA9, new Vista9(this, divVista9))
    this.vistas.set(Vista.VISTA10, new Vista10(this, divVista10))
    this.vistas.set(Vista.VISTA11, new Vista11(this, divVista11))
    this.vistas.set(Vista.VISTA12, new Vista12(this, divVista12))
    this.vistas.set(Vista.VISTA13, new Vista13(this, divVista13))

    // Muestra la primera vista al cargar la página
    this.verVista(Vista.VISTA1)
  }

  /**
     * Validar los campos del formulario.
     * @returns {boolean} - Retorna true si el formulario es válido, de lo contrario, retorna false.
     */
  validarFormulario () {
    // Obtener referencias a los campos del formulario
    const clave = document.getElementById('crearclave').value
    const titulo = document.getElementById('creartitulo').value
    const descripcion = document.getElementById('creardescripcion').value
    const fechaFin = document.getElementById('crearfechaFin').value

    // Expresiones regulares para validación
    const claveRegex = /^[A-Za-z]{3}[A-Za-z0-9]{2,9}$/
    const tituloRegex = /^[A-Za-z ]{5,100}$/
    const descripcionRegex = /^[A-Za-z0-9 ]{0,255}$/ // puede ser nulo
    const fechaRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/ // formato fecha

    // Realizar validaciones
    if (!claveRegex.test(clave)) {
      alert('Clave no válida. Debe empezar al menos por 3 caracteres de letras y como mínimo 5 caracteres generales. No se permiten espacios.')
      return false
    }

    if (!tituloRegex.test(titulo)) {
      alert('Título no válido. Debe contener al menos 5 caracteres de letras y como máximo 100. No se permiten otros caracteres.')
      return false
    }

    if (!descripcionRegex.test(descripcion)) {
      alert('Descripción no válida. No puede contener caracteres especiales. Además, no se pueden superar los 255 caracteres.')
      return false
    }

    if (!fechaRegex.test(fechaFin)) {
      alert('Fecha no válida. Utiliza una fecha.')
      return false
    }

    // SI TODAS LAS COMPROBACIONES ESTAN CORRECTAS
    alert('Formulario válido.')
  }

  /**
     * Muestra la vista deseada.
     * @param {string} vista - El nombre de la vista a mostrar.
     */
  verVista (vista) {
    this.ocultarVistas()
    this.vistas.get(vista).mostrar(true)
  }

  /**
     * Oculta todas las vistas.
     */
  ocultarVistas () {
    for (const vista of this.vistas.values()) {
      vista.mostrar(false)
    }
  }
}

// Inicializa el controlador cuando la página se carga completamente
window.onload = () => {
  // eslint-disable-next-line no-new
  new Controlador()
}
