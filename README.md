# Black Jack

## Overview
I used the following concepts to implement this application:
<ul>
    <li>manipulating the DOM by creating and adding elements
    <li>setting DOM element attributes
    <li>handling events with addEventListener
    <li>stopping form submission with preventDefault
    <li>using CSS to arrange elements with position and display
    <li>using AJAX to make background requests
</ul>

## Description
This is a two-player (user vs computer) client-side card game. The card game will be a single hand of blackjack. If you're unfamiliar with the rules:
<ul>
    <li>each player will try to construct a hand of cards that's equal to 21 or as close to 21 as possible, without going over
        <ul>
            <li>the sum of the numeric values of the cards determine the value of a hand
            <li>face cards are worth 10
            <li>aces are worth 1 or 11
            <li>the player with the hand closest to (or equal to) 21 wins
            <li>ties are possible
        </ul>
    <li>each player is dealt 2 cards from a 52 card deck, with each card representing some numeric value
    in our version, the initial cards are dealt to the computer and user in an alternating fashion, with the computer being dealt the 1st card:
        <ul>
            <li>the computer is dealt one card, and the user is dealt another card
            <li>this repeats one more time so that both the user and computer have 2 cards each
        </ul>
    <li>once the initial two cards are dealt, the user can choose to be dealt more cards ("hit") or stop being dealt cards ("stand")
        <ul>
            <li>if the user's hand ends up exceeding 21, then the user automatically loses
            <li>if the user chooses to "stand" (to stop being dealt cards), then the computer can choose to continually "hit" or "stand"
        </ul>
    <li>once both players have either chosen to stand or have a hand with a total that's more than 21 ("bust"), the hands are compared
        <ul>
            <li>the player with the hand that's closest to 21 without going over wins
            <li>again ties are possible (either same total, or both player "bust")
        </ul>
</ul>

## Game Play
![ezgif com-video-to-gif-converted (1)](https://github.com/dj980907/BlackJack/assets/108609222/7eab17bb-0f3d-4f05-b528-6797d65fdc06)

