//tracker for all elements
var playTracker;
//frist player attributes

const frPlayer = 'O';
const frplayerName = sessionStorage.getItem('firstPlayerName');
const player1Bug = sessionStorage.getItem('firstPlayerBug')
//second player attributes
const secPlayer = 'X'
const secplayerName = sessionStorage.getItem('secondPlayerName')
const player2Bug = sessionStorage.getItem('secondPlayerBug')

// true for ai player and false for second player
const withComputer = (sessionStorage.getItem('playWithComputer') == 'true')
const aiPlayer = 'Y';
const aiplayerName = "Super Doper Bug Robotics"
const playerAiBug = 'roboticsBug.png'
//to track current player 
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

//reset the XO table 
function startGame() {
    currentPlayer = 1
    $("#player1name").css("box-shadow", "0 9px 20px 0 rgb(245, 162, 44)")
    $("#player2name").css("box-shadow", "")

    //$(".dialog").css('display', 'none');
    //fill array with numbers from 0-9
    playTracker = Array.from(Array(9).keys());
    //reclear game play
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        $(cells[i]).find('img').removeClass("shake-slow");
        cells[i].addEventListener('click', playerTurn, false);
    }
    $("#player1name").text(frplayerName);
    if (withComputer)
        $("#player2name").text(aiplayerName);
    else
        $("#player2name").text(secplayerName);


}
//for each click from user this fuction will be called 
function playerTurn(square) {
    if (typeof playTracker[square.target.id] == 'number') {

        if (currentPlayer == 2 && !checkTie() && !checkWin(playTracker, frPlayer)) {
            currentPlayer = 1;
            $("#player1name").css("box-shadow", "0 9px 20px 0 rgb(245, 162, 44)")
            $("#player2name").css("box-shadow", "")


            if (withComputer) {
                turn(square.target.id, aiPlayer, playerAiBug);
            }
            else {
                turn(square.target.id, secPlayer, player2Bug)
                checkWin(playTracker, secPlayer)
            }

           
        }
        else {
            $("#player2name").css("box-shadow", "0 9px 20px 0 rgb(235, 66, 24)")
            $("#player1name").css("box-shadow", "")
            turn(square.target.id, frPlayer, player1Bug)
            currentPlayer = 2;
            if (! checkWin(playTracker, frPlayer)&&!checkTie()&& withComputer ) {
                playerTurn(bestSpot());
            }
        }
    }
}

function turn(squareId, player, playerBug) {
    playTracker[squareId] = player;

    var img = `<img src='${playerBug}' alt= '${player}' />`;
    $(`#${squareId}`).append(img);

    let gameWon = checkWin(playTracker, player)
    if (gameWon) gameEnd(gameWon)
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

function gameEnd(gameWon) {
    for (let index of winList[gameWon.index]) {
        //shake it if its pic 
        /// document.getElementById().firstChild.classList.add("slow-shake");
        $(`#${index}`).find('img').addClass("shake-slow");
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', playerTurn, false);
    }
    if (gameWon.player == frPlayer) {
        showAlart(("YAAAY " + frplayerName + " wins!"), "YOU DID IT") //+chosen bug name 
        var score = document.getElementById('player1Score');
        var number = score.innerHTML;
        number++;
        score.innerHTML = number;

    }
    else if (gameWon.player == secPlayer) {
        showAlart(("YAAAY " + secplayerName + " wins!"), "YOU DID IT") //+chosen bug name 
        var score = document.getElementById('player2Score');
        var number = score.innerHTML;
        number++;
        score.innerHTML = number;
    }
    else {
        showAlart("You lose.", "YOU CAN'T compete me HAHAHAha")
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
        startGame()
        //location.reload();

    });
}

function emptySquares() {
    return playTracker.filter(s => typeof s == 'number');
}

function bestSpot() {
    return { target: document.getElementById(`${minimax(playTracker, aiPlayer).index}`) }
    // return $(`#${minimax(playTracker, aiPlayer).index}`);
}
function checkTie() {
    if (emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            // $(`#${index}`).addClass("shake-slow");
            $(cells[i]).find('img').addClass("shake-slow");
            cells[i].removeEventListener('click', playerTurn, false);
        }
        showAlart("Tie Game!", "let's ply again!")
        return true;
    }
    return false;
}
// main max algorithim is one of AI algorithems to find best path(movee) passible 
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