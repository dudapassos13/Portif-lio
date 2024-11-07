let hiddenNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 5;

document.getElementById("guessButton").addEventListener("click", function() {
    const userGuess = parseInt(document.getElementById("userGuess").value);
    const messageElement = document.getElementById("message");
    const attemptsElement = document.getElementById("attempts");
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        messageElement.textContent = "Por favor, insira um número entre 1 e 100.";
        return;
    }

    attemptsLeft--;

    if (userGuess === hiddenNumber) {
        messageElement.textContent = "Parabéns! Você acertou!";
        document.getElementById("guessButton").disabled = true;
        document.getElementById("resetButton").style.display = "block";
    } else if (attemptsLeft === 0) {
        messageElement.textContent = `Fim do jogo! O número era ${hiddenNumber}.`;
        document.getElementById("guessButton").disabled = true;
        document.getElementById("resetButton").style.display = "block"; 
    } else {
        messageElement.textContent = userGuess < hiddenNumber ? 
            "O número é maior!" : 
            "O número é menor!";
        attemptsElement.textContent = attemptsLeft;
    }
});


document.getElementById("resetButton").addEventListener("click", function() {
    hiddenNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 5;
    document.getElementById("message").textContent = "";
    document.getElementById("attempts").textContent = attemptsLeft;
    document.getElementById("userGuess").value = "";
    document.getElementById("guessButton").disabled = false;
    this.style.display = "none"; 
});