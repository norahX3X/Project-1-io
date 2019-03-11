//tracker for all elements
var playTracker;

const frPlayer = 'O';
const secPlayer ='imgurl'
//  true for ai player and false for second player
const withComputer= true;
const aiPlayer = 'X';
var currentPlayer;
const winList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]
//get all xo squeres
const cells = document.querySelectorAll('.cell');
startGame();
//hide dialog 
function startGame() {
    $(".dialog").css('display', 'none');
    //fill array with numbers from 0-9
    playTracker = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';

        cells[i].style.removeProperty('background-color');

        cells[i].addEventListener('click', playerTurn, false);
    }
}

function playerTurn(square) {
    if (typeof playTracker[square.target.id] == 'number') {
		turn(square.target.id, frPlayer)
        if (!checkWin(playTracker, frPlayer) && !checkTie()) 
        turn(bestSpot(), aiPlayer);
	}
}

function turn(squareId, player) {
    playTracker[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(playTracker, player)
    if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
    //find all cells that already played in 
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);

    let gameWon = null;
    for (let [index, win] of winList.entries()) {
        if (win.every(element => plays.indexOf(element) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winList[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == frPlayer ? "blue" : "red";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', playerTurn, false);
    }

	declareWinner(gameWon.player == frPlayer ? "You win!" : "You lose.");

}

function declareWinner(who) {
    document.querySelector(".dialog").style.display = "block";
    document.querySelector(".dialog .message").innerText = who;
}

function emptySquares() {
    return playTracker.filter(s => typeof s == 'number');
}

function bestSpot() {
    return minimax(playTracker, aiPlayer).index;
}

function checkTie() {
    if (emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', playerTurn, false);
        }
        declareWinner("Tie Game!")
        return true;
    }
    return false;
}

function minimax(newBoard, player) {
    var availSpots = emptySquares();

    if (checkWin(newBoard, frPlayer)) {
        return { score: -10 };
    } else if (checkWin(newBoard, aiPlayer)) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == aiPlayer) {
            var result = minimax(newBoard, frPlayer);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }

    var bestMove;
    if (player === aiPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}