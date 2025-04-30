<?php

header("Access-Control-Allow-Origin: *"); // Autoriser toutes les origines
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Autoriser les requêtes POST et OPTIONS
header("Access-Control-Allow-Headers: Content-Type, Authorization, Cache-Control, X-Requested-With");
header('Content-Type: application/json');

if (isset($_POST['email']) && isset($_POST['password'])) {

    $email = $_POST['email'];
    $pass = $_POST['password'];

    //connect to database
    $host = "localhost";
    $port = 3306;
    $socket = "";
    $user = "root";
    $password = "fop2025";
    $dbname = "ftp";

    $con = new mysqli($host, $user, $password, $dbname, $port, $socket)
        or die('Could not connect to the database server' . mysqli_connect_error());

    $sql = "SELECT * FROM logincommun WHERE email =  ?";
    //preparer la requete
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result(); // get the mysql result
    $user = $result->fetch_assoc(); //fecth data

    if ($user && $pass == $user['password']) {
        
        echo json_encode(["success" => true, "content" => $user]);
        
    }else{
        
        echo json_encode(["success" => false, "content" => "Email ou password incorecte"]);
    }

    //$con->close();
    //if($user && password_verify($pass,$user['password']));
}