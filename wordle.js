let userInput = document.getElementById("userInput");
let button = document.getElementById("submit");
let result = document.getElementById("result");
let container = document.getElementById("wordsContainer");
let triesLeft = document.getElementById("triesLeft");
let randomWords = [
  "apple",
  "beach",
  "chair",
  "dance",
  "earth",
  "faith",
  "grape",
  "house",
  "image",
  "juice",
  "lemon",
  "magic",
  "noise",
  "oasis",
  "peace",
  "quiet",
  "river",
  "storm",
  "table",
  "unity",
  "vital",
  "water",
  "xenon",
  "young",
  "zebra",
  "guard",
  "mango",
];
let randomWordNum = Math.ceil(Math.random() * randomWords.length);
let randomWord = randomWords[randomWordNum].toUpperCase();
console.log(randomWord);
let count = 5;
function declareWin() {
  result.textContent = randomWord + " is the correct word YOU WON! ";
  button.disabled = true;
  triesLeft.textContent = "";
  userInput.disabled = true;
}
function validate(correctWord, guessedWord) {
  let tempguessedWord = [...guessedWord];
  let tempCorrectWord = [...correctWord];
  let correctLetterList = tempguessedWord.map((char, i) => {
    let obj = {
      letter: char,
      iscorrect: false,
      ispresent: false,
    };
    let letter = char;
    let index = i;
    if (tempCorrectWord[index] === letter) {
      tempCorrectWord[index] = false;
      obj.iscorrect = true;
      obj.ispresent = true;
    }
    return obj;
  });
  let validatedList = correctLetterList.map((obj) => {
    let iscorrect = obj.iscorrect;
    let letter = obj.letter;
    if (!iscorrect) {
      if (tempCorrectWord.includes(letter)) {
        obj.ispresent = true;
        let letterIndex = tempCorrectWord.findIndex(function (char) {
          if (char === letter) {
            return true;
          }
        });
        tempCorrectWord[letterIndex] = false;
      }
    }
    return obj;
  });
  return render(validatedList);
}
function render(resultList) {
  let wordContainer = document.createElement("div");
  document.body.appendChild(wordContainer);
  wordContainer.classList.add("word-container");
  for (let item of resultList) {
    let letterContainer = document.createElement("span");
    wordContainer.appendChild(letterContainer);
    letterContainer.textContent = item.letter;
    let correct = item.iscorrect;
    let ispresent = item.ispresent;
    if (correct && ispresent) {
      letterContainer.style.backgroundColor = "hsl(102, 31%, 38%)";
    } else if (!correct && ispresent) {
      letterContainer.style.backgroundColor = " hsl(49, 46%, 51%)";
    } else {
      letterContainer.style.backgroundColor = "hsl(0, 0%, 30%)";
    }
  }
}
function lose() {
  if (count === 0) {
    result.textContent = `YOU LOSE,the correct word is ${randomWord}`;
    button.disabled = true;
    userInput.disabled = true;
    triesLeft.textContent = "";
  }
}
function displayTriesLeft() {
  triesLeft.textContent = "Tries Left =" + count;
}
function submit() {
  let userInputValue = userInput.value.toUpperCase();
  if (count < 1) return;
  if (userInputValue.length !== 5) {
    alert("enter a five letter word");
    return;
  }

  if (userInputValue === randomWord) {
    declareWin();
  } else {
    count -= 1;
    displayTriesLeft();
    lose();
  }
  validate(randomWord, userInputValue);
  userInput.value = "";
}
button.onclick = function () {
  submit();
};
document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    submit();
  }
});
