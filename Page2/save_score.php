<?php
session_start();
include "../db.php";

// Ambil data dari request POST
$username = $_SESSION['username'];  // Ambil username dari sesi
$skor = $_POST['skor'];
$jumlah_permainan = $_POST['jumlah_permainan'];
$jumlah_menang = $_POST['jumlah_menang'];

$winrate = $jumlah_permainan > 0 ? ($jumlah_menang / $jumlah_permainan) * 100 : 0;

// Ambil rank berdasarkan skor tertinggi
$query = "SELECT username, skor FROM users ORDER BY skor DESC";
$stmt = $pdo->prepare($query);
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Tentukan rank berdasarkan posisi
$rank = 1;
foreach ($users as $user) {
    if ($user['skor'] > $skor) {
        $rank++;
    }
}

// Update skor, winrate, jumlah permainan, jumlah menang, dan rank
$query = "UPDATE users SET skor = :skor, jumlah_permainan = :jumlah_permainan, jumlah_menang = :jumlah_menang, winrate = :winrate, rank = :rank WHERE username = :username";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':username', $username);
$stmt->bindParam(':skor', $skor);
$stmt->bindParam(':jumlah_permainan', $jumlah_permainan);
$stmt->bindParam(':jumlah_menang', $jumlah_menang);
$stmt->bindParam(':winrate', $winrate);
$stmt->bindParam(':rank', $rank);
$stmt->execute();
?>
