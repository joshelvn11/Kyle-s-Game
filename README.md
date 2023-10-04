# Kyle's Game - A Fun Party Game

## Overview

This site allows people to play the party classic, Kyle's Game, on your phone with friends!

This game is primarliy designed to be used on mobile devices however works on any device on a browser. It utilises a fullscreen mode on mobile phones to emulate a native app and also runs as a PWA (Progressive Web App) on Android Devices.

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

The player describing may skip a card if they choose to, however as a consequence they will lose a life. Each player has two lives per round. If a player breaks the description rules for the round they will also be required to skip their current card and as a reult lose a life. Skipped cards are not removed from play and will stay in the round until correctly guessed.

#### The Rounds

The game is played over three rounds, each round has it's own rules on how the player describing the cards may describe them to the other player(s) on their team. The rules for each round get progressively more difficult however because the same cards are used for each round the players should also become more familiar with the cards in the pool over every round.

Round One: The player can describe the card however they like without using any words on the card. They may not use 'rhymes with' or 'sounds like' descriptions for words.

Round Two: The player can describe the card using only one word, the word may not be any word on the card and once they have said their desired word they may not say anything else or make any sounds until the card has been correctly guessed, or skipped.

Round Three: The player can act out the card using any actions but may not say anything or use any sounds.

If any rule for the round is broken the card must be skipped and the player will lose a life.

#### Ending The Game

At the end of the third round the each team's score over the course of the three rounds are added together to decide an overall winner.

## Features

### Single Page Layout

The site is designed with a single page layout where all screens are implemented as panes which transition in/out of visibility as the user navigates. This removes the need for uncessary page loads make the navigation experience much more seamless while also allowing for easier access to global data for all the panes.

### Game Timer

Each round has a countdown timer which will automatically end the turn and prevent further gameplay when it reaches zero. This removes the need for using a seperate timer as is needed with the analog version of the game.

### Lives

Every turn a player is given 3 lives. A life is deducted every time a card is skipped and the turn will automatically end when a user's lives reach 0.

### Dark Mode

In the settings users may switch to dark mode which for some may be preffered for an aesthetics point of view and for users with visual impairment will improve accessibility.

It is implemented by changing global css variables.

### Card Number Settings

In the settings users may adjust the number of cards they would like for each player. In the card creation screens the number of cards the user has specified will be automatically generated.

### Accesible Fonts

Because the display fonts used may be inaccessible to a degree for visually impaired users a setting is available which will change the display font to a more accessible font.

### Cookies

To persist settings data on the device cookies are used. When a user changes settings these will be saved as cookies to a device and every time the game is load the settings will first be attempted to be loaded from cookies and applied to the game.

This eliminates the need for users to apply the preferred settings every time the page is loaded.
