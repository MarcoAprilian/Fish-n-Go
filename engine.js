// Deck of cards (simplified)
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = [];

// Hands for player and computer
let playerHand = [];
let computerHand = [];

// Game elements
const playerCardsElement = document.getElementById('playerCards');
const computerCardsElement = document.getElementById('computerCards');
const playerGuessElement = document.getElementById('playerGuess');
const gameResultElement = document.getElementById('gameResult');
const askButton = document.getElementById('askButton');

// Initialize deck
function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    shuffleDeck();
}

// Shuffle deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Deal cards to players
function dealCards() {
    playerHand = deck.splice(0, 7);
    computerHand = deck.splice(0, 7);
    updateHands();
}

// Update hands on the page
function updateHands() {
    playerCardsElement.innerHTML = '';
    computerCardsElement.innerHTML = '';
    playerGuessElement.innerHTML = '';
    
    // Player's cards
    playerHand.forEach((card, index) => {
        const li = document.createElement('li');
        li.textContent = `${card.value} of ${card.suit}`;
        playerCardsElement.appendChild(li);
        
        // Add to player guess dropdown
        const option = document.createElement('option');
        option.value = card.value;
        option.textContent = card.value;
        playerGuessElement.appendChild(option);
    });
    
    // Computer's cards (hidden)
    computerHand.forEach(() => {
        const li = document.createElement('li');
        li.textContent = '???';
        computerCardsElement.appendChild(li);
    });
}

// Handle player asking for a card
askButton.addEventListener('click', () => {
    const playerGuess = playerGuessElement.value;
    const computerHasCard = computerHand.some(card => card.value === playerGuess);
    
    if (computerHasCard) {
        gameResultElement.textContent = `Computer has ${playerGuess}! You get another turn.`;
        transferCard(playerGuess, computerHand, playerHand);
    } else {
        gameResultElement.textContent = `Go Fish! Drawing a card...`;
        drawCard(playerHand);
    }
    
    computerTurn();
    updateHands();
});

// Computer's turn
function computerTurn() {
    const computerGuess = values[Math.floor(Math.random() * values.length)];
    const playerHasCard = playerHand.some(card => card.value === computerGuess);
    
    if (playerHasCard) {
        gameResultElement.textContent += ` Computer asked for ${computerGuess} and got it!`;
        transferCard(computerGuess, playerHand, computerHand);
    } else {
        gameResultElement.textContent += ` Computer asked for ${computerGuess} but didn't get it. Computer goes fishing.`;
        drawCard(computerHand);
    }
}

// Transfer card between hands
function transferCard(value, fromHand, toHand) {
    const index = fromHand.findIndex(card => card.value === value);
    if (index !== -1) {
        const [card] = fromHand.splice(index, 1);
        toHand.push(card);
    }
}

// Draw card from deck
function drawCard(hand) {
    if (deck.length > 0) {
        const card = deck.pop();
        hand.push(card);
    } else {
        gameResultElement.textContent += ' No more cards to draw!';
    }
}

// Initialize game
createDeck();
dealCards();
