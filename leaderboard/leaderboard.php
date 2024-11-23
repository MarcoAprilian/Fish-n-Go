<?php
session_start();
include '../db.php';

// Fetch top 3
$sql_top_three = "
    SELECT username, skor, rank
    FROM (
        SELECT username, skor,
               RANK() OVER (ORDER BY skor DESC) AS rank
        FROM users
    ) AS ranked
    WHERE rank <= 3
    ORDER BY CASE 
        WHEN rank = 2 THEN 1
        WHEN rank = 1 THEN 2
        WHEN rank = 3 THEN 3 
    END
";
$result_top_three = $pdo->query($sql_top_three);

if (!$result_top_three) {
    echo "An error occurred while fetching the top three.";
    exit;
}

// Fetch remaining 4-10
$sql_remaining = "
    SELECT username, skor, rank
    FROM (
        SELECT username, skor,
               RANK() OVER (ORDER BY skor DESC) AS rank
        FROM users
    ) AS ranked
    WHERE rank > 3
    ORDER BY rank
";
$result_remaining = $pdo->query($sql_remaining);

if (!$result_remaining) {
    echo "An error occurred while fetching the remaining leaderboard.";
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <a href="../index.php">
        <button class="back-button"><b>></b></button>
    </a>

    <div class="leaderboard">
        <div class="inner-leaderboard">
            <h1 class="Teks-leaderboard">&#x1F3C6; LEADERBOARD <span>&#x1F3C6;</span></h1>

            <div class="top-three">
                <?php
                $top_three = [];
                while ($row = $result_top_three->fetch(PDO::FETCH_ASSOC)) {
                    if (isset($row['rank'])) {
                        $top_three[$row['rank']] = $row;
                    }
                }

                $order = [2, 1, 3];
                foreach ($order as $rank) {
                    if (isset($top_three[$rank])) {
                        $medal = $rank === 1 ? '&#x1F947;' : ($rank === 2 ? '&#x1F948;' : '&#x1F949;');
                        echo "<div class='rank" . $rank . "_rank'>";
                        echo "<div class='nama'><h1>" . htmlspecialchars($top_three[$rank]['username']) . "</h1></div>";
                        echo "<div class='spot " . ($rank == 1 ? 'first' : ($rank == 2 ? 'second' : 'third')) . "'>";
                        echo $medal . " <div class='inner-spot'>&#x1F3C6;<p>" . htmlspecialchars($top_three[$rank]['skor']) . "</p></div>";
                        echo "</div></div>";
                    }
                }
                ?>
            </div>

            <ol type="1" class="remaining">
                <?php
                $rank_number = 4;
                while ($row = $result_remaining->fetch(PDO::FETCH_ASSOC)) {
                    echo "<li>"; 
                    echo "<div class='name'>" . htmlspecialchars($rank_number) . ". " . htmlspecialchars($row['username']) . "</div>";
                    echo "<div class='skor'>Skor: " . htmlspecialchars($row['skor']) . "</div>";
                    echo "</li>";
                    $rank_number++; 
                }
                ?>
            </ol>
        </div>
    </div>

    <audio id="click-sound" src="/BGM/mouse.mp3" preload="auto"></audio>
    <script src="../BGM/Clicksfx.js"></script>
</body>
</html>
