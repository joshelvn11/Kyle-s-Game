/* Screens */
const screenEntry = document.getElementById("screen-entry");
const screenStart = document.getElementById("screen-start");
const screenTeamOne = document.getElementById("screen-team-one");
const screenTeamTwo = document.getElementById("screen-team-two");
const screenCardCreation = document.getElementById("screen-card-creation");

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

/* Audio */
const soundBtnClick = document.getElementById("sound-button-click");

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

/* ---------- DATA STRUCTURES ---------- */

let numTeams = 2;

/* ---------- DATA STRUCTURES ---------- */

let gameData = {
  teams: [],
  currentPlayers: [],
  teamScores: [],
  currentPhase: 1,
  cards: [],
};

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
  console.log(teamOnePlayerElements);
});

removePlayerBtnTeamOne.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();

  if (teamOnePlayerElements.length > 2) {
    teamOnePlayerElements[teamOnePlayerElements.length - 1].remove();
  }

  console.log(teamOnePlayerElements);
});

continueBtnTeamOne.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();

  /* Create an array of players for Team one
   * from the text input values and add that array
   * onto the teams array in the game data
   */
  let teamOnePlayers = [];

  for (let i = 0; i < teamOnePlayerElements.length; i++) {
    teamOnePlayers.push(teamOnePlayerElements[i].value);
  }

  gameData.teams.push(teamOnePlayers);
  console.log(gameData);

  // Change to next screen
  screenTransition(screenTeamOne, screenTeamTwo);
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

  console.log(teamTwoPlayerElements);
});

continueBtnTeamTwo.addEventListener("click", function () {
  buttonAnimation(this);
  buttonClickAudio();

  /* Create an array of players for Team one
   * from the text input values and add that array
   * onto the teams array in the game data
   */
  let teamTwoPlayers = [];

  for (let i = 0; i < teamTwoPlayerElements.length; i++) {
    teamTwoPlayers.push(teamTwoPlayerElements[i].value);
  }

  gameData.teams.push(teamTwoPlayers);
  console.log(gameData);

  // Change to next screen
  screenTransition(screenTeamTwo, screenCardCreation);
});
