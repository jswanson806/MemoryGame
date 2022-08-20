const gameContainer = document.getElementById("game");
let clickCount = 0;
let card1;
let card2;
let scoreCount = document.getElementById("score-count").innerHTML;
let score = 0;
let highScoreCount = document.getElementById("high-score-count");
let highScore = 0;

loadHighScore();

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // print the class of the clicked card
  console.log("color:", event.target.classList);
  //increment clickCount
  clickCount++;

  //checks how many selections have been made
  if (clickCount === 2) {
    //set second click target to card2
    card2 = event.target;
    //change color of card2 to the color in the element's classList
    card2.style.backgroundColor = card2.classList;
    checkForMatches(card1, card2);
  } else if (clickCount <= 1) {
    //set first click target to card1
    card1 = event.target;
    //change color of card1 to the color in the element's classList
    card1.style.backgroundColor = card1.classList;
  }
}

function checkForMatches(a, b) {
  //removes click listener on matched cards
  if (a.isEqualNode(b)) {
    console.log("matches!");
    //stop allowing clicks on matched cards
    a.removeEventListener("click", handleCardClick);
    b.removeEventListener("click", handleCardClick);
    //add points to score
    incrementScore();
    //reset selections and leave card face-up
    clickCount = 0;
    card1, (cardb = "");
  } else {
    //return color to white after 1 second and reset card selection
    console.log("no matches...");
    setTimeout(() => {
      //flip card and reset selections
      a.style.backgroundColor = "#fff";
      b.style.backgroundColor = "#fff";
      card1, (cardb = "");
      //reset click count
      clickCount = 0;
    }, 1000);
  }
}

//handles incrementing the score
function incrementScore() {
  score += 1;
  document.getElementById("score-count").innerHTML = parseInt(score);
  if (score > highScore) {
    saveHighScore();
  }
}

function saveHighScore() {
  highScore = score;
  highScoreCount.innerHTML = parseInt(highScore);
  localStorage.setItem("highScore", JSON.stringify(highScore));
}

function loadHighScore() {
  let loadedScore = localStorage.getItem("highScore");
  highScore = parseInt(loadedScore);
  document.getElementById("high-score-count").innerHTML = highScore;
}
// when the DOM loads
createDivsForColors(shuffledColors);

/* */
