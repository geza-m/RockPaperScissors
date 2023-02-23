

const ROCK = 'rock';
const PAPER = 'paper';
const SCISSOR = 'scissor'

let playerChoice = "";
let computerChoice = "";

// generate computer choice (rock, paper or scissors) randomly and returns it as string
function getComputerChoice() {
     const choice = Math.floor(Math.random()*3);
     return (choice==0) ? ROCK : (choice==1) ? PAPER : SCISSOR;
  }

// evaluate player vs computer selection(rock, scissor or paper) and returns an object with the winner "computer" or "player" and a string message -> .result .message
function evaluateRound (playerSelection, computerSelection) {
  
  let message =""
  let result="";
  
  winningVariations = ["rockscissor", "scissorspaper", "paperrock"];
  if (playerSelection === computerSelection) {
      message = "Draw.";
  }
  else if (winningVariations.includes(playerSelection+computerSelection))  {
    
      message = `Round won! ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}.`;
      result = 'player';
  }
  else {
      message =   `Round lost! ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}.`;
      result = 'computer';
  }

  return { result:result, message: message};
  return message;

}



// player choice (rock, paper or scissor) according to button clicked
function setPlayerChoice(event) {
    switch (event.currentTarget.id) {
      case "rockButton":
        playerChoice = ROCK;
        break;
      case "paperButton":
        playerChoice = PAPER;
        break;
      case "scissorButton":
      playerChoice = SCISSOR;
      break;
    }
}

// activate r p s buttons, add eventlistener 
function activateRPSButtons() {
    const rpsButtons = document.querySelectorAll('.rpsbutton');

    return new Promise((resolve) =>{
        rpsButtons.forEach((button)=>{
            button.disabled = false;
            button.addEventListener("click", event => {
                setPlayerChoice(event);
                resolve(event);
            })
        })
    });

}
// disable r p s buttons, remove eventlistener
function disableRPSButtons() {
  const rpsButtons = document.querySelectorAll('.rpsbutton');
  rpsButtons.forEach((button) => {
    button.removeEventListener("click", setPlayerChoice);
    button.disabled = true;
  });

}

// capitalize string (first letter capital)
function capitalize(text) {
  if (!text) {return text;}
  return text.charAt(0).toUpperCase()+text.slice(1);
}

function infobox(message) {
    const mb=document.querySelector("#infobox");
    mb.textContent=message;
}





function updateScoreTable(playerScore, computerScore) {
  document.querySelector("#playerScore").textContent=playerScore;
  document.querySelector("#computerScore").textContent=computerScore;
}

function showCurrentRound(round) {
  const grtext = document.querySelector("#currentRound");
  document.querySelector('#currentRound').textContent=`${round}`;
  grtext.classList.add("showRound");
  //grtext.classList.remove("hidden");

  return new Promise((resolve, reject) => {
    setTimeout(resolve,500);
  });;
}

// show countdown and the swinging fist animation
function fistSwinging() {
    //fist animation
    swingingFistAnimation('fistAnimationHuman','#player');
    swingingFistAnimation('fistAnimation','#computer');
    return new Promise((resolve)=>{setTimeout(resolve,1000)});
}

function swingingFistAnimation(animation, target) {
  const player = document.querySelector(`${target}`);
  player.classList.remove(`${animation}`);
  player.classList.remove('paperAnimation','scissorAnimation','rockAnimation','paperAnimationHuman','scissorAnimationHuman','rockAnimationHuman','fistAnimation', 'fistAnimationHuman');
  //Trigger a reflow/layout in between removing and adding the class name.
  void player.offsetWidth;
//   player.style.setProperty('--r',"1");
  player.classList.add(`${animation}`);
}

function animatePlayerAndComputerChoice (playerChoice, computerChoice) {
  
  const player = document.querySelector('#player');
  const computer = document.querySelector('#computer');
  player.classList.remove('fistAnimationHuman');
  computer.classList.remove('fistAnimation');

  //Trigger a reflow/layout in between removing and adding the class name.
  void player.offsetWidth;

  switch (playerChoice) {
    case ROCK: 
      player.classList.add('rockAnimationHuman');
      break;
    case SCISSOR:
      player.classList.add('scissorAnimationHuman');
      break;
    case PAPER: 
      player.classList.add('paperAnimationHuman');
      break;
  }

  switch (computerChoice) {
    case ROCK: 
      computer.classList.add('rockAnimation');
      break;
    case SCISSOR:
      computer.classList.add('scissorAnimation');
      break;
    case PAPER: 
      computer.classList.add('paperAnimation');
    break;
  }

  return new Promise((resolve)=>{setTimeout(resolve,00)});

}

function finalResult(playerScore,computerScore) {
// blur the screen and show a message window with the result
const cont = document.querySelector(".container");
cont.classList.add("blur");

const message = document.createElement('div');
message.classList.add('message','floating');

const subText = document.createElement('div');
subText.textContent="Click to restart."
subText.classList.add('subtext');

if (computerScore > playerScore) {
  message.textContent= "You lose..."
}
else {
  message.textContent= "You win!"
}
document.querySelector('body').appendChild(message);
message.appendChild(subText);

message.addEventListener("click", (event)=>{
  message.parentNode.removeChild(message);
  game();
});
}

function resetBorder() {
    document.querySelector("#playerContainer").classList.remove("redborder");
    document.querySelector("#CPUContainer").classList.remove("redborder");
    document.querySelector("#playerContainer").classList.add("blackborder");
    document.querySelector("#CPUContainer").classList.add("blackborder");
}

const game = async _=> {

    // reset to initial values
    let winningScore=5;
    let playerScore = 0;
    let computerScore = 0;
    const cont = document.querySelector(".container");
    cont.classList.remove("blur");

    let round = 1;
    playerChoice = "";
    computerChoice = "";
    resetBorder();

    await showCurrentRound(round);
    updateScoreTable(playerScore,computerScore);
    infobox("Click to select your weapon!");

    //delay function
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  while (playerScore < winningScore && computerScore < winningScore) {

    await showCurrentRound(round);
    await activateRPSButtons();
    infobox(`${capitalize(playerChoice)}`);
    disableRPSButtons();  
    resetBorder();
    computerChoice = getComputerChoice();
    await fistSwinging(); 
    await animatePlayerAndComputerChoice(playerChoice,computerChoice);
    let result = evaluateRound(playerChoice, computerChoice);
    infobox(result.message);

    await delay(500);

    const playerCont = document.querySelector("#playerContainer");
    const CPUCont = document.querySelector("#CPUContainer");
    if (result.result === "player") {
        playerScore++;
        playerCont.classList.remove("blackborder");
        playerCont.classList.add("redborder");
        CPUCont.classList.remove("redborder");
    }
    else if (result.result === "computer") {
        computerScore++;
        CPUCont.classList.remove("blackborder");
        CPUCont.classList.add("redborder");
        playerCont.classList.remove("redborder");
        
    }
    else {
        CPUCont.classList.remove("blackborder")
        playerCont.classList.remove("blackborder")
        CPUCont.classList.add("redborder")
        playerCont.classList.add("redborder")

    }
    

    updateScoreTable(playerScore,computerScore);
    round ++;
  }

  // delay before showing the result message
  await delay(1500);

  finalResult(playerScore, computerScore);

}

game();
