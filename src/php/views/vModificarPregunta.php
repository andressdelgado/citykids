<div class="contenedor">
    <form action="index.php?c=cPreguntasRespuestas&m=procesarFormularioModificar" method="post">

        <input type="hidden" name="id_pregunta" value="<?= $datos['id_pregunta'] ?>">

        <label for="texto_pregunta">Texto de la Pregunta:</label>
        <textarea id="texto_pregunta" name="texto_pregunta"><?=$datos['pregunta'] ?></textarea><br>
        
        <label for="ambito">Ámbito:</label>
        <select id="ambito" name="ambito">
            <option value="1">1: Participación Democrática.</option>
            <option value="2">2: Justicia Social</option>
            <option value="3">3: Desarrollo Humano y Sostenible</option>
            <option value="4">4: Interculturalidad e Inclusion</option>
            <option value="5">5: Equidad de genero y Coeducacion</option>
        </select><br>

        <label for="texto_respuesta_correcta">Texto de la Respuesta Correcta:</label>
        <input type="text" id="texto_respuesta_correcta" name="texto_respuesta_correcta" value="<?= isset($datos['respuestas'][0]['texto_respuesta']) ? $datos['respuestas'][0]['texto_respuesta'] : '' ?>"><br>

        <label for="texto_respuesta_incorrecta2">Texto de la Respuesta Incorrecta 2:</label>
        <input type="text" id="texto_respuesta_incorrecta1" name="texto_respuesta_incorrecta1" value="<?= isset($datos['respuestas'][1]['texto_respuesta']) ? $datos['respuestas'][1]['texto_respuesta'] : '' ?>"><br>

        <label for="texto_respuesta_incorrecta2">Texto de la Respuesta Incorrecta 2:</label>
        <input type="text" id="texto_respuesta_incorrecta2" name="texto_respuesta_incorrecta2" value="<?= isset($datos['respuestas'][2]['texto_respuesta']) ? $datos['respuestas'][2]['texto_respuesta'] : '' ?>"><br>

        <div id="respuestas_incorrectas_container">
            <?php
                for ($i = 3; $i < count($datos['respuestas']); $i++) {
                    echo '<label for="texto_respuesta_incorrecta' . $i . '">Texto de la Respuesta Incorrecta ' . $i . ':</label>';
                    echo '<input type="text" id="texto_respuesta_incorrecta' . $i . '" value="' . $datos['respuestas'][$i]['texto_respuesta'] . '">';
                }
            ?>
        </div>

        <div class="input-group">
            <input  type="button" value="+" onclick="agregarRespuestaIncorrecta()">
            <input type="button" value="-" onclick="eliminarRespuestaIncorrecta()">
        </div>

        <input type="submit" value="Guardar Pregunta">

        <?php
            if (!empty($mensajeError)) {
                echo '<div class="error-message">¡' . $mensajeError . '!</div>';
            }
        ?>
    </form>

    <a href="../../src/php/index.php?c=cPreguntasRespuestas&m=listarPreguntas" id="volverAlMenu">Volver al menú</a>

    <script>
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
            if (contadorRespuestasIncorrectas > 2) {
                contadorRespuestasIncorrectas--;
                const container = document.getElementById('respuestas_incorrectas_container');
                container.removeChild(container.lastChild); // <br>
                container.removeChild(container.lastChild); // input
                container.removeChild(container.lastChild); // label
            }
        }


    </script>

</div>

