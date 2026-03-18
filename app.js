const caseData = {
  suspects: [
    {
      name: "アオイ",
      role: "時計台の見習い整備士",
      hint: "時計の部品に詳しく、夜も塔の近くにいた。"
    },
    {
      name: "レン",
      role: "星祭りの司会者",
      hint: "会場アナウンスで忙しかったが、展示室にも出入りできた。"
    },
    {
      name: "ユナ",
      role: "移動図書館の係",
      hint: "記録をきっちり残す性格で、祭りのパンフレットを配っていた。"
    },
    {
      name: "ソラ",
      role: "屋台の発明好き",
      hint: "磁石や仕掛けで遊ぶのが好き。時計塔の真下で出店していた。"
    }
  ],
  clues: [
    {
      title: "手がかり1: 止まった針",
      summary: "時計塔の長い針には、油ではなく甘いシロップが少し付いていた。",
      effect: "屋台の近くでしか付かない痕跡だ。"
    },
    {
      title: "手がかり2: 図書館の貸出記録",
      summary: "午後6時40分にユナが展示室の見回り記録を残している。",
      effect: "午後7時ぴったりの犯行だとユナは犯人ではなさそう。"
    },
    {
      title: "手がかり3: 消えた放送原稿",
      summary: "レンの原稿には午後6時55分から7時10分まで連続で司会する予定が書かれていた。",
      effect: "レンも展示室を離れにくい。"
    },
    {
      title: "手がかり4: 磁石つきの模型箱",
      summary: "ソラの屋台の模型箱の底に、星形ペンダントがくっつく強力磁石が見つかった。",
      effect: "時計の針を止める仕掛けにも使えそうだ。"
    }
  ],
  solution: {
    culprit: "ソラ",
    time: "午後6時50分",
    place: "模型箱の底"
  }
};

const missionDeck = [
  {
    id: "math-clock",
    subject: "算数",
    title: "時計塔の時こくを見ぬけ",
    story: "時計の長い針が10をさしている。短い針が6と7のあいだのとき、正しい時こくはどれ？",
    prompt: "正しい時こくをえらぼう。",
    choices: ["6時10分", "6時50分", "7時10分", "7時50分"],
    answer: "6時50分",
    explanation: "長い針が10なら50分。短い針が6と7の間だから6時台です。"
  },
  {
    id: "jp-note",
    subject: "国語",
    title: "証言メモの主語を見つける",
    story: "次の文で『展示室の前で待っていた』のはだれ？ 主語を正しく読み取ろう。",
    prompt: "『レンは司会に向かい、ソラは展示室の前で待っていた。』",
    choices: ["レン", "ソラ", "司会", "展示室"],
    answer: "ソラ",
    explanation: "『ソラは』のあとに続く行動が『展示室の前で待っていた』です。"
  },
  {
    id: "en-clue",
    subject: "英語",
    title: "英語メモを解読する",
    story: "展示室のメモに英語で『The pendant is under the box.』と書かれていた。",
    prompt: "この文の意味として正しいものをえらぼう。",
    choices: ["ペンダントは箱の上にある。", "ペンダントは箱の下にある。", "箱はペンダントの中にある。", "ペンダントは箱の横にある。"],
    answer: "ペンダントは箱の下にある。",
    explanation: "'under' は『下に』という意味です。"
  },
  {
    id: "math-pattern",
    subject: "算数",
    title: "暗号の数列を読む",
    story: "見張り番のメモには 2, 4, 8, 16, ? と書かれていた。次に入る数を見つけよう。",
    prompt: "続きに入る数は？",
    choices: ["18", "24", "32", "34"],
    answer: "32",
    explanation: "2倍ずつ増えているので 16 の次は 32 です。"
  },
  {
    id: "jp-order",
    subject: "国語",
    title: "できごとの順番を並べる",
    story: "『放送が始まる前に、アオイは時計を見上げた。』この文で先に起きたのはどれ？",
    prompt: "先に起きたできごとをえらぼう。",
    choices: ["放送が始まった", "アオイが時計を見上げた", "時計が止まった", "展示室が閉まった"],
    answer: "アオイが時計を見上げた",
    explanation: "『前に』とあるので、アオイが時計を見上げたのが先です。"
  },
  {
    id: "en-time",
    subject: "英語",
    title: "時刻の英語を読む",
    story: "祭りの予定表に『The show starts at seven ten.』とある。",
    prompt: "この予定の時こくはどれ？",
    choices: ["7時01分", "7時10分", "7時17分", "10時07分"],
    answer: "7時10分",
    explanation: "'seven ten' は 7時10分です。"
  }
];

const state = {
  screen: "home",
  spark: 0,
  streak: 0,
  answeredInCycle: 0,
  unlockedClues: 0,
  selectedAnswer: null,
  activeMissionIndex: 0,
  deductionUnlocked: false
};

const elements = {
  navButtons: document.querySelectorAll(".nav-button"),
  screens: {
    home: document.getElementById("homeScreen"),
    investigation: document.getElementById("investigationScreen"),
    deduction: document.getElementById("deductionScreen")
  },
  suspectList: document.getElementById("suspectList"),
  notebookPreview: document.getElementById("notebookPreview"),
  sparkValue: document.getElementById("sparkValue"),
  clueValue: document.getElementById("clueValue"),
  rankValue: document.getElementById("rankValue"),
  progressBadge: document.getElementById("progressBadge"),
  nextReward: document.getElementById("nextReward"),
  missionTitle: document.getElementById("missionTitle"),
  missionSubject: document.getElementById("missionSubject"),
  missionStory: document.getElementById("missionStory"),
  questionCard: document.getElementById("questionCard"),
  feedbackCard: document.getElementById("feedbackCard"),
  submitAnswerButton: document.getElementById("submitAnswerButton"),
  nextQuestionButton: document.getElementById("nextQuestionButton"),
  streakValue: document.getElementById("streakValue"),
  changeMissionButton: document.getElementById("changeMissionButton"),
  clueBoard: document.getElementById("clueBoard"),
  clueBoardBadge: document.getElementById("clueBoardBadge"),
  deductionLock: document.getElementById("deductionLock"),
  culpritSelect: document.getElementById("culpritSelect"),
  timeSelect: document.getElementById("timeSelect"),
  placeSelect: document.getElementById("placeSelect"),
  solveCaseButton: document.getElementById("solveCaseButton"),
  solutionCard: document.getElementById("solutionCard"),
  startMissionButton: document.getElementById("startMissionButton")
};

function renderSuspects() {
  elements.suspectList.innerHTML = caseData.suspects
    .map(
      (suspect) => `
        <article class="suspect-card">
          <h3>${suspect.name}</h3>
          <p>${suspect.hint}</p>
          <span class="suspect-meta">${suspect.role}</span>
        </article>
      `
    )
    .join("");
}

function renderNotebook() {
  const notes = [];
  if (state.spark === 0) {
    notes.push({
      title: "調査スタート",
      body: "まずは3問解いて、最初の手がかりを見つけよう。"
    });
  }

  caseData.clues.slice(0, state.unlockedClues).forEach((clue, index) => {
    notes.push({
      title: `メモ ${index + 1}`,
      body: `${clue.summary} ${clue.effect}`
    });
  });

  elements.notebookPreview.innerHTML = notes
    .map(
      (note) => `
        <article class="note-card">
          <h3>${note.title}</h3>
          <p>${note.body}</p>
        </article>
      `
    )
    .join("");
}

function renderStatus() {
  const progress = Math.round((state.unlockedClues / caseData.clues.length) * 100);
  elements.sparkValue.textContent = String(state.spark);
  elements.clueValue.textContent = `${state.unlockedClues} / ${caseData.clues.length}`;
  elements.streakValue.textContent = String(state.streak);
  elements.progressBadge.textContent = `${progress}%`;
  elements.clueBoardBadge.textContent = `${state.unlockedClues} / ${caseData.clues.length}`;
  elements.nextReward.textContent = `次の手がかりまであと${Math.max(0, 3 - state.answeredInCycle)}問`;

  if (state.unlockedClues >= 4) {
    elements.rankValue.textContent = "名探偵候補";
  } else if (state.unlockedClues >= 2) {
    elements.rankValue.textContent = "調査エース";
  } else {
    elements.rankValue.textContent = "見習い探偵";
  }

  elements.deductionLock.textContent = state.deductionUnlocked
    ? "すべての手がかりがそろった"
    : "手がかりを4つ集めると解放";
}

function setScreen(screen) {
  state.screen = screen;
  Object.entries(elements.screens).forEach(([key, node]) => {
    node.classList.toggle("active", key === screen);
  });
  elements.navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.screen === screen);
  });
}

function getCurrentMission() {
  return missionDeck[state.activeMissionIndex];
}

function renderMission() {
  const mission = getCurrentMission();
  elements.missionTitle.textContent = mission.title;
  elements.missionSubject.textContent = mission.subject;
  elements.missionStory.textContent = mission.story;
  elements.feedbackCard.className = "feedback-card hidden";
  elements.feedbackCard.innerHTML = "";
  elements.submitAnswerButton.disabled = false;
  elements.submitAnswerButton.textContent = "回答する";
  elements.nextQuestionButton.classList.add("hidden");
  state.selectedAnswer = null;

  const choices = mission.choices
    .map(
      (choice, index) => `
        <button class="choice-button" data-choice="${choice}">
          ${String.fromCharCode(65 + index)}. ${choice}
        </button>
      `
    )
    .join("");

  elements.questionCard.innerHTML = `
    <p class="question-label">${mission.subject} Mission</p>
    <p class="question-text">${mission.prompt}</p>
    <div class="choice-grid">${choices}</div>
  `;

  elements.questionCard.querySelectorAll(".choice-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedAnswer = button.dataset.choice;
      elements.questionCard.querySelectorAll(".choice-button").forEach((choiceButton) => {
        choiceButton.classList.toggle("selected", choiceButton === button);
      });
    });
  });
}

function unlockClueIfNeeded() {
  if (state.answeredInCycle < 3) {
    return null;
  }

  state.answeredInCycle = 0;

  if (state.unlockedClues < caseData.clues.length) {
    const unlockedClue = caseData.clues[state.unlockedClues];
    state.unlockedClues += 1;
    if (state.unlockedClues === caseData.clues.length) {
      state.deductionUnlocked = true;
    }
    return unlockedClue;
  }

  return null;
}

function showFeedback(type, title, body) {
  elements.feedbackCard.className = `feedback-card ${type}`;
  elements.feedbackCard.innerHTML = `<strong>${title}</strong><p>${body}</p>`;
}

function submitAnswer() {
  const mission = getCurrentMission();

  if (!state.selectedAnswer) {
    showFeedback("info", "まだ選んでいないよ", "答えを1つえらんでから、もう一度押してね。");
    return;
  }

  const isCorrect = state.selectedAnswer === mission.answer;
  state.answeredInCycle += 1;

  if (isCorrect) {
    state.spark += 1;
    state.streak += 1;
  } else {
    state.streak = 0;
  }

  const unlockedClue = unlockClueIfNeeded();

  if (isCorrect) {
    const clueMessage = unlockedClue
      ? `新しい手がかり『${unlockedClue.title}』を入手。${unlockedClue.summary}`
      : `正解。${mission.explanation}`;
    showFeedback("success", "推理メモ更新", clueMessage);
  } else {
    const clueHint = unlockedClue
      ? `まちがえたけれど、3問終えたので『${unlockedClue.title}』が開いた。${mission.explanation}`
      : `正解は『${mission.answer}』。${mission.explanation}`;
    showFeedback("error", "もう一度考えてみよう", clueHint);
  }

  renderStatus();
  renderNotebook();
  renderClueBoard();
  elements.submitAnswerButton.disabled = true;
  elements.nextQuestionButton.classList.remove("hidden");
}

function nextMission() {
  state.activeMissionIndex = (state.activeMissionIndex + 1) % missionDeck.length;
  renderMission();
}

function renderClueBoard() {
  elements.clueBoard.innerHTML = caseData.clues
    .map((clue, index) => {
      if (index >= state.unlockedClues) {
        return `
          <article class="clue-card locked">
            <h3>ロックされた手がかり</h3>
            <p>調査ミッションを進めるとここに新しい証拠が表示される。</p>
          </article>
        `;
      }

      return `
        <article class="clue-card">
          <h3>${clue.title}</h3>
          <p>${clue.summary}</p>
          <p><strong>ポイント:</strong> ${clue.effect}</p>
        </article>
      `;
    })
    .join("");
}

function fillSelectOptions() {
  const culpritOptions = ["アオイ", "レン", "ユナ", "ソラ"];
  const timeOptions = ["午後6時40分", "午後6時50分", "午後7時00分", "午後7時10分"];
  const placeOptions = ["展示ケースの上", "模型箱の底", "図書館の棚", "時計塔の階段"];

  elements.culpritSelect.innerHTML = culpritOptions
    .map((option) => `<option value="${option}">${option}</option>`)
    .join("");
  elements.timeSelect.innerHTML = timeOptions
    .map((option) => `<option value="${option}">${option}</option>`)
    .join("");
  elements.placeSelect.innerHTML = placeOptions
    .map((option) => `<option value="${option}">${option}</option>`)
    .join("");
}

function solveCase() {
  if (!state.deductionUnlocked) {
    elements.solutionCard.className = "solution-card info";
    elements.solutionCard.innerHTML = "<strong>まだ推理できない</strong><p>手がかりを4つ集めてから挑戦しよう。</p>";
    return;
  }

  const culprit = elements.culpritSelect.value;
  const time = elements.timeSelect.value;
  const place = elements.placeSelect.value;
  const isSolved =
    culprit === caseData.solution.culprit &&
    time === caseData.solution.time &&
    place === caseData.solution.place;

  if (isSolved) {
    elements.solutionCard.className = "solution-card success";
    elements.solutionCard.innerHTML = `
      <strong>事件解決</strong>
      <p>犯人はソラ。時計の針を磁石で止め、午後6時50分にペンダントを模型箱の底へ隠していた。</p>
      <p>きみは町の名探偵。次は新しい事件の追加もできるようにしよう。</p>
    `;
  } else {
    elements.solutionCard.className = "solution-card error";
    elements.solutionCard.innerHTML = `
      <strong>推理を組み立て直そう</strong>
      <p>手がかりを見直して、時刻と隠し場所のつながりを考えてみよう。</p>
    `;
  }
}

function bindEvents() {
  elements.navButtons.forEach((button) => {
    button.addEventListener("click", () => setScreen(button.dataset.screen));
  });

  elements.startMissionButton.addEventListener("click", () => {
    setScreen("investigation");
  });

  elements.submitAnswerButton.addEventListener("click", submitAnswer);
  elements.nextQuestionButton.addEventListener("click", nextMission);
  elements.changeMissionButton.addEventListener("click", nextMission);
  elements.solveCaseButton.addEventListener("click", solveCase);
}

function init() {
  renderSuspects();
  renderNotebook();
  renderStatus();
  renderMission();
  renderClueBoard();
  fillSelectOptions();
  bindEvents();
}

init();
