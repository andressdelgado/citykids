<?php
    class mAmbitos{
        private $conexion;
        
        function __construct(){
            require_once __DIR__ . '../config/configdb.php';
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
        function mListarAmbitos(){
            $sql = "SELECT * FROM Ambito";
            $resultado = $this->conexion->query($sql);
            $datos = [];
            while($fila = $resultado->fetch_assoc())
                $datos[] = $fila;
            return $datos;
        }
    }
?>