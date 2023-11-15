<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../css/estilo.css">
    <title>Crear Competición</title>
</head>
<body>
    <!--<div class="mensaje-box">
        <?php
        require '../controllers/Ccompeticion.php';
        $controlador = new Ccompeticion();
        $mensaje = $controlador->rellenarFormulario();
        if (!empty($mensaje)) {
            echo $mensaje;
        }
        ?>
    </div>-->
    <div id="contenedorNegro">
        <h1 class="main-title-white">CREAR COMPETICIÓN</h1>
        <!--<form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">-->
        <form action="../controllers/Ccompeticion.php" method="POST">
            <label for="clave">Introducir clave:</label>
            <input type="text" id="clave" name="clave" required>

            <label for="titulo">Introducir título:</label>
            <input type="text" id="titulo" name="titulo" required>

            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" name="descripcion" rows="4"></textarea>

            <label for="fechaFin">Selecciona hora y día de fin:</label>
            <input type="datetime-local" id="fechaFin" name="fechaFin" required>

            <input type="submit" name="enviar" value="Enviar">
        </form>
    </div>
    <a href="modoCompetición.html" id="volverAlJuego" class="styled-link">VOLVER AL MENÚ</a>  
</body>
</html>
