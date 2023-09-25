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

/* Audio */
const soundBtnClick = document.getElementById("sound-button-click");

/* Text */
const roundStartHeaderText = document.getElementById("round-start-header-text");
const roundStartRules = document.getElementById("round-start-rules");

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
let numCards = 3;

/* ---------- DATA STRUCTURES ---------- */

let gameData = {
  teams: [],
  currentPlayers: [],
  teamScores: [],
  currentRound: 1,
  cards: [],
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
  screenTransition(screenStart, screenTeamOne);
});

settingsBtn.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();
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
}

roundStartBtn.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();
  screenTransition(roundStartScreen, playerStartScreen);
});

function nextPlayer() {
  return nextPlayerScreen;
}

function startGame() {
  return gameScreen();
}
