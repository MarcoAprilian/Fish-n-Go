<?php
$host = "localhost";
$dbname = "Register";
$user = "postgres";
$password = "password";

try {
    // Establish the connection to the database
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
