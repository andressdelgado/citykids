<?php
switch ($_GET['action']) {
    case 'rellenarFormulario':
        $controlador = new Ccompeticion();
        $controlador->rellenarFormulario();     
        break;
    
    case 'listarCompeticiones':
        $controlador = new Ccompeticion();
        $controlador->listarCompeticiones(); 
        break;
    case 'borrarCompeticiones':
        $controlador = new Ccompeticion();
        $controlador->borrarCompeticiones(); 
        break;
    default:
        # code...
        break;
}
//Aqui porque tan solo tengo un metodo pero podriamos crear un switch case, donde entreamos segun nos convenga, llamando a los diferentes metodos
    class Ccompeticion {
        
        public function rellenarFormulario() {
            require_once __DIR__ . '/../models/competiciones.php';

            if(isset($_POST["enviar"])) {

                $clave = $_POST["clave"];
                $titulo = $_POST["titulo"];
                $descripcion = $_POST["descripcion"];
                $fechaFin = $_POST["fechaFin"];
        
                $objeto = new Competiciones();
                $mensaje = $objeto->crearCompeticion($clave, $titulo, $descripcion, $fechaFin);
        
                echo $mensaje;
            }
        }

        public function listarCompeticiones(){
            require_once __DIR__ . '/../models/competiciones.php';

            $objeto = new Competiciones();
            $datos = $objeto->mListarCompeticiones();
            
            require "../views/vListarCompeticiones.php";
        }

        public function borrarCompeticiones(){
            require_once __DIR__ . '/../models/competiciones.php';
            $clave = $_GET['clave'];
            $objeto = new Competiciones();
            $mensaje = $objeto->mBorrarCompeticiones($clave);
            
            echo $mensaje;
        }
    }
?>

