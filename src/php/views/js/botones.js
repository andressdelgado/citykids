let contadorRespuestasIncorrectas = 3; // Inicializado en 2 porque ya hay una respuesta incorrecta

    function agregarRespuestaIncorrecta() {
        const container = document.getElementById('respuestas_incorrectas_container');
        const label = document.createElement('label');
        label.setAttribute('for', 'texto_respuesta_incorrecta' + contadorRespuestasIncorrectas);
        label.textContent = 'Texto de la Respuesta Incorrecta ' + contadorRespuestasIncorrectas + ':';
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'texto_respuesta_incorrecta' + contadorRespuestasIncorrectas);
        input.setAttribute('name', 'texto_respuesta_incorrecta' + contadorRespuestasIncorrectas);
        container.appendChild(label);
        container.appendChild(input);
        container.appendChild(document.createElement('br'));
        contadorRespuestasIncorrectas++;
    }

    function eliminarRespuestaIncorrecta() {
        if (contadorRespuestasIncorrectas > 3) {
            contadorRespuestasIncorrectas--;
            const container = document.getElementById('respuestas_incorrectas_container');
            container.removeChild(container.lastChild); // <br>
            container.removeChild(container.lastChild); // input
            container.removeChild(container.lastChild); // label
        } else {
            console.log("No puedo bajar de 3")
        }
    }