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
        public function altaTematicas(){
            $this->view = 'vAltaTematicas';
            $this->nombrePagina = 'Alta Tematicas';
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                if(isset($_POST["nombre"])){
                    $nombre = $_POST["nombre"];
                    $resultado = $this->objTematicas->mAltaTematicas($nombre);
                    switch($resultado){
                        case '1406':
                            $this->mensaje = "Algun dato excede la longitud máxima permitida";
                            break;
                        case '1048':
                            $this->mensaje = "El nombre no puede estar vacío.";
                            break;
                        default:
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