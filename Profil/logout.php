<?php
session_start();

// Menghapus semua data sesi
session_unset();

// Menghancurkan sesi
session_destroy();

header('Location: ../Signin/halamansignin.php');
exit();
?>
