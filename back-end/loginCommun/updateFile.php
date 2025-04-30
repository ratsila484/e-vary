<?php

header("Access-Control-Allow-Origin: *"); // Autoriser toutes les origines
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Autoriser les requêtes POST et OPTIONS
header("Access-Control-Allow-Headers: Content-Type, Authorization, Cache-Control, X-Requested-With"); // Ajoute "X-Requested-With"


// Connexion à la base de données
$conn = new mysqli("localhost", "root", "fop2025", "ftp");

if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $nom = $_POST['nom'];
    $statut = $_POST['statut'];
    $listDownload = $_POST['listDownload'];
    $sql = "UPDATE fichiers SET nom = '$nom', statut = '$statut', listeDownload = '$listDownload' WHERE id = '$id' ";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Fichier modifier avec succèss"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erreur : " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "content"=>"Les parametre ne sont pas envoyer"]);
}

