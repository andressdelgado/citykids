<?php
// Configuración de la base de datos
$servidor = '2daw.esvirgua.com'; // Cambiado a la dirección del servidor de la base de datos
$usuario =  'user2daw_01'; // Usuario de la base de datos
$contrasenia = 'JcuHIKzWAUld'; // Contraseña del usuario de la base de datos
$bbdd = 'user2daw_BD1-01'; // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servidor, $usuario, $contrasenia, $bbdd);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consulta para obtener las preguntas con sus respuestas
if (isset($_GET['id_ambito'])) {
    $id_ambito = $_GET['id_ambito'];

    // Consulta para obtener las preguntas y respuestas del ámbito especificado
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
            // Nueva pregunta, almacenar la anterior y preparar la siguiente
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

            // Almacenar las respuestas
            $pregunta_actual['respuestas'][] = array(
                'num_respuesta' => $fila['num_respuesta'],
                'texto_respuesta' => $fila['texto_respuesta']
            );
        }

        // Agregar la última pregunta al array
        $preguntas[] = $pregunta_actual;

        // Devolver las preguntas como respuesta en formato JSON
        header('Content-Type: application/json');
        echo json_encode($preguntas);
    } else {
        echo "0 resultados";
    }
} else {
    echo "ID de ámbito no especificado";
}

$conn->close();
?>