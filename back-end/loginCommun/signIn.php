<?php

header("Access-Control-Allow-Origin: *"); // Autoriser toutes les origines
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Autoriser les requêtes POST et OPTIONS
header("Access-Control-Allow-Headers: Content-Type, Authorization, Cache-Control, X-Requested-With");
header('Content-Type: application/json');

if (isset($_POST['email']) && $_POST['password'] && $_POST['nom']) {
    $email = $_POST['email'];
    $nom = $_POST['nom'];
    $pass = $_POST['password'];


    ////connect to the database
    $host = "localhost";
    $port = 3306;
    $socket = "";
    $user = "root";
    $password = "fop2025";
    $dbname = "ftp";

    $conn = new mysqli($host, $user, $password, $dbname, $port, $socket)
        or die('Could not connect to the database server' . mysqli_connect_error());

    //insertion dans la bdd
    $sql = "INSERT INTO logincommun (nom, email, password) VALUES ('$nom', '$email', '$pass')";
    if($conn->query($sql) === TRUE){
        echo json_encode(["success"=>true, "content"=>"donnee uploader avec success"]);
    }else{
        echo json_encode(["success"=>false, "content"=>"Erreur lors de l'insertion :". $conn->error ]);
    }


} else {
    echo json_encode(["success" => false, "content" => "les parametre no sont pas passé"]);
}

//$con->close();
