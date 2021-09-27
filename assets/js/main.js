




// #Start Game Btn
  const startGameBtn = document.querySelector('#start-game-btn');
  startGameBtn.addEventListener('click', startGame);

  function startGame(){
    const startUI = document.querySelector('#start-ui'),
          mainGame = document.querySelector('#main-game'),
          audioStart = document.querySelector('#game-start');

    startUI.classList.toggle('hidden');
    mainGame.classList.toggle('hidden');
    audioStart.play();
  }

  const resetBtn = document.querySelector('#reset-btn');
  resetBtn.addEventListener('click', function(){
    const modalReset = document.querySelector('#modal-reset'),
          audioBtnClicked = document.querySelector('#btn-clicked');

    modalReset.classList.toggle('modal-active');
    audioBtnClicked.play();
  })

  function resetGame(){
    const startUI = document.querySelector('#start-ui');
    const mainGame = document.querySelector('#main-game');
    const modalThanks = document.querySelector('#modal-thanks');

    modalThanks.classList.toggle('modal-active');
    startUI.classList.toggle('hidden');
    mainGame.classList.toggle('hidden');
    reset();
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
    const modalQuit = document.querySelector('#modal-quit'),
          audioBtnClicked = document.querySelector('#btn-clicked');

    modalQuit.classList.toggle('modal-active');
    audioBtnClicked.play();
  });
  
  const confirmExitBtn = document.querySelector('#quit-yes');
  confirmExitBtn.addEventListener('click', function confirmExit(){

    const modalQuit = document.querySelector('#modal-quit'),
          modalThanks = document.querySelector('#modal-thanks'),
          audioBtnClicked = document.querySelector('#btn-clicked');


    modalQuit.classList.toggle('modal-active');
    modalThanks.classList.toggle('modal-active');
    audioBtnClicked.play();

    setTimeout(resetGame, 3000);
  });

  const confirmResetBtn = document.querySelector('#reset-yes');
  confirmResetBtn.addEventListener('click',function(){
    const parentModal = this.parentElement.parentElement.parentElement,
        audioBtnClicked = document.querySelector('#btn-clicked');

    parentModal.classList.toggle('modal-active');
    audioBtnClicked.play();
    reset();
  })

  const declineResetBtn = document.querySelector('#reset-no');
  declineResetBtn.addEventListener('click', function(){
    const modalReset = document.querySelector('#modal-reset'),
          audioBtnClicked = document.querySelector('#btn-clicked');

    modalReset.classList.toggle('modal-active');
    audioBtnClicked.play();
  })

  function reset(){
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



  
// #Modals
  const modalLose = document.querySelector('#modal-lose');
  
  const play = document.querySelector('#win-play-again');
  const parent = play.parentElement.parentElement.parentElement;
  console.log(parent);

  // Modal Btns
  const playAgainBtns = document.querySelectorAll('.play-again');

  playAgainBtns.forEach(button => button.addEventListener('click', playAgain));
  function playAgain(){
    const modalWin = document.querySelector('#modal-win'),
          audioWinGame = document.querySelector('#win-game'),
          audioLoseGame = document.querySelector('#lose-game'),
          audioBtnClicked = document.querySelector('#btn-clicked');


    const parentModal = this.parentElement.parentElement.parentElement;
    parentModal.classList.toggle('modal-active');
    if(parentModal === modalWin){
      audioWinGame.currentTime = 0;
      audioWinGame.pause();
    } else {
      audioLoseGame.currentTime = 0;
      audioLoseGame.pause();
    }
    audioBtnClicked.play();
    reset();
  };

  const exitGameBtns = document.querySelectorAll('.exit-game');

  exitGameBtns.forEach(exitGame => exitGame.addEventListener('click', function(){
    const parentModal = this.parentElement.parentElement.parentElement,
        modalThanks = document.querySelector('#modal-thanks'),
        audioBtnClicked = document.querySelector('#btn-clicked');


    parentModal.classList.toggle('modal-active');
    modalThanks.classList.toggle('modal-active');
    audioBtnClicked.play();
    setTimeout(resetGame, 3000);
  }));

  const declineExitBtn = document.querySelector('.quit-no');
  declineExitBtn.addEventListener('click', declineExit);

  function declineExit(){
    const modalQuit = document.querySelector('#modal-quit'),
          audioBtnClicked = document.querySelector('#btn-clicked');

    modalQuit.classList.toggle('modal-active');
    audioBtnClicked.play();
    return
  }

modalWin = document.querySelector('#modal-win');


function gameEnder(){
  const audioWinGame = document.querySelector('#win-game'),
        audioLoseGame = document.querySelector('#lose-game');
  
  const playerScoreEnd = parseInt(document.querySelector('#human-score')
                         .firstElementChild.innerText);
  const compScoreEnd = parseInt(document.querySelector('#comp-score')
                       .firstElementChild.innerText);
  console.log('I ran.', playerScoreEnd, compScoreEnd);

  if(playerScoreEnd === 5 || compScoreEnd === 5){
    let modalName = (playerScoreEnd > compScoreEnd) ? modalWin : modalLose;
    modalName.classList.toggle('modal-active');
    if(modalName === modalWin){
      audioWinGame.currentTime = 0;
      audioWinGame.play();
    } else {
      audioLoseGame.currentTime = 0;
      audioLoseGame.play();
    }
    console.log('It works');
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
  const player = e.target.value,
        computer = computerPlay(),
        humanCard = document.querySelector('#human-choice__card'),
        compCard = document.querySelector('#comp-choice__card'),
        playerDisplay = document.querySelector('#display__human-choice-group'),
        compDisplay = document.querySelector('#display__comp-choice-group'),
        audioBtnClicked = document.querySelector('#btn-clicked');

  let result;

  choiceBtns.forEach(choice => choice.disabled = true);
  audioBtnClicked.play();

  if(player === computer){
    result = 'draw'
  } else if(player === 'rock'){
    computer === 'lobster' ? result = 'win' : result = 'lose';  
  } else if(player === 'paper'){
    computer === 'rock' ? result = 'win' : result ='lose';
  } else {
    computer === 'paper' ? result = 'win' : result ='lose'
  }

  humanCard.style.backgroundImage = `url(assets/img/${player}f.png)`;
  displayCompChoice(computer);


  function displayCompChoice(choice) {

    const imgURL = [
          "url(assets/img/rockf.png)", 
          "url(assets/img/paperf.png)",
          "url(assets/img/lobsterf.png)", 
          "url(assets/img/rockf.png)",
          "url(assets/img/paperf.png)", 
          "url(assets/img/lobsterf.png)"];
    
    const audioRoll = document.querySelector('#roll');
    let roll;


    setTimeout(startRoll, 500);
    
    function startRoll(){
      roll = setInterval(randomize, 90);
      setTimeout(clearRandomize, 4000);
      audioRoll.currentTime = 0;
      audioRoll.play();
    }
    function randomize(){
      let random = Math.floor(Math.random() * imgURL.length);
      compCard.style.backgroundImage = imgURL[random];
    }

    function clearRandomize(){
      clearInterval(roll);
      audioRoll.pause();
      audioBtnClicked.play();
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
      choiceBtns.forEach(choice => choice.disabled = false);
    }
  
    function compBgImage(choice){
      console.log('choice: ', choice)
        compCard.style.backgroundImage = `url(assets/img/${choice}f.png)`;
    }
    
  }


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
    const audioRoundWin = document.querySelector('#round-won'),
          audioRoundLost = document.querySelector('#round-lost'),
          audioRoundDraw = document.querySelector('#round-draw');

    if(result === 'draw'){
      playerDisplay.style.boxShadow = '0 0 10px blue';
      compDisplay.style.boxShadow = '0 0 10px blue';
      audioRoundDraw.currentTime = 0;
      audioRoundDraw.play();

    }else if(result === 'win'){
      playerDisplay.style.boxShadow = '0 0 10px green';
      compDisplay.style.boxShadow= '0 0 10px red';
      audioRoundWin.currentTime = 0;
      audioRoundWin.play();

    } else {
      playerDisplay.style.boxShadow = '0 0 10px red';
      compDisplay.style.boxShadow = '0 0 10px green';
      audioRoundLost.currentTime = 0;
      audioRoundLost.play();
    }
  }


  // displayRoundResult(playerSelection, computerSelection, result);
  // playerBgImage(playerSelection);
  return result;
}

const muteSoundFX = document.querySelector('#sound-fx-checkbox'),
      muteMusic = document.querySelector('#music-checkbox');

muteSoundFX.addEventListener('change', function(){
  const allSoundFx = document.querySelectorAll('.sound-fx'),
        fxSlider = document.querySelector('#sound-fx-slider');
        
  if(muteSoundFX.checked === true){
    allSoundFx.forEach(soundFx => {
      soundFx.volume = fxSlider.value / 100;
      soundFx.muted = false
    });
  } else {
    allSoundFx.forEach(soundFx => soundFx.muted = true);
  }
})

muteMusic.addEventListener('change', function(){
  const gameMusic = document.querySelector('#game-music'),
        musicSlider = document.querySelector('#music-slider');
  
  if(muteMusic.checked === true){
    console.log(musicSlider.value);
    gameMusic.volume = musicSlider.value / 100;
    gameMusic.play();
    gameMusic.muted = false;
  } else {
    gameMusic.muted = true;
  }
})

const sliderSoundFx = document.querySelector('#sound-fx-slider'),
      sliderMusic = document.querySelector('#music-slider');

sliderSoundFx.addEventListener('input', function(){
  const allSoundFx = document.querySelectorAll('.sound-fx'),
        volSoundFx = document.querySelector('#sound-fx-slider').value,
        audioBtnClicked = document.querySelector('#btn-clicked'),
        fxTitle = document.createElement('span'),
        fxVal = document.createElement('span'),
        fxSliderLabel = document.querySelector('#label-fx-slider');

  fxTitle.textContent = "Sound Fx:";
  fxVal.textContent = volSoundFx;

  allSoundFx.forEach(soundFx => {
    soundFx.volume = volSoundFx / 100
  });

  while(fxSliderLabel.hasChildNodes()){
    fxSliderLabel.removeChild(fxSliderLabel.firstChild);
  }
  
  fxSliderLabel.appendChild(fxTitle);
  fxSliderLabel.appendChild(fxVal);
  audioBtnClicked.play();

})

sliderMusic.addEventListener('input', function(){
  const gameMusic = document.querySelector('#game-music'),
        volMusic = document.querySelector('#music-slider').value,
        musicTitle = document.createElement('span'),
        musicVal = document.createElement('span'),
        musicSliderLabel = document.querySelector('#label-music-slider');

  gameMusic.volume = volMusic / 100;

  musicTitle.textContent = 'Music:';  
  musicVal.textContent = volMusic;

  while(musicSliderLabel.hasChildNodes()){
    musicSliderLabel.removeChild(musicSliderLabel.firstChild);
  }

  musicSliderLabel.appendChild(musicTitle);
  musicSliderLabel.appendChild(musicVal);
  console.log(musicTitle, musicVal)
})

const saveSettings = document.querySelector('#save');
saveSettings.addEventListener('click', function(){
  const modalSettings = document.querySelector('#modal-settings'),
        audioBtnClicked = document.querySelector('#btn-clicked');


  modalSettings.classList.toggle('modal-active');
  audioBtnClicked.play();
})

const settingsBtn = document.querySelector('#settings');
settingsBtn.addEventListener('click', function(){
  const modalSettings = document.querySelector('#modal-settings'),
        audioBtnClicked = document.querySelector('#btn-clicked');

  modalSettings.classList.toggle('modal-active');
  audioBtnClicked.play();
})

const gameMusic = document.querySelector('#game-music');
console.log(gameMusic.hasPlayed);

const soundYes = document.querySelector("#sound-yes"),
      soundNo = document.querySelector("#sound-no");

soundYes.addEventListener('click', function(){
  const modalSound = document.querySelector('#modal-enable-sounds'),
        gameMusic = document.querySelector('#game-music'),
        audioBtnClicked = document.querySelector('#btn-clicked'),
        allSoundFx = document.querySelectorAll('.sound-fx')

  allSoundFx.forEach(soundFx => soundFx.volume = 0.2);

  audioBtnClicked.play();
  modalSound.classList.toggle('modal-active');
  gameMusic.volume = 0.2;
  gameMusic.currentTime = 0;
  gameMusic.play();
});

soundNo.addEventListener('click', function(){
  const modalSound = document.querySelector('#modal-enable-sounds'),
        gameMusic = document.querySelector('#game-music'),
        soundChecks = document.querySelectorAll("input[type='checkbox']"),
        soundSliders = document.querySelectorAll("input[type='range']"),
        fxSliderLabel = document.querySelector('#label-fx-slider'),
        musicSliderLabel = document.querySelector('#label-music-slider'),
        fxSlider = document.querySelector('#sound-fx-slider'),
        musicSlider = document.querySelector('#music-slider'),
        allSoundFx = document.querySelectorAll('.sound-fx');

  let fxTitle = document.createElement('span'),
      fxVal = document.createElement('span'),
      musicTitle = document.createElement('span'),
      musicVal = document.createElement('span');

  fxTitle.classList.add('slider-title');
  musicTitle.classList.add('slider-title');
  fxVal.classList.add('slider-val');
  musicVal.classList.add('slider-val');

  fxTitle.textContent = "Sound Fx:";
  musicTitle.textContent = "Music:";

  allSoundFx.forEach(soundFx => soundFx.muted = true);
  gameMusic.muted = true;

  soundChecks.forEach(checkbox => checkbox.removeAttribute('checked'));
  soundSliders.forEach(slider => slider.setAttribute('value', 1));

  fxVal.textContent = fxSlider.value;
  musicVal.textContent = musicSlider.value;

  while (fxSliderLabel.hasChildNodes()){
    fxSliderLabel.removeChild(fxSliderLabel.firstChild);
  }

  while(musicSliderLabel.hasChildNodes()){
    musicSliderLabel.removeChild(musicSliderLabel.firstChild);
  }

  fxSliderLabel.appendChild(fxTitle);
  fxSliderLabel.appendChild(fxVal);
  musicSliderLabel.appendChild(musicTitle);
  musicSliderLabel.appendChild(musicVal);


  modalSound.classList.toggle('modal-active');
});


setTimeout(function(){
  const modalEnable = document.querySelector('#modal-enable-sounds');

  modalEnable.classList.toggle('modal-active');
}, 500);
