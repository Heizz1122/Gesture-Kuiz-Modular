let currentQuestion = 0;
let score = 0;

function showQuestion() {
  const q = quiz[currentQuestion];
  document.getElementById("question-text").textContent = q?.question || "❌ Soalan tak dijumpai.";
  const list = document.getElementById("options-list");
  list.innerHTML = "";

  const gestureIcons = ["✋", "✌️", "☝️", "🤟"];
  q.options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.textContent = `${gestureIcons[i]} ${opt}`;
    list.appendChild(li);
  });
}

function checkAnswer(gestureIndex) {
  const correct = quiz[currentQuestion].answer;
  const feedback = document.getElementById("feedback");

  if (gestureIndex === correct) {
    score++;
    feedback.textContent = "✅ Betul!";
    currentQuestion++;
    if (currentQuestion < quiz.length) {
      setTimeout(() => {
        feedback.textContent = "";
        showQuestion();
      }, 1000);
    } else {
      feedback.textContent = `🎉 Tamat kuiz! Skor anda: ${score}/${quiz.length}`;
    }
  } else {
    feedback.textContent = "❌ Salah, cuba lagi!";
  }
}
