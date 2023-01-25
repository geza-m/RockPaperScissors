


function getComputerChoice() {
    //random number between 0,1 or 2
     const choice = Math.floor(Math.random()*3);
  
    //returns Rock, Paper or Scissors
     return (choice==0) ? "rock" : (choice==1) ? "paper" : "scissors";
  }
  
function playRound (playerSelection, computerSelection) {
  let message =""
  let result=0;
  let computerSelectionCap = computerSelection.charAt(0).toUpperCase()+computerSelection.slice(1);
  let playerSelectionCap = playerSelection.charAt(0).toUpperCase()+playerSelection.slice(1);
  winningVariations = ["rockscissor", "scissorspaper", "paperrock"];
  if (playerSelection === computerSelection) {
      message = "Draw.";
  }
  else if (winningVariations.includes(playerSelection+computerSelection))  {
    
      message = `You Win! ${playerSelectionCap} beats ${computerSelectionCap}.`;
      result = 1;
  }
  else {
      message =   `You Lose! ${computerSelectionCap} beats ${playerSelectionCap}.`;
      result = 2;
  }

  return { result:result, message: message};
  return message;

}
    


function game() {

  let playerPoints = 0;
  let computerPoints =0;
  for (let i = 0; i < 5;i++) {
    let weapon = "";
    while (weapon!=="rock" && weapon!=="paper" && weapon!== "scissors")
    {
      weapon = prompt(`Round ${i+1}\nRock Paper or Scissors`).toLowerCase();
    }
    
    let computerChoice = getComputerChoice();
    let result = playRound (weapon, computerChoice);
    let resultMessage = result.message;
    
    switch (result.result) {
      case 1:
        playerPoints++;
        break;
      case 2:
        computerPoints++;
        break
    }

    let weaponCap = weapon.charAt(0).toUpperCase()+weapon.slice(1);
    let computerCap =  computerChoice.charAt(0).toUpperCase()+computerChoice.slice(1);
    console.log(`You: ${weaponCap} | Computer: ${computerCap}\n`+resultMessage);
  }
  
  if (playerPoints > computerPoints) {
    console.log("PLAYER WON!");
  }
  else if (playerPoints < computerPoints) {
    console.log("COMPUTER WON!");
  }
  else {
    console.log("DRAW.");
  }
}


let el = document.querySelector("#startButton");
el.addEventListener("click", function(e) {
game();
});
  




