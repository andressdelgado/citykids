<?php
    require_once __DIR__ . '/../models/mTematicas.php';
    class  cTematicas{
        public $nombrePagina;
        public $view;
        public $mensaje;
        public $objTematicas;
        public function __construct(){
            $this->view = 'vListarTematicas';
            $this->nombrePagina = 'Listar Tematicas';
            $this->objTematicas = new mTematicas();
        }
        public function listarTematicas(){
            $this->view = 'vListarTematicas';
            $this->nombrePagina = 'Listar Tematicas';
            $datos = $this->objTematicas->mListarTematicas();
            return $datos;
        }
        public function altaTematicas() {
            $this->view = 'vAltaTematicas';
            $this->nombrePagina = 'Alta Tematicas';
        
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $nombretematica = $_POST["nombre_tematica"];
                $personajes = [];
        
                for ($i = 0; $i <= 4; $i++) {
                    $nombre_personaje = $_POST["nombre_personaje_$i"];
                    $descripcion = $_POST["descripcion_$i"];
                    
                    $personaje = [
                        "nombre_personaje_$i" => $nombre_personaje,
                        "descripcion_$i" => $descripcion,
                    ];
        
                    $personajes[] = $personaje;
                }
                try{
                // creo la temática y personajes
                    $this->objTematicas->mAltaTematicas($nombretematica, $personajes);
                    header("Location: index.php?c=cTematicas&m=listarTematicas");
                    exit();
                } catch (Exception $mensaje) {
                    $codigoError = $mensaje->getCode();
                    switch ($codigoError) {
                        case 1062:
                            $this->mensaje= "Error al procesar el formulario: Ya existe una pregunta similar.";
                            break;
                        case 1048:
                            $this->mensaje= "Error al procesar el formulario: No puede haber campos vacíos.";
                            break;
                        case 1406:
                            $this->mensaje= "Error al procesar el formulario: Los campos exceden la longitud máxima.";
                            break;
                        default:
                        header("Location: index.php?c=cTematicas&m=listarTematicas");
                        exit();
                        if (is_numeric($resultado)) {
                            $this->mensaje = "Error al crear competición. Código de error: $resultado";
                        } else {
                            $this->mensaje = $resultado;
                        }
                        break;
                    }
                }
            }
        }

        
        public function borrarTematicas(){
            $id_tematica = $_GET['id_tematica'];
            $this->objTematicas->mBorrarTematicas($id_tematica);
        }
        public function obtenerIdTematica(){
            
        
            $id_tematica = $_GET['id_tematica'];
            // Obtener los datos de la competición a modificar
            $datos = $this->objCompeticiones->mObtenerTematica($id_tematica);
        
            // Pasar los datos a la vista
            return $datos;
        }
    }
