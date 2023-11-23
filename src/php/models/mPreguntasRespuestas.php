<?php

class MPreguntasRespuestas{

    /** @var mysqli La conexión a la base de datos. */
    private $conexion;

    /**
     * Constructor. Establece la conexión a la base de datos y verifica la conexión UTF-8.
     */

    function __construct() {
        require_once __DIR__ . '/../config/configdb.php';
        $this->conexion = new mysqli(SERVIDOR, USUARIO, CONTRASENIA, BBDD);
        if ($this->conexion->connect_error) {
            die("Error de conexión: " . $this->conexion->connect_error);
        }
    
        // Establecer la codificación a UTF-8
        if (!$this->conexion->set_charset("utf8")) {
            printf("Error al establecer la conexión a UTF-8: %s\n", $this->conexion->error);
            exit();
        }
    }

    function mListarPreguntas() {
        $sql = "SELECT Pregunta.*, Ambito.nombre as nombre_ambito, Respuesta.texto_respuesta as texto_respuesta_correcta
            FROM Pregunta
            JOIN Ambito ON Pregunta.id_ambito = Ambito.id_ambito
            LEFT JOIN Respuesta ON Pregunta.id_pregunta = Respuesta.id_pregunta AND Pregunta.num_respuesta_correcta = Respuesta.num_respuesta
            ORDER BY Ambito.id_ambito, Pregunta.id_pregunta";
                            
        $resultado = $this->conexion->query($sql);
        $datos = [];
    
        while ($fila = $resultado->fetch_assoc()) {
            $datos[] = $fila;
        }
        return $datos;
    }
    

    public function mBorrarPregunta($id_pregunta) {
        $sql = "DELETE FROM Pregunta WHERE id_pregunta = '$id_pregunta'";
        echo $sql;
        $this->conexion->query($sql);

        // Redireccionamos de nuevo a donde desees después de eliminar la pregunta
        header("Location: index.php?c=cPreguntasRespuestas&m=listarPreguntas");
        exit();
    }

    /*FORMULARIO*/ 

    public function crearPreguntaYRespuestas($pregunta, $ambito, $respuestas) {
        // si $variable está vacía, se asigna el valor "NULL". De lo contrario, se escapa la cadena para prevenir inyecciones sql y se envuelve entre comillas simples.
        $pregunta = ($pregunta === '') ? "NULL" : "'" . $this->conexion->real_escape_string($pregunta) . "'";
        $ambito = ($ambito === '') ? "NULL" : $this->conexion->real_escape_string($ambito);
    
        $this->conexion->begin_transaction();
    
        try {
            // Insertar la pregunta
            $sql_insertar_pregunta = "INSERT INTO Pregunta (pregunta, id_ambito) VALUES ($pregunta, $ambito)";
            $this->conexion->query($sql_insertar_pregunta);
    
            $id_pregunta = $this->conexion->insert_id;
    
            // Insertar las respuestas
            foreach ($respuestas as $num_respuesta => $texto_respuesta) {
                $texto_respuesta = ($texto_respuesta === '') ? "NULL" : "'" . $this->conexion->real_escape_string($texto_respuesta) . "'";
                $sql_insertar_respuesta = "INSERT INTO Respuesta (id_pregunta, num_respuesta, texto_respuesta) VALUES ($id_pregunta, $num_respuesta, $texto_respuesta)";
                $this->conexion->query($sql_insertar_respuesta);
    
                // Actualizar la respuesta correcta en la pregunta
                if ($num_respuesta == 1) {
                    $sql_actualizar_respuesta_correcta = "UPDATE Pregunta SET num_respuesta_correcta = $num_respuesta WHERE id_pregunta = $id_pregunta";
                    $this->conexion->query($sql_actualizar_respuesta_correcta);
                }
            }
    
            $this->conexion->commit();
            return $id_pregunta;
        } catch (Exception $e) {
            $this->conexion->rollback();
            throw $e;
        }
    }
    

    /*modificacion */

    public function obtenerPreguntaYRespuestas($id_pregunta)
    {
        $id_pregunta = $this->conexion->real_escape_string($id_pregunta);

        // obtengo los datos de la pregunta
        $sql_pregunta = "SELECT * FROM Pregunta WHERE id_pregunta = '$id_pregunta'";
        $resultado_pregunta = $this->conexion->query($sql_pregunta);

        // obtengo las respuestas asociadas a la pregunta
        $sql_respuestas = "SELECT * FROM Respuesta WHERE id_pregunta = '$id_pregunta'";
        $resultado_respuestas = $this->conexion->query($sql_respuestas);

        // verifico si se encontraron datos
        if ($resultado_pregunta && $resultado_respuestas) {
            $datos_pregunta = $resultado_pregunta->fetch_assoc();

            // si hay respuestas, agrego al array de datos
            if ($resultado_respuestas->num_rows > 0) {
                $datos_respuestas = [];
                while ($fila_respuesta = $resultado_respuestas->fetch_assoc()) {
                    $datos_respuestas[] = $fila_respuesta;
                }

                // agrego respuestas al array de datos de la pregunta
                $datos_pregunta['respuestas'] = $datos_respuestas;
            }

            return $datos_pregunta;
        } else {
            throw new Exception("Error al obtener datos de la pregunta y respuestas: " . $this->conexion->error);
        }
    }
    

}
?>