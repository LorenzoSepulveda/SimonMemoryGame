// JavaScript code for game logic
var buttonOrder = [];
var playerOrder = [];
var level = 0;
var gameStarted = false;
var buttons = ['red', 'green', 'blue', 'yellow'];
var audioMap = {
  red: new Audio('sounds/red.mp3'),
  green: new Audio('sounds/green.mp3'),
  blue: new Audio('sounds/blue.mp3'),
  yellow: new Audio('sounds/yellow.mp3'),
  fail: new Audio('sounds/end.mp3')
};
var currentRecord = 0;
var bestRecord = 0;

// Generate a random button and add it to the order
function generateRandomButton() {
  var randomButton = buttons[Math.floor(Math.random() * buttons.length)];
  buttonOrder.push(randomButton);
}

// Show the sequence of buttons to the player
function showSequence() {
  var i = 0;
  var interval = setInterval(function() {
    playButton(buttonOrder[i]);
    highlightButton(buttonOrder[i]);
    i++;
    if (i >= buttonOrder.length) {
      clearInterval(interval);
      playerOrder = [];
    }
  }, 1000);
}

// Play the corresponding sound when a button is clicked
function playButton(buttonId) {
  audioMap[buttonId].play();
}

// Highlight the button by adding a CSS class
function highlightButton(buttonId) {
  var buttonElement = document.getElementById(buttonId);
  buttonElement.classList.add('highlight');
  setTimeout(function() {
    buttonElement.classList.remove('highlight');
  }, 500);
}

// Check if the player's input matches the sequence
function checkPlayerInput() {
  var index = playerOrder.length - 1;
  if (playerOrder[index] !== buttonOrder[index]) {
    endGame();
    return;
  }
  if (playerOrder.length === buttonOrder.length) {
    level++;
    playerOrder = [];
    setTimeout(function() {
      updateRecords();
      nextLevel();
    }, 1000);
  }
}

// Update current and best records
function updateRecords() {
  currentRecord = level - 1;
  if (currentRecord > bestRecord) {
    bestRecord = currentRecord;
  }
  document.getElementById('current-record').textContent = 'Current Record: ' + currentRecord;
  document.getElementById('best-record').textContent = 'Best Record: ' + bestRecord;
}

// Start a new game
function startGame() {
  buttonOrder = [];
  playerOrder = [];
  level = 0;
  gameStarted = true;
  updateRecords();
  nextLevel();
}

// Start the next level of the game
function nextLevel() {
  generateRandomButton();
  showSequence();
  document.getElementById('level').textContent = 'Level: ' + level;
}

// End the game and display the final score
function endGame() {
  playButton('fail');
  alert('Game Over! Your score: ' + (level - 1));
  gameStarted = false;
}

// Event listeners for button clicks
document.getElementById('start-button').addEventListener('click', function() {
  if (!gameStarted) {
    startGame();
  }
});

document.getElementById('game-buttons').addEventListener('click', function(event) {
  if (gameStarted) {
    var buttonId = event.target.id;
    playButton(buttonId);
    playerOrder.push(buttonId);
    checkPlayerInput();
  }
});
