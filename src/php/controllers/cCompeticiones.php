<?php
    require_once __DIR__ . '/../models/mCompeticiones.php';

    class cCompeticiones {

        public $nombrePagina;
        public $view;

        public function __construct() {
            $this->view = 'vListarCompeticiones';
            $this->nombrePagina ='';
            $this->objCompeticiones = new mCompeticiones();
        }

        public function listarCompeticiones(){

            $this->nombrePagina = 'Listar Competiciones';
            $datos =  $this->objCompeticiones->mListarCompeticiones();
            return $datos;
        }

        public function crearCompeticiones(){
            $this->view = 'vCrearCompeti';

            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                 if(isset($_POST["clave"]) && isset($_POST["titulo"]) && isset($_POST["descripcion"]) && isset($_POST["fechaFin"])){
                    $clave = $_POST["clave"];
                    $titulo = $_POST["titulo"];
                    $descripcion = $_POST["descripcion"];
                    $fechaFin = $_POST["fechaFin"];
                    $mensaje = $this->objCompeticiones->mCrearCompeticion($clave, $titulo, $descripcion, $fechaFin);
                }
            }
        }

        public function borrarCompeticiones(){
            echo 'Aqui llego controllers';
            $clave = $_GET['clave'];
            $this->objCompeticiones->mBorrarCompeticion($clave);

            
        }
    }
?>

