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
    }