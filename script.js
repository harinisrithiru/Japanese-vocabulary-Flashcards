const vocabulary = [
  {
    japanese: "こんにちは",
    hiragana: "こんにちは",
    romaji: "Konnichiwa",
    meaning: "Hello",
    category: "Greetings"
  },
  {
    japanese: "ありがとう",
    hiragana: "ありがとう",
    romaji: "Arigatou",
    meaning: "Thank you",
    category: "Common expressions"
  },
  {
    japanese: "すみません",
    hiragana: "すみません",
    romaji: "Sumimasen",
    meaning: "Excuse me / sorry",
    category: "Common expressions"
  },
  {
    japanese: "おはようございます",
    hiragana: "おはようございます",
    romaji: "Ohayou gozaimasu",
    meaning: "Good morning",
    category: "Greetings"
  },
  {
    japanese: "おやすみなさい",
    hiragana: "おやすみなさい",
    romaji: "Oyasuminasai",
    meaning: "Good night",
    category: "Greetings"
  },
  {
    japanese: "みず",
    hiragana: "みず",
    romaji: "Mizu",
    meaning: "Water",
    category: "Food"
  },
  {
    japanese: "ごはん",
    hiragana: "ごはん",
    romaji: "Gohan",
    meaning: "Rice / meal",
    category: "Food"
  },
  {
    japanese: "パン",
    hiragana: "パン",
    romaji: "Pan",
    meaning: "Bread",
    category: "Food"
  },
  {
    japanese: "たべます",
    hiragana: "たべます",
    romaji: "Tabemasu",
    meaning: "To eat",
    category: "Daily actions"
  },
  {
    japanese: "いきます",
    hiragana: "いきます",
    romaji: "Ikimasu",
    meaning: "To go",
    category: "Daily actions"
  },
  {
    japanese: "かぞく",
    hiragana: "かぞく",
    romaji: "Kazoku",
    meaning: "Family",
    category: "People"
  },
  {
    japanese: "せんせい",
    hiragana: "せんせい",
    romaji: "Sensei",
    meaning: "Teacher",
    category: "People"
  },
  {
    japanese: "がっこう",
    hiragana: "がっこう",
    romaji: "Gakkou",
    meaning: "School",
    category: "Places"
  },
  {
    japanese: "こうえん",
    hiragana: "こうえん",
    romaji: "Kouen",
    meaning: "Park",
    category: "Places"
  },
  {
    japanese: "えき",
    hiragana: "えき",
    romaji: "Eki",
    meaning: "Station",
    category: "Places"
  }
];

const startLearningButton = document.getElementById("start-learning-btn");
const welcomeSection = document.getElementById("welcome-section");
const learningSection = document.getElementById("learning-section");
const quizSection = document.getElementById("quiz-section");
const japaneseWord = document.getElementById("japanese-word");
const hiraganaText = document.getElementById("hiragana-text");
const romajiText = document.getElementById("romaji-text");
const meaningText = document.getElementById("meaning-text");
const categoryText = document.getElementById("category-text");
const progressText = document.getElementById("progress-text");
const showMeaningButton = document.getElementById("show-meaning-btn");
const previousWordButton = document.getElementById("previous-word-btn");
const nextWordButton = document.getElementById("next-word-btn");
const startQuizButton = document.getElementById("start-quiz-btn");
const statusText = document.getElementById("status-text");
const quizQuestionBox = document.getElementById("quiz-question-box");
const quizFeedback = document.getElementById("quiz-feedback");
const quizScore = document.getElementById("quiz-score");
const nextQuestionButton = document.getElementById("next-question-btn");
const tryAgainButton = document.getElementById("try-again-btn");
const backToWelcomeButton = document.getElementById("back-to-welcome-btn");

let currentIndex = 0;
let meaningVisible = false;
let currentQuizIndex = 0;
let score = 0;
let quizFinished = false;

const quizQuestions = [
  {
    question: "What does こんにちは mean?",
    options: ["Good morning", "Hello", "Thank you"],
    correctAnswer: "Hello"
  },
  {
    question: "What is the meaning of みず?",
    options: ["Teacher", "Water", "Park"],
    correctAnswer: "Water"
  },
  {
    question: "What does たべます mean?",
    options: ["To eat", "To go", "To learn"],
    correctAnswer: "To eat"
  },
  {
    question: "What is せんせい in English?",
    options: ["Student", "Teacher", "Family"],
    correctAnswer: "Teacher"
  },
  {
    question: "What does えき mean?",
    options: ["School", "Station", "Rice"],
    correctAnswer: "Station"
  }
];

function updateCard() {
  const word = vocabulary[currentIndex];
  japaneseWord.textContent = word.japanese;
  hiraganaText.textContent = word.hiragana;
  romajiText.textContent = word.romaji;
  meaningText.textContent = word.meaning;
  categoryText.textContent = word.category;
  progressText.textContent = `Word ${currentIndex + 1} of ${vocabulary.length}`;

  meaningVisible = false;
  showMeaningButton.textContent = "Show Meaning";
  romajiText.parentElement.style.display = "none";
  meaningText.parentElement.style.display = "none";
  statusText.textContent = "Tap show meaning to reveal the pronunciation and English meaning.";

  previousWordButton.disabled = currentIndex === 0;
  nextWordButton.disabled = currentIndex === vocabulary.length - 1;
  startQuizButton.classList.toggle("hidden-section", currentIndex !== vocabulary.length - 1);
}

function showMeaning() {
  if (currentIndex >= vocabulary.length) {
    return;
  }

  if (!meaningVisible) {
    meaningVisible = true;
    romajiText.parentElement.style.display = "block";
    meaningText.parentElement.style.display = "block";
    showMeaningButton.textContent = "Hide Meaning";
    statusText.textContent = "Meaning revealed!";
  } else {
    meaningVisible = false;
    romajiText.parentElement.style.display = "none";
    meaningText.parentElement.style.display = "none";
    showMeaningButton.textContent = "Show Meaning";
    statusText.textContent = "Meaning hidden again.";
  }
}

function previousWord() {
  if (currentIndex > 0) {
    currentIndex -= 1;
    updateCard();
  }
}

function nextWord() {
  if (currentIndex < vocabulary.length - 1) {
    currentIndex += 1;
    updateCard();
  }
}

function startLearning() {
  welcomeSection.classList.add("hidden-section");
  learningSection.classList.remove("hidden-section");
}

function startQuiz() {
  learningSection.classList.add("hidden-section");
  quizSection.classList.remove("hidden-section");
  currentQuizIndex = 0;
  score = 0;
  quizFinished = false;
  quizScore.textContent = "Score: 0 / 5";
  nextQuestionButton.classList.add("hidden-section");
  tryAgainButton.classList.add("hidden-section");
  backToWelcomeButton.classList.add("hidden-section");
  quizFeedback.textContent = "";
  showQuizQuestion();
}

function showQuizQuestion() {
  const question = quizQuestions[currentQuizIndex];
  quizQuestionBox.innerHTML = "";
  const questionText = document.createElement("p");
  questionText.className = "question-text";
  questionText.textContent = question.question;
  quizQuestionBox.appendChild(questionText);

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(option, button));
    quizQuestionBox.appendChild(button);
  });
}

function selectAnswer(option, button) {
  if (quizFinished) {
    return;
  }

  const question = quizQuestions[currentQuizIndex];
  const optionButtons = document.querySelectorAll(".option-btn");

  optionButtons.forEach((btn) => {
    btn.classList.remove("selected");
  });

  button.classList.add("selected");

  if (option === question.correctAnswer) {
    score += 1;
    quizFeedback.textContent = "Correct!";
    quizFeedback.className = "quiz-feedback correct";
  } else {
    quizFeedback.textContent = `Incorrect. The correct answer is: ${question.correctAnswer}`;
    quizFeedback.className = "quiz-feedback incorrect";
  }

  quizScore.textContent = `Score: ${score} / 5`;
  nextQuestionButton.classList.remove("hidden-section");
}

function nextQuestion() {
  if (currentQuizIndex < quizQuestions.length - 1) {
    currentQuizIndex += 1;
    quizFeedback.textContent = "";
    quizFeedback.className = "quiz-feedback";
    nextQuestionButton.classList.add("hidden-section");
    showQuizQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizFinished = true;
  quizQuestionBox.innerHTML = "";
  quizFeedback.textContent = "Great job! You finished the quiz!";
  quizFeedback.className = "quiz-feedback correct";
  quizScore.textContent = `Your Score: ${score} / 5`;
  nextQuestionButton.classList.add("hidden-section");
  tryAgainButton.classList.remove("hidden-section");
  backToWelcomeButton.classList.remove("hidden-section");
}

function tryAgain() {
  startQuiz();
}

function backToWelcomePage() {
  quizSection.classList.add("hidden-section");
  learningSection.classList.add("hidden-section");
  welcomeSection.classList.remove("hidden-section");
  currentIndex = 0;
  showMeaningButton.disabled = false;
  nextWordButton.disabled = false;
  previousWordButton.disabled = true;
  startQuizButton.classList.add("hidden-section");
  tryAgainButton.classList.add("hidden-section");
  backToWelcomeButton.classList.add("hidden-section");
  quizFeedback.textContent = "";
  quizFeedback.className = "quiz-feedback";
  updateCard();
}

startLearningButton.addEventListener("click", startLearning);
showMeaningButton.addEventListener("click", showMeaning);
previousWordButton.addEventListener("click", previousWord);
nextWordButton.addEventListener("click", nextWord);
startQuizButton.addEventListener("click", startQuiz);
nextQuestionButton.addEventListener("click", nextQuestion);
tryAgainButton.addEventListener("click", tryAgain);
backToWelcomeButton.addEventListener("click", backToWelcomePage);

updateCard();
