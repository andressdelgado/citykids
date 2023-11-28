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
                </tr>
            <?php } ?>
        </tbody>
    </table>
</div>