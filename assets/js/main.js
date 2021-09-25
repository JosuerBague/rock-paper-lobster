
// #Start Game Btn
  const startGameBtn = document.querySelector('#start-game-btn');
  startGameBtn.addEventListener('click', startGame);

  function startGame(){
    const startUI = document.querySelector('#start-ui');
    const mainGame = document.querySelector('#main-game');

    startUI.classList.toggle('hidden');
    mainGame.classList.toggle('hidden');
  }

// #ResetGameBtn -> circular arrow with green bg
  const resetBtn = document.querySelector('#reset-btn');

  resetBtn.addEventListener('click', resetGame);

  function resetGame(){
    const modalReset = document.querySelector('#modal-reset');
    modalReset.classList.toggle('modal-active');
  };

// #DeclineReset -> found in modal-reset
  const declineResetBtn = document.querySelector('#reset-no');
  declineResetBtn.addEventListener('click', declineReset);
  
  function declineReset(){
    const modalReset = document.querySelector('#modal-reset');
    modalReset.classList.toggle('modal-active');
  };

// #ConfirmReset -> found in modal-reset
  const confirmResetBtn = document.querySelector('#reset-yes');
  confirmResetBtn.addEventListener('click',confirmReset)
  
  function confirmReset(){
    let modalReset = document.querySelector('#modal-reset');
    modalReset.classList.toggle('modal-active');
    resetScore();
  };

  function resetScore(){
    const startHuman = document.createElement('span'),
          startComp = document.createElement('span')
          human = document.querySelector('#human-score'),
          comp = document.querySelector('#comp-score');
    
    startHuman.textContent = 0;
    startComp.textContent = 0;

    while(human.hasChildNodes()){
      human.removeChild(human.firstChild);
    }
    while(comp.hasChildNodes()){
      comp.removeChild(comp.firstChild);
    }

    human.appendChild(startHuman);
    comp.appendChild(startComp);
  }

// #QuitBtn -> X button with red bg
  const quitBtn = document.querySelector('#quit-btn');
  quitBtn.addEventListener('click', quitGame)
  
  function quitGame(){
    const modalQuit = document.querySelector('#modal-quit');
    modalQuit.classList.toggle('modal-active');
  };

// #Decline Quit -> found in modal-quit.
  const declineExitBtn = document.querySelector('.quit-no');
  declineExitBtn.addEventListener('click', declineQuit);

  function declineQuit(){
    const modalQuit = document.querySelector('#modal-quit');
    modalQuit.classList.toggle('modal-active');
  }

// #Confirm Quit -> Btn found in modal-quit
  const confirmExitBtn = document.querySelector('#quit-yes');
  confirmExitBtn.addEventListener('click', confirmQuit);

  function confirmQuit(){
    const modalQuit = document.querySelector('#modal-quit');
    const modalThanks = document.querySelector('#modal-thanks');

    modalQuit.classList.toggle('modal-active');
    modalThanks.classList.toggle('modal-active');

    setTimeout(resetAll, 3000);
  };

  function resetAll(){
    const startUI = document.querySelector('#start-ui');
    const mainGame = document.querySelector('#main-game');
    const modalThanks = document.querySelector('#modal-thanks');

    modalThanks.classList.toggle('modal-active');
    startUI.classList.toggle('hidden');
    mainGame.classList.toggle('hidden');
    resetScore();
  }

// #Play Again btns -> found in win & lose modals. Resets game.
  const playAgainBtns = document.querySelectorAll('.play-again');
  playAgainBtns.forEach(playAgain => playAgain.addEventListener('click', function playAgain(){
    let parentModal = this.parentElement.parentElement.parentElement;
    parentModal.classList.toggle('modal-active');
    resetScore();
  }));

// #Exit game btns -> found in win & lose modals. Brings user to startUI state.
  const exitGameBtns = document.querySelectorAll('.exit-game');

  exitGameBtns.forEach(exitGame => exitGame.addEventListener('click', function exitGame(){
    const parentModal = this.parentElement.parentElement.parentElement;
    const modalThanks = document.querySelector('#modal-thanks');

    parentModal.classList.toggle('modal-active');
    modalThanks.classList.toggle('modal-active');

    setTimeout(resetAll, 3000);
  }));

// 

  
  const announcer = document.querySelector('#display__announcer');
  // Choices & Btns
  
  const choiceBtns = document.querySelectorAll('.choice');
  choiceBtns.forEach(choice => choice.addEventListener('click', playRPS));

// #Modals
  const modalLose = document.querySelector('#modal-lose');

  // Modal Btns
  
  


modalWin = document.querySelector('#modal-win');


function gameEnder(){
  const playerScoreEnd = parseInt(document.querySelector('#human-score')
                         .firstElementChild.innerText);
  const compScoreEnd = parseInt(document.querySelector('#comp-score')
                       .firstElementChild.innerText);
  console.log('I ran.', playerScoreEnd, compScoreEnd);

  if(playerScoreEnd === 5 || compScoreEnd === 5){
    let modalName = (playerScoreEnd > compScoreEnd) ? modalWin : modalLose;
    modalName.classList.toggle('modal-active');
    console.log('It works')
  }
}

function scoreKeeper(result){

  let tallyHuman = parseInt(document.querySelector('#human-score')
                   .firstElementChild.innerText);

  let tallyComp = parseInt(document.querySelector('#comp-score')
                  .firstElementChild.innerText);
  
  let score = document.createElement('span');

  const humanScore = document.querySelector('#human-score'),
        compScore = document.querySelector('#comp-score');



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
  gameEnder();
  return
}

// computer's game input
function computerPlay(){
  const compChoices = 
        ['rock','paper','lobster','rock','paper','lobster','rock',
         'paper', 'lobster', 'rock', 'paper', 'lobster'];
  let pickRandom = Math.floor(Math.random() * compChoices.length);
  return compChoices[pickRandom];
}

// Changes inputs to TitleCase
function titleCase(text){
  let firstChar = text.substr(0,1).toUpperCase();
  let restOfString = text.substr(1);  

  return firstChar.concat(restOfString);
}


// Plays one round of rock paper lobster
function playRPS(e){

  choiceBtns.forEach(choice => choice.disabled = true);

  const player = e.target.value,
        computer = computerPlay(),
        humanCardBg = document.querySelector('#human-choice__card'),
        compCardBg = document.querySelector('#comp-choice__card'),
        humanCardParent = document.querySelector('#display__human-choice-group'),
        compCardParent = document.querySelector('#display__comp-choice-group');    

  let result;
  
  if(player === computer){
    result = 'draw'
  } else if(player === 'rock'){
    computer === 'lobster' ? result = 'win' : result = 'lose';  
  } else if(player === 'paper'){
    computer === 'rock' ? result = 'win' : result ='lose';
  } else {
    computer === 'paper' ? result = 'win' : result ='lose'
  }

  humanCardBg.style.backgroundImage = `url(assets/img/${player}f.png)`;
  displayCompChoice(computer);


  function displayCompChoice(choice) {

    const imgURL = [
          "url(assets/img/rockf.png)", 
          "url(assets/img/paperf.png)",
          "url(assets/img/lobsterf.png)", 
          "url(assets/img/rockf.png)",
          "url(assets/img/paperf.png)", 
          "url(assets/img/lobsterf.png)"]
    
    let roll;

    setTimeout(startRoll, 500);
    
    function startRoll(){
      roll = setInterval(randomize, 90);
      setTimeout(clearRandomize, 4000);
    }
    function randomize(){
      let random = Math.floor(Math.random() * imgURL.length);
      compCardBg.style.backgroundImage = imgURL[random];
    }

    function clearRandomize(){
      clearInterval(roll);
      compBgImage(choice);
      setTimeout(displayResults, 1000, player, computer, result)
      setTimeout(clearAll, 3000);
      setTimeout(scoreKeeper, 3000, result);
    }
    
    function clearAll(){
      humanCardBg.style.backgroundImage = '';
      compCardBg.style.backgroundImage = '';
      announcer.removeChild(announcer.firstChild);
      humanCardParent.style.boxShadow = '';
      compCardParent.style.boxShadow = '';
      choiceBtns.forEach(choice => choice.disabled = false);
    }

    function compBgImage(choice){
      console.log('choice: ', choice)
        compCardBg.style.backgroundImage = `url(assets/img/${choice}f.png)`;
    }
    
  } /* End display comp choice*/

  function displayResults(player, computer, result){
  
    let announcement = document.createElement('p'),
      titlePlayer = titleCase(player),
      titleComputer = titleCase(computer);

    if(result === 'draw'){

      announcement.textContent = "It's a draw!";

      if(announcer.hasChildNodes()){
        announcer.removeChild(announcer.firstChild);
      }

      announcer.appendChild(announcement);
      highlightWinner(result);
      return
    }

    announcement.textContent = `${titlePlayer} beats ${titleComputer}! You win!`;

    if(result === 'lose'){
    announcement.textContent = `${titlePlayer} succumbs to ${titleComputer}! You lose...`;
    }

    if(announcer.hasChildNodes()){
      announcer.removeChild(announcer.firstChild);
    }
    announcer.appendChild(announcement);
    highlightWinner(result);

  } /* End display results */

  function highlightWinner(result){

    if(result === 'draw'){
      humanCardParent.style.boxShadow = '0 0 10px blue';
      compCardParent.style.boxShadow = '0 0 10px blue';
    }else if(result === 'win'){
      humanCardParent.style.boxShadow = '0 0 10px green';
      compCardParent.style.boxShadow= '0 0 10px red';
    } else {
      humanCardParent.style.boxShadow = '0 0 10px red';
      compCardParent.style.boxShadow = '0 0 10px green';
    }
  }
} /* End of RPS*/

                  
