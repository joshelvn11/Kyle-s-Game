const root = document.documentElement;

/* Screens */
const screenEntry = document.getElementById("screen-entry");
const screenStart = document.getElementById("screen-start");
const screenTeamOne = document.getElementById("screen-team-one");
const screenTeamTwo = document.getElementById("screen-team-two");
const screenCardCreationTemplate = document.getElementById(
  "screen-card-creation",
);
const roundStartScreen = document.getElementById("start-round-screen");
const playerStartScreen = document.getElementById("player-start-screen");
const gameScreen = document.getElementById("game-screen");
const roundEndScreen = document.getElementById("end-round-screen");
const gameEndScreen = document.getElementById("end-game-screen");
const settingsScreen = document.getElementById("settings-screen");

/* Containers */
const containerGame = document.getElementById("game-container");
const containersHeader = document.getElementsByClassName("header-container");
const containersContent = document.getElementsByClassName("content-container");
const containersControls =
  document.getElementsByClassName("controls-container");

/* Buttons */
const enterBtnEnterScrn = document.getElementById("button-fullscreen");
const startGameBtn = document.getElementById("button-new-game");
const settingsBtn = document.getElementById("button-settings");
const howToBtn = document.getElementById("button-how-to");
const roundStartBtn = document.getElementById("start-round-button");
const playerStartBtn = document.getElementById("player-start-button");
const rightAnswerBtn = document.getElementById("right-answer-button");
const skipCardBtn = document.getElementById("skip-card-button");
const nextRoundBtn = document.getElementById("next-round-button");
const homeBtn = document.getElementById("home-button");
const saveSettingsBtn = document.getElementById("save-settings-button");

/* Setting Controls */
const darkModeToggle = document.getElementById("dark-mode-setting-control");
const accesibleFontsToggle = document.getElementById(
  "accessible-fonts-control",
);

/* Audio */
const soundBtnClick = document.getElementById("sound-button-click");
const soundAlarm = document.getElementById("sound-alarm");

/* Text */
const roundStartHeaderText = document.getElementById("round-start-header-text");
const roundStartRules = document.getElementById("round-start-rules");
const playerStartName = document.getElementById("player-start-name");
const gameCountdownTimer = document.getElementById("game-timer");
const gameLives = document.getElementById("game-lives");
const cardContent = document.getElementById("card-content");
const roundWinnerTeam = document.getElementById("round-winner-team");
const gameWinnerTeam = document.getElementById("game-winner-team");

/* Global Functions */
function buttonAnimation(buttonElement) {
  // buttonElement.style.animationPlayState = "running";
  buttonElement.classList.remove("button-click");
  void buttonElement.offsetWidth;
  buttonElement.classList.add("button-click");
}

function screenTransition(currentScreen, nextScreen) {
  currentScreen.classList.remove("screen-in");
  currentScreen.classList.remove("screen-out");
  void currentScreen.offsetWidth;
  nextScreen.classList.remove("screen-in");
  nextScreen.classList.remove("screen-out");
  void nextScreen.offsetWidth;

  setTimeout(() => {
    currentScreen.classList.add("screen-out");
    nextScreen.classList.add("screen-in");
    nextScreen.classList.toggle("hidden");
    adjustContentContainer();
  }, 500);

  setTimeout(() => {
    currentScreen.classList.toggle("hidden");
  }, 1000);
}

function buttonClickAudio() {
  soundBtnClick.play();
}

/* ---------- SETTINGS ---------- */

let numTeams = 2;
let numCards = 1;

/* ---------- DATA STRUCTURES ---------- */

let gameData = {
  teams: [],
  teamScores: [0, 0],
  currentRound: 1,
  currentTeam: 0,
  currentPlayers: [0, 0],
  currentTurnScore: 0,
  currentTurnLives: 3,
  currentRoundTeamScores: [0, 0],
  cards: [],
  activeCards: [],
  activeCardIndex: 0,
  resetData: function () {
    this.teams = [];
    this.teamScores = [0, 0];
    this.currentRound = 1;
    this.currentTeam = 0;
    this.currentPlayers = [0, 0];
    this.cards = [];
    console.log("Data reset");
    console.log(gameData);
  },
};

/* ---------- MESSAGE MODAL ---------- */

const messageContainer = document.getElementById("message-container");
const messageModalText = document.getElementById("message-modal-text");
const messageModalButton = document.getElementById("message-modal-button");

function displayMessage(message) {
  messageModalText.textContent = message;
  messageContainer.classList.toggle("hidden");
}

messageModalButton.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();
  setTimeout(() => {
    messageContainer.classList.toggle("hidden");
  }, 500);
});

/* ---------- ENTER SCREEN ---------- */

enterBtnEnterScrn.addEventListener(
  "click",
  function () {
    buttonAnimation(this);
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
    buttonClickAudio();
    screenTransition(screenEntry, screenStart);
  },
  false,
);

function adjustContentContainer() {
  /* https://stackoverflow.com/questions/294250/how-do-i-retrieve-an-html-elements-actual-width-and-height */
  for (let i = 0; i < containersHeader.length; i++) {
    containerMaxHeight =
      containerGame.getBoundingClientRect().height -
      containersHeader[i].getBoundingClientRect().height -
      containersControls[i].getBoundingClientRect().height;
    containersContent[i].style.maxHeight = `${containerMaxHeight}px`;
  }
}

/* ---------- START GAME SCREEN ---------- */

/* Event Listeners */
startGameBtn.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();
  gameData.resetData();
  screenTransition(screenStart, screenTeamOne);
});

settingsBtn.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();
  screenTransition(screenStart, settingsScreen);
});

howToBtn.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();
});

/* ---------- TEAM ONE SCREEN ---------- */

const contentContainerTeamOne = document.getElementById("team-one-container");
let teamOnePlayerElements = contentContainerTeamOne.children;
const addPlayerBtnTeamOne = document.getElementById(
  "add-player-button-team-one",
);
const removePlayerBtnTeamOne = document.getElementById(
  "remove-player-button-team-one",
);
const continueBtnTeamOne = document.getElementById("continue-button-team-one");

/* Event Listeners */
addPlayerBtnTeamOne.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();

  const teamPlayerInput = document.createElement("input");
  teamPlayerInput.classList.add("input-field");
  teamPlayerInput.setAttribute("placeholder", "Player Name");

  contentContainerTeamOne.appendChild(teamPlayerInput);
});

removePlayerBtnTeamOne.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();

  if (teamOnePlayerElements.length > 2) {
    teamOnePlayerElements[teamOnePlayerElements.length - 1].remove();
  }
});

continueBtnTeamOne.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();

  // Validate the input data
  if (validateTeamPlayers(teamOnePlayerElements)) {
    pushTeamPlayers(teamOnePlayerElements);

    // Change to next screen
    screenTransition(screenTeamOne, screenTeamTwo);
  }
});

/* ---------- TEAM TWO SCREEN ---------- */

const contentContainerTeamTwo = document.getElementById("team-two-container");
let teamTwoPlayerElements = contentContainerTeamTwo.children;
const addPlayerBtnTeamTwo = document.getElementById(
  "add-player-button-team-two",
);
const removePlayerBtnTeamTwo = document.getElementById(
  "remove-player-button-team-two",
);
const continueBtnTeamTwo = document.getElementById("continue-button-team-two");

/* Event Listeners */
addPlayerBtnTeamTwo.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();

  const teamPlayerInput = document.createElement("input");
  teamPlayerInput.classList.add("input-field");
  teamPlayerInput.setAttribute("placeholder", "Player Name");

  contentContainerTeamTwo.appendChild(teamPlayerInput);
  console.log(teamTwoPlayerElements);
});

removePlayerBtnTeamTwo.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();

  if (teamTwoPlayerElements.length > 2) {
    teamTwoPlayerElements[teamTwoPlayerElements.length - 1].remove();
  }
});

continueBtnTeamTwo.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();

  // Validate the input data
  if (validateTeamPlayers(teamTwoPlayerElements)) {
    // Push team players to the global game data object
    pushTeamPlayers(teamTwoPlayerElements);

    // Generate card creation screens based on players enetered
    // and retreive the first screen to be navigated to
    const cardCreationScreen = generateCardCreationScreens();

    // Change to the next screen
    screenTransition(screenTeamTwo, cardCreationScreen);
  }
});

/* ---------- TEAM SCREENS SHARED FUNCTIONS ---------- */

function validateTeamPlayers(playersCollection) {
  let dataValid = true;

  for (let i = 0; i < teamOnePlayerElements.length; i++) {
    if (teamOnePlayerElements[i].value == "") {
      dataValid = false;
      displayMessage("Please ensure all team members have a name");
      break;
    }
  }

  return dataValid;
}

function pushTeamPlayers(playersCollection) {
  /* Create an array of players for Team one
   * from the text input values and add that array
   * onto the teams array in the game data
   */
  let teamPlayers = [];

  for (let i = 0; i < playersCollection.length; i++) {
    teamPlayers.push(playersCollection[i].value);
  }

  // Add the array of players to the global game data object
  gameData.teams.push(teamPlayers);
}

/* ---------- CARD CREATION SCREENS ---------- */

function generateCardCreationScreens() {
  // Create an array to hold all the screens as they are being created
  let cardCreationScreensArr = [];

  // Create an array of all players
  const allPlayersArr = [...gameData.teams[0], ...gameData.teams[1]];
  console.log(allPlayersArr);

  // Loop through the array of all players and generate a card
  // creaion screen for each one.
  for (let i = 0; i < allPlayersArr.length; i++) {
    // Create new card creation screen based on the template
    const screenCardCreation = document.createElement("section");
    screenCardCreation.setAttribute("class", "screen-container hidden");
    screenCardCreation.setAttribute("id", `screen-card-creation-${i}`);

    screenCardCreation.innerHTML = `
          <div class="header-container">
            <h2 class="header-text">
              ${allPlayersArr[i]} Card's
            </h2>
          </div>
          <div class="content-container" id="card-creation-container-${allPlayersArr[i]}">
            <textarea
              type="text"
              class="input-field input-area"
              placeholder="Enter card details..."
            ></textarea>
          </div>
          <div class="controls-container">
            <button
              class="control-button"
              id="continue-button-card-creation-${i}"
            >
              Continue
            </button>
          </div>`;

    // Push the new screen to an array of all screens
    cardCreationScreensArr.push(screenCardCreation);

    // Insert the new screen into the DOM.
    // If it is the first screen it will be inserted after the team two page
    // otherwise it will be inserted after the previous card creation screen
    if (i == 0) {
      screenTeamTwo.insertAdjacentElement("afterend", screenCardCreation);
    } else {
      cardCreationScreensArr[i - 1].insertAdjacentElement(
        "afterend",
        screenCardCreation,
      );
    }

    // Create number of cards based on the numCards setting
    // const cardCreationContainer = screenCardCreation.getElementById(
    //   "card-creation-container",
    // );
    const cardInput = document.getElementsByClassName("input-area")[0];

    // Function is delayed in order for the previous functions to have
    // time to be rendered to the DOM before their elements are attempted to be accessed.
    setTimeout(() => {
      const cardCreationContainer = document.getElementById(
        `card-creation-container-${allPlayersArr[i]}`,
      );

      for (let x = 0; x < numCards - 1; x++) {
        cardCreationContainer.appendChild(cardInput.cloneNode(true));
      }
    }, 100);

    // Add event listener to the next player / continue button
    // The action of the event listener will vary depending on
    // whethere is is the last screen. If it is the last screen
    // the the button next will need to be different and it will
    // need to navigate to the phase one screen

    const continueBtn = document.getElementById(
      `continue-button-card-creation-${i}`,
    );

    const cardCollection = document.getElementById(
      `card-creation-container-${allPlayersArr[i]}`,
    ).children;

    if (i != allPlayersArr.length - 1) {
      continueBtn.addEventListener("click", function () {
        buttonAnimation(this);
        buttonClickAudio();

        if (validateCards(cardCollection)) {
          pushCardData(cardCollection);
          console.log(gameData);

          // Transition to the next card creation screen
          screenTransition(
            cardCreationScreensArr[i],
            cardCreationScreensArr[i + 1],
          );
        }
      });
    } else {
      continueBtn.addEventListener("click", function () {
        buttonAnimation(this);
        buttonClickAudio();

        if (validateCards(cardCollection)) {
          pushCardData(cardCollection);
          console.log(gameData);

          nextRound();
          screenTransition(cardCreationScreensArr[i], roundStartScreen);
        }
      });
    }
  }

  // Return the first screen to be navigated to
  return cardCreationScreensArr[0];
}

function validateCards(cardCollection) {
  let dataValid = true;

  for (let i = 0; i < cardCollection.length; i++) {
    if (cardCollection[i].value == "") {
      dataValid = false;
      displayMessage("Please ensure all cards have a value");
      break;
    }
  }

  return dataValid;
}

function pushCardData(cardCollection) {
  for (let i = 0; i < cardCollection.length; i++) {
    gameData.cards.push(cardCollection[i].value);
  }
}

/* ---------- ROUND START SCREEN ---------- */

function nextRound() {
  let currentRound;
  let roundRules;

  if (gameData.currentRound == 1) {
    currentRound = "One";
    roundRules =
      "You can describe the card without using any of the words on the card.";
  } else if (gameData.currentRound == 2) {
    currentRound = "Two";
    roundRules =
      "You can use only one word to desribe the card. It cannot be a word on the card";
  } else if (gameData.currentRound == 3) {
    currentRound = "Three";
    roundRules =
      "You need to act out the description of the card. You may not use any words or make any sounds.";
  }

  roundStartHeaderText.textContent = `Round ${currentRound}`;
  roundStartRules.textContent = roundRules;

  // Create an active card set for the round by duplicating the cards array
  gameData.activeCards = [...gameData.cards];

  // Reset the round scores
  gameData.currentRoundTeamScores = [0, 0];
}

roundStartBtn.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();
  playerStart();
  screenTransition(roundStartScreen, playerStartScreen);
});

/* ---------- PLAYER START SCREEN ---------- */

function playerStart() {
  playerStartName.textContent = `${
    gameData.teams[gameData.currentTeam][
      gameData.currentPlayers[gameData.currentTeam]
    ]
  }'s Turn`;
}

playerStartBtn.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();
  startGame();
  screenTransition(playerStartScreen, gameScreen);
});

/* ---------- GAME SCREENS ---------- */

let timerFunction;

function startGame() {
  // Update / reset global game variables
  gameData.currentTurnScore = 0;
  gameData.currentTurnLives = 3;
  gameLives.textContent = `❤${gameData.currentTurnLives}`;

  // Iniate the first card
  nextCard();

  // Update the count down every 1 second
  // code from https://www.w3schools.com/howto/howto_js_countdown.asp
  let gameTime = 60000;

  timerFunction = setInterval(function () {
    // Time calculations for days, hours, minutes and seconds
    let minutes = Math.floor((gameTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((gameTime % (1000 * 60)) / 1000);

    // Decrement the time left bt one secon
    gameTime -= 1000;

    // Append a '0' prefix to the minutes and seconds if their values are less than 10
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    // Display the current time
    gameCountdownTimer.textContent = `${minutes}:${seconds}`;

    // End the game if the countdown finishes.
    if (gameTime < 0) {
      endTurn();
    }
  }, 1000);
}

function nextCard() {
  // Pick a random card of the remaining cards to become the active card
  let cardIndex = Math.floor(Math.random() * gameData.activeCards.length);
  gameData.activeCardIndex = cardIndex;

  // Show the card content
  cardContent.textContent = gameData.activeCards[gameData.activeCardIndex];

  console.log(gameData);
}

function nextPlayer() {
  // Check if the current player is the last player in their team array
  if (
    gameData.currentPlayers[gameData.currentTeam] ===
    gameData.teams[gameData.currentTeam].length - 1
  ) {
    // Switch the current player back to the first player
    gameData.currentPlayers[gameData.currentTeam] = 0;
  } else {
    // Switch the current player to the next player in the team
    gameData.currentPlayers[gameData.currentTeam] += 1;
  }

  // Switch team
  if (gameData.currentTeam === 0) {
    gameData.currentTeam = 1;
  } else {
    gameData.currentTeam = 0;
  }
}

function endTurn(endOfRound = false) {
  soundAlarm.play();

  // End the timer
  clearInterval(timerFunction);

  // Add the current round score to the current team's score
  gameData.teamScores[gameData.currentTeam] += gameData.currentTurnScore;
  gameData.currentRoundTeamScores[gameData.currentTeam] +=
    gameData.currentTurnScore;

  // Switch the active player to the next player
  nextPlayer();

  // Create the player start screen for the next player
  playerStart();

  if (endOfRound) {
    endRound();
  } else {
    // Change to the player start (next player) screen
    screenTransition(gameScreen, playerStartScreen);
  }
}

function endRound() {
  // Find the winning team for the round
  const winner =
    gameData.currentRoundTeamScores[0] > gameData.currentRoundTeamScores[1]
      ? 1
      : 2;
  roundWinnerTeam.textContent = `Team ${winner}`;

  // Check if the last round has just been played
  if (gameData.currentRound === 3) {
    nextRoundBtn.textContent = "View Results";
    gameData.currentRound += 1;
    endGame();
  } else {
    // Increment the round in the game data
    gameData.currentRound += 1;
  }

  // Change to the round end screen
  screenTransition(gameScreen, roundEndScreen);
}

function endGame() {
  // Find the winning team for the game
  const winner = gameData.teamScores[0] > gameData.teamScores[1] ? 1 : 2;
  gameWinnerTeam.textContent = `Team ${winner}!`;
}

rightAnswerBtn.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();

  // Give a point to the player and the team
  gameData.currentTurnScore += 1;

  // Remove the card from the active card array
  // and check if there are any cards left
  gameData.activeCards.splice(gameData.activeCardIndex, 1);

  // If there are no cards left end the game and the round
  if (gameData.activeCards.length === 0) {
    endTurn(true);
  }

  // Switch to the next card
  nextCard();
});

skipCardBtn.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();

  // Remove a life from the current player and
  // check if the player has any lives remaining
  gameData.currentTurnLives -= 1;
  gameLives.textContent = `❤${gameData.currentTurnLives}`;

  if (gameData.currentTurnLives === 0) {
    endTurn();
    console.log("Game over, no lives remaining");
  }

  // Switch to the next card
  nextCard();
});

nextRoundBtn.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();

  // Check if the last round has just been played
  if (gameData.currentRound === 4) {
    screenTransition(roundEndScreen, gameEndScreen);
  } else {
    // Start the next round
    nextRound();

    // Change to the round start screen
    screenTransition(roundEndScreen, roundStartScreen);
  }
});

homeBtn.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();

  screenTransition(gameEndScreen, screenStart);
});

/* ---------- SETTINGS SCREEN ---------- */

saveSettingsBtn.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();
  screenTransition(settingsScreen, screenStart);
});

darkModeToggle.addEventListener("click", function () {
  if (darkModeToggle.checked) {
    toggleTheme("dark");
  } else if (!darkModeToggle.checked) {
    toggleTheme("light");
  }
});

function toggleTheme(theme) {
  switch (theme) {
    case "dark":
      root.style.setProperty("--primary-color", "#232323");
      root.style.setProperty("--secondary-color", "#D9D9D9");
      root.style.setProperty("--tertiary-color", "#2D2D2D");
      break;
    case "light":
      root.style.setProperty("--primary-color", "#4d2db7");
      root.style.setProperty("--secondary-color", "#ec53b0");
      root.style.setProperty("--tertiary-color", "#3a18a9");
      break;
  }
}

accesibleFontsToggle.addEventListener("click", function () {
  if (accesibleFontsToggle.checked) {
    root.style.setProperty("--display-font", "Poppins");
  } else if (!accesibleFontsToggle.checked) {
    root.style.setProperty("--display-font", "Dinfest");
  }
});
