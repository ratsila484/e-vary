<?php
// Permettre l'accès depuis toutes les origines (remplace '*' par ton domaine spécifique pour plus de sécurité)
header("Access-Control-Allow-Origin: *");

// Permettre certains types de méthodes HTTP
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");

// Permettre certains en-têtes
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Vérifier la méthode de la requête pour la requête OPTIONS (pré-vol)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  // Arrêter le script ici pour éviter l'exécution ultérieure
  exit(0);
}
// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "fop2025";
$dbname = "ftp"; // Remplace par le nom de ta base de données

$conn = new mysqli($servername, $username, $password, $dbname);

//isset($_POST['file_id'])


if (isset($_POST["id"])) {
  $file_id = $_POST["id"];
  // Récupérer le nom du fichier depuis la base de données
  $sql = "SELECT chemin FROM fichiers WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $file_id);
  $stmt->execute();
  $result = $stmt->get_result();
  $file = $result->fetch_assoc();
  
  if ($file) {
    
    // Le nom du fichier à supprimer
    $file_name = $file['chemin'];

    // Supprimer le fichier du dossier 'uploads'

    if (file_exists($file_name)) {
      unlink($file_name); // Supprimer le fichier
    }

    // Supprimer l'entrée correspondante de la base de données
    $sql_delete = "DELETE FROM fichiers WHERE id = ?";
    $stmt_delete = $conn->prepare($sql_delete);
    $stmt_delete->bind_param("i", $file_id);
    if ($stmt_delete->execute()) {
      echo json_encode(['status' => 'success', 'message' => 'Fichier et données supprimés avec succès']);
    } else {
      echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la suppression des données']);
    }
  } else {
    echo json_encode(['status' => 'error', 'message' => 'Fichier introuvable']);
  }

  $stmt->close();
  $conn->close();
} else {
  echo json_encode(['status' => 'error', 'message' => 'ID de fichier non spécifié']);
}
?>