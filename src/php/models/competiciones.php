<?php
class Competiciones {
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
    

    function crearCompeticion($clave, $titulo, $descripcion, $fechaFin) {
        //Verificamos si la clave de la competición ya existe en la base de datos
        $consultarClave = "SELECT clave FROM Competicion WHERE clave = '$clave'";
        $resultadoClave = $this->conexion->query($consultarClave);
        
        //Si existe retornaremos un mensaje ( la aplicacion no nos dejara añadir una calve diplicada a la base de datos)
        if($resultadoClave->num_rows > 0) {
            $mensaje = "La clave de la competición ya existe.";
        } else {
            // Si la clave no existe insertamos una nueva competición en la base de datos
            $sql = "INSERT INTO Competicion (clave, descripcion, titulo, fecha_hora_fin) VALUES ('$clave', '$descripcion', '$titulo', '$fechaFin')";
            
            if($this->conexion->query($sql) === TRUE) {
                $mensaje = "La competición se ha creado correctamente.";
            } else {
                $mensaje = "No ha sido posible crear la competición: " . $this->conexion->error;
            }
        }
        // Se retorna el mensaje que indica el resultado de la insercion
        return $mensaje;
    }

    function mListarCompeticiones (){
            $sql = "SELECT * FROM Competicion";
            $resultado = $this->conexion->query($sql);
            $datos = [];

            while ($fila = $resultado->fetch_assoc()) {
                $datos[] = $fila;
            }
            return $datos;
    }

    function mBorrarCompeticiones($clave){
        $sql = "DELETE FROM Competicion WHERE clave = '$clave'";
        if ($this->conexion->query($sql) === TRUE) {
            $mensaje = "Competicion eliminada con éxito.";
        }
        
    }
}
?>
