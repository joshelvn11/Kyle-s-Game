# Kyle's Game - A Fun Party Game


![Devices Mockup](https://i.imgur.com/cBGFoeq.png "Devices Mockup")

## Overview

This site allows people to play the party classic, Kyle's Game, on your phone with friends!

This game is primarily designed to be used on mobile devices however works on any device on a browser. It utilises a fullscreen mode on mobile phones to emulate a native app.

It is a game for multiple players using the same device where the device is passed around to the active player.

### How To Play

Kyle's Game is a party game typically played with paper and pen with at least two teams of ideally 3 to 5 players on each team. It involves a whole lot of fun and creativity and players have to make the cards that are played with.

#### The Objective

The game is played with two or more teams with two or more players per team. The objective of the game is for each team to correctly guess more cards than the other(s) over the course of three rounds.

To correctly guess a card a team needs to successfully guess exactly what is written on the card based on a description from one of their team members. The rules for what the description may include vary by round.

#### The Cards

You may be wondering what is on these cards, and well, that is anything you choose as you make them up yourself! Anything from one word to a phrase or sentence. The longer and more obscure your cards are the more difficult they will be to guess!

All players will write a number of cards (which can be changed in the settings, the default is 3), which are then all added to the game pool and used for all teams to play with over the course of the three rounds. The card order is completely random and no one will know who wrote which card.

#### The Game

Each turn one player from the team will be the one required to describe the cards to their team mates in order for them to correctly guess what is written on the card.

Each turn a team has one minute to guess as many cards as possible. If a card is correctly guessed the card is removed from the game for the rest of the round, once all cards have been correctly guessed the round is over, the amount of correctly guessed cards is added to each team's total score and the game moves to the next round where all the cards are added back to the game and used to play again.

The player describing may skip a card if they choose to, however as a consequence they will lose a life. Each player has two lives per round. If a player breaks the description rules for the round they will also be required to skip their current card and as a result lose a life. Skipped cards are not removed from play and will stay in the round until correctly guessed.

#### The Rounds

The game is played over three rounds, each round has its own rules on how the player describing the cards may describe them to the other player(s) on their team. The rules for each round get progressively more difficult however because the same cards are used for each round the players should also become more familiar with the cards in the pool over every round.

Round One: The player can describe the card however they like without using any words on the card. They may not use 'rhymes with' or 'sounds like' descriptions for words.

Round Two: The player can describe the card using only one word, the word may not be any word on the card and once they have said their desired word they may not say anything else or make any sounds until the card has been correctly guessed, or skipped.

Round Three: The player can act out the card using any actions but may not say anything or use any sounds.

If any rule for the round is broken the card must be skipped and the player will lose a life.

#### Ending The Game

A~At the end of the third round the each team's score over the course of the three rounds are added together to decide an overall winner.

## Design

The design and prototype was first created in Figma, the original design filed used can be found here

## Features

### Single Page Layout

The site is designed with a single page layout where all screens are implemented as panes which transition in/out of visibility as the user navigates. This removes the need for uncessary page loads make the navigation experience much more seamless while also allowing for easier access to global data for all the panes.

### Game Timer

Each round has a countdown timer which will automatically end the turn and prevent further gameplay when it reaches zero. This removes the need for using a seperate timer as is needed with the analog version of the game.

### Lives

Every turn a player is given 3 lives. A life is deducted every time a card is skipped and the turn will automatically end when a user's lives reach 0.

### Message Modal

The game has a message modal function which can be used at any point to display a custom alert to the user.

### Dark Mode

In the settings users may switch to dark mode which for some may be preferred for an aesthetics point of view and for users with visual impairment will improve accessibility.

It is implemented by changing global css variables.

### Card Number Settings

In the settings users may adjust the number of cards they would like for each player. In the card creation screens the number of cards the user has specified will be automatically generated.

### Accessible Fonts

Because the display fonts used may be inaccessible to a degree for visually impaired users a setting is available which will change the display font to a more accessible font.

### Cookies

To persist settings data on the device cookies are used. When a user changes settings these will be saved as cookies to 
a device and every time the game is load the settings will first be attempted to be loaded from cookies and applied to the game.

This eliminates the need for users to apply the preferred settings every time the page is loaded.

## Sections / Screens

Each section is displayed as a separate screen with only being visible in the viewport at a time. The screens are
navigated between using navigation buttons on each screen. Adopting this approach allows the sections to be rendered on 
the fly off-screen and prevent page loads resulting in a smoother user experience.

### Start Screen

### Add Players Screens

The Add Players screens allows the user(s) to assign names to the players on each team and add or remove players from 
team. Player names are validated to be unique and not more than six characters.

### Add Cards Screens

An add cards screen is dynamically generated for each player created on the previous screens. Card boxes are generated 
based on the number of cards setting on the settings screen (the default being three). The cards are validated to ensure 
they have all been filled out with at least some content. Once all cards are filled out and the player continues the 
cards are saved to the game pool.

### Round Start Screen

This screen displays the rules for the current round.

### Player Start Screen

This screen indicate which player's turn it is.

### Game Screen

This is the primary screen where the game actually takes places. It has a countdown timer and indicates the current 
amount of lives the player has for the turn.

In the center the current card in play is displayed.

At the bottom are the action buttons where the player can either choose that they correctly guessed the current card or 
skipped it. Both will cause a new random card to be displayed in the central area. When the timer ends, the player runs 
out of lives or all remaining cards in the pool are guessed the turn or round will end and automatically move to the 
end of turn screen.

### End of Turn Screen

This screen is shown at the end of every turn and shows how many cards were guessed correctly by the player that turn.

### End of Round Screen

This screen is shown at the end of every round and shows the winning team of that round.

### End of Game Screen

This screen is shown at the end of the game and shows the overall winner of the game.

## Testing

### Markup Validation

### CSS Validation

The site passed through the Jigsaw CSS validator with no issues.

![Jigsaw Validator](https://i.imgur.com/2GNNbM5.png "Jigsaw Validator")

### JS Validation

When passed through JSHint, if all messages about esversion are ignored, the site produced 3 identical messages of 'Functions declared within loops referencing an outer scoped variable may lead to confusing semantics.'.

I could not find a reasonable solution to avoid these so have left as is for the time being.

### Lighthouse Testing

The site was passed through Lighthouse with full scores in every area on both mobile and desktop.

![Lighthouse Testing](https://i.imgur.com/Tb7Jdve.png "Lighthouse Testing")

### Usability Testing

For actually human usability testing the website was given to a small group of test users of different ages and technical backgrounds to ensure the website was intuitive and easy to use for all audiences. The feedback was positive across all test users confirming the site was intuitive and usable.

## Browser Testing

The browser was tested for full compatability across Chrome, Safari and Firefox with no known issues.

## Known Bugs

There is currently only one known bug where the scroll bar track is always shown, even if there is no content to scroll,
on the center content section on Firefox on desktop. Other browsers and Firefox on mobile do not have this issue.

## Deployment

This repo is deployed to GitHub pages.

The repo is configured to automatically to deploy GitHub pages using GitHub actions every time commit is pushed to the main branch.

The steps to set up this deployment process are as follows:

Navigate to the setting tabs of the GitHub repository.
Navigate to the Pages section using the navigation panel on the left.
Under the Source dropdown make sure 'Deploy from a branch' is selected.
Under 'Branch' select the branch you wish to deploy from, in this case it's 'main'.
Click 'Save' and now every time a commit is pushed to this branch on this repo it will be automatically deploy to GitHub pages.
GitHub Pages Website - https://github.com/joshelvn11/Kyles-Game
