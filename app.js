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
      title: "止まった針",
      summary: "時計塔の長い針には、油ではなく甘いシロップが少し付いていた。",
      effect: "屋台の近くでしか付かない痕跡だ。"
    },
    {
      title: "図書館の記録",
      summary: "午後6時40分にユナが展示室の見回り記録を残している。",
      effect: "午後7時ぴったりの犯行なら、ユナの線は薄くなる。"
    },
    {
      title: "消えた放送原稿",
      summary: "レンは午後6時55分から7時10分まで連続で司会する予定だった。",
      effect: "レンも展示室を離れにくい。"
    },
    {
      title: "磁石つきの模型箱",
      summary: "ソラの模型箱の底に、ペンダントがくっつく強力磁石が見つかった。",
      effect: "時計の針を止める仕掛けにも使えそうだ。"
    }
  ],
  solution: {
    culprit: "ソラ",
    time: "午後6時50分",
    place: "模型箱の底"
  }
};

const missions = [
  {
    subject: "算数",
    title: "現場検証: 止まった時計の時刻",
    story: "現場のスケッチには『長い針は10、短い針は6と7の間』とある。犯人が時計を止めた時刻を特定しよう。",
    prompt: "スケッチから読める時刻はどれ？",
    choices: ["6時10分", "6時50分", "7時10分", "7時50分"],
    answer: "6時50分",
    explanation: "長い針が10なら50分。短い針が6と7の間なので、止まった時刻は6時50分だ。"
  },
  {
    subject: "国語",
    title: "証言整理: だれが待っていた？",
    story: "目撃メモには『レンは司会に向かい、ソラは展示室の前で待っていた』とある。行動の主語を取り違えると、容疑者を絞れない。",
    prompt: "展示室の前で待っていたのはだれ？",
    choices: ["レン", "ソラ", "司会", "展示室"],
    answer: "ソラ",
    explanation: "『ソラは』のあとの行動が『待っていた』にかかる。証言整理では主語が重要だ。"
  },
  {
    subject: "英語",
    title: "英語メモ解読: under の意味",
    story: "展示室の隅で、英語の走り書きメモが見つかった。『The pendant is under the box.』この一文が隠し場所の決め手になる。",
    prompt: "このメモの意味として正しいものはどれ？",
    choices: ["ペンダントは箱の上にある。", "ペンダントは箱の下にある。", "箱はペンダントの中にある。", "ペンダントは箱の横にある。"],
    answer: "ペンダントは箱の下にある。",
    explanation: "'under' は『下に』。つまり隠し場所は箱の下側だ。"
  },
  {
    subject: "算数",
    title: "暗号解読: 数列の規則",
    story: "見張り番のポケットから、2, 4, 8, 16, ? と書かれたメモが見つかった。規則を読めば次の合図がわかる。",
    prompt: "続きに入る数はどれ？",
    choices: ["18", "24", "32", "34"],
    answer: "32",
    explanation: "2倍ずつ増えている。16の次は32で、合図の規則は崩れていない。"
  },
  {
    subject: "国語",
    title: "時系列整理: 放送より前の行動",
    story: "調査ノートには『放送が始まる前に、アオイは時計を見上げた』と書かれている。時系列を間違えると、アリバイが崩せない。",
    prompt: "先に起きたことはどれ？",
    choices: ["放送が始まった", "アオイが時計を見上げた", "時計が止まった", "展示室が閉まった"],
    answer: "アオイが時計を見上げた",
    explanation: "『前に』があるので、先に起きたのはアオイが時計を見上げたことだ。"
  },
  {
    subject: "英語",
    title: "予定表の解読: seven ten",
    story: "祭りの予定表には『The show starts at seven ten.』とある。司会者の動きを追えば、犯行時刻とずれが見えてくる。",
    prompt: "予定表に書かれた時刻はどれ？",
    choices: ["7時01分", "7時10分", "7時17分", "10時07分"],
    answer: "7時10分",
    explanation: "'seven ten' は7時10分。予定表どおりなら、この時間は司会中のはずだ。"
  }
];

const storyBeats = [
  "時計塔の鐘は止まり、町はざわついている。最初の3問で現場の空気を読もう。",
  "針に残った不自然な跡。現場ではなく屋台のにおいがする。",
  "記録と証言を比べると、犯行時刻が少しずつ見えてくる。",
  "展示室より屋台側に決め手が集まり始めた。",
  "最後の証拠がそろった。今なら真相を言葉にできる。"
];

const state = {
  spark: 0,
  streak: 0,
  answeredInCycle: 0,
  unlockedClues: 0,
  selectedAnswer: "",
  missionIndex: 0,
  deductionUnlocked: false,
  achievements: {
    starter: false,
    hunter: false,
    streak: false
  }
};

const elements = {
  storyBeat: document.getElementById("storyBeat"),
  sparkValue: document.getElementById("sparkValue"),
  clueValue: document.getElementById("clueValue"),
  rankValue: document.getElementById("rankValue"),
  progressBadge: document.getElementById("progressBadge"),
  mysteryMeter: document.getElementById("mysteryMeter"),
  nextReward: document.getElementById("nextReward"),
  chapterTimeline: document.getElementById("chapterTimeline"),
  achievementList: document.getElementById("achievementList"),
  suspectList: document.getElementById("suspectList"),
  missionTitle: document.getElementById("missionTitle"),
  missionSubject: document.getElementById("missionSubject"),
  missionStory: document.getElementById("missionStory"),
  cycleLabel: document.getElementById("cycleLabel"),
  cycleMeter: document.getElementById("cycleMeter"),
  questionCard: document.getElementById("questionCard"),
  feedbackCard: document.getElementById("feedbackCard"),
  submitAnswerButton: document.getElementById("submitAnswerButton"),
  nextQuestionButton: document.getElementById("nextQuestionButton"),
  changeMissionButton: document.getElementById("changeMissionButton"),
  liveHint: document.getElementById("liveHint"),
  streakValue: document.getElementById("streakValue"),
  clueBoardBadge: document.getElementById("clueBoardBadge"),
  clueBoard: document.getElementById("clueBoard"),
  deductionLock: document.getElementById("deductionLock"),
  culpritSelect: document.getElementById("culpritSelect"),
  timeSelect: document.getElementById("timeSelect"),
  placeSelect: document.getElementById("placeSelect"),
  solveCaseButton: document.getElementById("solveCaseButton"),
  solutionCard: document.getElementById("solutionCard"),
  celebrationModal: document.getElementById("celebrationModal"),
  celebrationTitle: document.getElementById("celebrationTitle"),
  celebrationBody: document.getElementById("celebrationBody"),
  closeCelebrationButton: document.getElementById("closeCelebrationButton")
};

function currentMission() {
  return missions[state.missionIndex];
}

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

function renderChapters() {
  elements.chapterTimeline.innerHTML = Array.from({ length: 4 }, (_, index) => {
    const label = `第${index + 1}章`;
    let className = "chip";

    if (index < state.unlockedClues) {
      className += " done";
    } else if (index === state.unlockedClues || (index === 3 && state.deductionUnlocked)) {
      className += " active";
    }

    return `<span class="${className}">${label}</span>`;
  }).join("");
}

function renderAchievements() {
  const items = [
    { key: "starter", label: "開始" },
    { key: "hunter", label: "証拠" },
    { key: "streak", label: "連続" }
  ];

  elements.achievementList.innerHTML = items
    .map((item) => `<span class="chip ${state.achievements[item.key] ? "done" : ""}">${item.label}</span>`)
    .join("");
}

function renderStatus() {
  const progress = Math.round((state.unlockedClues / caseData.clues.length) * 100);

  elements.storyBeat.textContent = storyBeats[state.unlockedClues];
  elements.sparkValue.textContent = String(state.spark);
  elements.clueValue.textContent = `${state.unlockedClues} / ${caseData.clues.length}`;
  elements.streakValue.textContent = String(state.streak);
  elements.progressBadge.textContent = `${progress}%`;
  elements.mysteryMeter.style.width = `${progress}%`;
  elements.nextReward.textContent = `次の手がかりまであと${Math.max(0, 3 - state.answeredInCycle)}問`;
  elements.cycleLabel.textContent = `${state.answeredInCycle} / 3 問`;
  elements.cycleMeter.style.width = `${(state.answeredInCycle / 3) * 100}%`;
  elements.clueBoardBadge.textContent = `${state.unlockedClues} / ${caseData.clues.length}`;
  elements.liveHint.textContent = liveHint();
  elements.rankValue.textContent = detectiveRank();
  elements.deductionLock.textContent = state.deductionUnlocked ? "推理可能" : "手がかりを4つ集めると解放";
}

function detectiveRank() {
  if (state.unlockedClues >= 4) {
    return "事件解決直前";
  }
  if (state.unlockedClues >= 2) {
    return "調査エース";
  }
  return "見習い探偵";
}

function liveHint() {
  if (state.unlockedClues === 0) {
    return "まずは時計塔まわりの違和感を拾って、事件の入口を作ろう。";
  }
  if (state.unlockedClues === 1) {
    return "甘いシロップは現場より屋台の匂いが強い。視線を塔の外へ向けよう。";
  }
  if (state.unlockedClues === 2) {
    return "記録がある人物ほど、犯行時刻から外れる可能性がある。証言と時間を比べよう。";
  }
  if (state.unlockedClues === 3) {
    return "磁石、時計、箱。この3つを並べると、犯人の手順が一本につながる。";
  }
  return "証拠はそろった。犯人、時刻、隠し場所を1つの推理にまとめよう。";
}

function renderMission() {
  const mission = currentMission();
  state.selectedAnswer = "";

  elements.missionTitle.textContent = mission.title;
  elements.missionSubject.textContent = mission.subject;
  elements.missionStory.textContent = mission.story;
  elements.feedbackCard.className = "feedback-card hidden";
  elements.feedbackCard.innerHTML = "";
  elements.submitAnswerButton.disabled = false;
  elements.nextQuestionButton.classList.add("hidden");

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
      elements.questionCard.querySelectorAll(".choice-button").forEach((node) => {
        node.classList.toggle("selected", node === button);
      });
    });
  });
}

function renderClues() {
  elements.clueBoard.innerHTML = caseData.clues
    .map((clue, index) => {
      if (index >= state.unlockedClues) {
        return `
          <article class="clue-card locked">
            <h3>ロック中</h3>
            <p>3問ごとに新しい手がかりが開く。</p>
          </article>
        `;
      }

      return `
        <article class="clue-card flash">
          <h3>${clue.title}</h3>
          <p>${clue.summary}</p>
          <p>${clue.effect}</p>
        </article>
      `;
    })
    .join("");
}

function renderSelects() {
  const culprits = ["アオイ", "レン", "ユナ", "ソラ"];
  const times = ["午後6時40分", "午後6時50分", "午後7時00分", "午後7時10分"];
  const places = ["展示ケースの上", "模型箱の底", "図書館の棚", "時計塔の階段"];

  elements.culpritSelect.innerHTML = culprits.map((value) => `<option value="${value}">${value}</option>`).join("");
  elements.timeSelect.innerHTML = times.map((value) => `<option value="${value}">${value}</option>`).join("");
  elements.placeSelect.innerHTML = places.map((value) => `<option value="${value}">${value}</option>`).join("");
}

function showFeedback(type, title, body) {
  elements.feedbackCard.className = `feedback-card ${type}`;
  elements.feedbackCard.innerHTML = `<strong>${title}</strong><p>${body}</p>`;
}

function maybeUnlockClue() {
  if (state.answeredInCycle < 3 || state.unlockedClues >= caseData.clues.length) {
    return null;
  }

  state.answeredInCycle = 0;
  const clue = caseData.clues[state.unlockedClues];
  state.unlockedClues += 1;

  if (state.unlockedClues === caseData.clues.length) {
    state.deductionUnlocked = true;
  }

  return clue;
}

function updateAchievements() {
  if (state.spark >= 1) {
    state.achievements.starter = true;
  }
  if (state.unlockedClues >= 2) {
    state.achievements.hunter = true;
  }
  if (state.streak >= 3) {
    state.achievements.streak = true;
  }
}

function showCelebration(clue) {
  elements.celebrationTitle.textContent = clue.title;
  elements.celebrationBody.textContent = `${clue.summary} ${clue.effect} 真相に一歩近づいた。`;
  elements.celebrationModal.classList.remove("hidden");
}

function pulse(element) {
  element.classList.remove("flash");
  void element.offsetWidth;
  element.classList.add("flash");
}

function submitAnswer() {
  const mission = currentMission();

  if (!state.selectedAnswer) {
    showFeedback("info", "まだ選んでいないよ", "答えを1つ選んでから押してね。");
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

  const unlockedClue = maybeUnlockClue();
  updateAchievements();

  if (isCorrect) {
    showFeedback(
      "success",
      unlockedClue ? "証拠を確保した" : "推理メモ更新",
      unlockedClue ? `手がかり『${unlockedClue.title}』を発見した。${unlockedClue.effect}` : mission.explanation
    );
  } else {
    showFeedback("error", "推理を立て直そう", `正解は『${mission.answer}』。${mission.explanation}`);
  }

  renderStatus();
  renderChapters();
  renderAchievements();
  renderClues();
  pulse(elements.feedbackCard);

  elements.submitAnswerButton.disabled = true;
  elements.nextQuestionButton.classList.remove("hidden");

  if (unlockedClue) {
    showCelebration(unlockedClue);
  }
}

function nextMission() {
  state.missionIndex = (state.missionIndex + 1) % missions.length;
  renderMission();
}

function solveCase() {
  if (!state.deductionUnlocked) {
    elements.solutionCard.className = "solution-card info";
    elements.solutionCard.innerHTML = "<strong>まだ推理できない</strong><p>先に4つの手がかりを集めよう。</p>";
    return;
  }

  const ok =
    elements.culpritSelect.value === caseData.solution.culprit &&
    elements.timeSelect.value === caseData.solution.time &&
    elements.placeSelect.value === caseData.solution.place;

  if (ok) {
    elements.solutionCard.className = "solution-card success";
    elements.solutionCard.innerHTML = "<strong>事件解決</strong><p>犯人はソラ。午後6時50分に時計を止め、ペンダントを模型箱の底へ隠していた。証言、時刻、磁石の3つがきれいにつながった。</p>";
    pulse(elements.solutionCard);
  } else {
    elements.solutionCard.className = "solution-card error";
    elements.solutionCard.innerHTML = "<strong>推理を組み立て直そう</strong><p>容疑者だけでなく、時刻と隠し場所まで1本の流れで考え直そう。</p>";
  }
}

function bindEvents() {
  elements.submitAnswerButton.addEventListener("click", submitAnswer);
  elements.nextQuestionButton.addEventListener("click", nextMission);
  elements.changeMissionButton.addEventListener("click", nextMission);
  elements.solveCaseButton.addEventListener("click", solveCase);
  elements.closeCelebrationButton.addEventListener("click", () => {
    elements.celebrationModal.classList.add("hidden");
  });
}

function init() {
  renderSuspects();
  renderChapters();
  renderAchievements();
  renderStatus();
  renderMission();
  renderClues();
  renderSelects();
  bindEvents();
}

init();
