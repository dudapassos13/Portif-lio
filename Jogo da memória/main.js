
let board;
let attempts = 0;
let selectedCards = [];
let matchedPairs = 0;
let history = []; 
const images = [
  "images/card1.png", "images/card1.png",
  "images/card2.png", "images/card2.png",
  "images/card3.jpg", "images/card3.jpg"
];


function shuffleCards() {
  const shuffledImages = [...images];
  for (let i = shuffledImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
  }
  return shuffledImages;
}


function renderBoard() {
  const shuffledImages = shuffleCards(); 
  board.innerHTML = ""; 

  shuffledImages.forEach((image, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", index);
    const img = document.createElement("img");
    img.setAttribute("src", image);
    card.appendChild(img);
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}


function flipCard() {
  if (selectedCards.length === 2) return;

  const card = this;
  card.classList.add("flipped");
  selectedCards.push(card);

  if (selectedCards.length === 2) {
    checkForMatch();
  }
}


function checkForMatch() {
  const [card1, card2] = selectedCards;
  const img1 = card1.querySelector("img").src;
  const img2 = card2.querySelector("img").src;

  attempts++;
  document.getElementById("attempts").textContent = `Tentativas: ${attempts}`;

  if (img1 === img2) {
    matchedPairs++;
    selectedCards = [];

    if (matchedPairs === images.length / 2) {
      document.getElementById("message").textContent = "PARABÉNS! Você encontrou todos os pares!";
      saveAttempt();
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      selectedCards = [];
    }, 1000);
  }
}


function saveAttempt() {
  history.push(attempts); 
  updateHistory();
}


function updateHistory() {
  const historyList = document.getElementById("history");
  historyList.innerHTML = ""; 
  

  history.forEach((attempt, index) => {
    const li = document.createElement("li");
    li.textContent = `Rodada ${index + 1}: ${attempt} tentativas`;
    historyList.appendChild(li);
  });
}


function restartGame() {
  attempts = 0;
  matchedPairs = 0;
  selectedCards = [];
  document.getElementById("message").textContent = "";
  document.getElementById("attempts").textContent = `Tentativas: ${attempts}`;
  
  renderBoard();
}


document.addEventListener("DOMContentLoaded", () => {
  board = document.getElementById("board");
  renderBoard();

  document.getElementById("restartButton").addEventListener("click", restartGame); // Reinicia o jogo ao clicar no botão

  
  updateHistory();
});
