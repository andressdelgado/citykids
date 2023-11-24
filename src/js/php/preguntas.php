<?php
// $servidor = '2daw.esvirgua.com';
// $usuario =  'user2daw_01';
// $contrasenia = 'JcuHIKzWAUld';
// $bbdd = 'user2daw_BD1-01';

$servidor = 'localhost';
$usuario =  'root';
$contrasenia = '';
$bbdd = 'cityKids';

$conn = new mysqli($servidor, $usuario, $contrasenia, $bbdd);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

if (isset($_GET['id_ambito'])) {
    $id_ambito = $_GET['id_ambito'];

    $sql = "SELECT p.id_pregunta, p.pregunta, r.num_respuesta, r.texto_respuesta
            FROM Pregunta p
            INNER JOIN Respuesta r ON p.id_pregunta = r.id_pregunta
            WHERE p.id_ambito = $id_ambito
            ORDER BY p.id_pregunta, r.num_respuesta";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $preguntas = array();
        $pregunta_actual = array();

        while ($fila = $result->fetch_assoc()) {
            if (!isset($pregunta_actual['id_pregunta']) || $pregunta_actual['id_pregunta'] !== $fila['id_pregunta']) {
                if (!empty($pregunta_actual)) {
                    $preguntas[] = $pregunta_actual;
                }
                $pregunta_actual = array(
                    'id_pregunta' => $fila['id_pregunta'],
                    'pregunta' => $fila['pregunta'],
                    'respuestas' => array()
                );
            }

            $pregunta_actual['respuestas'][] = array(
                'num_respuesta' => $fila['num_respuesta'],
                'texto_respuesta' => $fila['texto_respuesta']
            );
        }

        $preguntas[] = $pregunta_actual;
        header('Content-Type: application/json');
        echo json_encode($preguntas);
    } else {
        echo json_encode(array('message' => 'No se encontraron preguntas para este ámbito.'));
    }
} else {
    echo json_encode(array('message' => 'ID de ámbito no especificado.'));
}

$conn->close();
?>
