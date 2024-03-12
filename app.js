/*

1. Score keeping - you, pc, draws
2. change change card color depending on result of game
3. Use apple emojis for hands

get bot to gen random number from 1-3 => assing each number to a type (rock, paper scisscors)

write game lose/win logic by comparing types from bot and user
let user select hand user wants to play with

4. give some sort of visual clue for winning/losing/draw

*/

// run script after DOM loads
document.addEventListener('DOMContentLoaded', function() {
  // socials
  const twitterBtn = document.getElementById('twitter-btn');
  twitterBtn.addEventListener('click', function() {
    window.open('https://x.com/swyzsh/', '_blank');
  });
  const githubBtn = document.getElementById('github-btn');
  githubBtn.addEventListener('click', function() {
    window.open('https://github.com/swyzsh', '_blank');
  });

  // begin game with push of button
  const startBtn = document.getElementById('start-button');
  startBtn.addEventListener('click', startGame);
});

// game logic
function startGame() {
  console.log(`Game has started`);
}