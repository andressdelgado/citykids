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
            $clave = ($clave === '') ? "NULL" : "'" . $clave . "'";
            //$variable = ($condicion) ? $valor_si_cierto : $valor_si_falso; 
            //Por ejemplo en este caso, la variable cavle es igual a espacio en blanco, colocaría un null y si no lo es colocaria los datos que se han mandado con la variable
            $descripcion= ($descripcion === '') ? "NULL" : "'" . $descripcion . "'";
            $titulo= ($titulo === '') ? "NULL" : "'" . $titulo . "'";

            $sql = "INSERT INTO Competicion (clave, descripcion, titulo, fecha_hora_fin) 
            VALUES ($clave, $descripcion, $titulo, '$fechaFin')";

            if ($this->conexion->query($sql) === TRUE) {
                $mensaje = "La competición se ha creado correctamente.";
            } else {
                // Si hay un error en la consulta, lanzar una excepción con el mensaje de error
                throw new Exception($this->conexion->error, $this->conexion->errno);
            }
        
            // Retornar el mensaje que indica el resultado de la inserción
            return $mensaje;
        } catch (Exception $error) {
            //Coge la excepción
            $numeroError = $error->getCode(); // Obtiene el código de error de la variable $error
            //Retornamos el numero del error, en este caso al controlador
            return $numeroError;
        }
    }

    function mBorrarCompeticion($clave){
        $sql = "DELETE FROM Competicion WHERE clave = '$clave'";
        $this->conexion->query($sql);
        //Nos redireccionamos de nuevo al listar competiciones, por si queremos borra una nueva competicion
        header("Location: index.php?c=cCompeticiones&m=listarCompeticiones");
        exit();
    }
}
?>
