<div class="tematicas">
    <form action="index.php?c=cTematicas&m=altaTematicas" method="post">
        <label for="nombre_tematica">Nombre de la temática:</label>
        <input type="text" id="nombre_tematica" name="nombre_tematica">
        <table>
            <tr>
                <th>Ámbito</th>
                <th>Nombre del Personaje</th>
                <th>Descripción (Opcional)</th>
                <th>Imagen</th>
            </tr>
            <tr>
                <td><input type="hidden" id="id_ambito" name="id_ambito" value="1">Participación Democrática</td>
                <td><input type="text" id="nombre_personaje_0" name="nombre_personaje_0"></td>
                <td><textarea id="descripcion_0" name="descripcion_0"></textarea></td>
                <td><input type="file" id="imagen_0" name="imagen_0"></td>
            </tr>
            <tr>
                <td><input type="hidden" id="id_ambito" name="id_ambito" value="2">Justicia Social</td>
                <td><input type="text" id="nombre_personaje_1" name="nombre_personaje_1"></td>
                <td><textarea id="descripcion_1" name="descripcion_1"></textarea></td>
                <td><input type="file" id="imagen_1" name="imagen_1"></td>
            </tr>
            <tr>
                <td><input type="hidden" id="id_ambito" name="id_ambito" value="3">Desarrollo Humano y Sostenible</td>
                <td><input type="text" id="nombre_personaje_2" name="nombre_personaje_2"></td>
                <td><textarea id="descripcion_2" name="descripcion_2"></textarea></td>
                <td><input type="file" id="imagen_2" name="imagen_2"></td>
            </tr>
            <tr>
                <td><input type="hidden" id="id_ambito" name="id_ambito" value="4">Interculturalidad e Inclusion</td>
                <td><input type="text" id="nombre_personaje_3" name="nombre_personaje_3"></td>
                <td><textarea id="descripcion_3" name="descripcion_3"></textarea></td>
                <td><input type="file" id="imagen_3" name="imagen_3"></td>
            </tr>
            <tr>
                <td><input type="hidden" id="id_ambito" name="id_ambito" value="5">Equidad de genero y Coeducacion</td>
                <td><input type="text" id="nombre_personaje_4" name="nombre_personaje_4"></td>
                <td><textarea id="descripcion_4" name="descripcion_4"></textarea></td>
                <td><input type="file" id="imagen_4" name="imagen_4"></td>
            </tr>
            <tr>
                <td colspan="4"><input type="submit" value="Guardar Temática"></td>
            </tr>
        </table>
    </form>

        <a href="../../src/php/" id="volverAlMenu">Volver al menu</a>

</div>
