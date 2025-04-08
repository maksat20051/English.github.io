let words = JSON.parse(localStorage.getItem("words")) || [
    { word: "Apple", translation: "Яблоко" },
    { word: "Dream", translation: "Мечта" }
  ];
  
  let currentIndex = 0;
  
  function updateCounter() {
    document.getElementById("counter").textContent = `Слово ${currentIndex + 1} из ${words.length}`;
  }
  
  function showCurrentWord() {
    document.getElementById("word").textContent = words[currentIndex].word;
    document.getElementById("translation").textContent = words[currentIndex].translation;
    document.querySelector(".card").classList.remove("flipped");
    updateCounter();
  }
  
  function flipCard() {
    document.querySelector(".card").classList.toggle("flipped");
  }
  
  function nextWord() {
    currentIndex = (currentIndex + 1) % words.length;
    showCurrentWord();
  }
  
  function addWord() {
    const word = document.getElementById("newWord").value.trim();
    const translation = document.getElementById("newTranslation").value.trim();
  
    if (word && translation) {
      words.push({ word, translation });
      localStorage.setItem("words", JSON.stringify(words));
      document.getElementById("newWord").value = "";
      document.getElementById("newTranslation").value = "";
      alert("Слово добавлено!");
      currentIndex = words.length - 1;
      showCurrentWord();
    } else {
      alert("Введите слово и перевод.");
    }
  }
  
  function deleteWord() {
    if (words.length === 1) {
      alert("Нельзя удалить последнее слово.");
      return;
    }
    if (confirm("Удалить это слово?")) {
      words.splice(currentIndex, 1);
      localStorage.setItem("words", JSON.stringify(words));
      currentIndex = currentIndex % words.length;
      showCurrentWord();
    }
  }
  
  function sayWord() {
    const utterance = new SpeechSynthesisUtterance(words[currentIndex].word);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  }
  
  function toggleTheme() {
    const body = document.body;
    body.classList.toggle("light");
    const theme = body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", theme);
  }
  
  function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light");
    }
  }
  
  applySavedTheme();
  showCurrentWord();
  