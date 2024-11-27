<?php
session_start(); 
include "../db.php";

if (!isset($_SESSION['id'])) {
    echo json_encode(['error' => 'Session expired or user not logged in']);
    exit;
}

$id = $_SESSION['id'];

try {
    $query = "SELECT skor, jumlah_permainan, jumlah_menang, winrate, rank, highscore FROM users WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();


    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode($user); 
    } else {
        echo json_encode(['error' => 'User not found']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
