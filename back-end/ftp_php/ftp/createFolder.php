<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Gérer la requête OPTIONS (préflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

/*if(isset($_POST['folderName'])){
    $folder_name = $_POST['folderName'];
    $statut = $_POST['statut'];
    $proprietaire = $_POST['proprietaire'];
    $conn = new mysqli("localhost", "roor", "", "ftp");
    if($conn->connect_error){
        die("Echec de la connexion : ".$conn->connect_error);
    }

    $sql = "INSERT INTO folder (Nom, Proprietaire, Statut) VALUES ('$folder_name','$proprietaire','$statut');";

    //teste si query est parafaitement executer dans la bdd
    if($conn->query($sql) === TRUE){
        echo json_encode(["success" => true, "message" => "Dossier creer avec success!"]);
    }else{
        echo json_encode(["success" => false, "message" => "Erreur lors du creation du dossier".$conn->error]);
    }
    $conn->close();

}else{
    echo json_encode(["success" => false, "message" => "Les paramettre ne sont pas passer"]);
}*/
$input = json_decode(file_get_contents("php://input"), true);

if (isset($input['folderName'])) {
    $folderName = $input['name'];
    $status = $input['status'];


    // Simule une création de dossier (adapter selon ton besoin)
    $response = [
        "success" => true,
        "message" => "Dossier '$folderName' créé avec statut '$status'."
    ];
} else {
    $response = [
        "success" => false,
        "message" => "Données invalides."
    ];
}

echo json_encode($response);
exit();
?>