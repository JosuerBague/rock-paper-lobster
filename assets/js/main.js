const compChoices = ['rock','paper','lobster','rock','paper','lobster','rock',
                     'paper', 'lobster'];

const imgURL = ["url(../assets/img/rockf.png)", "url(../assets/img/paperf.png)",
                "url(../assets/img/lobsterf.png)", "url(../assets/img/rockf.png)",
                "url(../assets/img/paperf.png)", "url(../assets/img/lobsterf.png)"]

let tallyHuman = 0;
let tallyComp = 0;

// #Start Game Btn
  const startGameBtn = document.querySelector('#start-game-btn');

  startGameBtn.addEventListener('click', startGame);

  function startGame(){
    const startUI = document.querySelector('#start-ui');
    const mainGame = document.querySelector('#main-game');

    startUI.classList.toggle('hidden');
    mainGame.classList.toggle('hidden');
  }

  

// #Main Game UI Variables
  // Displayers
  const announcer = document.querySelector('#display__announcer');

  // Human
  const humanChoiceCard = document.querySelector('#human-choice__card');
  const humanScore = document.querySelector('#human-score')

  // Comp
  const compChoiceCard = document.querySelector('#comp-choice__card');
  const compScore = document.querySelector('#comp-score')

  // Choices & Btns
  const choiceBtns = document.querySelectorAll('.choice');
  // const newGameBtn = document.querySelector("#new-game-btn");

  choiceBtns.forEach(choice => choice.addEventListener('click', playRPS));
  // newGameBtn.addEventListener('click', newGame);


  const quitBtn = document.querySelector('#quit-btn');
  quitBtn.addEventListener('click', function quitGame(){
    const modalQuit = document.querySelector('#modal-quit');
    modalQuit.classList.toggle('modal-active');
  });
  
  const confirmExitBtn = document.querySelector('#quit-yes');
  confirmExitBtn.addEventListener('click', function confirmExit(){

    const modalQuit = document.querySelector('#modal-quit');
    const modalThanks = document.querySelector('#modal-thanks');
    const startUI = document.querySelector('#start-ui');
    const mainGame = document.querySelector('#main-game');

    modalQuit.classList.toggle('modal-active');
    modalThanks.classList.toggle('modal-active');

    setTimeout(function resetGame(){
      modalThanks.classList.toggle('modal-active');
      startUI.classList.toggle('hidden');
      mainGame.classList.toggle('hidden');
    }, 5000);
  });




  
// #Modals
  const modalWin = document.querySelector('#modal-win');
  const modalLose = document.querySelector('#modal-lose');

  // Modal Btns
  const playAgainBtns = document.querySelectorAll('.play-again');
  const exitGameBtns = document.querySelectorAll('.exit-game');
  const declineExitBtn = document.querySelector('.quit-no');

  // playAgainBtns.forEach(playAgainBtn => {
  //   playAgainBtn.addEventListener('click', playAgain)
  // });

  // exitGameBtns.forEach(exitGameBtn => {
  //   exitGameBtn.addEventListener('click', exitGame);
  // })

  declineExitBtn.addEventListener('click', declineExit);

  function declineExit(){
    modalQuit.classList.toggle('modal-active');
    return
  }


function scoreKeeper(result){
  let score = document.createElement('span');

  if(result==='draw'){
      return
  } else if(result==='win'){
      tallyHuman++
      score.textContent = tallyHuman;
      
      while(humanScore.hasChildNodes()){
        humanScore.removeChild(humanScore.firstChild)
      }

      humanScore.appendChild(score);
      
  } else {
      tallyComp++
      score.textContent = tallyComp;
      
      while(compScore.hasChildNodes()){
        compScore.removeChild(compScore.firstChild)
      }

      compScore.appendChild(score);
  }
  return
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
function displayRoundResult(playerSelection, computerSelection, result){
  
  let comparisonPar = document.createElement('p');
  let resultPar = document.createElement('p');

  if(result === 'draw'){
    comparisonPar.textContent = "It's a draw!";
    resultPar.textContent = '';

    while(announcer.hasChildNodes()){
      announcer.removeChild(announcer.firstChild);
    }

    announcer.appendChild(comparisonPar);
    return
  }

  let player = titleCase(playerSelection);
  let computer = titleCase(computerSelection);

  comparisonPar.textContent = `${player} beats ${computer}!`;
  resultPar.textContent = 'You win!'

  if(result === 'lose'){
    comparisonPar.textContent = `${player} succumbs to ${computer}!`
    resultPar.textContent = 'You lose!'
  }
  

  while(announcer.hasChildNodes()){
    announcer.removeChild(announcer.firstChild);
  }
  
  announcer.appendChild(comparisonPar);
  announcer.appendChild(resultPar);
  return
}

function playerBgImage(choice){
  if(choice === 'rock'){
    humanChoiceCard.style.backgroundImage = "url(../assets/img/rockf.png)"
  } else if(choice === 'paper'){
    humanChoiceCard.style.backgroundImage = "url(../assets/img/paperf.png)"
  } else {
    humanChoiceCard.style.backgroundImage = "url(../assets/img/lobsterf.png)"
  }
}



function displayCompChoice(choice) {
  let randomize = setInterval(bgImageRandomize, 90);
  setTimeout(clearRandomize, 2000);
  setTimeout(compBgImage, 5000, choice);

  function clearRandomize(){
    clearInterval(randomize);
  }

  function bgImageRandomize(){
    let random = Math.floor(Math.random() * imgURL.length);
  
    compChoiceCard.style.backgroundImage = imgURL[random];
  }

  function compBgImage(choice){
    if(choice === 'rock'){
      compChoiceCard.style.backgroundImage = "url(../assets/img/rockf.png)"
    } else if (choice === 'paper'){
      compChoiceCard.style.backgroundImage = "url(../assets/img/paperf.png)"
    } else {
      compChoiceCard.style.backgroundImage = "url(../assets/img/lobsterf.png)"
    }
  }
}


// Plays one round of rock paper lobster
function playRPS(e){
  let playerSelection = e.target.value;
  let computerSelection = computerPlay();
  let result;
  
  console.log('player :', playerSelection);
  console.log('computer :', computerSelection);

  if(playerSelection === computerSelection){
    result = 'draw'
  } else if(playerSelection === 'rock'){
    computerSelection === 'lobster' ? result = 'win' : result = 'lose';  
  } else if(playerSelection === 'paper'){
    computerSelection === 'rock' ? result = 'win' : result ='lose';
  } else {
    computerSelection === 'paper' ? result = 'win' : result ='lose'
  }

  displayRoundResult(playerSelection, computerSelection, result);
  scoreKeeper(result);
  playerBgImage(playerSelection);
  displayCompChoice();
  return result;
}

// function newGame(){
//   scoreHuman = 0;
//   scoreComp = 0;

//   counterHuman.textContent = scoreHuman;
//   counterComp.textContent = scoreComp;

//   if(humanScoreCard.hasChildNodes()){
//     humanScoreCard.removeChild(humanScoreCard.firstChild);
//   }

//   if(compScoreCard.hasChildNodes()){
//     compScoreCard.removeChild(compScoreCard.firstChild);
//   }

//   humanScoreCard.appendChild(counterHuman);
//   compScoreCard.appendChild(counterComp);

// }

// EXPERIMENTAL

// const startGame = document.querySelector('.startGame');
// const startUI = document.querySelector('.startUI');
// const mainGame = document.querySelector('.mainGame');

// startGame.addEventListener('click', function(){
  // startUI.classList.toggle('hidden');
  // mainGame.classList.toggle('hidden');
// })
