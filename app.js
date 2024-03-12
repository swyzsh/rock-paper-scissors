/*

1. Score keeping - you, pc, draws
2. change change card color depending on result of game
3. Use apple emojis for hands

get bot to gen random number from 1-3 => assing each number to a type (rock, paper scisscors)

write game lose/win logic by comparing types from bot and user
let user select hand user wants to play with

4. give some sort of visual clue for winning/losing/draw

5. when u select a hand, change its order in the flex container also

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
  const startBtn = document.getElementById('start-container');
  const resetBtn = document.getElementById('reset-container');

  // bot-hand-generation logic
  const defaultBotHand = document.getElementById('bot-default-hand');
  const botRockHand = document.getElementById('bot-rock-hand');
  const botPaperHand = document.getElementById('bot-paper-hand');
  const botScissorHand = document.getElementById('bot-scissor-hand');
  let botHand;
  
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getBotHand() {
    defaultBotHand.style.display = 'none';
    const botHandIndex = getRandomInt(3);
    if (botHandIndex === 0) {
      botHand = botRockHand
      console.log(botRockHand.id);
      botRockHand.style.display = 'block';
      botPaperHand.style.display = 'none';
      botScissorHand.style.display = 'none';
    } else if (botHandIndex === 1) {
      botHand = botPaperHand
      console.log(botPaperHand.id);
      botRockHand.style.display = 'none';
      botPaperHand.style.display = 'block';
      botScissorHand.style.display = 'none';
    } else if (botHandIndex === 2) {
      botHand = botScissorHand
      console.log(botScissorHand.id);
      botRockHand.style.display = 'none';
      botPaperHand.style.display = 'none';
      botScissorHand.style.display = 'block';
    } else {
      console.log(`Error in generating Bot Hand...`);
    }
  }
  
  // user-hand-selection logic
  const rockHand = document.getElementById('rock-hand');
  const paperHand = document.getElementById('paper-hand');
  const scissorHand = document.getElementById('scissor-hand');
  const userHands = [rockHand, paperHand, scissorHand];
  let selectedHand = paperHand;
  function resetHand() {
    userHands.forEach((hand) => hand.className = 'not-selected-hand');
  }
  function selectHand(hand) {
    resetHand();
    hand.className = 'selected-hand';
  }

  userHands.forEach((hand) => {
    hand.addEventListener('click', function() {
      selectHand(this);
      selectedHand = this; 

      // change order
      if (selectedHand.id === 'rock-hand') {
        rockHand.style.order = '2';
        paperHand.style.order = '1';
        scissorHand.style.order = '3';
      } else if (selectedHand.id === 'paper-hand') {
        paperHand.style.order = '2';
        rockHand.style.order = '1';
        scissorHand.style.order = '3';
      } else if (selectedHand.id === 'scissor-hand') {
        scissorHand.style.order = '2';
        paperHand.style.order = '3';
        rockHand.style.order = '1';
      } else {
        console.log(`Error in user-hand-order logic...`);
      }
    });
  });

  //begin game with start button and user selected hand
  startBtn.addEventListener('click', function() {
    startGame(selectedHand);
  });

  // count logic
  const winCountContainer = document.getElementById('win-count');
  const drawCountContainer = document.getElementById('draw-count');
  const lossCountContainer = document.getElementById('loss-count');
  let winCount = 0;
  let drawCount = 0;
  let lossCount = 0;

  function updateCountContainer(wins, draws, losses) {
    winCountContainer.innerText = wins;
    drawCountContainer.innerText = draws;
    lossCountContainer.innerText = losses;
  }
  function winCountAnimation() {
    gsap.to('#win-count', {
      color: '#a3be8c', 
      duration: 0.3, 
      ease: 'easeInOut', // Use the easeInOut easing function
      onComplete: () => {  // Optional callback to restore the color
        gsap.to('#win-count', { color: 'var(--snowStorm2)', duration: 0.6, ease: 'easeInOut' });
      }
    });
  }
  function drawCountAnimation() {
    gsap.to('#draw-count', {
      color: '#5e81ac', 
      duration: 0.3, 
      ease: 'easeInOut', // Use the easeInOut easing function
      onComplete: () => {  // Optional callback to restore the color
        gsap.to('#draw-count', { color: 'var(--snowStorm2)', duration: 0.6, ease: 'easeInOut' });
      }
    });
  }
  function lossCountAnimation() {
    gsap.to('#loss-count', {
      color: '#bf616a', 
      duration: 0.3, 
      ease: 'easeInOut', // Use the easeInOut easing function
      onComplete: () => {  // Optional callback to restore the color
        gsap.to('#loss-count', { color: 'var(--snowStorm2)', duration: 0.6, ease: 'easeInOut' });
      }
    });
  }

  // change background of main div when winning/losing
  let mainBackTween = null;
  function winBackChange() {
    if (mainBackTween) mainBackTween.kill();
    mainBackTween = gsap.to('#main-back', {
      backgroundColor: '#a3be8c', 
      duration: 2, 
      ease: 'power1.inOut',
      onComplete: function() {
        setTimeout(() => {
          gsap.to('#main-back', { 
            duration: 2,
            ease: 'power1.inOut',
            backgroundColor: 'var(--darkBase)'
          });
        }, 100); 
      }
    });
  }
  function drawBackChange() {
    if (mainBackTween) mainBackTween.kill();
    mainBackTween = gsap.to('#main-back', {
      backgroundColor: '#5e81ac', 
      duration: 2, 
      ease: 'power1.inOut',
      onComplete: function() {
        setTimeout(() => {
          gsap.to('#main-back', { 
            duration: 2,   
            ease: 'power1.inOut',
            backgroundColor: 'var(--darkBase)'
          });
        }, 100); 
      }
    });
  }
  function lossBackChange() {
    if (mainBackTween) mainBackTween.kill();
    mainBackTween = gsap.to('#main-back', {
      backgroundColor: '#bf616a', 
      duration: 2, 
      ease: 'power1.inOut',
      onComplete: function() {
        setTimeout(() => {
          gsap.to('#main-back', { 
            duration: 2,   
            ease: 'power1.inOut',
            backgroundColor: 'var(--darkBase)'
          });
        }, 100); 
      }
    });
  }

  // game logic
  function startGame(hand) {
    console.log(`Game has started, with the User Hand:`, hand.id);
    getBotHand();

    if (selectedHand === rockHand && botHand === botRockHand) {
      console.log(`rock ties rock, tie!`);
      drawCount++;
      drawCountAnimation();
      drawBackChange();
      console.log(`Draws:`, drawCount);

    } else if (selectedHand === rockHand && botHand === botPaperHand) {
      console.log(`rock loses to paper, lose!`);
      lossCount++;
      lossCountAnimation();
      lossBackChange();
      console.log(`Loss:`, lossCount);

    } else if (selectedHand === rockHand && botHand === botScissorHand) {
      console.log(`rock beats scissors, win!`);
      winCount++;
      winCountAnimation();
      winBackChange();
      console.log(`Wins:`, winCount);
      
    }
    if (selectedHand === paperHand && botHand === botRockHand) {
      console.log(`paper beats rock, win!`);
      winCount++;
      winCountAnimation();
      winBackChange();
      console.log(`Wins:`, winCount);
      

    } else if (selectedHand === paperHand && botHand === botPaperHand) {
      console.log(`paper ties paper, tie!`);
      drawCount++;
      drawCountAnimation();
      drawBackChange();
      console.log(`Draws:`, drawCount);

    } else if (selectedHand === paperHand && botHand === botScissorHand) {
      console.log(`paper loses to scissors, lose!`);
      lossCount++;
      lossCountAnimation();
      lossBackChange();
      console.log(`Loss:`, lossCount);

    }
    if (selectedHand === scissorHand && botHand === botRockHand) {
      console.log(`scissors loses to rock, lose!`);
      lossCount++;
      lossCountAnimation();
      lossBackChange();
      console.log(`Loss:`, lossCount);

    } else if (selectedHand === scissorHand && botHand === botPaperHand) {
      console.log(`scissors beats paper, win!`);
      winCount++;
      winCountAnimation();
      winBackChange();
      console.log(`Wins:`, winCount);

    } else if (selectedHand === scissorHand && botHand === botScissorHand) {
      console.log(`scissors ties scissors, tie!`);
      drawCount++;
      drawCountAnimation();
      drawBackChange();
      console.log(`Draws:`, drawCount);

    }
    updateCountContainer(winCount, drawCount, lossCount);
  }
});