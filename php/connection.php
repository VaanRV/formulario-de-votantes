<?php
    include("connectionData.php");

    $connection= new mysqli($server, $username, $password, $database);

    if($connection->connect_error) {
        die("Conexión fallida: ". $connection->connect_error);
    }
?>