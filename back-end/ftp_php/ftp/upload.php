<?php
header("Access-Control-Allow-Origin: *"); // Autoriser toutes les origines
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Autoriser les requêtes POST et OPTIONS
header("Access-Control-Allow-Headers: Content-Type, Authorization, Cache-Control, X-Requested-With"); // Ajoute "X-Requested-With"

// Gérer la requête OPTIONS (préflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

$targetDir = "uploads/";
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

function formatFileSize($size)
{
    if ($size >= 1024 * 1024 * 1024) { // Plus de 1 Go
        return round($size / (1024 * 1024 * 1024), 2) . " Go";
    } elseif ($size >= 1024 * 1024) { // Plus de 1 Mo
        return round($size / (1024 * 1024), 2) . " Mo";
    } else { // En dessous de 1 Mo, affichage en Ko
        return round($size / 1024, 2) . " Ko";
    }
}

if ($_FILES['file']) {
    $fileName = basename($_FILES["file"]["name"]);
    $targetFilePath = $targetDir . $fileName;
    $file_size = $_FILES['file']['size'];
    $size = $formatted_size = formatFileSize($file_size);
    $uploader = $_POST['uploaderName'];
    $statut = $_POST['statut'];
    $type = $_FILES['file']['type'];
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
        // Connexion à la base de données
        $conn = new mysqli("localhost", "root", "fop2025", "ftp");

        if ($conn->connect_error) {
            die("Échec de la connexion : " . $conn->connect_error);
        }

        $filePath = $conn->real_escape_string($targetFilePath);
        $sql = "INSERT INTO fichiers (nom, chemin, uploaders, taille,statut,type) VALUES ('$fileName','$filePath','$uploader','$size','$statut','$type')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => true, "message" => "Fichier uploadé avec succès !"]);
        } else {
            echo json_encode(["success" => false, "message" => "Erreur : " . $conn->error]);
        }

        $conn->close();
    } else {
        echo json_encode(["success" => false, "message" => "Erreur d'upload"]);
    }
    
} else {
    echo json_encode(["success" => false, "message" => "Aucun fichier reçu"]);
}


?>