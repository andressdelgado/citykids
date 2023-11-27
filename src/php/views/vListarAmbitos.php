<div id="contenedorTabla">
    <table>
        <thead>
            <tr>
                <th>Id. Ámbito</th>
                <th>Nombre del Ámbito</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($datos as $fila) { ?>
                <tr>
                    <td><?= $fila['id_ambito'] ?></td>
                    <td><?= $fila['nombre'] ?></td>
                    <td>Hola</td>
                    <!-- <td><a href="index.php?c=cCompeticiones&m=modifCompeticiones&clave=<?//= $fila['clave']; ?>"><img src="../img/edit.png"></a></td> -->
                </tr>
            <?php } ?>
        </tbody>
    </table>
</div>