<?php
    require_once __DIR__ . '/../models/mAmbitos.php';
    class  cAmbitos{
        public $nombrePagina;
        public $view;
        public $mensaje;
        public $objAmbitos;
        public function __construct(){
            $this->view = 'vListarAmbitos';
            $this->nombrePagina = 'Listar Ambitos';
            $this->objAmbitos = new mAmbitos();
        }
        public function listarAmbitos(){
            $this->view = 'vListarAmbitos';
            $this->nombrePagina = 'Listar Ambitos';
            $datos = $this->objAmbitos->mListarAmbitos();
            return $datos;
        }
        public function modifAmbitos() {
            if (isset($_POST['id_ambito']) && isset($_POST['nombre'])) {
                $id_ambito = $_POST['id_ambito'];
                $nombre = $_POST['nombre'];
                
                $this->objAmbitos->mModifAmbitos($id_ambito, $nombre);
                
                // Llama al método listarAmbitos para actualizar la lista después de la modificación
                $this->listarAmbitos(); 
                
                header("Location: index.php?c=cAmbitos&m=listarAmbitos"); // Redirige después de la modificación
                exit();
            }
        }
        public function obtenerDatos(){
            $this->view = 'vModifAmbito';
    
            if (isset($_GET['idAmbito'])) {
                $id_ambito = $_GET['idAmbito'];
                $datos = $this->objAmbitos->mObtenerAmbito($id_ambito);
                return $datos;
            } 
        }
    }