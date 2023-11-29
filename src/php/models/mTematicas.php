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
        function mAltaTematicas($nombretematica, $personajes){
            $this->conexion->begin_transaction();
            $nombretematica = ($nombretematica === '') ? "NULL" : "'" . $this->conexion->real_escape_string($nombretematica) . "'";
            
            try {
                $sql_insertar_tematica = "INSERT INTO Tematica(nombre) VALUES ($nombretematica)";
                $this->conexion->query($sql_insertar_tematica);
        
                $idTematica = $this->conexion->insert_id; // Obtener el ID de la temática recién insertada
        
                // Crear personajes asociados a la temática
                foreach ($personajes as $i => $personaje) {
                    $nombrepersonaje = $this->conexion->real_escape_string($personaje["nombre_personaje_$i"]);
                    $descripcion = $this->conexion->real_escape_string($personaje["descripcion_$i"]);
                    
                    // La siguiente línea incluye "NULL" para el campo imagen. Asegúrate de ajustar esto según tu estructura real de base de datos.
                    $sql_insertar_personaje = "INSERT INTO Personaje (nombre, descripcion) VALUES ('$nombrepersonaje', '$descripcion')";
                    $this->conexion->query($sql_insertar_personaje);
                }               
        
                $this->conexion->commit();
        } catch (Exception $e) {
            $this->conexion->rollback();
            throw $e;
        }  
        }
        function mBorrarTematicas($id_tematica){
            $sql = "DELETE FROM Tematica WHERE id_tematica = '$id_tematica'";
            $this->conexion->query($sql);
            //Nos redireccionamos de nuevo al listar tematicas, por si queremos borra una nueva tematica
            header("Location: index.php?c=cTematicas&m=listarTematicas");
            exit();
        }
        function mObtenerTematica($id_tematica){
            $sql = "SELECT * FROM Tematica WHERE id_tematica = '$id_tematica'";
            $resultado = $this->conexion->query($sql);
        
            if ($resultado->num_rows > 0) {
                $fila = $resultado->fetch_assoc();
                return $fila;
            } else {
                return null; // Opcional: Puedes manejar el caso si no se encuentra ninguna competición con esa clave
            }
        }
    }
?>