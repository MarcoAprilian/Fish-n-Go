const suits = ['D', 'H', 'S', 'C'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const deck = suits.flatMap(suit => ranks.map(rank => ({ id: `${rank}${suit}`, rank, suit })));

let playerHand = [];
let aiHand = [];
let playerScore = 0;
let aiScore = 0;
let skor_gained = 0;

let total_player_skor;
let jumlah_permainan;
let jumlah_menang;

let currentPlayerTurn = 'player';

const cardsound = document.getElementById("card-sound");
function playSound(soundElement) {
    soundElement.currentTime = 0; 
    soundElement.play();         
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function dealCards() {
    shuffle(deck);
    for (let i = 0; i < 7; i++) {
        playerHand.push(deck.pop());
        playSound(cardsound); 
        
        aiHand.push(deck.pop());
        playSound(cardsound); 
    }
    updateDeckCount();
    updateHands();
}

function updateHands() {
    const playerHandDiv = document.getElementById('playerHand');
    const aiHandDiv = document.getElementById('aiHand');

    playerHandDiv.innerHTML = '';
    aiHandDiv.innerHTML = '';

    if (playerHand.length === 0) {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder';
        placeholder.innerText = 'No cards';
        playerHandDiv.appendChild(placeholder);
    } else {
        playerHand.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerHTML = `<img src="../Image/${card.id}.png" alt="${card.id}" style="width:100%; height:100%;">`;

            cardDiv.addEventListener('click', () => {
                if (currentPlayerTurn === 'player') {
                    askForCard(card.rank);
                }
            });

            playerHandDiv.appendChild(cardDiv);
        });
    }

    if (aiHand.length === 0) {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder';
        placeholder.innerText = 'No cards';
        aiHandDiv.appendChild(placeholder);
    } else {
        aiHand.forEach(card => {
            const aiCardDiv = document.createElement('div');
            aiCardDiv.className = 'card';
            aiCardDiv.innerHTML = `<img src="../Image/Kartu-Back.png" style="width:100%; height:100%;">`;

            aiHandDiv.appendChild(aiCardDiv);
        });
    }
}

function askForCard(rank) {
    const cardsTaken = takeCards(aiHand, rank);
    if (cardsTaken.length > 0) {
        playerHand.push(...cardsTaken);
        playSound(cardsound);
        total_player_skor += 5;
        skor_gained += 5;
        updateStatus(`Anda mendapatkan ${cardsTaken.length} ${rank}(s) dari AI! Anda mendapat giliran lagi. Skor +5`);
        autoSaveScore();
    } else {
        goFish('player');
    }
    checkForWin();
    updateHands();
    if (cardsTaken.length === 0) {
        currentPlayerTurn = 'ai';
        setTimeout(aiTurn, 1500);
    }
}

function takeCards(hand, rank) {
    const cardsTaken = hand.filter(card => card.rank === rank);
    
    if (currentPlayerTurn === 'player') {
        aiHand = aiHand.filter(card => card.rank !== rank); 
    } else {
        playerHand = playerHand.filter(card => card.rank !== rank); 
    }

    checkForWin();
    return cardsTaken;
}

function goFish(player) {
    if (deck.length > 0) {
        const newCard = deck.pop();
        if (player === 'player') {
            playerHand.push(newCard);
            playSound(cardsound); 
            updateStatus(`Go Fish! Anda mengambil kartu ${newCard.rank}.`);
        } else {
            aiHand.push(newCard);
            playSound(cardsound); 
            updateStatus(`AI "Go Fish" dan menarik kartu dari dek.`);
        }
    } else {
        updateStatus('Tidak ada lagi kartu di dek.');
        checkForWin();
        endGame();
        return;
    }
    updateDeckCount();
    checkForWin();
    updateHands();
}

function aiTurn() {
    if (aiHand.length === 0 || deck.length === 0) {
        checkForWin();
        return;
    }

    if (deck.length === 1) {
        const newCard = deck.pop();
        aiHand.push(newCard);
        cardsound.currentTime = 0;
        cardsound.play();
        updateStatus(`AI mengambil kartu terakhir dari dek: ${newCard.rank}.`);
        checkForWin();
        return;
    }

    //AI mengambil kartu random
    const randomCard = aiHand[Math.floor(Math.random() * aiHand.length)];
    const rank = randomCard.rank;

    const cardsTaken = takeCards(playerHand, rank);
    if (cardsTaken.length > 0) {
        aiHand.push(...cardsTaken);
        playSound(cardsound);
        updateStatus(`AI menngambil kartu ${rank} dari Anda! AI mendapat giliran lagi.`);
        setTimeout(aiTurn, 1500);
    } else {
        goFish('ai');
        currentPlayerTurn = 'player';
    }
    checkForWin();
    updateHands();
}

function checkForWin() {
    playerHand = checkForFourOfAKind(playerHand, 'player');
    aiHand = checkForFourOfAKind(aiHand, 'ai');

    if (playerHand.length === 0 || aiHand.length === 0 || deck.length === 0) {
        endGame();
        return;
    }
}

function checkForFourOfAKind(hand, owner) {
    const counts = {};
    let newHand = [...hand];

    hand.forEach(card => {
        counts[card.rank] = (counts[card.rank] || 0) + 1;
        if (counts[card.rank] === 4) {
            newHand = newHand.filter(c => c.rank !== card.rank);

            if (owner === 'player') {
                playerScore += 1;
                total_player_skor += 8;
                skor_gained += 8;
                document.getElementById('playerScore').innerText = playerScore;
                updateStatus(`Pemain menyelesaikan 4 jenis: ${card.rank}s! Skor +8`);
            } else {
                aiScore += 1;
                document.getElementById('aiScore').innerText = aiScore;
                updateStatus(`AI menyelesaikan 4 jenis: ${card.rank}s!`);
            }
        }
    });

    autoSaveScore();
    return newHand;
}

function updateStatus(message) {
    document.getElementById('status').innerText = message;
}

function updateDeckCount() {
    document.getElementById('deckRemaining').innerText = deck.length;
}

document.getElementById('playAgainBtn').addEventListener('click', function() {
    location.reload();
});

document.getElementById('mainMenuBtn').addEventListener('click', function() {
    window.location.href = '../index.php';
});

function fetchScore() {
    fetch('get_score.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                total_player_skor = parseInt(data.skor, 10) || 0;
                jumlah_permainan = parseInt(data.jumlah_permainan, 10) || 0;
                jumlah_menang = parseInt(data.jumlah_menang, 10) || 0;
                highscore = parseInt(data.highscore, 10) || 0;
                const winrate = parseFloat(data.winrate) || 0;
                const rank = parseInt(data.rank, 10) || 0;

                updateStatus(`Selamat datang kembali! Skor total: ${total_player_skor}, Peringkat: ${rank}`);
            }
        })
        .catch(error => console.error('Error fetching score:', error));
}

function autoSaveScore() {
    const username = '<?php echo $_SESSION["username"]; ?>';
    const skor = total_player_skor;
    const menang = jumlah_menang; 
    const permainan = jumlah_permainan;
    const skor_tertinggi = highscore;

    const newHighscore = skor_gained > skor_tertinggi ? skor_gained : skor_tertinggi;

    fetch('save_score.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${encodeURIComponent(username)}&skor=${skor}&jumlah_permainan=${permainan}&jumlah_menang=${menang}&highscore=${encodeURIComponent(newHighscore)}`
    })
    .then(response => response.text())
    .then(data => {
        console.log('Score auto-saved:', data);
    })
    .catch(error => {
        console.error('Error auto-saving score:', error);
    });
}


function showEndingScreen(winner) {
    const endingScreen = document.getElementById('endingScreen');
    const resultText = document.getElementById('resultText');

    if (winner === 'player') {
        resultText.textContent = `Kamu menang! Skor yang diperoleh = ${skor_gained}. Skor total: ${total_player_skor}.`;
    } else if (winner === 'ai') {
        resultText.textContent = `Anda Kalah! Skor yang diperoleh = ${skor_gained}. Skor total: ${total_player_skor}.`;
    } else {
        resultText.textContent = `Seri! Skor yang diperoleh = ${skor_gained}. Skor total: ${total_player_skor}.`;
    }

    endingScreen.style.display = 'block';
}

function endGame() {
    let winner = null;

    if (playerScore > aiScore) {
        winner = 'player';
        jumlah_menang += 1;
    } else if (playerScore < aiScore) {
        winner = 'ai';
    }

    jumlah_permainan += 1;

    showEndingScreen(winner);
    autoSaveScore();
}

fetchScore();
dealCards();