<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../src/css/estiloAdmin.css">
    <title>Administración</title>
</head>
<body>
    <div id="contenedorTabla">
        <table>
            <thead>
                <tr>
                    <th>Clave</th>
                    <th>Titulo</th>
                    <th>Descripción</th>
                    <th>Fecha/Hora Fin</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
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
            </tbody>
        </table>
    </div>
    <a href="../../../disenio/administracion/index.html">Volver</a>
</body>
</html>
