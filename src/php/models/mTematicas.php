<?php
    class mTematicas{
        private $conexion;
        
        function __construct(){
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
        function mListarTematicas(){
            $sql = "SELECT * FROM Tematica";
            $resultado = $this->conexion->query($sql);
            $datos = [];
            while($fila = $resultado->fetch_assoc())
                $datos[] = $fila;
            return $datos;
        }
        function mAltaTematicas($nombre){
            try{
                $nombre = ($nombre === '') ? "NULL" : "'" . $this->conexion->real_escape_string($nombre) . "'";
                $sql = "INSERT INTO Tematica(nombre) VALUES ($nombre)";
                if ($this->conexion->query($sql) === TRUE) {
                    $mensaje = "La temática se ha creado correctamente.";
                } else {
                    // Si hay un error en la consulta, lanzar una excepción con el mensaje de error
                    throw new Exception($this->conexion->error, $this->conexion->errno);
                }
                // Retornar el mensaje que indica el resultado de la inserción
                return $mensaje;
            } 
            catch (Exception $error) {
                //Coge la excepción
                $numeroError = $error->getCode(); // Obtiene el código de error de la variable $error
                //Retornamos el numero del error, en este caso al controlador
                return $numeroError;
            }
        }
        function mBorrarTematicas($id_tematica){
            $sql = "DELETE FROM Tematica WHERE id_tematica = '$id_tematica'";
            $this->conexion->query($sql);
            //Nos redireccionamos de nuevo al listar tematicas, por si queremos borra una nueva tematica
            header("Location: index.php?c=cTematicas&m=listarTematicas");
            exit();
        }
    }
?>