<?php
// Start the session to track the user's login status
session_start(); 

// Ensure the user is logged in by checking the session
if (!isset($_SESSION['username'])) {
    echo 'Error: User not logged in!';
    exit;
}

// Include the database connection
include '../db.php';

// Retrieve username and score from POST data
$username = $_SESSION['username'];  // This will get the logged-in user's username
$skor = $_POST['skor'];  // Score sent from JavaScript

// Update the user's score in the database
$stmt = $pdo->prepare("UPDATE users SET skor = :skor WHERE username = :username");
$stmt->execute(['skor' => $skor, 'username' => $username]);

// Send a response back to the client (JavaScript)
echo "Score updated successfully!";
?>
