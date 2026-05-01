let questions = [];
let index = 0;
let score = 0;
let selected = null;

document.getElementById("startBtn").onclick = async () => {
  questions = await fetch("questions.json").then(r => r.json());
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  showQuestion();
};

function showQuestion() {
  const q = questions[index];
  document.getElementById("questionText").textContent = q.text;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.choices.forEach((choice, i) => {
    const div = document.createElement("div");
    div.textContent = choice;
    div.className = "choice";
    div.onclick = () => selectChoice(div, i);
    choicesDiv.appendChild(div);
  });
}

function selectChoice(div, i) {
  document.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
  div.classList.add("selected");
  selected = i;
  document.getElementById("nextBtn").classList.remove("hidden");
}

document.getElementById("nextBtn").onclick = () => {
  if (selected === questions[index].answer) score++;

  index++;
  selected = null;

  if (index >= questions.length) {
    showResult();
  } else {
    document.getElementById("nextBtn").classList.add("hidden");
    showQuestion();
  }
};

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("scoreText").textContent =
    `${questions.length}問中 ${score}問正解`;
}
