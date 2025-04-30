<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Connect to database
$host = "localhost";
$port = 3306;
$socket = "";
$user = "root";
$password = "fop2025";
$dbname = "ftp";

$conn = new mysqli($host, $user, $password, $dbname, $port, $socket)
    or die('Could not connect to the database server' . mysqli_connect_error());

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Échec de connexion"]));
}

// SQL Query
$sql = "SELECT id, nom, email FROM loginCommun";
$result = $conn->query($sql);

if ($result === false) {
    // Si la requête échoue, afficher l'erreur SQL
    die(json_encode(["success" => false, "message" => "Erreur de requête: " . $conn->error]));
}

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = [
      "id" => $row["id"],
      "nom" => $row["nom"],
      "email" => $row["email"],
    ];
}

echo json_encode(["success" => true, "users" => $users]);

$conn->close();

