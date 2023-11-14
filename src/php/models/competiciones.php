<?php
class Competiciones
{
    private $conexion;

    function __construct()
    {
        require_once __DIR__ . '/../config/configdb.php';
        $this->conexion = new mysqli(SERVIDOR, USUARIO, CONTRASENIA, BBDD);
        if ($this->conexion->connect_error) {
            die("Error de conexión: " . $this->conexion->connect_error);
        }
    }

    function cogerDatos()
    {
        $datos = array();
        $consulta = "SELECT * FROM Competicion";
        $resultado = $this->conexion->query($consulta);
        while ($fila = $resultado->fetch_assoc()) {
            $datos[] = $fila;
        }
        return $datos;
    }
}
?>
