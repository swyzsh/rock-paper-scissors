/*

1. Score keeping - you, pc, draws
2. change change card color depending on result of game
3. Use apple emojis for hands

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
})
