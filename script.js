const cardValues = {
    "A": 1, "2": 2, "3": 3, "4": 4, "5": 5,
    "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
    "J": 11, "Q": 12, "K": 13
};

let deck = [];
let playerHand = [];
let opponentHand = [];
let playerPoints = 0;
let opponentPoints = 0;

function generateDeck() {
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    deck = [];
    for (let i = 0; i < 4; i++) {
        deck.push(...ranks);
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function startGame() {
    generateDeck();
    shuffleDeck();
    playerHand = deck.splice(0, 7);
    opponentHand = deck.splice(0, 7);
    playerPoints = 0;
    opponentPoints = 0;

    updateUI();
    document.getElementById('game-area').classList.remove('hidden');
    document.getElementById('start-screen').classList.add('hidden');
}

function updateUI() {
    document.getElementById('player-hand').textContent = playerHand.join(", ");
    document.getElementById('opponent-hand-size').textContent = opponentHand.length;
    document.getElementById('player-points').textContent = playerPoints;
    document.getElementById('opponent-points').textContent = opponentPoints;
    document.getElementById('deck-size').textContent = deck.length;
}

function checkWin() {
    if (deck.length === 0) {
        let winner = playerPoints > opponentPoints ? "You win!" : "Opponent wins!";
        if (playerPoints === opponentPoints) {
            winner = "It's a tie!";
        }
        document.getElementById('end-message').textContent = winner;
        document.getElementById('game-area').classList.add('hidden');
        document.getElementById('end-screen').classList.remove('hidden');
    }
}

function askForCard() {
    const requestedCard = document.getElementById('requested-card').value.toUpperCase();
    if (!cardValues[requestedCard]) {
        showMessage("Invalid card requested.");
        return;
    }

    const opponentCardIndex = opponentHand.indexOf(requestedCard);
    if (opponentCardIndex !== -1) {
        showMessage(`You got the card ${requestedCard} from your opponent!`);
        playerHand.push(requestedCard);
        opponentHand.splice(opponentCardIndex, 1);
        checkForFourOfAKind(playerHand, 'player');
    } else {
        showMessage("GO FISH!");
        const drawnCard = deck.pop();
        if (drawnCard) {
            playerHand.push(drawnCard);
            checkForFourOfAKind(playerHand, 'player');
        } else {
            showMessage("Deck is empty!");
        }
    }
    opponentTurn();
    updateUI();
    checkWin(); // Check for win after player's turn
}

function checkForFourOfAKind(hand, player) {
    const counts = {};
    for (const card of hand) {
        counts[card] = (counts[card] || 0) + 1;
    }

    for (const card in counts) {
        if (counts[card] === 4) {
            showMessage(`${player === 'player' ? 'You' : 'Opponent'} completed a set of ${card}!`);
            if (player === 'player') {
                playerPoints++;
            } else {
                opponentPoints++;
            }
            hand.splice(hand.indexOf(card), 4);
        }
    }
}

function opponentTurn() {
    if (opponentHand.length === 0 || deck.length === 0) return;

    const opponentCard = opponentHand[Math.floor(Math.random() * opponentHand.length)];
    const playerCardIndex = playerHand.indexOf(opponentCard);

    if (playerCardIndex !== -1) {
        showMessage(`Opponent took the card ${opponentCard} from your hand!`);
        opponentHand.push(opponentCard);
        playerHand.splice(playerCardIndex, 1);
        checkForFourOfAKind(opponentHand, 'opponent');
    } else {
        showMessage("Opponent goes fishing!");
        const drawnCard = deck.pop();
        if (drawnCard) {
            opponentHand.push(drawnCard);
            checkForFourOfAKind(opponentHand, 'opponent');
        } else {
            showMessage("Deck is empty!");
        }
    }
    updateUI();
    checkWin(); // Check for win after opponent's turn
}

function showMessage(message) {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.textContent = message;
    setTimeout(() => {
        messagesDiv.textContent = '';
    }, 3000);
}

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('ask-button').addEventListener('click', askForCard);
document.getElementById('play-again-button').addEventListener('click', () => {
    location.reload();
});
