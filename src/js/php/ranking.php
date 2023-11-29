<?php
    $servidor = '2daw.esvirgua.com';
    $usuario =  'user2daw_01';
    $contrasenia = 'JcuHIKzWAUld';
    $bbdd = 'user2daw_BD1-01';

    $conn = new mysqli($servidor, $usuario, $contrasenia, $bbdd);

    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }

    $sql = "SELECT nombre, puntuacion, fecha_hora FROM Puntuacion_general ORDER BY puntuacion DESC";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $ranking = array();

        while ($fila = $result->fetch_assoc()) {
            $ranking[] = array(
                'nombre' => $fila['nombre'],
                'puntuacion' => $fila['puntuacion'],
                'fecha_hora' => $fila['fecha_hora']
            );
        }

        header('Content-Type: application/json');
        echo json_encode($ranking);
    } else {
        echo json_encode(array('message' => 'No se encontraron datos en el ranking.'));
    }

    $conn->close();
?>
