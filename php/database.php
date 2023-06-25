<?php
    include("connectionData.php");

    $createDatabase= new mysqli($server, $username, $password);

    if($createDatabase->connect_error){
        die("Conexión fallida: ". $connection->connect_error);
    }
    echo "Conexión establecida...";
    
    $sql="CREATE DATABASE form_data";

    if($createDatabase->query($sql)===TRUE) {
        echo nl2br("Base de datos creada \n");
    } else {
        echo "Error ".$createDatabase->error;
    }
?>