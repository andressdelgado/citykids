export class GeneradorNumeros {
    constructor() {
        this.numerosDisponibles = [1, 2, 3, 4, 5];
    }

    obtenerNumeroAleatorio() {
        if (this.numerosDisponibles.length === 0) {
            return 0;
        }

        const indiceAleatorio = Math.floor(Math.random() * this.numerosDisponibles.length);
        const numeroAleatorio = this.numerosDisponibles.splice(indiceAleatorio, 1)[0];

        return numeroAleatorio;
    }
}