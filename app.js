const logicController = (function logic() {
  const scores = {
    user: 0,
    computer: 0,
  };
  const moves = ['rock', 'paper', 'scissor'];
  const compMove = function compMv() {
    return moves[Math.floor(Math.random() * 2)];
  };
  return {
    findWinner(usrMv) {
      let winner = null;
      const compMv = compMove();
      if (usrMv === compMv) {
        winner = 'draw';
      }
      if (usrMv === 'rock' && compMv === 'scissor') {
        winner = 'usr';
      }
      if (usrMv === 'rock' && compMv === 'paper') {
        winner = 'comp';
      }
      if (usrMv === 'paper' && compMv === 'rock') {
        winner = 'usr';
      }
      if (usrMv === 'paper' && compMv === 'scissor') {
        winner = 'comp';
      }
      if (usrMv === 'scissor' && compMv === 'paper') {
        winner = 'usr';
      }
      if (usrMv === 'scissor' && compMv === 'rock') {
        winner = 'comp';
      }
      return winner;
    },
    updateScore(id) {
      if (id === 'usr') scores.user += 1;
      if (id === 'comp') scores.computer += 1;
    },
    getScores() {
      return [scores.user, scores.computer];
    },
  };
})();

const UIController = (function UI() {
  const DOMlists = {
    userScore: document.getElementById('user-score'),
    compScore: document.getElementById('computer-score'),
    rockID: document.getElementById('rock-btn'),
    paperID: document.getElementById('paper-btn'),
    scissorID: document.getElementById('scissors-btn'),
  };
  return {
    dispScore(scores) {
      const usrScr = scores[0];
      const compScr = scores[1];
      DOMlists.userScore.textContent = usrScr;
      DOMlists.compScore.textContent = compScr;
    },
    getDOMlist() {
      return DOMlists;
    },
  };
})();

const appController = (function UI(logicCtrl, UIctrl) {
  const DOMlists = UIctrl.getDOMlist();

  const userMove = function usrMove(mvType) {
    return function usrMoveCols() {
      if (mvType === 'rock') {
        console.log('You used rock!');
        const winner = logicCtrl.findWinner(mvType);
        if (winner !== 'draw') {
          logicCtrl.updateScore(winner);
          const scores = logicCtrl.getScores();
          UIctrl.dispScore(scores);
        }
      } else if (mvType === 'paper') {
        console.log('You used paper!');
        const winner = logicCtrl.findWinner(mvType);
        if (winner !== 'draw') {
          logicCtrl.updateScore(winner);
          const scores = logicCtrl.getScores();
          UIctrl.dispScore(scores);
        }
      } else if (mvType === 'scissor') {
        console.log('You used scissor!');
        const winner = logicCtrl.findWinner(mvType);
        if (winner !== 'draw') {
          logicCtrl.updateScore(winner);
          const scores = logicCtrl.getScores();
          UIctrl.dispScore(scores);
        }
      }
    };
  };

  const moveType = [userMove('rock'), userMove('paper'), userMove('scissor')];

  const setupEventListeners = function eventList() {
    DOMlists.rockID.addEventListener('click', moveType[0]);
    DOMlists.paperID.addEventListener('click', moveType[1]);
    DOMlists.scissorID.addEventListener('click', moveType[2]);
  };
  return {
    init() {
      setupEventListeners();
    },
  };
})(logicController, UIController);

appController.init();
