<?php
session_start();
include "../db.php";

if (!isset($_SESSION['id'])) {
    die("Session ID is not set.");
}

$id = $_SESSION['id']; 
$skor = $_POST['skor'];
$jumlah_permainan = $_POST['jumlah_permainan'];
$jumlah_menang = $_POST['jumlah_menang'];
$highscore = $_POST['highscore']; 

$winrate = $jumlah_permainan > 0 ? ($jumlah_menang / $jumlah_permainan) * 100 : 0;

// Get the user's current data
$query = "SELECT id, skor, highscore FROM users WHERE id = :id";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':id', $id); 
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Get all users to calculate the rank based on highest score
$query = "SELECT id, skor FROM users ORDER BY skor DESC";
$stmt = $pdo->prepare($query);
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Calculate rank based on score
$rank = 1; // Default rank
foreach ($users as $u) {
    if ($u['skor'] > $skor) {
        $rank++;
    }
}

// Update data
$query = "UPDATE users SET 
            skor = :skor, 
            highscore = :highscore, 
            jumlah_permainan = :jumlah_permainan, 
            jumlah_menang = :jumlah_menang, 
            winrate = :winrate, 
            rank = :rank 
          WHERE id = :id"; 

$stmt = $pdo->prepare($query);
$stmt->bindParam(':id', $id); 
$stmt->bindParam(':skor', $skor);
$stmt->bindParam(':highscore', $highscore); 
$stmt->bindParam(':jumlah_permainan', $jumlah_permainan);
$stmt->bindParam(':jumlah_menang', $jumlah_menang);
$stmt->bindParam(':winrate', $winrate);
$stmt->bindParam(':rank', $rank);


if ($stmt->execute()) {
    echo "Data successfully updated!";
} else {
    echo "Error: " . implode(", ", $stmt->errorInfo());
}
?>
