function reset(){
  Score.wins = 0;
  Score.loses = 0;
  Score.ties = 0;
  localStorage.removeItem('score');
  document.querySelector('.stats')
.innerHTML = `Wins:${Score.wins}, Lose ${Score.loses}, Tie ${Score.ties}`;
}
let Score = JSON.parse(localStorage.getItem('score'));
if(!Score)
{
  Score = {
    wins: 0,
    loses: 0,
    ties: 0
  };
}
let isAutoPlaying = false;
let intervalId;
function autoPlay(){
  let text = document.querySelector('.auto-play');
  if(text.innerHTML == 'Auto Play')
  {
    text.innerHTML = 'Stop Play';
  }
  else{
    text.innerHTML = 'Auto Play';
  }
  if(!isAutoPlaying)
  {
    // intervalId =  setInterval(function(){
    //   const playerMove = computerChoice();
    //   playGame(playerMove);
    // }, 1000);
    // isAutoPlaying = true; we can also write
    intervalId = setInterval( ()=> {
      const playerMove = computerChoice();
      playGame(playerMove);
    }, 1000);
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }  
}
updateData();

function computerChoice() {
let computerMove = Math.random();
let computer = '';
if (computerMove >= 0 && computerMove < 1 / 3) {
  computer = 'Rock';
}
else if (computerMove >= 1 / 3 && computerMove < 2 / 3) {
  computer = 'Paper';
}
else {
  computer = 'Scissor';
}
return computer;
}
function playGame(userChoice){
let computerMove = computerChoice();
let result = '';
if(userChoice === 'Rock')
{
  if(computerMove === 'Rock')result = 'Tie.';
  else if(computerMove === 'Paper')result = 'You Lose.';
  else{
    result = 'You Won.';
  }
}
else if(userChoice === 'Paper')
{
  if(computerMove === 'Rock')result = 'You Won.';
  else if(computerMove === 'Paper')result = 'Tie.';
  else{
    result = 'You Lose.';
  }
}
else{
  if(computerMove === 'Rock')result = 'You Lose.';
  else if(computerMove === 'Paper')result = 'You Won.';
  else{
    result = 'Tie.';
  }
}

if(result === 'You Won.')Score.wins++;
else if(result === 'You Lose.')Score.loses++;
else{
  Score.ties++;
}
localStorage.setItem('score', JSON.stringify(Score));
updateData();
document.querySelector('.result').innerHTML = result;
document.querySelector('.Choice').innerHTML = `<div class="img-div"><img class="img-choice" src="handimage/${userChoice}-emoji.png" alt="">
  <p>You</p></div>
<div class="img-div">
  <img class="img-choice" src="handimage/${computerMove}-emoji.png" alt=""><p>Computer</p>
</div>`;
}

function updateData(){
document.querySelector('.stats')
.innerHTML = `Wins:${Score.wins}, Lose ${Score.loses}, Tie ${Score.ties}`;
}
