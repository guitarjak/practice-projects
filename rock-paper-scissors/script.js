document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
});

document.querySelector('.auto-play-button').addEventListener('click', () => {
    autoPlay();
});

document.querySelector('.reset-score-button').addEventListener('click', () => {
    showResetConfirmation();
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        autoPlay();
    }
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');

    } else if (event.key === 'Backspace') {
        showResetConfirmation();
    }
});

let score = JSON.parse(localStorage.getItem('score'));

if (!score) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0,
    };
} 

updateResult();
updateScore();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
        const playerMove = pickComputerMove()
        playGame(playerMove);
    }, 1000);
        isAutoPlaying = true;
        document.querySelector('.auto-play-button').innerHTML = 'Stop Auto Play';

    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.auto-play-button').innerHTML = 'Auto Play';
    }
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
}

function showResetConfirmation() {
    document.querySelector('.js-reset-confirmation-box').innerHTML = `Are you sure you want to reset score? 
    <button class="reset-yes">Yes</button> 
    <button class="reset-no">No</button>
    `;
    document.querySelector('.reset-yes').addEventListener('click', () => { 
        resetScore();
        hideResetConfirmation();
    });
    document.querySelector('.reset-no').addEventListener('click', () => {
        hideResetConfirmation();
    })
}

function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation-box').innerHTML = '';
}



function playGame(playerMove) {
    let computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'rock') {
            if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose, haha!';
        } else if (computerMove === 'scissors') {
            result = 'You win, damn it!';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win, damn it!'; 
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose, haha!';
        }

    } else if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose, haha!'; 
        } else if (computerMove === 'paper') {
            result = 'You win, damn it!'; 
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }
    }

    if (result === 'You win, damn it!') {
        score.wins = score.wins + 1;
    } else if (result === 'You lose, haha!') {
        score.losses = score.losses + 1;
    } else if (result === 'Tie.') {
        score.ties = score.ties + 1; 
    }

    localStorage.setItem('score', JSON.stringify(score));

    console.log(`You picked ${playerMove}, Computer picked ${computerMove}, ${result}`);

    updateScore();

    document.querySelector('.js-result')
    .innerHTML = result;

    document.querySelector('.js-moves')
    .innerHTML = `You
    <img src="images/${playerMove}-emoji.png" class="icon">
    <img src="images/${computerMove}-emoji.png" class="icon">
    Computer`;

}

function updateResult() {
    
}

function updateScore() {
    document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Tie: ${score.ties}`;
}    

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber > 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber > 1 / 3 && randomNumber < 2 / 3 ) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }

    return computerMove;
}