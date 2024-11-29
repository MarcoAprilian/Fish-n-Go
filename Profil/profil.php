<?php
session_start();
include '../db.php';

// Periksa apakah pengguna sudah login
if (empty($_SESSION['id'])) {
    header('Location: ../Signin/halamansignin.php');
    exit();
}

$id = $_SESSION['id'];
// Format ID menjadi 8 digit
$formatted_id = str_pad($id, 8, '0', STR_PAD_LEFT);

try {
    $query = "SELECT username, jumlah_permainan, winrate, rank, jumlah_menang, highscore FROM users WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $user_data = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user_data) {
        echo "Data pengguna tidak ditemukan.";
        exit();
    }
} catch (PDOException $e) {
    echo "Kesalahan database: " . $e->getMessage();
    exit();
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profil</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<a href="../index.php">
    <button class="back-button"><b>></b></button>
</a>

<div class="container">
    <div class="profile-info">
        <h1><?php echo htmlspecialchars($user_data['username']); ?></h1>
        <p>ID: <?php echo htmlspecialchars($formatted_id); ?></p>
    </div>

    <!-- Statistik Utama -->
    <section class="stats">
        <h2>Statistik Utama</h2>
        <div class="hero-stats">
            <div class="hero">
                <h3>Total Pertandingan: <?php echo htmlspecialchars($user_data['jumlah_permainan']); ?></h3>
                <p>Total menang: <?php echo htmlspecialchars($user_data['jumlah_menang']); ?></p>
                <p>Winrate: <?php echo htmlspecialchars($user_data['winrate']); ?>%</p>
                <p>Highscore: <?php echo htmlspecialchars($user_data['highscore']); ?></p>
            </div>
        </div>
    </section>

    <!-- Peringkat -->
    <section class="rank">
        <h2>Peringkat</h2>
        <div class="rank-info">
            <p>Rank Saat Ini: <?php echo htmlspecialchars($user_data['rank']); ?></p>
        </div>
    </section>

    <a href="logout.php">
        <button class="logout-button">Keluar dari Akun</button>
    </a>

    <button class="logout-button delete-button" onclick="confirmDelete()">Hapus Akun</button>
</div>

<script>
    function confirmDelete() {
    const userConfirmed = confirm("Apakah Anda yakin ingin menghapus akun Anda? Tindakan ini tidak dapat dibatalkan.");
    if (userConfirmed) {
        window.location.href = "delete_account.php";
    }
}
</script>
</body>
</html>
