function main() {

  // initialize deck as an empty list
  let deck = [];

  // hands will be an object that contains user hand and computer hand
  // {user: [], computer: []}
  let hands;

  // container and div that stores computer score
  const computerScoreContainer = document.querySelector('.game');
  let computerScoreDiv;
  // container and div that stores computer hand
  const computerCardsContainer = document.querySelector('.game');
  let computerDiv;
  // container and div that stores user score
  const userScoreContainer = document.querySelector('.game');
  let userScoreDiv;
  // container and div that stores user hand
  const userCardsContainer = document.querySelector('.game');
  let userDiv;
  // container and div that stores buttons
  const buttonsContainer = document.querySelector('.game');
  let buttonDiv;

  // hidden card that a computer has
  let hiddenCardElement;

  // when the user click submit, it will invoke handleFormSubmit function (in line 33)
  document.querySelector('form').addEventListener('submit', handleFormSubmit);

  // function that handles form submission
  function handleFormSubmit(event) {

    // prevent default
    event.preventDefault();

    // once the submit button is clicked, we will get rid of the start div
    document.querySelector('.start').setAttribute('style', 'display: none;');

    // start values that the user put in
    const startValuesInput = document.getElementById('startValues');
    // list of start values
    const startValues = startValuesInput.value.split(',');

    // make the deck by calling generateDeck function (line 57)
    deck = [...generateDeck(startValues)];

    // save the current hands of user and computer by calling dealCards function (line 81)
    hands = dealCards(deck);
   
    // display hands of computer and user by calling displayHands function (line 101)
    displayHands(hands);
  }

  // function that generates deck
  function generateDeck(startValues) {

    // Create a deck of 52 shuffled cards
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];
    for (let suit of suits) {
      for (let face of faces) {
        deck.push({ suit, face });
      }
    }

    // Shuffle the deck
    deck.sort(() => Math.random() - 0.5);

    // If start values are provided, set them on top of the deck
    if (startValues != '' && startValues.length > 0) {
      deck = startValues.map(face => ({ suit: 'diamonds', face })).concat(deck);
    }

    return deck;
  }

  // function that deals cards to user and computer in alternating fashion
  function dealCards(deck) {

    // declare the computer and userhands as empty lists
    const computerHand = [];
    const userHand = [];

    // Deal cards alternating between computer and player
    for(let i = 0; i < 4; i++){
      if(i % 2 == 0){
        computerHand.push(deck.shift());
      }
      else{
        userHand.push(deck.shift());
      }
    }

    return { computer: computerHand, user: userHand, deck };
  }

  // function that display hands of computer and user
  function displayHands(hands) {

    // Display computer's score
    // create the div for computer's score
    // set the text content, style it, and append to container
    computerScoreDiv = document.createElement('div');
    computerScoreDiv.textContent = `Computer Hand - Total: ?`;
    computerScoreDiv.setAttribute('style', 'text-align: center; height: 30px; background-color: white; margin: auto; width: 20%');
    computerScoreContainer.appendChild(computerScoreDiv);

    // empty space div adder (line 162)
    spaceCreator();

    // Display computer's cards
    // create the div for computer's hand
    // set the content by creating card elements, style it, and append to container
    computerDiv = document.createElement('div');
    computerDiv.classList.add('card-container', 'horizontal'); 
    computerDiv.appendChild(createCardElement(hands.computer[0]));
    computerDiv.appendChild(createHiddenCardElement(hands.computer[1]));
    computerDiv.setAttribute('style', 'text-align: center');
    computerCardsContainer.appendChild(computerDiv);
  
    // empty space div adder (line 162)
    spaceCreator();

    // Display user's score
    // create the div for user's score
    // set the text content, style it, and append to container
    userScoreDiv = document.createElement('div');
    userScoreDiv.textContent = `Player Hand - Total: ${calculateTotal(hands.user)}`;
    userScoreDiv.setAttribute('style', 'text-align: center; height: 30px; background-color: white; margin: auto; width: 20%');
    userScoreContainer.appendChild(userScoreDiv);

    // empty space div adder (line 162)
    spaceCreator();
  
    // Display user's cards
    // create the div for user's hand
    // set the content by creating card elements, style it, and append to container
    userDiv = document.createElement('div');
    userDiv.classList.add('card-container', 'horizontal'); 
    hands.user.forEach(card => {
      userDiv.appendChild(createCardElement(card));
    });
    userCardsContainer.appendChild(userDiv);
  
    // empty space div adder (line 162)
    spaceCreator();
  
    // Display Hit and Stand buttons
    // create the div for buttons
    // set the content by creating button elements, style it, and append to container
    buttonDiv = document.createElement('div');
    buttonDiv.appendChild(createButton('Hit', handleHit));
    buttonDiv.appendChild(createButton('Stand', handleStand));
    buttonDiv.classList.add('buttons-container', 'horizontal');
    buttonsContainer.appendChild(buttonDiv);
  }
  
  // function that creates a div and add break sign
  function spaceCreator(){
    const spaceContainer = document.querySelector('.game');
    const newDiv = document.createElement('div');
    const lineBreak = document.createElement('br');
    newDiv.appendChild(lineBreak);
    spaceContainer.appendChild(newDiv);
  }

  // function that creates card element
  function createCardElement(card) {

    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
  
    // Create elements for the number and suit
    const numberElement = document.createElement('span');
    numberElement.classList.add('card-number');
    numberElement.textContent = card.face;
  
    const suitElement = document.createElement('span');
    suitElement.classList.add('card-suit');
    const suit = getSuitSymbol(card.suit);
    if(suit == '♥' || suit == '♦' ){
      suitElement.style.color = 'red';
      numberElement.style.color = 'red';
    }
    suitElement.textContent = getSuitSymbol(card.suit);
  
    // Append number and suit to the card element
    cardElement.appendChild(numberElement);
    cardElement.appendChild(suitElement);
  
    return cardElement;
  }
  
  // function that gets the symbol of the card
  function getSuitSymbol(suit) {

    // Map suits to Unicode symbols
    const suitSymbols = {
      hearts: '♥',
      diamonds: '♦',
      clubs: '♣',
      spades: '♠'
    };
  
    return suitSymbols[suit] || suit;
  }

  // function that creates a hidden card element of the computer hand
  function createHiddenCardElement(card) {
    hiddenCardElement = document.createElement('div');
    hiddenCardElement.classList.add('card', 'hidden');
    return hiddenCardElement;
  }
  
  // function that creates button
  function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    return button;
  }

  // function that calculates the total points
  function calculateTotal(hand) {

    // initialize the total point to be 0
    let total = 0;
    // initialize the number of aces to be 0
    let numAces = 0;

    // go through all the cards in hand
    for (let card of hand) {

      // aces are either 1 point of 11, but add 11 for now
      if (card.face === 'A') {
        numAces += 1;
        total += 11;
      } 
      // face cards are worth 10 points
      else if (['K', 'Q', 'J'].includes(card.face)) {
        total += 10;
      } 
      // anything else is their face value
      else {
        total += parseInt(card.face);
      }
    }

    // Adjust for Aces
    // if the number of aces are greater than 0 and the total pont is greater than 21 (bust)
    // make the value of ace to be 1 by subtracting 10 from the point and decrement the ace count
    while (numAces > 0 && total > 21) {
      total -= 10;
      numAces -= 1;
    }

    return total;
  }

  // function that is called when the user clicks hit
  function handleHit() {

    // Deal the next card from the deck to the user
    const card = deck.shift();
    hands.user.push(card);

    // Display the new card in the user's hand
    userDiv.appendChild(createCardElement(card));

    // Update the user's total display
    userScoreDiv.textContent = `Player Hand - Total: ${calculateTotal(hands.user)}`;

    // Check if the user's total exceeds 21
    const userTotal = calculateTotal(hands.user);
    if (userTotal > 21) {
      // end the game by calling end game (line 345)
      endGame('You busted! Computer wins.');
    }
  }

  // function that will be called when the user clicks stand
  function handleStand() {
    // End the user's turn and let the computer play
    userScoreDiv.textContent = `Player Hand - Total: ${calculateTotal(hands.user)}`;

    // call computerPlay function (line 293)
    computerPlay();
  }

  // function that will be called for computer's turn
  function computerPlay() {

    // computer hits if the total is less than 15, otherwise stand
    while (calculateTotal(hands.computer) < 15) {
      const card = deck.shift();
      hands.computer.push(card);

      // Display the new card in the computer's hand
      computerDiv.appendChild(createCardElement(card));
    }

    // Determine the winner and end the game (line 310)
    determineWinner();
  }

  // function that determines the winner
  function determineWinner() {

    // calculate the total points of computer and a user
    const userTotal = calculateTotal(hands.user);
    const computerTotal = calculateTotal(hands.computer);

    let resultMessage = '';

    // set the message accordingly by the scenario
    // user bust
    if (userTotal > 21) {
      resultMessage = 'Player Lost... Bust';
    } 
    // computer bust
    else if (computerTotal > 21) {
      resultMessage = 'Player Won!!!!!';
    } 
    // user wins by point
    else if (userTotal > computerTotal) {
      resultMessage = 'Player Won!!!!!';
    } 
    // computer wins by point
    else if (userTotal < computerTotal) {
      resultMessage = 'Player Lost...';
    } 
    // tie
    else {
      resultMessage = 'It\'s a tie!';
    }

    // call the end game function to end the game (line 345)
    endGame(resultMessage);
  }

  // function that ends the game
  function endGame(message) {

    // Display the final result message
    // by creating a result div, set the text content, style it and append 
    const resultElement = document.createElement('div');
    resultElement.textContent = message;
    resultElement.setAttribute('style', 'text-align: center; height: 30px; background-color: white; margin: auto; width: 20%');
    document.querySelector('.game').appendChild(resultElement);

    // show hidden card of the computer hand
    // change the background color of the card to be white
    hiddenCardElement.setAttribute('style', 'background-color: #fff');

    // Create elements for the number and suit
    const numberElement = document.createElement('span');
    numberElement.classList.add('card-number');
    numberElement.textContent = hands.computer[1].face;
  
    const suitElement = document.createElement('span');
    suitElement.classList.add('card-suit');
    const suit = getSuitSymbol(hands.computer[1].suit);
    if (suit == '♥' || suit == '♦') {
      suitElement.style.color = 'red';
      numberElement.style.color = 'red';
    }
    suitElement.textContent = getSuitSymbol(hands.computer[1].suit);
  
    // Append number and suit to the hidden card element
    hiddenCardElement.appendChild(numberElement);
    hiddenCardElement.appendChild(suitElement);

    // display the computer's score
    computerScoreDiv.textContent = `Computer Hand - Total: ${calculateTotal(hands.computer)}`;

    // get rid of the buttons
    buttonDiv.style.display = 'none';
    
  }
}

document.addEventListener('DOMContentLoaded', main);
