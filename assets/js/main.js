const compChoices = ['rock','paper','scissors'];

// #Start UI Variables
  const startUI = document.querySelector('#start-ui');
  const startGameBtn = document.querySelector('#start-game-btn');

  startGameBtn.addEventListener('click', startGame);

  function startGame(){
    toggleGameState();
    return
  }

  function toggleGameState(){
    startUI.classList.toggle('hidden');
    mainGame.classList.toggle('hidden');
  }

// #Main Game UI Variables
  // Displayers
  const mainGame = document.querySelector('#main-game');
  const announcer = document.querySelector('#display__announcer')

  // Human
  const humanChoiceCard = document.querySelector('#human-choice__card');
  const humanScore = document.querySelector('human-score')

  // Comp
  const compChoiceCard = document.querySelector('#comp-choice__card');
  const compScore = document.querySelector('#comp-score')

  // Choices & Btns
  const choiceBtns = document.querySelectorAll('.choice');
  const newGameBtn = document.querySelector("#new-game-btn");
  const quitBtn = document.querySelector('#quit-btn');

  choiceBtns.forEach(choice => choice.addEventListener('click', playRPS));
  newGameBtn.addEventListener('click', newGame);
  quitBtn.addEventListener('click', quitGame);

  function quitGame(){
    modalQuit.classList.toggle('modal-active');
    return
  }
    

  
// #Modals
  const modalWin = document.querySelector('#modal-win');
  const modalLose = document.querySelector('#modal-lose');
  const modalThanks = document.querySelector('#modal-thanks');
  const modalQuit = document.querySelector('#modal-quit');

  // Modal Btns
  const playAgainBtns = document.querySelectorAll('.play-again');
  const exitGameBtns = document.querySelectorAll('.exit-game');
  const confirmExitBtn = document.querySelector('.quit-yes');
  const declineExitBtn = document.querySelector('.quit-no');

  // playAgainBtns.forEach(playAgainBtn => {
  //   playAgainBtn.addEventListener('click', playAgain)
  // });

  // exitGameBtns.forEach(exitGameBtn => {
  //   exitGameBtn.addEventListener('click', exitGame);
  // })

  confirmExitBtn.addEventListener('click', confirmExit);
  // declineExitBtn.addEventListener('click', declineExit);

  function confirmExit(){
    modalQuit.classList.toggle('modal-active');
    modalThanks.classList.toggle('modal-active');

    setTimeout(function(){
      modalThanks.classList.toggle('modal-active')
      toggleGameState();
    }, 5000);

    return
  }


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

// const startGame = document.querySelector('.startGame');
// const startUI = document.querySelector('.startUI');
// const mainGame = document.querySelector('.mainGame');

// startGame.addEventListener('click', function(){
  // startUI.classList.toggle('hidden');
  // mainGame.classList.toggle('hidden');
// })
