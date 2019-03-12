//tracker for all elements
var playTracker;

const frPlayer = 'O';
const frplayerName = "Nora"
const secPlayer = 'img'
const secplayerName = "Sara"

//  true for ai player and false for second player
const withComputer = false// true;
const aiPlayer = 'X';
const aiplayerName = "Super Doper Bug Robotics"

var currentPlayer;


//all passible win moves 
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

function startGame() {
    currentPlayer = 1
    $("#player1name").css("box-shadow" , "0 9px 20px 0 rgb(255, 230, 7)")

    //$(".dialog").css('display', 'none');
    //fill array with numbers from 0-9
    playTracker = Array.from(Array(9).keys());
    //reclear game play
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';

        cells[i].style.removeProperty('background-color');

        cells[i].addEventListener('click', playerTurn, false);
    }
    $("#player1name").text( frplayerName);
    if(withComputer)
    $("#player2name").text(aiplayerName);
    else 
    $("#player2name").text(secplayerName);


}
function playerTurn(square) {
    if (typeof playTracker[square.target.id] == 'number') {
        if (currentPlayer == 2 && !withComputer && !checkWin(playTracker, secPlayer)) {
            turn(square.target.id, secPlayer)
            currentPlayer = 1;

            $("#player1name").css("box-shadow" , "0 9px 20px 0 rgb(255, 230, 7)")
            $("#player2name").css("box-shadow" ,"")


        }
        else {
            $("#player2name").css("box-shadow" , "0 9px 20px 0 rgb(255, 230, 7)")
            $("#player1name").css("box-shadow" , "")

            turn(square.target.id, frPlayer)
            currentPlayer = 2;
        }
        if (!checkWin(playTracker, frPlayer) && !checkTie() && withComputer)
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
        //shake it if its pic 
        document.getElementById(index).style.backgroundColor =
            gameWon.player == frPlayer ? "blue" : "red";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', playerTurn, false);
    }
if (gameWon.player == frPlayer){
    showAlart(("YAAAY "+ frplayerName + " wins!"), "YOU DID IT") //+chosen bug name 
    var score = document.getElementById('player1Score');
    var number = score.innerHTML;
    number++;
    score.innerHTML = number;

}
else if (gameWon.player == secPlayer){
    showAlart(("YAAAY "+ secplayerName + " wins!"), "YOU DID IT") //+chosen bug name 
    var score = document.getElementById('player2Score');
    var number = score.innerHTML;
    number++;
    score.innerHTML = number;
}
else{
    showAlart("You lose.", "YOU CAN'T compeat me HAHAHAha") 
    var score = document.getElementById('player2Score');
    var number = score.innerHTML;
    number++;
    score.innerHTML = number;
}

}

function showAlart(mainTitle, message) {
    // document.querySelector(".dialog").style.display = "block";
    // document.querySelector(".dialog .message").innerText = who;
    swal({
        title: mainTitle,
        text: message,
        button: "Rematch"
    }).then((go) => {
        if (go)
        startGame()
            //location.reload();

    });
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
        showAlart("Tie Game!", "let's ply again!")
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
function goHome() {
    // save last scores in database cookies, firebase or any thing else !!
    swal({
        title: "Are you sure you want to go home?",
        text: "your TURNES will be reset",
        buttons: ["keep playing", "yes JUST GO HOME"],
    }).then((go) => {
        if (go) {
            window.location.href = "home.html"
        }
    });
}