<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/estiloAdmin.css">
    <title>Administración</title>
</head>
<body>
    <div id="contenedorTabla">
        <table>
            <thead>
                 <tr>
                    <th>Titulo</th>
                    <th>Clave</th>
                    <th>Descripción</th>
                    <th>Fecha/Hora Fin</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($datos as $fila) { ?>
                    <tr>
                        <td><?= $fila['titulo'] ?></td>
                        <td><?= $fila['clave'] ?></td>
                        <td><?= $fila['descripcion'] ?></td>
                        <td><?= $fila['fecha_hora_fin'] ?></td>
                        <td><a href="index.php?c=cCompeticiones&m=borrarCompeticiones&clave=<?php echo $fila['clave']; ?>"><img src="../img/delete.png"></a></td>

                    </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>
    <a href="views/vJuego.html" id="volverAlMenu">Volver al juego</a>
</body>
</html>
