<?php
    class ControladorFormulario{
        function cogerDatos(){
            require_once __DIR__ . '/../models/competiciones.php';
            $modelo = new Competiciones();
            $datos = $modelo->cogerDatos();
            
            require_once __DIR__ . '/../views/Vcompeticiones.php';
        }
    }
?>
