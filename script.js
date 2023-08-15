const words = ["hangman", "javascript", "developer", "programming", "computer"];
const maxGuesses = 6;
let currentWord = "";
let guesses = [];
let wrongGuesses = 0;

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = currentWord
        .split("")
        .map(letter => `<span>${guesses.includes(letter) ? letter : "_"}</span>`)
        .join("");
}

function displayHangman() {
    const hangmanContainer = document.getElementById("hangman");
    hangmanContainer.textContent = `Wrong guesses: ${wrongGuesses}/${maxGuesses}`;
}

function checkWin() {
    if (currentWord.split("").every(letter => guesses.includes(letter))) {
        alert("Congratulations! You've won!");
        resetGame();
    } else if (wrongGuesses === maxGuesses) {
        alert(`Game over! The word was "${currentWord}".`);
        resetGame();
    }
}

function resetGame() {
    currentWord = getRandomWord();
    guesses = [];
    wrongGuesses = 0;
    displayWord();
    displayHangman();
    displayLetterButtons();
}

function handleLetterClick(letter) {
    if (!guesses.includes(letter)) {
        guesses.push(letter);
        if (!currentWord.includes(letter)) {
            wrongGuesses++;
        }
        displayWord();
        displayHangman();
        checkWin();
    }
}

function displayLetterButtons() {
    const keyboardContainer = document.getElementById("keyboard");
    keyboardContainer.innerHTML = "";
    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", () => handleLetterClick(letter));
        keyboardContainer.appendChild(button);
    }
}

function handleKeyInput(event) {
    const pressedKey = event.key.toLowerCase();
    if (/^[a-z]$/.test(pressedKey)) {
        handleLetterClick(pressedKey);
    }
}

document.addEventListener("keydown", handleKeyInput);
resetGame();