<?php
    class mAmbitos{
        private $conexion;
        
        function __construct(){
            require_once __DIR__ . '/../config/configdb.php';
            $this->conexion = new mysqli(SERVIDOR, USUARIO, CONTRASENIA, BBDD);
            if ($this->conexion->connect_error) {
                die("Error de conexión: " . $this->conexion->connect_error);
            }
            
            $mysqliDriver = new mysqli_driver();
            $mysqliDriver->report_mode = MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT;

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
        
        public function mModifAmbitos($id_ambito, $nombre){
            $sql = "UPDATE Ambito SET nombre = '$nombre' WHERE id_ambito = '$id_ambito';";
            $this->conexion->query($sql);
        }
        
        public function mObtenerAmbito($id_ambito){
            $sql = "SELECT * FROM Ambito WHERE id_ambito='$id_ambito'";
            $resultado = $this->conexion->query($sql);
            
            if ($resultado->num_rows > 0) {
                $fila = $resultado->fetch_assoc();
                return $fila;
            } else {
                return null;
            }
        }
    }
?>