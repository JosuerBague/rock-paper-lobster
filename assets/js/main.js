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
    computerSelection === 'scissors' ? result = 'lose' : result = 'win';  
  } else if(playerSelection === 'paper'){
    computerSelection === 'rock' ? result = 'lose' : result ='win';
  } else {
    computerSelection === 'scissors' ? result = 'lose' : result ='win'
  }

  return console.log(announcer(playerSelection, computerSelection, result));
}


let compPlays = document.querySelector('.compPlays');
compPlays.addEventListener('click', playRPS);