<?php
    include("connection.php");

    $userInfo="CREATE TABLE userinfo(
        rut VARCHAR(12) NOT NULL,
        nombre VARCHAR(60) NOT NULL,
        alias VARCHAR(60) NOT NULL,
        email VARCHAR(60) NOT NULL,
        region VARCHAR(60) NOT NULL,
        comuna VARCHAR(60) NOT NULL,
        candidato VARCHAR(60) NOT NULL,
        formato VARCHAR(60) NOT NULL,
        PRIMARY KEY (rut)
    );";

    $regiones="CREATE TABLE regiones(
        region_id INT(11) NOT NULL AUTO_INCREMENT,
        region_nombre VARCHAR(64) NOT NULL,
        region_ordinal VARCHAR(4) NOT NULL,
        PRIMARY KEY (region_id)
    ) AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;";

    $comunas="CREATE TABLE comunas(
        comuna_id INT(11) NOT NULL AUTO_INCREMENT,
        comuna_nombre VARCHAR(64) NOT NULL,
        region_id VARCHAR(4) NOT NULL,
        PRIMARY KEY (comuna_id)
    ) AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;";

    if($connection->query($userInfo)===TRUE){
        echo nl2br("Tabla User Info creada con exito \n");
    } else {
        echo "Error ".$connection->error;
    }

    if($connection->query($regiones)===TRUE) {
        echo  nl2br("Tabla Regiones creada con exito \n");
    } else {
        echo "Error ".$connection->error;
    }

    if($connection->query($comunas)===TRUE) {
        echo  nl2br("Tabla Comunas creada con exito \n");
    } else {
        echo "Error ".$connection->error;
    }
?>