<?php
session_start();
include '../db.php';

$error = "";
$success = "";

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['signup'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Validate password match
    if ($password !== $confirm_password) {
        $error = "Password dan konfirmasi password tidak cocok!";
    } else {
        // Check if username is taken
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->execute(['username' => $username]);

        if ($stmt->rowCount() > 0) {
            $error = "Username sudah diambil!";
        } else {
            // Hash the password
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            // Insert new user into database
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
    <style>
        .error {
            color: red;
            font-size: 0.9em;
        }
        .success {
            color: green;
            font-size: 0.9em;
        }
    </style>
</head>
<body>

<a href="../index.php">
  <button class="back-button"><b>></b></button>
</a>

<div class="login-container">
    <form action="halamansignup.php" method="POST" id="signupForm">
        <div class="form-item">
            <label>Username</label>
            <div class="input-wrapper">
                <input type="text" name="username" id="username" maxlength="16" autocomplete="off" required />
            </div>
        </div>
        
        <div class="form-item">
            <label>Password</label>
            <div class="input-wrapper">
                <input type="password" name="password" id="password" autocomplete="off" required />
            </div>
        </div>

        <div class="form-item">
            <label>Konfirmasi Password</label>
            <div class="input-wrapper">
                <input type="password" name="confirm_password" id="confirm_password" autocomplete="off" required />
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

<script>
    const form = document.getElementById("signupForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");

    form.addEventListener("submit", function(event) {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Clear previous errors
        const errorElement = document.querySelector('.error');
        if (errorElement) errorElement.textContent = "";

        // Validate username length
        if (username.length === 0) {
            event.preventDefault();
            alert("Username tidak boleh kosong!");
            return;
        }

        if (username.length > 16) {
            event.preventDefault();
            alert("Username tidak boleh lebih dari 16 karakter!");
            return;
        }

        // Validate password length
        if (password.length < 8) {
            event.preventDefault();
            alert("Password harus minimal 8 karakter!");
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            event.preventDefault();
            alert("Password dan Konfirmasi Password harus sama!");
        }
    });
</script>

<script src="../BGM/Clicksfx.js"></script>
<script src="bubble/script.js"></script>

</body>
</html>
