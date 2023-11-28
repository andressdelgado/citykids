<?php
    require_once __DIR__ . '/../models/mTematicas.php';
    class  cTematicas{
        public $nombrePagina;
        public $view;
        public $mensaje;
        public $objAmbitos;
        public function __construct(){
            $this->view = 'vListarTematicas';
            $this->nombrePagina = 'Listar Tematicas';
            $this->objAmbitos = new mAmbitos();
        }
        public function altaTematicas(){
            $this->view = 'vAltaTematicas';
            $this->nombrePagina = 'Alta Tematicas';
            $datos = $this->objTematicas->mAltaAmbitos();
            return $datos;
        }
    }