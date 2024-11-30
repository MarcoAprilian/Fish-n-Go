<?php
session_start(); 
include '../db.php';

$error = "";
$success = "";

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['signup'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Cek password cocok ga
    if ($password !== $confirm_password) {
        $error = "Password dan konfirmasi password tidak cocok!";
    } else {
        // Cek apakah usernama sudah diambil
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->execute(['username' => $username]);

        if ($stmt->rowCount() > 0) {
            $error = "Username sudah diambil!";
        } else {
            // Hash
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            // Insert data user ke database
            $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
            if ($stmt->execute(['username' => $username, 'password' => $hashed_password])) {
                $success = "Pendaftaran berhasil! Anda sekarang dapat masuk ke akun Anda.";
            } else {
                $error = "Terjadi kesalahan saat mendaftar, coba lagi.";
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="halamansignin.css">
    <link rel="stylesheet" href="bubble/style.css">
    <title>Sign Up</title>
</head>
<body>

<a href="../index.php">
  <button class="back-button"><b>></b></button>
</a>

<div class="login-container">
    <form action="halamansignup.php" method="POST" id="signup-form">
        <div class="form-item">
            <label>Username</label>
            <div class="input-wrapper">
                <input type="text" name="username" id="username" autocomplete="off" required />
            </div>
        </div>
        
        <div class="form-item">
            <label>Password</label>
            <div class="input-wrapper">
                <input type="password" name="password" id="password" autocomplete="off" required />
                <button type="button" id="eyeball1">
                    <div class="eye"></div>
                </button>
                <div id="beam1"></div>
            </div>
        </div>

        <div class="form-item">
            <label>Konfirmasi Password</label>
            <div class="input-wrapper">
                <input type="password" name="confirm_password" id="confirm_password" autocomplete="off" required />
                <button type="button" id="eyeball2">
                    <div class="eye"></div>
                </button>
                <div id="beam2"></div>
            </div>
        </div>
        
        <button type="submit" id="submit" name="signup">Daftar</button>
        <a href="halamansignin.php" class="signuplink">Sudah punya akun?</a>
    </form>

    <?php if ($error): ?>
        <p class="error"><?php echo $error; ?></p>
    <?php endif; ?>

    <?php if ($success): ?>
        <p class="success"><?php echo $success; ?></p>
    <?php endif; ?>
</div>

<audio id="click-sound" src="/BGM/mouse.mp3" preload="auto"></audio>

<script src="../BGM/Clicksfx.js"></script>
<script src="halamansignin.js"></script>
<script src="bubble/script.js"></script>

</body>
</html>
