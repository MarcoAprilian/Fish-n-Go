<?php
session_start(); 
include "../db.php";

$username = $_SESSION['username'];

// Ambil data pengguna dari database
$query = "SELECT skor, jumlah_permainan, jumlah_menang, winrate, rank FROM users WHERE username = :username";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':username', $username);
$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    echo json_encode($user);  // Mengirimkan data dalam format JSON
} else {
    echo json_encode(['error' => 'User not found']);
}
?>
