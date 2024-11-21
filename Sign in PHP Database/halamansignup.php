<?php
session_start(); 
include '../db.php';

$error = "";
$success = "";

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['signup'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);

    if ($stmt->rowCount() > 0) {
        $error = "Username already exists!";
    } else {
        $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
        $stmt->execute(['username' => $username, 'password' => $password]);
        $success = "Registration successful! You can now log in.";
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
                <button type="button" id="eyeball">
                    <div class="eye"></div>
                </button>
                <div id="beam"></div>
            </div>
        </div>

        <div class="form-item">
            <label>Confirm Password</label>
            <div class="input-wrapper">
                <input type="password" name="confirm_password" id="confirm_password" autocomplete="off" required />
                <button type="button" id="eyeball">
                    <div class="eye"></div>
                </button>
                <div id="beam"></div>
            </div>
        </div>
        
        <button type="submit" id="submit" name="signup">Sign Up</button>
        <a href="halamansignin.php" class="signuplink">Already have an account?</a>
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
document.getElementById("signup-form").addEventListener("submit", function (event) {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    if (password !== confirmPassword) {
        event.preventDefault();
        alert("Passwords do not match!");
    }
});
</script>
<script src="../BGM/Clicksfx.js"></script>
<script src="halamansignin.js"></script>
<script src="bubble/script.js"></script>

</body>
</html>
