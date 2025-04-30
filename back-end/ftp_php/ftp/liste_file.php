<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "ftp");



if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Échec de connexion"]));
}

$sql = "SELECT id,nom, chemin, uploaders, taille, dateUpload, statut, type  FROM fichiers";
$result = $conn->query($sql);

$files = [];
while ($row = $result->fetch_assoc()) {
    $files[] = [
        "id" => $row["id"],
        "nom" => $row["nom"],
        "chemin" => $row["chemin"],
        "uploaders" => $row["uploaders"],
        "taille" => $row["taille"],
        "dateUpload" => $row["dateUpload"],
        "statut" => $row["statut"],
        "type" => $row["type"]
    ];
}

echo json_encode(["success" => true, "files" => $files]);

$conn->close();
