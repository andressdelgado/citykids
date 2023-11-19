<?php
/**
 * Punto de entrada principal de la aplicación.
 *
 * Este archivo maneja la lógica principal de enrutamiento y carga de controladores y vistas.
 *
 * @package CityKids
 */
// Incluir archivos necesarios
    require_once __DIR__ .'/config/configdb.php';
    require_once __DIR__ .'/models/mCompeticiones.php';

    if(!isset($_GET["c"])) $_GET["c"] = constant("CONTROLADOR_DEFECTO");
    if(!isset($_GET["m"])) $_GET["m"] = constant("METODO_DEFECTO");

    // Ruta del Controlador
    $rutaControlador = __DIR__ .'/controllers/'.$_GET['c'].'.php';
    require_once $rutaControlador;
    $controladorNombre = $_GET['c'];
    $controlador = new $controladorNombre();

    $metodo = $_GET['m'];
/**
 * Ejecuta el método del controlador y devuelve los datos.
 *
 * @return mixed Los datos obtenidos del método del controlador.
 */
    // Obtener los datos del método del controlador
    $datos = $controlador->$metodo();
/**
 * Mensaje de error del controlador, si existe.
 *
 * @var string
 */
    // Obtener el mensaje de error del controlador si existe
    $mensajeError = isset($controlador->mensaje) ? $controlador->mensaje : '';

    // Cargar Vistas
    require_once __DIR__ .'/views/template/header.php';
    require_once __DIR__ .'/views/' . $controlador->view. '.php';
    require_once __DIR__ .'/views/template/footer.php';
?>
