<?php
if (isset($_GET['filename'])) {
    $file = 'uploads/' . basename($_GET['filename']);

    if (file_exists($file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . basename($file) . '"');
        header('Content-Length: ' . filesize($file));
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        flush();
        readfile($file);
        exit;
    } else {
        echo "Le fichier n'existe pas.";
    }
} else {
    echo "Aucun fichier spécifié.";
}
