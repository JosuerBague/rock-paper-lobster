




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
  

  // Comp
  

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
  const player = e.target.value,
        computer = computerPlay(),
        humanCard = document.querySelector('#human-choice__card'),
        compCard = document.querySelector('#comp-choice__card'),
        playerDisplay = document.querySelector('#display__human-choice-group'),
        compDisplay = document.querySelector('#display__comp-choice-group');    

  let result;
  console.log('player: ', player);
  console.log('computer: ', computer);
  
  if(player === computer){
    result = 'draw'
  } else if(player === 'rock'){
    computer === 'lobster' ? result = 'win' : result = 'lose';  
  } else if(player === 'paper'){
    computer === 'rock' ? result = 'win' : result ='lose';
  } else {
    computer === 'paper' ? result = 'win' : result ='lose'
  }

  humanCard.style.backgroundImage = `url(/../assets/img/${player}f.png)`;

  function displayCompChoice(choice) {

    const imgURL = [
          "url(../assets/img/rockf.png)", "url(../assets/img/paperf.png)",
          "url(../assets/img/lobsterf.png)", "url(../assets/img/rockf.png)",
          "url(../assets/img/paperf.png)", "url(../assets/img/lobsterf.png)"]
    
    let roll;

    setTimeout(startRoll, 500);
    
    function startRoll(){
      roll = setInterval(randomize, 90);
      setTimeout(clearRandomize, 4000);
    }
    function randomize(){
      let random = Math.floor(Math.random() * imgURL.length);
      compCard.style.backgroundImage = imgURL[random];
    }

    function clearRandomize(){
      clearInterval(roll);
      compBgImage(choice);
      setTimeout(displayResults, 1000, player, computer, result)
      setTimeout(clearAll, 3000);
      setTimeout(scoreKeeper, 3000, result);
    }
    
    function clearAll(){
      humanCard.style.backgroundImage = '';
      compCard.style.backgroundImage = '';
      announcer.removeChild(announcer.firstChild);
      playerDisplay.style.boxShadow = '';
      compDisplay.style.boxShadow = '';
    }
  
    function compBgImage(choice){
      console.log('choice: ', choice)
        compCard.style.backgroundImage = `url(../assets/img/${choice}f.png)`;
    }
    
  }

  displayCompChoice(computer);

  // Display's round result
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
  }

  function highlightWinner(result){

    if(result === 'draw'){
      playerDisplay.style.boxShadow = '0 0 10px blue';
      compDisplay.style.boxShadow = '0 0 10px blue';
    }else if(result === 'win'){
      playerDisplay.style.boxShadow = '0 0 10px green';
      compDisplay.style.boxShadow= '0 0 10px red';
    } else {
      playerDisplay.style.boxShadow = '0 0 10px red';
      compDisplay.style.boxShadow = '0 0 10px green';
    }
  }


  // displayRoundResult(playerSelection, computerSelection, result);
  // playerBgImage(playerSelection);
  return result;
}
