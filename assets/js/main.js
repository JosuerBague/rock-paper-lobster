/* ############ BTNS FOR MODAL ENABLE SOUNDS ########## */

setTimeout(function showOnLoad(){
  const modalEnableSounds = document.querySelector('#modal-enable-sounds');

  modalEnableSounds.classList.toggle('modal-active');
}, 500);


(function addELSoundEnabled(){
  const soundEnabled = document.querySelector("#sound-yes");

  soundEnabled.addEventListener('click', function enableSound(){
    const modalEnableSounds = document.querySelector('#modal-enable-sounds'),
          gameMusic         = document.querySelector('#game-music'),
          audioBtnClicked   = document.querySelector('#btn-clicked'),
          allSoundFx        = document.querySelectorAll('.sound-fx')

    allSoundFx.forEach(soundFx => soundFx.volume = 0.2);

    audioBtnClicked.play();
    modalEnableSounds.classList.toggle('modal-active');
    gameMusic.volume      = 0.2;
    gameMusic.currentTime = 0;
    gameMusic.play();
    });
})();

(function addELSoundDisabled(){
  const soundDisabled = document.querySelector("#sound-no");

  soundDisabled.addEventListener('click', function disableSound(){
    const modalEnableSounds = document.querySelector('#modal-enable-sounds'), //this btn's parent modal
          gameMusic         = document.querySelector('#game-music'),

          // all variables following this one are found in the settings modal
          soundCheckboxes  = document.querySelectorAll("input[type='checkbox']"), 
          soundSliders     = document.querySelectorAll("input[type='range']"),
          fxSliderLabel    = document.querySelector('#label-fx-slider'),
          musicSliderLabel = document.querySelector('#label-music-slider'),
          fxSlider         = document.querySelector('#sound-fx-slider'),
          musicSlider      = document.querySelector('#music-slider'),

          // except the ones after this comment
          allSoundFx       = document.querySelectorAll('.sound-fx');

    let fxSliderTitle      = document.createElement('span'),
        fxSliderVal        = document.createElement('span'),
        musicSliderTitle   = document.createElement('span'),
        musicSliderVal     = document.createElement('span');


    fxSliderTitle.textContent    = "Sound Fx:";
    musicSliderTitle.textContent = "Music:";

    allSoundFx.forEach(soundFx => soundFx.muted = true);
    gameMusic.muted = true;

    soundCheckboxes.forEach(checkbox => checkbox.removeAttribute('checked'));
    soundSliders.forEach(slider => slider.setAttribute('value', 1));

    fxSliderVal.textContent    = fxSlider.value;
    musicSliderVal.textContent = musicSlider.value;

    while (fxSliderLabel.hasChildNodes()){
      fxSliderLabel.removeChild(fxSliderLabel.firstChild);
    }

    while(musicSliderLabel.hasChildNodes()){
      musicSliderLabel.removeChild(musicSliderLabel.firstChild);
    }

    fxSliderLabel.appendChild(fxSliderTitle);
    fxSliderLabel.appendChild(fxSliderVal);
    musicSliderLabel.appendChild(musicSliderTitle);
    musicSliderLabel.appendChild(musicSliderVal);

    modalEnableSounds.classList.toggle('modal-active');
  });
})();



/* ###################### START UI BTNS ######################## */

(function addELStartGame(){
  const startGameBtn = document.querySelector('#start-game-btn');
  startGameBtn.addEventListener('click', function startGame(){
    const startUI    = document.querySelector('#start-ui'),
          mainGame   = document.querySelector('#main-game'),
          audioStart = document.querySelector('#game-start');

    startUI.classList.toggle('hidden');
    mainGame.classList.toggle('hidden');
    audioStart.play();
  });
})();

/* ############### MAIN GAME BTNS ############### */
/* Btns will be listed from top to bottom, left to right as they appear.
   Some btns here open up modals / menus. For other btns see respective
   modal where btn will be found. (i.e. reset-yes btn in reset modal)     
*/

(function addELSettings(){
  const settingsBtn = document.querySelector('#settings');

  settingsBtn.addEventListener('click', function openSettings(){
    const modalSettings   = document.querySelector('#modal-settings'),
          audioBtnClicked = document.querySelector('#btn-clicked');

    modalSettings.classList.toggle('modal-active');
    audioBtnClicked.play();
  })
})();

(function addELReset(){
  const resetBtn = document.querySelector('#reset-btn');
  resetBtn.addEventListener('click', function openResetMenu(){
    const modalReset      = document.querySelector('#modal-reset'),
          audioBtnClicked = document.querySelector('#btn-clicked');

    modalReset.classList.toggle('modal-active');
    audioBtnClicked.play();
  });
})();

(function addELQuit(){
  const quitBtn = document.querySelector('#quit-btn');
  quitBtn.addEventListener('click', function openQuitMenu(){
    const modalQuit       = document.querySelector('#modal-quit'),
          audioBtnClicked = document.querySelector('#btn-clicked');

    modalQuit.classList.toggle('modal-active');
    audioBtnClicked.play();
  });
})();

(function addELChoices(){
  const choiceBtns = document.querySelectorAll('.choice');
  choiceBtns.forEach(choice => choice.addEventListener('click', playRPS));

  
  function playRPS(e){
    const humanImgCard = document.querySelector('#human-choice__img-card'),
          computerImgCard = document.querySelector('#comp-choice__img-card'),
          audioBtnClicked = document.querySelector('#btn-clicked'),
          announcer = document.querySelector('#display__announcer'),
          humanCardGrp = document.querySelector('#display__human-choice-group'),
          compCardGrp  =document.querySelector('#display__comp-choice-group');

    let promiseRPS = createPromise(),
        humanChoice = e.target.value,
        compChoice = generateCompChoice(),
        roundResult = compareChoices(),
        roll;

    
    if(announcer.hasChildNodes()){
      announcer.removeChild(announcer.firstElementChild);
    };
    audioBtnClicked.play();
    humanImgCard.style.backgroundImage = `url(assets/img/${humanChoice}f.png)`;
    promiseRPS
      .then(disableChoiceBtns)
      .then(startRandomize)
      .then(() => setTimeout(displayCompChoice, 4000, compChoice))
      .then(() => setTimeout(announceResults, 5000,roundResult, humanChoice, compChoice))
      .then(() => setTimeout(highlightWinner, 5000, roundResult))
      .then(() => setTimeout(updateScore, 6000, roundResult))
      .then(() => setTimeout(gameEnder, 6000))
      .then(() => setTimeout(resetState, 7000))
      .then(() => setTimeout(enableChoiceBtns,7100));

      
    function createPromise(){
      return new Promise (function(res){
        res()
      })
    };

    function generateCompChoice(){
      const compChoices = 
            ['rock','paper','lobster','rock','paper','lobster','rock',
            'paper', 'lobster', 'rock', 'paper', 'lobster'];
      let pickRandom = Math.floor(Math.random() * compChoices.length);
      return compChoices[pickRandom];
    }

    function disableChoiceBtns(){
      const choiceBtns = document.querySelectorAll('.choice');
      choiceBtns.forEach(btn => btn.disabled = true);
    }

    function enableChoiceBtns(){
      const choiceBtns = document.querySelectorAll('.choice');
      choiceBtns.forEach(btn => btn.disabled = false);
    }

    function compareChoices(){
      if (humanChoice === compChoice) {return 'draw';}
        else if (humanChoice === 'rock') {
          return compChoice  === 'lobster' ? 'win' : 'lose';
      } else if (humanChoice === compChoice ) {
          return compChoice  === 'rock'    ? 'win' : 'lose';
      } else {
          return compChoice  === 'paper'   ? 'win' : 'lose';
      };
    }

    function startRandomize() {

      const imgURL = [
            "url(assets/img/rockf.png)", 
            "url(assets/img/paperf.png)",
            "url(assets/img/lobsterf.png)", 
            "url(assets/img/rockf.png)",
            "url(assets/img/paperf.png)", 
            "url(assets/img/lobsterf.png)"
      ]

      const audioRoll = document.querySelector('#roll');

      roll = setInterval(randomize, 90);
      setTimeout(clearRandomize, 4000);
      audioRoll.currentTime = 0;
      audioRoll.play();

      function randomize() {
        let random = Math.floor( Math.random() * imgURL.length);
        computerImgCard.style.backgroundImage = imgURL[random];
      }

      function clearRandomize(){
        clearInterval(roll);
      }
    }

    function displayCompChoice(choice){
      const audioRoll = document.querySelector('#roll'),
            audioPing = document.querySelector('#btn-clicked');
      
      clearInterval(roll);
      audioRoll.pause();
      audioPing.play();
      computerImgCard.style.backgroundImage = `url(assets/img/${choice}f.png)`
    }

    function announceResults(result, human, comp){
      let announcement = document.createElement('p'),
          announcer    = document.querySelector('#display__announcer'),
          titleHuman   = toTitleCase(human),
          titleComp    = toTitleCase(comp);

      if (result === 'draw') {
        announcement.textContent = "It's a draw!";
        while(announcer.hasChildNodes()){
          announcer.removeChild(announcer.firstChild)
        }
        announcer.appendChild(announcement);
        return
      }

      announcement.textContent = result === 'win' ? 
          `${titleHuman} beats ${titleComp}! You win!` :
          `${titleHuman} succumbs to ${titleComp}! You lose...`;
      
      while (announcer.hasChildNodes()){
        announcer.removeChild(announcer.firstChild)
      }

      announcer.appendChild(announcement);
    }

    function toTitleCase(text){
      let firstChar    = text.substr(0,1).toUpperCase(),
          restOfString = text.substr(1);
      
      return firstChar.concat(restOfString);
    }
    
    function highlightWinner(result){
      const audioRoundWin  = document.querySelector('#round-won'),
            audioRoundLost = document.querySelector('#round-lost'),
            audioRoundDraw = document.querySelector('#round-draw');
            

      let lightWin  = '0 0 10px green',
          lightLose = '0 0 10px red',
          lightDraw = '0 0 10px blue'; 
      
      if (result === 'draw'){
        
        humanCardGrp.style.boxShadow = lightDraw;
        compCardGrp.style.boxShadow  = lightDraw;
        audioRoundDraw.currentTime   = 0;
        audioRoundDraw.play();

      } else if (result === 'win') {

        humanCardGrp.style.boxShadow = lightWin;
        compCardGrp.style.boxShadow  = lightLose;
        audioRoundWin.currentTime    = 0;
        audioRoundWin.play();

      } else {

        humanCardGrp.style.boxShadow = lightLose;
        compCardGrp.style.boxShadow  = lightWin;
        audioRoundLost.currentTime   = 0;
        audioRoundLost.play();

      }
    }

    function updateScore(result){
      const humanScoreCard = document.querySelector('#human__score-card'),
            compScoreCard  = document.querySelector('#comp__score-card')
            audioPing      = document.querySelector('#btn-clicked');

      let scoreHuman = parseInt(humanScoreCard.firstElementChild.innerText),
          scoreComp  = parseInt(compScoreCard.firstElementChild.innerText),
          score      = document.createElement('span');


      if(result === 'draw'){
          return
      } else if (result === 'win'){
          scoreHuman++
          score.textContent = scoreHuman;
        
          while(humanScoreCard.hasChildNodes()){
          humanScoreCard.removeChild(humanScoreCard.firstChild)
          }

          audioPing.play();
          humanScoreCard.appendChild(score);
        
      } else {
          scoreComp++
          score.textContent = scoreComp;
        
          while(compScoreCard.hasChildNodes()){
            compScoreCard.removeChild(compScoreCard.firstChild)
          }

          audioPing.play();
          compScoreCard.appendChild(score);
      }
    }

    function gameEnder(){
      const audioWinGame  = document.querySelector('#win-game'),
            audioLoseGame = document.querySelector('#lose-game'),
            modalWin      = document.querySelector('#modal-win'),
            modalLose     = document.querySelector('#modal-lose');
      
      const playerScoreEnd = parseInt(document.querySelector('#human__score-card')
                            .firstElementChild.innerText);
    
      const compScoreEnd = parseInt(document.querySelector('#comp__score-card')
                          .firstElementChild.innerText);
    
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
      }
    }

    function resetState(){
      humanImgCard.style.backgroundImage = '';
      computerImgCard.style.backgroundImage = '';
      announcer.removeChild(announcer.firstChild);
      humanCardGrp.style.boxShadow = '';
      compCardGrp.style.boxShadow = '';
    }
  } /* END of playRPS*/
  })();


/* ###################### MODALS ######################## */

/* This section will be organized based on modal association to buttons
   in the main game section, that is modal for settings will be 1st,
   then reset, etc... 
*/

// SETTINGS MODAL

(function addELSliderSoundFx(){
  const sliderSoundFx = document.querySelector('#sound-fx-slider');
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
})();

(function addELSliderMusic(){
  const sliderMusic   = document.querySelector('#music-slider');
  sliderMusic.addEventListener('input', function(){
    const musicSliderLabel = document.querySelector('#label-music-slider'),
          gameMusic   = document.querySelector('#game-music'),
          volMusic    = document.querySelector('#music-slider').value,
          musicTitle  = document.createElement('span'),
          musicVal    = document.createElement('span');
  
    gameMusic.volume  = volMusic / 100;
  
    musicTitle.textContent = 'Music:';  
    musicVal.textContent   = volMusic;
  
    while(musicSliderLabel.hasChildNodes()){
      musicSliderLabel.removeChild(musicSliderLabel.firstChild);
    }
  
    musicSliderLabel.appendChild(musicTitle);
    musicSliderLabel.appendChild(musicVal);
  })  
})();

(function addELChkBxSoundFx(){
  const chkBxSoundFX = document.querySelector('#sound-fx-checkbox');
  chkBxSoundFX.addEventListener('change', function toggleSoundFx(){
    const allSoundFx = document.querySelectorAll('.sound-fx'),
          fxSlider   = document.querySelector('#sound-fx-slider');
          
    if(chkBxSoundFX.checked === true){
      allSoundFx.forEach(soundFx => {
        soundFx.volume = fxSlider.value / 100;
        soundFx.muted  = false;
      });
    } else {
      allSoundFx.forEach(soundFx => soundFx.muted = true);
    }
  })
})();

(function addELChkBxMusic(){
  const chkBxMusic    = document.querySelector('#music-checkbox');
  chkBxMusic.addEventListener('change', function toggleChkBxMusic(){
    const gameMusic   = document.querySelector('#game-music'),
          musicSlider = document.querySelector('#music-slider');
    
    if(chkBxMusic.checked === true){
      console.log(musicSlider.value);
      gameMusic.volume = musicSlider.value / 100;
      gameMusic.play();
      gameMusic.muted  = false;
    } else {
      gameMusic.muted  = true;
    }
  }) 
})();

(function addELSaveSettings(){
  const saveSettings = document.querySelector('#save');
  saveSettings.addEventListener('click', function(){
    const modalSettings   = document.querySelector('#modal-settings'),
          audioBtnClicked = document.querySelector('#btn-clicked');


    modalSettings.classList.toggle('modal-active');
    audioBtnClicked.play();
  });
})();

// RESET MODAL
(function addELResetModalBtns(){
  const confirmResetBtn = document.querySelector('#reset-yes'),
        declineResetBtn = document.querySelector('#reset-no'),
        modalReset      = document.querySelector('#modal-reset'),
        audioBtnClicked = document.querySelector('#btn-clicked');


  confirmResetBtn.addEventListener('click',function resetGame(){
    modalReset.classList.toggle('modal-active');
    audioBtnClicked.play();
    reset();
  });

  declineResetBtn.addEventListener('click', function closeModalReset(){
    modalReset.classList.toggle('modal-active');
    audioBtnClicked.play();
  });

  function reset(){
    const startScoreHuman   = document.createElement('span'),
          startScoreComp    = document.createElement('span'),
          startAnnouncement = document.createElement('p'),
          humanScoreCard    = document.querySelector('#human__score-card'),
          compScoreCard     = document.querySelector('#comp__score-card'),
          announcer         = document.querySelector('#display__announcer');

    startScoreHuman.textContent   = 0;
    startScoreComp.textContent    = 0;
    startAnnouncement.textContent = 'First to 5 wins!';

    while(humanScoreCard.hasChildNodes()){
      humanScoreCard.removeChild(humanScoreCard.firstChild);
    }
    while(compScoreCard.hasChildNodes()){
      compScoreCard.removeChild(compScoreCard.firstChild);
    }
    while(announcer.hasChildNodes()){
      announcer.removeChild(announcer.firstChild);
    }

    humanScoreCard.appendChild(startScoreHuman);
    compScoreCard.appendChild(startScoreComp);
    announcer.appendChild(startAnnouncement);
  }
})();

// QUIT MODAL - WIN MODAL - LOSE MODAL

/* 
   The WIN MODAL & LOSE MODAL Share the same btns while
   the QUIT MODAL's 'YES' btn shares the same functionality
   as the 'Exit Game' btns found on the aforementioned modals.
*/

// QUIT MODAL

(function addELQuitModalBtns(){
  const confirmQuitBtn  = document.querySelector('#quit-yes'),
        declineQuitBtn  = document.querySelector('#quit-no'),
        audioBtnClicked = document.querySelector('#btn-clicked'),
        modalThanks     = document.querySelector('#modal-thanks'),
        modalQuit       = document.querySelector('#modal-quit'),
        mainGame        = document.querySelector('#main-game'),
        startUI         = document.querySelector('#start-ui');

  confirmQuitBtn.addEventListener('click', function confirmQuit(){
    modalQuit.classList.toggle('modal-active');
    modalThanks.classList.toggle('modal-active');
    audioBtnClicked.play();

    setTimeout(resetGame, 3000);
  });

  declineQuitBtn.addEventListener('click', function declineQuit(){
    modalQuit.classList.toggle('modal-active');
    audioBtnClicked.play();
  });

  function resetGame(){
    modalThanks.classList.toggle('modal-active');
    startUI.classList.toggle('hidden');
    mainGame.classList.toggle('hidden');
    reset();
  }
})();

// WIN MODAL & LOSE MODAL
(function addELWinLoseModalBtns(){
  const exitGameBtns    = document.querySelectorAll('.exit-game'),
        playAgainBtns   = document.querySelectorAll('.play-again'),
        modalThanks     = document.querySelector('#modal-thanks'),
        audioBtnClicked = document.querySelector('#btn-clicked'),
        audioWinGame    = document.querySelector('#win-game'),
        audioLoseGame   = document.querySelector('#lose-game'),
        startUI         = document.querySelector('#start-ui'),
        mainGame        = document.querySelector('#main-game'),
        modalWin        = document.querySelector('#modal-win');

  
  exitGameBtns.forEach(exitGameBtn => 
    exitGameBtn.addEventListener('click', function exitGame(){
    const parentModal = this.parentElement.parentElement.parentElement;

    parentModal.classList.toggle('modal-active');
    modalThanks.classList.toggle('modal-active');
    audioBtnClicked.play();
    setTimeout(resetGame, 3000);
  }));

  playAgainBtns.forEach(playAgainBtn => 
    playAgainBtn.addEventListener('click', function playAgain(){
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
    }));

  function resetGame(){
    modalThanks.classList.toggle('modal-active');
    startUI.classList.toggle('hidden');
    mainGame.classList.toggle('hidden');
    reset();
  }

  function reset(){
    const startScoreHuman   = document.createElement('span'),
          startScoreComp    = document.createElement('span'),
          startAnnouncement = document.createElement('p'),
          humanScoreCard    = document.querySelector('#human__score-card'),
          compScoreCard     = document.querySelector('#comp__score-card'),
          announcer         = document.querySelector('#display__announcer');

    startScoreHuman.textContent   = 0;
    startScoreComp.textContent    = 0;
    startAnnouncement.textContent = 'First to 5 wins!';

    while(humanScoreCard.hasChildNodes()){
      humanScoreCard.removeChild(humanScoreCard.firstChild);
    }
    while(compScoreCard.hasChildNodes()){
      compScoreCard.removeChild(compScoreCard.firstChild);
    }
    while(announcer.hasChildNodes()){
      announcer.removeChild(announcer.firstChild);
    }

    humanScoreCard.appendChild(startScoreHuman);
    compScoreCard.appendChild(startScoreComp);
    announcer.appendChild(startAnnouncement);
  }
})();