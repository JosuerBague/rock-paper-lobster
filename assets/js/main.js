const compChoices = ['rock','paper','scissors'];
const humanScoreCard = document.querySelector('#humanScoreCard');
const compScoreCard = document.querySelector('#compScoreCard')

let counterHuman = document.createElement('span');
let counterComp = document.createElement('span');

let scoreHuman = 0;
let scoreComp = 0;

function scoreKeeper(result){

  if(result==='draw'){
      return
  } else if(result==='win'){
      scoreHuman++
      counterHuman.textContent = scoreHuman;
      if(humanScoreCard.hasChildNodes()){
        humanScoreCard.removeChild(humanScoreCard.firstChild);
      }
      humanScoreCard.appendChild(counterHuman);
  } else {
      scoreComp++
      counterComp.textContent = scoreComp;
      if(compScoreCard.hasChildNodes()){
        compScoreCard.removeChild(compScoreCard.firstChild)
      }
      compScoreCard.appendChild(counterComp);
  }

}

// computer's game input
function computerPlay(){
  let pickRandom = Math.floor(Math.random() * compChoices.length);
  return compChoices[pickRandom];
}

// Changes inputs to TitleCase
function titleCase(text){
  let firstChar = text.substr(0,1).toUpperCase();
  let restOfString = text.substr(1);

  return firstChar.concat(restOfString);
}

// Display's round result
function displayer(playerSelection, computerSelection, result){
  let display = document.querySelector('#display');
  let displayPar = document.createElement('p');

  let player = titleCase(playerSelection);
  let computer = titleCase(computerSelection);

  displayPar.textContent = `${player} beats ${computer}! You win.`;

  if(result === 'lose'){
    displayPar.textContent = `${player} loses to ${computer}! Oof...you lose.`
  }
  if(result === 'draw'){
    displayPar.textContent = "It's a draw!";
  }

  if(display.hasChildNodes()){
    display.removeChild(display.firstChild);
  }
  
  display.appendChild(displayPar);
  return
}

// Plays one round of rock paper scissors
function playRPS(e){
  console.log(e);
  let playerSelection = e.target.value;
  let computerSelection = computerPlay();
  let result;

  if(playerSelection === computerSelection){
    result = 'draw'
  } else if(playerSelection === 'rock'){
    computerSelection === 'scissors' ? result = 'win' : result = 'lose';  
  } else if(playerSelection === 'paper'){
    computerSelection === 'rock' ? result = 'win' : result ='lose';
  } else {
    computerSelection === 'paper' ? result = 'win' : result ='lose'
  }

  displayer(playerSelection, computerSelection, result);
  scoreKeeper(result);
  return result;
}

const newGameBtn = document.querySelector('#playGame');
const quitGame = document.querySelector('#quitGame') 
const choiceBtns = document.querySelectorAll('.choice');

choiceBtns.forEach(choiceBtn => choiceBtn.addEventListener('click', playRPS));

newGameBtn.addEventListener('click', newGame);
// quitGame.addEventListener('click', quitGame());

function newGame(){
  scoreHuman = 0;
  scoreComp = 0;

  counterHuman.textContent = scoreHuman;
  counterComp.textContent = scoreComp;

  if(humanScoreCard.hasChildNodes()){
    humanScoreCard.removeChild(humanScoreCard.firstChild);
  }

  if(compScoreCard.hasChildNodes()){
    compScoreCard.removeChild(compScoreCard.firstChild);
  }

  humanScoreCard.appendChild(counterHuman);
  compScoreCard.appendChild(counterComp);

}

// EXPERIMENTAL

const startGame = document.querySelector('.startGame');
const startUI = document.querySelector('.startUI');
const mainGame = document.querySelector('.mainGame');

startGame.addEventListener('click', function(){
  startUI.classList.toggle('hidden');
  mainGame.classList.toggle('hidden');
})
