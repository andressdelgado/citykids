<div id="contenedorTabla">
    <table>
        <thead>
            <tr>
                <th>Id. Temática</th>
                <th>Nombre de la Temática</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($datos as $fila) { ?>
                <tr>
                    <td><?= $fila['id_tematica'] ?></td>
                    <td><?= $fila['nombre'] ?></td>
                    <td><a href="index.php?c=cTematicas&m=borrarTematicas&id_tematica=<?php echo $fila['id_tematica']; ?>"><img src="../img/delete.png"></a></td>
                    <td><a href="index.php?c=cTematicas&m=obtenerIdTematica&id_tematica=<?= $fila['id_tematica']; ?>"><img src="../img/edit.png"></a></td>
                </tr>
            <?php } ?>
        </tbody>
    </table>
</div>