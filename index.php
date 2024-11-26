<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fish n' Go</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <canvas id="bubblesCanvas"></canvas>
    <div class="container">
        <div class="top-right-buttons">
            
            <a href="About/about.html">
                <button class="about-button">About</button>
            </a>

            <a href="leaderboard/leaderboard.php">
                <button class="leaderboard-button">Leader Board</button>
            </a>

            <?php if (isset($_SESSION['username'])): ?>
            <a href="Profil/profil.html">
                <button class="login-button"><?php echo $_SESSION['username']; ?></button>
            </a>
            <?php else: ?>
            <a href="Signin/halamansignin.php">
                <button class="login-button">Log In</button>
            </a>
            <?php endif; ?>
        </div>

        <img src="Image/logo.png" alt="Logo" class="logo">
        <p class="fade-in title">FISH n' GO</p>

        <div class="play-button-container">
            <button class="center-button button1" id="play-button">PLAY</button>
        </div>

        <a href="Us/us.html">
            <button class="us-button">About Us</button>
        </a>

        <div class="music-button">
            <div class="dropdown">
                <button id="menu-button">
                    <i class="fa fa-music"></i>
                </button>
                <div class="dropdown-content" id="dropdown-content">
                    <p>Track List</p>
                    <button id="play-1" value="/BGM/BGM1.mp3"><i class="fa fa-play spasi"></i>Track 1<br></button> 
                    <button id="play-2" value="/BGM/BGM2.mp3"><i class="fa fa-play spasi"></i>Track 2<br></button> 
                    <button id="play-3" value="/BGM/BGM3.mp3"><i class="fa fa-play spasi"></i> Track 3<br></button>
                    <button id="play-4" value="/BGM/BGM4.mp3"><i class="fa fa-play spasi"></i> Track 4<br></button>
                    <button id="play-5" value="/BGM/BGMMIAW.mp3"> <i class="fa fa-play spasi"></i>Track 5<br></button> 
                    <button id="mute">Mute</button>
                </div>
            </div>
        </div>
    </div>

    <audio id="click-sound" src="BGM/mouse.mp3" preload="auto"></audio>
    <script src="BGM/Clicksfx.js"></script>
    <audio id="background-music" src=""></audio>
    <script src="BGM.js"></script>
    <script src="difficulty.js"></script>
    <script src="bubble.js"></script>
</body>
</html>
