function getComputerChoice() {
    //random number between 0,1 or 2
     const choice = Math.floor(Math.random()*3);
  
    //returns Rock, Paper or Scissors
     return (choice==0) ? "Rock" : (choice==1) ? "Paper" : "Scissors";
  }
  
function gameRound (playerSelection, computerSelection) {
let message =""
winningVariations = ["rockscissor", "scissorspaper", "paperrock"];
if (playerSelection.toLowerCase() == computerSelection.toLowerCase()) {
    message = "Draw.";
}
else if (winningVariations.includes(playerSelection.toLowerCase()+computerSelection.toLowerCase()))  {
    message = `You Win! ${playerSelection} beats ${computerSelection}.`;
}
else {
    message =   `You Lose! ${computerSelection} beats ${playerSelection}.`;
}
return message;

}
    
numberOfRounds = 5;




function startGame() {
    let input = document.getElementById("myInput");
    input.addEventListener("input", function(){
        let inputValue = input.value;
        console.log(typeof inputValue, inputValue);


        let result = gameRound (inputValue, getComputerChoice());

        const newDiv = document.createElement("div");
        newDiv.textContent = result;
    
        const myElement= document.getElementById("results");
        myElement.appendChild(newDiv);
    });
    

}

window.onload = (event) => {
    startGame();
};
  
  