const compChoices = ['rock','paper','scissors']

function computerPlay(){
  let pickRandom = Math.floor(Math.random() * compChoices.length);
  return compChoices[pickRandom];
}

function getUserChoice(){
  let userChoice = prompt("Do you play rock, paper, or scissors?");
  return userChoice.toLowerCase(); 
}

function titleCase(text){
  let firstChar = text.substr(0,1).toUpperCase();
  let restOfString = text.substr(1);

  return firstChar.concat(restOfString);
}

function announcer(playerSelection, computerSelection, result){
  let player = titleCase(playerSelection);
  let computer = titleCase(computerSelection);
  let announcement = `${player} beats ${computer}! You win.`;

  if(result === 'lose'){
    announcement = `${player} loses to ${computer}! Oof...you lose.`
  }
  if(result === 'draw'){
    announcement = "It's a draw!";
  }

  return announcement;
}

function playRPS(){
  let playerSelection = getUserChoice();
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

  console.log(announcer(playerSelection, computerSelection, result));
  return result;
}

function game(){
  let counterHuman = 0;
  let counterComp = 0;

  while(counterHuman < 5 && counterComp < 5){
    let roundResult = playRPS();
    if(roundResult==='win'){
      counterHuman++
    }
    if(roundResult === 'lose'){
    counterComp++
    }
    console.log(`Score- player: ${counterHuman} computer: ${counterComp}`);
  }

  if(counterHuman === 5){
    console.log("You win!")
    return
  } else if(counterComp === 5){
    console.log("You Lose!")
    return
  }
}


let compPlays = document.querySelector('.compPlays');
compPlays.addEventListener('click', game);