<?php
    require_once __DIR__ .'/php/config/configdb.php';
    require_once __DIR__ .'/php/models/mCompeticiones.php';

    if(!isset($_GET["c"])) $_GET["c"] = constant("CONTROLADOR_DEFECTO");
    if(!isset($_GET["m"])) $_GET["m"] = constant("METODO_DEFECTO");

    //Ruta del Controlador
    $rutaControlador = __DIR__ .'/php/controllers/'.$_GET['c'].'.php';
    require_once $rutaControlador;
    $controladorNombre = $_GET['c'];
    $controlador = new $controladorNombre();

    $metodo = $_GET['m'];
    $datos = $controlador->$metodo();


    //Cargar Vistas
    require_once __DIR__ .'/php/views/template/header.php';
    require_once __DIR__ .'/php/views/' . $controlador->view. '.php';
    require_once __DIR__ .'/php/views/template/footer.php';
?>
