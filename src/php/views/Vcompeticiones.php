<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>COMPETICIONES</title>
</head>
<body>
    <H1>COMPETICIONES</H1>
    <table border="1">
        <tr>
            <th>Clave</th>
            <th>Titulo</th>
            <th>Descripcion</th>
            <th>Fecha</th>
        </tr>
        <?php foreach ($datos as $dato): ?> <!-- Itera sobre los datos devueltos -->
            <tr>
                <td><?php echo $dato['clave']; ?></td> <!-- Usa echo para mostrar datos -->
                <td><?php echo $dato['titulo']; ?></td>
                <td><?php echo $dato['descripcion']; ?></td>
                <td><?php echo $dato['fecha_hora_fin']; ?></td>
            </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>
