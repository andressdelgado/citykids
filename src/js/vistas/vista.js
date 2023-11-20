export class Vista {
  static {
    Vista.vMenuInicial = Symbol('Inicio')
    Vista.vRuleta = Symbol('Ruleta')
    Vista.vMenuCompeticion = Symbol('Menu Competicion')
    Vista.vCrearCompeticion = Symbol('Crear Competicion')
    Vista.vUnirCompeticion = Symbol('Unirse Competicion')
    Vista.vMenuRanking = Symbol('Menu Ranking')
    Vista.vRanking = Symbol('Ranking Global')
    Vista.vRankingCompeticion = Symbol('Ranking Competiciones')
    Vista.vPartDemo = Symbol('Participación Democrática')
    Vista.vJustSocial = Symbol('Justicia Social')
    Vista.vDesHumano = Symbol('Desarrollo Humano y Sostenible')
    Vista.vInterculturalidad = Symbol('Interculturalidad e Inclusión')
    Vista.vEquidadGenero = Symbol('Equidad de género y Coeducación')
  }

  constructor (controlador, base) {
    this.controlador = controlador
    this.base = base
  }

  mostrar (ver) {
    if (ver)
      this.base.style.display = 'block'
    else 
      this.base.style.display = 'none'
  }
}
