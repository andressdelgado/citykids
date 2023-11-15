<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style.css">
    <title>LISTAR COMPETICIONES</title>
</head>
<body>
    <table>
        <tr>
            <th>Titulo</th>
            <th>Clave</th>
            <th>Descripcion</th>
            <th>Fecha Fin</th>
            <th>Borrar</th>
        </tr>
        <?php
            foreach ($datos as $fila) {
                echo "<tr>";
                    echo "<td>" . $fila['titulo'] . "</td>";
                    echo "<td>" . $fila['clave'] . "</td>";
                    echo "<td>" . $fila['descripcion'] . "</td>";
                    echo "<td>" . $fila['fecha_hora_fin'] . "</td>";
                    echo "<td><a href='../controllers/Ccompeticion.php?action=borrarCompeticiones&clave=" . $fila['clave'] . "' target='_blank'><img src='../../img/delete.png'></a></td>";

                echo "</tr>";
            }
        ?>
    </table>
    <a href="../../../disenio/administracion/index.html">Volver</a>
</body>
</html>

