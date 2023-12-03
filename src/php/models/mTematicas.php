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
        function mListarPersonajes($id_tematica){
            $sql = "SELECT personaje.id_personaje as id_personaje, personaje.nombre as nombre_personaje, personaje.descripcion as descripcion, personaje.imagen as imagen, ambito.nombre as nombre_ambito
            FROM Personaje AS personaje
            INNER JOIN Tematica_Ambito_Personaje AS tem ON personaje.id_personaje = tem.id_personaje
            INNER JOIN Ambito AS ambito ON ambito.id_ambito = tem.id_ambito
            WHERE tem.id_tematica = '$id_tematica'";
            
            
            $resultadoPersonajes = $this->conexion->query($sql);
            $datos=[];

            while($fila = $resultadoPersonajes->fetch_assoc()) {
                $datos[] = $fila;
            }
            return $datos;
            
        }
        function mListarTematicas(){
            $sql = "SELECT * FROM Tematica";
            $resultado = $this->conexion->query($sql);
            $datos = [];
            while($fila = $resultado->fetch_assoc())
                $datos[] = $fila;
            return $datos;
        }
        function mObtenerAmbitos(){
            $sql_ambitos = "SELECT id_ambito as id_ambito, nombre as nombre_ambito FROM Ambito";
            $resultado_ambitos = $this->conexion->query($sql_ambitos);

            if ($resultado_ambitos->num_rows > 0) {
                $datos = [];
                while ($fila = $resultado_ambitos->fetch_assoc()) {
                    $datos[] = $fila;
            }
            return $datos;
            }
        }

        function mAltaTematicas($nombretematica, $personajes){
            $nombretematica = ($nombretematica === '') ? "NULL" : "'" . $this->conexion->real_escape_string($nombretematica) . "'";
            
            $this->conexion->begin_transaction();
    
            try {
                $sql_insertar_tematica = "INSERT INTO Tematica(nombre) VALUES ($nombretematica)";
                $this->conexion->query($sql_insertar_tematica);        
                $id_tematica = $this->conexion->insert_id;
                // Crear personajes asociados a la temática
                foreach ($personajes as $i => $personaje) {
                    $ambito = $this->conexion->real_escape_string($personaje["ambito_$i"]);
                    $id_ambito = (int)$ambito;
                    $nombrepersonaje = $this->conexion->real_escape_string($personaje["nombre_personaje_$i"]);
                    $descripcion = $this->conexion->real_escape_string($personaje["descripcion_$i"]);
                    
                    if (isset($personaje["imagen_$i"]) && file_exists($personaje["imagen_$i"]["tmp_name"])) {
                        $imagen = $personaje["imagen_$i"];
                        $ext = pathinfo($imagen["name"], PATHINFO_EXTENSION);
                        print_r($nombreimagen = uniqid() . "." . $ext);
                        $carpeta_final = __DIR__ . "/../../img";
                        $ruta_inicial = $imagen["tmp_name"];
                        $ruta_final = $carpeta_final . DIRECTORY_SEPARATOR . $nombreimagen;
                    } else {
                        $nombreimagen = null;
                    }
                
                    // La siguiente línea incluye "NULL" para el campo imagen. Asegúrate de ajustar esto según tu estructura real de base de datos.
                    $sql_insertar_personaje = "INSERT INTO Personaje (nombre, descripcion, imagen) VALUES ('$nombrepersonaje', '$descripcion', '$nombreimagen')";
                    $this->conexion->query($sql_insertar_personaje);
                    $id_personaje = $this->conexion->insert_id;
                    move_uploaded_file($ruta_inicial, $ruta_final);
                    $sql_insertar_todo = "INSERT INTO Tematica_Ambito_Personaje(id_tematica, id_ambito, id_personaje) VALUES ('$id_tematica', '$id_ambito', '$id_personaje')";
                    $this->conexion->query($sql_insertar_todo);
                }               
                $this->conexion->commit();
                
            } catch (Exception $e) {
                $this->conexion->rollback();
                throw $e;
            }
            
        }
        /*function mModificarTematicas($id_tematica, $nombretematica, $personajes){
            $nombretematica = ($nombretematica === '') ? "NULL" : "'" . $this->conexion->real_escape_string($nombretematica) . "'";
            
            $this->conexion->begin_transaction();
            $sql = "UPDATE nombre FROM Tematica WHERE id_tematica = '$id_tematica'";
            $this->conexion->query($sql);

            foreach ($personajes as $i => $personaje) {
                $ambito = $this->conexion->real_escape_string($personaje["ambito_$i"]);
                $id_ambito = (int)$ambito;
                $nombrepersonaje = $this->conexion->real_escape_string($personaje["nombre_personaje_$i"]);
                $descripcion = $this->conexion->real_escape_string($personaje["descripcion_$i"]);


            //Nos redireccionamos de nuevo al listar tematicas, por si queremos borra una nueva tematica
            header("Location: index.php?c=cTematicas&m=listarTematicas");
            exit();
        }*/
        function mBorrarTematicas($id_tematica){
            $sql = "SELECT personaje.id_personaje, personaje.imagen as imagen
            FROM Personaje AS personaje
            INNER JOIN Tematica_Ambito_Personaje AS tem ON personaje.id_personaje = tem.id_personaje
            WHERE tem.id_tematica = '$id_tematica'";
            
            $resultado = $this->conexion->query($sql);
            $datos = [];
        
            while ($fila = $resultado->fetch_assoc()) {
                $datos[] = $fila;
            }
            
            $sql = "DELETE FROM Tematica_Ambito_Personaje WHERE id_tematica = '$id_tematica'";

            $resultado = $this->conexion->query($sql);

            $sql = "DELETE FROM Tematica WHERE id_tematica = '$id_tematica'";

            $resultado = $this->conexion->query($sql);

            foreach ($datos as $fila) {
                $imagen = $fila['imagen'];
                $ruta_inicial = __DIR__ . "/../../img/" . $imagen;
                $ruta_final = __DIR__ . "/../../img_borradas/" . $imagen;
        
                if (file_exists($ruta_inicial)) {
                    // Mover el archivo a la carpeta de imágenes borradas
                    rename($ruta_inicial, $ruta_final);
                } else {
                    // Manejar el caso donde el archivo no existe
                    // Puedes emitir un mensaje de error o realizar otras acciones según tus necesidades
                    echo "El archivo $ruta_inicial no existe.";
                }
                $id_personaje = $fila ['id_personaje'];
                $id_personaje = (int)$id_personaje;
                $sql = "DELETE FROM Personaje WHERE id_personaje = $id_personaje";
                $resultado = $this->conexion->query($sql);
                
            }           
            //Nos redireccionamos de nuevo al listar tematicas, por si queremos borra una nueva tematica
            header("Location: index.php?c=cTematicas&m=listarTematicas");
            exit();
        }
    }
?>