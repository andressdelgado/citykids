<div class="contenedor">
    <form action="index.php?c=cPreguntasRespuestas&m=procesarFormulario" method="post">

        <label for="texto_pregunta">Texto de la Pregunta:</label>
        <textarea id="texto_pregunta" name="texto_pregunta"><?=$datos['pregunta'] ?></textarea><br>
        
        <label for="ambito">Ámbito:</label>
        <select id="ambito" name="ambito">
            <!-- Opciones de ámbito -->
            <option value="1" <?= ($datos['id_ambito'] == 1) ? 'selected' : '' ?>>1: Participación Democrática.</option>
            <option value="2" <?= ($datos['id_ambito'] == 2) ? 'selected' : '' ?>>2: Justicia Social</option>
            <option value="3" <?= ($datos['id_ambito'] == 3) ? 'selected' : '' ?>>3: Desarrollo Humano y Sostenible</option>
            <option value="4" <?= ($datos['id_ambito'] == 4) ? 'selected' : '' ?>>4: Interculturalidad e Inclusión</option>
            <option value="5" <?= ($datos['id_ambito'] == 5) ? 'selected' : '' ?>>5: Equidad de género y Coeducación</option>
        </select><br>

        <label for="texto_respuesta_correcta">Texto de la Respuesta Correcta:</label>
        <input type="text" id="texto_respuesta_correcta" name="texto_respuesta_correcta" value="<?= isset($datos['respuestas'][0]['texto_respuesta']) ? $datos['respuestas'][0]['texto_respuesta'] : '' ?>"><br>

        <?php
            for ($i = 1; $i < count($datos['respuestas']); $i++) {
                echo '<label for="texto_respuesta_incorrecta' . $i . '">Texto de la Respuesta Incorrecta ' . $i . ':</label>';
                echo '<input type="text" id="texto_respuesta_incorrecta' . $i . '" value="' . $datos['respuestas'][$i]['texto_respuesta'] . '">';
            }
        ?>

        <div class="input-group">
            <input  type="button" value="+" onclick="agregarRespuestaIncorrecta()">
            <input type="button" id="botonMovible" value="-"  onmouseover="moverBoton()" onclick="eliminarRespuestaIncorrecta()">
        </div>

        <input type="submit" value="Guardar Pregunta">
        <?php
            if (!empty($mensajeError)) {
                echo '<div class="error-message">¡' . $mensajeError . '!</div>';
            }
        ?>
    </form>

    <a href="index.php" id="volverAlMenu">Volver al menú</a>

    <!-- ... Script de JavaScript ... -->

    <script>
        let contadorRespuestasIncorrectas = <?= count($respuestas_incorrectas) + 1 ?>;

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