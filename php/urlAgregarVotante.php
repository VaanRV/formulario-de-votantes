<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    include ("connection.php");

    $json = file_get_contents("php://input");
    
    $dataVotante = json_decode($json);

    $sql = "INSERT INTO userInfo(rut, nombre, alias, email, region, comuna, candidato, formato) 
        VALUES('$dataVotante->rut', '$dataVotante->nombre', '$dataVotante->alias', '$dataVotante->email', 
            '$dataVotante->region', '$dataVotante->comuna', '$dataVotante->candidato', '$dataVotante->formato')
        ";
    
    $query = $connection->query($sql) or die("Error ss");
    if (!$query) {
        echo "SQL Error: " . mysqli_error($connection);
    }

    $jsonRespuesta = array('msg' => 'OK');
    echo json_encode($jsonRespuesta);