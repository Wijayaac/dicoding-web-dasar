//inisialiasi variabel untuk menampung elemen dokumen
const localTotalVictoryField = document.getElementById(
  "local-total-victory-field"
);
const localMaximumAttempField = document.getElementById(
  "local-maximum-attemp-field"
);
const destroyDataButton = document.getElementById("destroy-data-button");
const playButton = document.getElementById("play-button");
const beforeGameDisplay = document.getElementById("before-game-display");
const duringGameDisplay = document.getElementById("during-game-display");
const afterGameDisplay = document.getElementById("after-game-display");
const answerButton1 = document.getElementById("answer-1-button");
const answerButton2 = document.getElementById("answer-2-button");
const answerButton3 = document.getElementById("answer-3-button");
const sessionUserAnswerField = document.getElementById(
  "session-user-answer-field"
);
const sessionUserWrongAnswerField = document.getElementById(
  "session-user-wrong-answer-field"
);
const sessionTrueAnswerField = document.getElementById(
  "session-true-answer-field"
);
const sessionUserAttempsField = document.getElementById(
  "session-user-attemps-amount-field"
);

//inisialisasi fungsi untuk menghasilkan jawaban permainan
function getAnswer() {
  let answer = "123".split("");
  for (let i = 0; i < answer.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = answer[i];
    answer[i] = answer[j];
    answer[j] = tmp;
  }
  return answer.join("");
}

//inisialiasi key untuk session storage
const sessionAnswerKey = "SESSION_ANSWER";
const sessionUserAttempsKey = "SESSION_USER_ATTEMPS";
const sessionUserIsPlayingKey = "SESSION_USER_IS_PLAYING";

//inisialisasi key untuk local storage
const localTotalVictoryKey = "LOCAL_TOTAL_VICTORIES_PLAYED";
const localMaximumAttempsKey = "LOCAL_MAXIMUM_ATTEMPTS";

document.addEventListener("DOMContentLoaded", () => {
  if (typeof Storage !== "undefined") {
    // inisialisasi semua item web storage yang kita akan gunakan jika belum ada
    if (sessionStorage.getItem(sessionAnswerKey) === null) {
      sessionStorage.setItem(sessionAnswerKey, "");
    }
    if (sessionStorage.getItem(sessionUserAttempsKey) === null) {
      sessionStorage.setItem(sessionUserAttempsKey, 0);
    }
    if (sessionStorage.getItem(sessionUserIsPlayingKey) === null) {
      sessionStorage.setItem(sessionUserIsPlayingKey, false);
    }
    if (localStorage.getItem(localTotalVictoryKey) === null) {
      localStorage.setItem(localTotalVictoryKey, 0);
    }
    if (localStorage.getItem(localMaximumAttempsKey) === null) {
      localStorage.setItem(localMaximumAttempsKey, 0);
    }
  } else {
    alert("Browser yang Anda gunakan tidak mendukung Web Storage");
  }

  // Init value of each field from web storage
  sessionUserAttempsField.innerText = sessionStorage.getItem(
    sessionUserAttempsField
  );
  localTotalVictoryField.innerText = localStorage.getItem(localTotalVictoryKey);
  localMaximumAttempField.innerText = localStorage.getItem(
    localMaximumAttempsKey
  );

  // Button listener
  playButton.addEventListener("click", () => {
    sessionStorage.setItem(sessionAnswerKey, getAnswer());
    sessionStorage.setItem(sessionUserIsPlayingKey, true);
    beforeGameDisplay.setAttribute("hidden", true);
    duringGameDisplay.removeAttribute("hidden");
  });
  answerButton1.addEventListener("click", () => {
    sessionUserAnswerField.innerText += "1";
    if (sessionUserAnswerField.innerText.length == 3) {
      checkAnswer(sessionUserAnswerField.innerText);
    }
  });
  answerButton2.addEventListener("click", () => {
    sessionUserAnswerField.innerText += "2";
    if (sessionUserAnswerField.innerText.length == 3) {
      checkAnswer(sessionUserAnswerField.innerText);
    }
  });

  answerButton3.addEventListener("click", () => {
    sessionUserAnswerField.innerText += "3";
    if (sessionUserAnswerField.innerText.length == 3) {
      checkAnswer(sessionUserAnswerField.innerText);
    }
  });
});

const checkAnswer = (userGuess) => {
  const answer = sessionStorage.getItem(sessionAnswerKey);
  if (userGuess == answer) {
    duringGameDisplay.setAttribute("hidden", false);
    afterGameDisplay.removeAttribute("hidden");
    sessionTrueAnswerField.innerText = answer;
    updateScore();
  } else {
    const previousAttempAmount = parseInt(
      sessionStorage.getItem(sessionUserAttempsKey)
    );
    sessionStorage.setItem(sessionUserAttempsKey, previousAttempAmount + 1);
    sessionUserAttempsField.innerText = sessionStorage.getItem(
      sessionUserAttempsKey
    );
    sessionUserAnswerField.innerText = "";
    sessionUserWrongAnswerField.innerText = userGuess;
  }
};

const updateScore = () => {
  const sessionAttempsValue = parseInt(
    sessionStorage.getItem(sessionUserAttempsKey)
  );
  const loaclAttempsValue = parseInt(
    localStorage.getItem(localMaximumAttempsKey)
  );
  if (sessionAttempsValue > loaclAttempsValue) {
    localStorage.setItem(localMaximumAttempsKey, sessionAttempsValue);
    localMaximumAttempField.innerText = sessionAttempsValue;
  }

  const previousTotalVictoryAmount = parseInt(
    localStorage.getItem(localTotalVictoryKey)
  );
  localStorage.setItem(localTotalVictoryKey, previousTotalVictoryAmount + 1);
  localTotalVictoryField.innerText = localStorage.getItem(localTotalVictoryKey);
};

window.addEventListener("beforeunload", () => {
  sessionUserAnswerField.innerText = "";
  sessionUserWrongAnswerField.innerText = "";
  sessionStorage.setItem(sessionUserAttempsKey, 0);
  sessionUserAttempsField.innerText = sessionStorage.getItem(
    sessionUserAttempsKey
  );
});

destroyDataButton.addEventListener("click", function () {
  sessionStorage.removeItem(sessionAnswerKey);
  sessionStorage.removeItem(sessionUserAttempsKey);
  sessionStorage.removeItem(sessionUserIsPlayingKey);
  localStorage.removeItem(localTotalVictoryKey);
  localStorage.removeItem(localMaximumAttempsKey);
  alert("Data permainan sebelumnya sudah terhapus");
  window.location.reload();
});
