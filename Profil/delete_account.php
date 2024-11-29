<?php
session_start();
include '../db.php';

if (empty($_SESSION['id'])) {
    header('Location: ../Signin/halamansignin.php');
    exit();
}

$id = $_SESSION['id'];

try {
    // Hapus data pengguna dari database
    $query = "DELETE FROM users WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $_SESSION['delete_success'] = "Akun Anda berhasil dihapus.";

    session_destroy();

    header('Location: ../Signin/halamansignin.php');
    exit();
} catch (PDOException $e) {
    echo "Kesalahan saat menghapus akun: " . $e->getMessage();
    exit();
}
?>
