<div class="contenedor">
    <form action="index.php?c=cTematicas&m=modificarTematicas2" method="post">

        <input type="hidden" name="id_tematica" value="<?php echo $datos[0]["id_tematica"]; ?>">

        <label for="nombre_tematica">Texto de la Pregunta:</label>
        <textarea id="nombre_tematica" name="nombre_tematica"><?php echo $datos[0]['nombre_tematica']; ?></textarea><br>
        
        <table>
            <tr>
                <th>Ámbito</th>
                <th>Nombre del Personaje</th>
                <th>Descripción (Opcional)</th>
                <th>Imagen</th>
            </tr>
            <?php for ($i = 0; $i < 5; $i++) { ?>
                <tr>
                    <td>
                        <input type="hidden" id="ambito_<?php echo $i; ?>" name="ambito_<?php echo $i; ?>" value="<?php echo intval($datos["personajes"][$i]["id_ambito"]); ?>">
                        <?php echo $datos["personajes"][$i]["nombre_ambito"]; ?>
                    </td>
                    <td>
                        <input type="text" id="nombre_personaje_<?php echo $i; ?>" name="nombre_personaje_<?php echo $i; ?>" value="<?php echo $datos['personajes'][$i]['nombre_personaje']; ?>">
                    </td>
                    <td>
                        <textarea id="descripcion_<?php echo $i; ?>" name="descripcion_<?php echo $i; ?>"><?php echo $datos['personajes'][$i]['descripcion'];?></textarea>
                    </td>
                    <td>
                        <input type="file" id="imagen_<?php echo $i; ?>" name="imagen_<?php echo $i; ?>">
                    </td>
                </tr>
            <?php } ?>
            <tr>
                <td colspan="4"><input type="submit" value="Guardar Temática"></td>
            </tr>
        </table>

        <?php
            if (!empty($mensajeError)) {
                echo '<div class="error-message">¡' . $mensajeError . '!</div>';
            }
        ?>

    </form>
    
</div>
