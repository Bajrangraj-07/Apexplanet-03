// quiz questions - array of objects
const questions = [
  {
    question: "Which tag is used to link an external CSS file?",
    options: ["<style>", "<link>", "<css>", "<script>"],
    answer: 1
  },
  {
    question: "Which JS keyword is used to declare a variable that can't be reassigned?",
    options: ["var", "let", "const", "static"],
    answer: 2
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Model",
      "Document Order Model",
      "Digital Object Model"
    ],
    answer: 0
  },
  {
    question: "Which method is used to select an element by its id?",
    options: [
      "document.query()",
      "document.getElementById()",
      "document.findById()",
      "document.selectId()"
    ],
    answer: 1
  },
  {
    question: "Which CSS property makes text bold?",
    options: ["font-style", "text-decoration", "font-weight", "font-bold"],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;
let hasAnswered = false;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const scoreDisplay = document.getElementById("score-display");
const nextBtn = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
  hasAnswered = false;
  const q = questions[currentQuestion];
  questionText.textContent = q.question;

  // purane options hata do
  optionsContainer.innerHTML = "";

  q.options.forEach((optionText, index) => {
    const btn = document.createElement("button");
    btn.textContent = optionText;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => selectOption(index, btn));
    optionsContainer.appendChild(btn);
  });

  scoreDisplay.textContent = "Score: " + score + " / " + questions.length;
}

function selectOption(selectedIndex, btnClicked) {
  if (hasAnswered) return; // ek baar answer karne ke baad dubara nahi
  hasAnswered = true;

  const correctIndex = questions[currentQuestion].answer;
  const allButtons = document.querySelectorAll(".option-btn");

  allButtons.forEach((btn, i) => {
    if (i === correctIndex) {
      btn.classList.add("correct");
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
  } else {
    btnClicked.classList.add("wrong");
  }

  scoreDisplay.textContent = "Score: " + score + " / " + questions.length;
}

nextBtn.addEventListener("click", () => {
  if (!hasAnswered) {
    alert("Pehle koi option select karo!");
    return;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionContainer.classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  resultText.textContent = "You scored " + score + " out of " + questions.length + "!";
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  questionContainer.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  resultContainer.classList.add("hidden");
  loadQuestion();
});

// quiz start
loadQuestion();
