<?php
    require_once __DIR__ . '/../models/mCompeticiones.php';

    class cCompeticiones {
        public $nombrePagina;
        public $view;
        public $mensaje;
        public $objCompeticiones;

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
                    $resultado = $this->objCompeticiones->mCrearCompeticion($clave, $titulo, $descripcion, $fechaFin);
                    switch ($resultado) {
                        case '1292':
                            $this->mensaje = "Valor de fecha y hora incorrecto";
                            break;
                        case '1406':
                            $this->mensaje = "Algun dato excede la longitud máxima permitida";
                            break;
                        case '1062':
                            $this->mensaje = "La clave ya existe, intentalo con otra";
                            break;
                        case '1048':
                            $this->mensaje = "La clave no puede estar vacía";
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

        public function borrarCompeticiones(){
            echo 'Aqui llego controllers';
            $clave = $_GET['clave'];
            $this->objCompeticiones->mBorrarCompeticion($clave);
        }
    }
?>
