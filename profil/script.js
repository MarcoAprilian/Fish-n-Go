<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profil</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <!-- Profil Header -->
        <header class="profile-header">
            <div class="profile-avatar">
                <!-- Gambar acak akan diganti secara dinamis -->
                <img id="avatar"  alt="Avatar" />
            </div>
            <div class="profile-info">
                <h1>[Nama Pengguna]</h1>
                <p>ID: [ID Pengguna] | Level: [Level Akun]</p>
            </div>
        </header>

        <!-- Statistik Utama -->
        <section class="stats">
            <h2>~Statistik Utama~</h2>
            <div class="hero-stats">
                <div class="hero" >
                    <h3>Total Pertandingan: (berapa kali)</h3>
                    <p>Winrate: [Winrate %]</p>
                    <p>Highscore: [score leaderboard]</p>
                    <p>Tepat Sasaran: [entah gimana]</p>
                </div>
            </div>
        </section>

        <!-- Peringkat -->
        <section class="rank">
            <h2>~Peringkat~</h2>
            <div class="rank-info">
                <p>Rank Saat Ini: [Rank Saat ini di leaderboard 100/100]</p>
            </div>
        </section>
    </div>
    <script src="script.js"></script>
</body>
</html>
