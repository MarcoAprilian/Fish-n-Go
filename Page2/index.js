const cardsound = document.getElementById("card-sound");
const suits = ['D', 'H', 'S', 'C'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];


const deck = suits.flatMap(suit => ranks.map(rank => ({ id: `${rank}${suit}`, rank, suit })));
let playerHand = [];
let aiHand = [];
let playerScore = 0;
let aiScore = 0;
let total_player_skor = 0;
let currentPlayerTurn = 'player'; 
let moveHistory = [];

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
        cardsound.currentTime = 0; // Reset time to start the sound from the beginning
        cardsound.play();
        
        aiHand.push(deck.pop());
        cardsound.currentTime = 0; // Reset time to start the sound from the beginning
        cardsound.play();
    }
    updateDeckCount();
    updateHands();
}    

function updateHands() {
    const playerHandDiv = document.getElementById('playerHand');
    const aiHandDiv = document.getElementById('aiHand');
    
    playerHandDiv.innerHTML = '';
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

    aiHandDiv.innerHTML = '';
    aiHand.forEach(() => {
        const aiCardDiv = document.createElement('div');
        aiCardDiv.className = 'card';
        aiCardDiv.innerHTML = `<img src="../Image/Kartu-Back.png" style="width:100%; height:100%;">`;
        
        aiHandDiv.appendChild(aiCardDiv);
    });
}

function askForCard(rank) {
    const cardsTaken = takeCards(aiHand, rank);
    if (cardsTaken.length > 0) {
        playerHand.push(...cardsTaken);
        cardsound.currentTime = 0; // Reset time to start the sound from the beginning
        cardsound.play();
        updateMoveHistory(`Player took ${cardsTaken.length} ${rank}(s) from AI.`);
        updateStatus(`You got ${cardsTaken.length} ${rank}(s) from AI! You get another turn.`);
        total_player_skor += 5;
    } else {
        goFish('player');
    }
    checkForWin();
    updateHands();
    if (cardsTaken.length === 0) {
        currentPlayerTurn = 'ai';
        setTimeout(aiTurn, 2000);
    }
}

function takeCards(hand, rank) {
    const cardsTaken = hand.filter(card => card.rank === rank);
    hand = hand.filter(card => card.rank !== rank);  // Remove card yang diambe
    if (currentPlayerTurn === 'player') {
        aiHand = hand;
    } else {
        playerHand = hand;
    }
    return cardsTaken;
}

function goFish(player) {
    if (deck.length > 0) {
        const newCard = deck.pop();
        if (player === 'player') {
            playerHand.push(newCard);
            cardsound.currentTime = 0; // Reset time to start the sound from the beginning
            cardsound.play();
            updateMoveHistory(`Player went fishing and drew a ${newCard.rank}.`);
            updateStatus(`Go Fish! You drew a ${newCard.rank}.`);
        } else {
            aiHand.push(newCard);
            cardsound.currentTime = 0; // Reset time to start the sound from the beginning
            cardsound.play();
            updateMoveHistory(`AI went fishing and drew a card.`);
            updateStatus(`AI says "Go Fish" and draws a card.`);
        }
    } else {
        updateStatus('No more cards in the deck.');
    }
    updateDeckCount();
    checkForWin();
    updateHands();
}

function aiTurn() {
    if (aiHand.length === 0 || deck.length === 0) return;

    const randomCard = aiHand[Math.floor(Math.random() * aiHand.length)];
    const rank = randomCard.rank;

    const cardsTaken = takeCards(playerHand, rank);
    if (cardsTaken.length > 0) {
        aiHand.push(...cardsTaken);
        cardsound.currentTime = 0; // Reset time to start the sound from the beginning
        cardsound.play();
        updateMoveHistory(`AI took ${cardsTaken.length} ${rank}(s) from Player.`);
        updateStatus(`AI took your ${rank}(s)! AI gets another turn.`);
        setTimeout(aiTurn, 2000);
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
    }
}

function checkForFourOfAKind(hand, owner) {
    const counts = {};
    let newHand = [...hand];

    hand.forEach(card => {
        counts[card.rank] = (counts[card.rank] || 0) + 1;
        if (counts[card.rank] === 4) {
            updateStatus(`${owner === 'player' ? 'You' : 'AI'} completed 4 of a kind: ${card.rank}s!`);
            newHand = newHand.filter(c => c.rank !== card.rank);  // Remove set 4 of a kind
            
            if (owner === 'player') {
                playerScore += 1;
                total_player_skor += 8;
                document.getElementById('playerScore').innerText = playerScore;
                updateMoveHistory(`Player completed a set of ${card.rank}s.`);
            } else {
                aiScore += 1;
                document.getElementById('aiScore').innerText = aiScore;
                updateMoveHistory(`AI completed a set of ${card.rank}s.`);
            }
        }
    });
    return newHand;
}

function updateMoveHistory(message) {
    const historyLog = document.getElementById('historyLog');
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerText = message;
    // historyLog.appendChild(historyItem);        utk ngeluarin ke html/website
    // historyLog.scrollTop = historyLog.scrollHeight;
}

function updateStatus(message) {
    document.getElementById('status').innerText = message;
}

function updateDeckCount() {
    document.getElementById('deckRemaining').innerText = deck.length;
}

document.getElementById('playAgainBtn').addEventListener('click', function() {
    location.reload(); // Refresh the page
});

document.getElementById('mainMenuBtn').addEventListener('click', function() {
    window.location.href = '../index.php';
});

function saveScoreToLeaderboard() {
   const username = '<?php echo $_SESSION["username"]; ?>';
   const skor = total_player_skor;

   fetch('save_score.php', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: `username=${encodeURIComponent(username)}&skor=${skor}`
   })
   .then(response => response.text())
   .then(data => {
       alert(data); // Show response message
   })
   .catch(error => {
       console.error('Error:', error);
   });
}

document.getElementById('saveScore').addEventListener('click', saveScoreToLeaderboard);

function endGame() {
    const winner = playerScore > aiScore ? 'player' : (aiScore > playerScore ? 'ai' : 'tie');
    showEndingScreen(winner === 'player');
    updateStatus(`Game over! ${winner}`);
    currentPlayerTurn = null;
}

function showEndingScreen(win) {
    const endingScreen = document.getElementById('endingScreen');
    const resultText = document.getElementById('resultText');

    resultText.textContent = win ? 'You Win!' : 'You Lose!';
    endingScreen.style.display = 'flex';
}

// Start the game
dealCards();
