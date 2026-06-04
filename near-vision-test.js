// Bilingual near-vision screening test for Abdalla Eye Clinic.
// The test presents localized optotype lines at a suggested distance of 40 cm.

const appState = {
  language: "en",
  currentEyeIndex: 0,
  currentLineIndex: 0,
  selectedLetters: [],
  results: {
    left: null,
    right: null,
  },
};

const eyes = ["right", "left"];

// N-notation point sizes are used to keep the screen chart close to printed near-card sizing.
const baseTestLines = [
  { acuity: "N24", size: "24pt", letters: { en: ["C", "D", "H", "K", "N"], ar: ["ح", "د", "ر", "س", "ك"] } },
  { acuity: "N18", size: "18pt", letters: { en: ["O", "R", "S", "V", "Z"], ar: ["م", "ن", "ع", "ط", "ف"] } },
  { acuity: "N14", size: "14pt", letters: { en: ["K", "N", "C", "Z", "R"], ar: ["ق", "ل", "ب", "ص", "ح"] } },
  { acuity: "N10", size: "10pt", letters: { en: ["S", "V", "D", "H", "O"], ar: ["د", "ك", "م", "س", "ن"] } },
  { acuity: "N8", size: "8pt", letters: { en: ["Z", "C", "R", "N", "K"], ar: ["ع", "ط", "ف", "ق", "ل"] } },
  { acuity: "N6", size: "6pt", letters: { en: ["D", "O", "S", "H", "V"], ar: ["ب", "ص", "ح", "د", "ر"] } },
  { acuity: "N5", size: "5pt", letters: { en: ["N", "K", "Z", "C", "R"], ar: ["س", "ك", "م", "ن", "ع"] } },
];

const letterOptions = {
  en: ["C", "D", "H", "K", "N", "O", "R", "S", "V", "Z"],
  ar: ["ح", "د", "ر", "س", "ك", "م", "ن", "ع", "ط", "ف", "ق", "ل", "ب", "ص"],
};

let testLines = createRandomizedTestLines();

const translations = {
  en: {
    pageTitle: "Near Vision Screening Test | Abdalla Eye Clinic",
    toggle: "العربية",
    eyebrow: "Abdalla Eye Clinic",
    title: "Near-Vision Screening Test",
    distance: "Test distance: 40 cm from screen",
    disclaimerLabel: "Disclaimer",
    disclaimer: "This is a screening test only and does not replace a full eye examination.",
    startTitle: "Before You Start",
    startText:
      "Sit comfortably and hold your screen at 40 cm. Keep browser zoom at 100%. Wear your usual near glasses or contact lenses if you use them.",
    stepOne: "Cover your left eye and test your right eye first.",
    stepTwo: "Cover your right eye and test your left eye second.",
    stepThree: "For each line, select the letters you can read in the order shown.",
    stepFour: "Stop if the line is not clear enough to identify.",
    startButton: "Start Test",
    leftEye: "Left eye",
    rightEye: "Right eye",
    leftInstruction: "Cover your right eye and test your left eye.",
    rightInstruction: "Cover your left eye and test your right eye.",
    lineCounter: "Line {current} of {total}",
    readLine: "Read this line",
    nearLine: "{acuity} near line",
    selectLetters: "Select the letters you can read",
    answerPlaceholder: "Your selected letters will appear here",
    clear: "Clear",
    cannotRead: "I cannot read this line",
    submitLine: "Submit Line",
    resultsTitle: "Your Near-Vision Screening Results",
    resultsText:
      "Review each eye separately. If either eye is difficult, schedule a professional eye examination.",
    smallestLine: "Smallest line read",
    noLine: "No line identified",
    bookingTitle: "Booking Recommendation",
    bookButton: "Book an Appointment / احجز موعدك الآن",
    restart: "Start from the beginning",
    goodCategory: "Good vision",
    mildCategory: "Mild difficulty",
    poorCategory: "Moderate or poor score",
    goodRecommendation: "Good vision: recommend routine checkup.",
    mildRecommendation: "Mild difficulty: recommend eye examination.",
    poorRecommendation: "Moderate or poor score: strongly recommend booking an appointment.",
    overallGood: "Both eyes screened in the good range. Keep routine checkups to protect your vision.",
    overallMild: "At least one eye showed mild difficulty. A professional eye examination is recommended.",
    overallPoor: "At least one eye showed a moderate or poor score. Please book an appointment.",
  },
  ar: {
    pageTitle: "اختبار الرؤية القريبة | عيادة عبد الله للعيون",
    toggle: "English",
    eyebrow: "عيادة عبد الله للعيون",
    title: "اختبار الرؤية القريبة",
    distance: "مسافة الاختبار: 40 سم من الشاشة",
    disclaimerLabel: "تنبيه",
    disclaimer: "هذا اختبار فحص أولي فقط ولا يغني عن فحص كامل للعين.",
    startTitle: "قبل البدء",
    startText:
      "اجلس براحة واجعل الشاشة على مسافة 40 سم مع ضبط تكبير المتصفح على 100%. استخدم نظارة القراءة أو العدسات المعتادة إذا كنت تستخدمها.",
    stepOne: "غط العين اليسرى واختبر العين اليمنى أولاً.",
    stepTwo: "غط العين اليمنى واختبر العين اليسرى ثانياً.",
    stepThree: "في كل سطر، اختر الحروف العربية التي تستطيع قراءتها بنفس الترتيب الظاهر.",
    stepFour: "توقف إذا لم يكن السطر واضحاً بما يكفي للتعرف على الحروف.",
    startButton: "ابدأ الاختبار",
    leftEye: "العين اليسرى",
    rightEye: "العين اليمنى",
    leftInstruction: "غط العين اليمنى واختبر العين اليسرى.",
    rightInstruction: "غط العين اليسرى واختبر العين اليمنى.",
    lineCounter: "السطر {current} من {total}",
    readLine: "اقرأ هذا السطر",
    nearLine: "سطر الرؤية القريبة {acuity}",
    selectLetters: "اختر الحروف التي تستطيع قراءتها",
    answerPlaceholder: "ستظهر الحروف المختارة هنا",
    clear: "مسح",
    cannotRead: "لا أستطيع قراءة هذا السطر",
    submitLine: "تأكيد السطر",
    resultsTitle: "نتائج فحص الرؤية القريبة",
    resultsText: "راجع نتيجة كل عين على حدة. إذا ظهرت صعوبة في أي عين، يفضل حجز فحص عين متخصص.",
    smallestLine: "أصغر سطر تمت قراءته",
    noLine: "لم يتم تحديد أي سطر",
    bookingTitle: "توصية الحجز",
    bookButton: "Book an Appointment / احجز موعدك الآن",
    restart: "ابدأ من البداية",
    goodCategory: "رؤية جيدة",
    mildCategory: "صعوبة بسيطة",
    poorCategory: "نتيجة متوسطة أو ضعيفة",
    goodRecommendation: "رؤية جيدة: ننصح بالفحص الدوري.",
    mildRecommendation: "صعوبة بسيطة: ننصح بإجراء فحص عين.",
    poorRecommendation: "نتيجة متوسطة أو ضعيفة: ننصح بشدة بحجز موعد.",
    overallGood: "نتيجة العينين ضمن النطاق الجيد. حافظ على الفحص الدوري لحماية نظرك.",
    overallMild: "ظهرت صعوبة بسيطة في عين واحدة على الأقل. ننصح بإجراء فحص عين متخصص.",
    overallPoor: "ظهرت نتيجة متوسطة أو ضعيفة في عين واحدة على الأقل. يرجى حجز موعد.",
  },
};

const elements = {
  languageToggle: document.querySelector("#languageToggle"),
  startButton: document.querySelector("#startButton"),
  startScreen: document.querySelector("#startScreen"),
  testScreen: document.querySelector("#testScreen"),
  resultsScreen: document.querySelector("#resultsScreen"),
  eyeStepLabel: document.querySelector("#eyeStepLabel"),
  eyeInstruction: document.querySelector("#eyeInstruction"),
  lineCounter: document.querySelector("#lineCounter"),
  optotypeLine: document.querySelector("#optotypeLine"),
  lineMeta: document.querySelector("#lineMeta"),
  selectedAnswer: document.querySelector("#selectedAnswer"),
  letterGrid: document.querySelector("#letterGrid"),
  clearButton: document.querySelector("#clearButton"),
  cannotReadButton: document.querySelector("#cannotReadButton"),
  submitLineButton: document.querySelector("#submitLineButton"),
  resultsGrid: document.querySelector("#resultsGrid"),
  overallRecommendation: document.querySelector("#overallRecommendation"),
  restartButton: document.querySelector("#restartButton"),
};

function t(key) {
  return translations[appState.language][key];
}

function chartFontFamily() {
  return appState.language === "ar" ? "Tahoma, Arial, sans-serif" : '"Times New Roman", Georgia, serif';
}

function shuffleLetters(letters) {
  const shuffled = [...letters];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function randomizedLineLetters(language, line, previousLetters) {
  const letterCount = line.letters[language].length;
  const previous = previousLetters ? previousLetters.join("") : "";

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const candidate = shuffleLetters(letterOptions[language]).slice(0, letterCount);
    if (!previous || candidate.join("") !== previous) return candidate;
  }

  const fallback = shuffleLetters(letterOptions[language]).slice(0, letterCount);
  return fallback.length > 1 ? [...fallback.slice(1), fallback[0]] : fallback;
}

function createRandomizedTestLines() {
  return baseTestLines.map((line) => {
    const right = {
      en: randomizedLineLetters("en", line),
      ar: randomizedLineLetters("ar", line),
    };
    const left = {
      en: randomizedLineLetters("en", line, right.en),
      ar: randomizedLineLetters("ar", line, right.ar),
    };

    return {
      acuity: line.acuity,
      size: line.size,
      letters: { right, left },
    };
  });
}

function lineLetters(line) {
  return line.letters[eyes[appState.currentEyeIndex]][appState.language];
}

function format(template, values) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, value),
    template
  );
}

function setActiveScreen(screen) {
  [elements.startScreen, elements.testScreen, elements.resultsScreen].forEach((item) => {
    item.classList.toggle("is-active", item === screen);
  });
}

function applyLanguage() {
  const isArabic = appState.language === "ar";
  document.documentElement.lang = appState.language;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.body.dir = isArabic ? "rtl" : "ltr";
  document.title = t("pageTitle");
  elements.languageToggle.textContent = t("toggle");

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  renderLetterGrid();
  renderCurrentLine();
  if (elements.resultsScreen.classList.contains("is-active")) {
    renderResults();
  }
}

function startTest() {
  testLines = createRandomizedTestLines();
  appState.currentEyeIndex = 0;
  appState.currentLineIndex = 0;
  appState.selectedLetters = [];
  appState.results = { left: null, right: null };
  setActiveScreen(elements.testScreen);
  renderCurrentLine();
}

function renderCurrentLine() {
  if (!elements.testScreen.classList.contains("is-active")) return;

  const eye = eyes[appState.currentEyeIndex];
  const line = testLines[appState.currentLineIndex];
  const letters = lineLetters(line);

  elements.eyeStepLabel.textContent = eye === "left" ? t("leftEye") : t("rightEye");
  elements.eyeInstruction.textContent = eye === "left" ? t("leftInstruction") : t("rightInstruction");
  elements.lineCounter.textContent = format(t("lineCounter"), {
    current: appState.currentLineIndex + 1,
    total: testLines.length,
  });
  elements.lineMeta.textContent = format(t("nearLine"), { acuity: line.acuity });

  elements.optotypeLine.style.fontSize = line.size;
  elements.optotypeLine.style.fontFamily = chartFontFamily();
  elements.optotypeLine.dir = appState.language === "ar" ? "rtl" : "ltr";
  elements.optotypeLine.innerHTML = "";
  letters.forEach((letter) => {
    const span = document.createElement("span");
    span.textContent = letter;
    elements.optotypeLine.appendChild(span);
  });

  renderSelectedAnswer();
}

function renderLetterGrid() {
  elements.letterGrid.innerHTML = "";
  elements.letterGrid.style.gridTemplateColumns = appState.language === "ar"
    ? "repeat(4, minmax(48px, 1fr))"
    : "repeat(5, minmax(48px, 1fr))";
  letterOptions[appState.language].forEach((letter) => {
    const button = document.createElement("button");
    button.className = "letter-button";
    button.type = "button";
    button.textContent = letter;
    button.style.fontFamily = chartFontFamily();
    button.addEventListener("click", () => {
      const line = testLines[appState.currentLineIndex];
      if (appState.selectedLetters.length >= lineLetters(line).length) return;
      appState.selectedLetters.push(letter);
      renderSelectedAnswer();
    });
    elements.letterGrid.appendChild(button);
  });
}

function renderSelectedAnswer() {
  if (appState.selectedLetters.length === 0) {
    elements.selectedAnswer.textContent = t("answerPlaceholder");
    elements.selectedAnswer.style.fontFamily = "";
    elements.selectedAnswer.dir = appState.language === "ar" ? "rtl" : "ltr";
    elements.selectedAnswer.classList.add("is-empty");
    return;
  }

  elements.selectedAnswer.textContent = appState.selectedLetters.join(" ");
  elements.selectedAnswer.style.fontFamily = chartFontFamily();
  elements.selectedAnswer.dir = appState.language === "ar" ? "rtl" : "ltr";
  elements.selectedAnswer.classList.remove("is-empty");
}

function clearAnswer() {
  appState.selectedLetters = [];
  renderSelectedAnswer();
}

function submitLine() {
  const line = testLines[appState.currentLineIndex];
  const selected = appState.selectedLetters.join("");
  const expected = lineLetters(line).join("");

  // A line is considered correct only when all letters are selected in order.
  if (selected === expected) {
    advanceToNextLine();
    return;
  }

  finishCurrentEye(appState.currentLineIndex - 1);
}

function advanceToNextLine() {
  const nextLine = appState.currentLineIndex + 1;
  appState.selectedLetters = [];

  if (nextLine >= testLines.length) {
    finishCurrentEye(testLines.length - 1);
    return;
  }

  appState.currentLineIndex = nextLine;
  renderCurrentLine();
}

function finishCurrentEye(lastCorrectIndex) {
  const eye = eyes[appState.currentEyeIndex];
  appState.results[eye] = buildEyeResult(lastCorrectIndex);

  if (appState.currentEyeIndex === 0) {
    appState.currentEyeIndex = 1;
    appState.currentLineIndex = 0;
    appState.selectedLetters = [];
    renderCurrentLine();
    return;
  }

  renderResults();
  setActiveScreen(elements.resultsScreen);
}

function buildEyeResult(lastCorrectIndex) {
  if (lastCorrectIndex >= 5) {
    return {
      lineIndex: lastCorrectIndex,
      categoryKey: "good",
    };
  }

  if (lastCorrectIndex >= 3) {
    return {
      lineIndex: lastCorrectIndex,
      categoryKey: "mild",
    };
  }

  return {
    lineIndex: lastCorrectIndex,
    categoryKey: "poor",
  };
}

function renderResults() {
  elements.resultsGrid.innerHTML = "";

  eyes.forEach((eye) => {
    const result = appState.results[eye];
    const line = result.lineIndex >= 0 ? testLines[result.lineIndex] : null;
    const categoryText = t(`${result.categoryKey}Category`);
    const recommendation = t(`${result.categoryKey}Recommendation`);
    const card = document.createElement("article");
    card.className = "result-card";
    card.innerHTML = `
      <h3>${eye === "left" ? t("leftEye") : t("rightEye")}</h3>
      <div class="result-score">${line ? line.acuity : t("noLine")}</div>
      <p>${t("smallestLine")}</p>
      <span class="result-category ${result.categoryKey}">${categoryText}</span>
      <p>${recommendation}</p>
    `;
    elements.resultsGrid.appendChild(card);
  });

  elements.overallRecommendation.textContent = getOverallRecommendation();
}

function getOverallRecommendation() {
  const categories = eyes.map((eye) => appState.results[eye].categoryKey);

  if (categories.includes("poor")) return t("overallPoor");
  if (categories.includes("mild")) return t("overallMild");
  return t("overallGood");
}

elements.languageToggle.addEventListener("click", () => {
  appState.language = appState.language === "en" ? "ar" : "en";
  applyLanguage();
});

elements.startButton.addEventListener("click", startTest);
elements.clearButton.addEventListener("click", clearAnswer);
elements.cannotReadButton.addEventListener("click", () => finishCurrentEye(appState.currentLineIndex - 1));
elements.submitLineButton.addEventListener("click", submitLine);
elements.restartButton.addEventListener("click", () => {
  clearAnswer();
  setActiveScreen(elements.startScreen);
});

renderLetterGrid();
applyLanguage();
