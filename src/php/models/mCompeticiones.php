<?php
class mCompeticiones {
    private $conexion;

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
    
    function mListarCompeticiones() {
        $sql = "SELECT * FROM Competicion";
        $resultado = $this->conexion->query($sql);
        $datos = [];

        while ($fila = $resultado->fetch_assoc()) {
            $datos[] = $fila;
        }
        return $datos;
    }

    function mCrearCompeticion($clave, $titulo, $descripcion, $fechaFin) {
        try {
            if ($descripcion === '') {
                $sql = "INSERT INTO Competicion (clave, descripcion, titulo, fecha_hora_fin) VALUES ('$clave', NULL, '$titulo', '$fechaFin')";
            }else{
                $sql = "INSERT INTO Competicion (clave, descripcion, titulo, fecha_hora_fin) VALUES ('$clave', '$descripcion', '$titulo', '$fechaFin')";
            }
            
            

            if ($this->conexion->query($sql) === TRUE) {
                $mensaje = "La competición se ha creado correctamente.";
            } else {
                // Si hay un error en la consulta, lanzar una excepción con el mensaje de error
                throw new Exception($this->conexion->error, $this->conexion->errno);
            }
        
            // Retornar el mensaje que indica el resultado de la inserción
            return $mensaje;
        } catch (Exception $error) {
            // Capturar la excepción y obtener el número de error
            $numeroError = $error->getCode();
            // Aquí puedes hacer lo que necesites con el número de error
            return $numeroError;
        }
    }

    function mBorrarCompeticion($clave){
        $sql = "DELETE FROM Competicion WHERE clave = '$clave'";
        $this->conexion->query($sql);

        header("Location: index.php");
        exit();
    }
}
?>
