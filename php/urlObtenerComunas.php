<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    include ("connection.php");

    $sql = "SELECT * FROM comunas";
    $query = $connection->query($sql);
    
    $data = array();
    
    while($result = $query->fetch_assoc()) {
        $data[] = $result;
    }
    
    echo json_encode($data);