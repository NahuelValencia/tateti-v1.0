var tatetiGame = undefined;
var justStarted = true;

function selectPiece(piece) {
    console.log("valor  " + piece.value + ", id  " + piece.id);
    var piecePlayer1 = document.getElementById("piece_player1");
    var piecePlayer2 = document.getElementById("piece_player2");

    if (piece.id == piecePlayer1.id && piece.selectedIndex == '1') {
        piecePlayer2.selectedIndex = 2;
    } else if (piece.id == piecePlayer1.id && piece.selectedIndex == '2') {
        piecePlayer2.selectedIndex = 1;
    } else if (piece.id == piecePlayer2.id && piece.selectedIndex == '1') {
        piecePlayer1.selectedIndex = 2;
    } else if (piece.id == piecePlayer2.id && piece.selectedIndex == '2') {
        piecePlayer1.selectedIndex = 1;
    }

    //when players choose to play again
    if (tatetiGame != undefined && tatetiGame.status === 'Play Again') {
        tatetiGame._player[0].choosePiece(piecePlayer1.value);
        tatetiGame._player[1].choosePiece(piecePlayer2.value);
        tatetiGame.changeStatus("Started");

        //set turn to the player how has chosen an X
        tatetiGame._player.forEach(element => {
            if (element._pieceSelected == 'X') {
                element.changeTurn(true);
            }
        })

        showTurn(tatetiGame._player);
    }
}

function prepareGame() {
    document.getElementById('playbtn').style.visibility = 'hidden';

    var namePlayer1 = document.forms["players"]['player1'].value;
    var namePlayer2 = document.forms["players"]['player2'].value;
    var piecePlayer1 = document.forms["players"]["piecePlayer1"].value;
    var piecePlayer2 = document.forms["players"]["piecePlayer2"].value;

    if (namePlayer1 == "" || namePlayer2 == "") {
        alert("Names must be filled out");
        return false;
    }

    if (piecePlayer1 == "default" || piecePlayer2 == "default") {
        alert("pieces must be selected");
        return false;
    }

    //create players
    var player1 = new Player(namePlayer1, 1);
    var player2 = new Player(namePlayer2, 2);

    //set the pieces
    player1.choosePiece(piecePlayer1)
    player2.choosePiece(piecePlayer2)

    //create Board and Cells
    var board = prepareBoard();

    //create the Game
    tatetiGame = new TatetiGame([player1, player2], board, "Started");

    //set turn to the player how has chosen an X
    tatetiGame._player.forEach(element => {
        if (element._pieceSelected == 'X') {
            element.changeTurn(true)
        }
    })

    tatetiGame.increaseGameQty();

    console.log("Game status: " + tatetiGame.status);

    showTurn(tatetiGame._player);

}

function prepareBoard() {
    var cell0 = new Cell(0, 0, "btn1");
    var cell1 = new Cell(0, 1, "btn2");
    var cell2 = new Cell(0, 2, "btn3");
    var cell3 = new Cell(1, 0, "btn4");
    var cell4 = new Cell(1, 1, "btn5");
    var cell5 = new Cell(1, 2, "btn6");
    var cell6 = new Cell(2, 0, "btn7");
    var cell7 = new Cell(2, 1, "btn8");
    var cell8 = new Cell(2, 2, "btn9");

    var board = new Board();
    board._cell.push([cell0, cell1, cell2], [cell3, cell4, cell5], [cell6, cell7, cell8]);

    return board;

}

function showTurn(players) {
    var displayLabel = document.getElementById('turnLabel');
    players.forEach(element => {
        if (element.turn) {
            displayLabel.innerText = element._name + "'s turn. Piece: " + element._pieceSelected;
        }
    });
}

function showWinner(player) {
    var displayLabel = document.getElementById('turnLabel');
    displayLabel.innerText = player._name + " is the new winner !"
}

function showTie() {
    var displayLabel = document.getElementById('turnLabel');
    displayLabel.innerText = "It is a tie !"
}

function play(btn, row, column, name) {
    //para evitar jugar sin que se haya creado un juego
    if (tatetiGame == undefined) {
        alert("Check the player data");
        return false;
    }

    //si el juego a terminado no se puede seguir jugando
    if (tatetiGame.status == "Finish") {
        return
    }

    //chequea que los jugadores tengan fichas
    if (tatetiGame.status == "Play Again") {
        alert("Choose pieces")
        return false
    }

    var currentPlayer = tatetiGame.currentPlayer();
    console.log("Current player: " + currentPlayer._name);

    //ver si mejorar o borrar
    if (justStarted) {
        justStarted = false;
        tatetiGame.changeStatus("In progress");
    }

    var cellSelected = tatetiGame.cellSelected(row, column);

    //check if the cell is busy otherwise, set cell Status as busy
    if (cellSelected.isFree()) {
        tatetiGame._board.count++;

        //set the status of the cell to busy
        cellSelected.setCellStatus(!cellSelected.busy);

        //set the player who use the cell to the CELL 
        cellSelected.whoUseIt = currentPlayer;

        //draw piece in the board
        var displayPiece = document.getElementById(btn.id);
        displayPiece.value = currentPlayer._pieceSelected;

        //change players turn
        tatetiGame.changePlayerTurn()

        //muestra turno en pantalla
        showTurn(tatetiGame._player)

    } else {
        alert("Cell already used");
        return false;
    }


    if (tatetiGame.isTateti(currentPlayer)) {
        showWinner(currentPlayer)
        document.getElementById("playAgainBtn").style.visibility = 'visible'
    } else if (tatetiGame._board.count == 9) {
        tatetiGame._player.forEach(element => {
            element.increaseTied();
        });
        showTie()
        document.getElementById("playAgainBtn").style.visibility = 'visible'
    }

}

function clearBoard() {
    location.reload()
}

function playAgain() {
    if (tatetiGame == undefined) {
        alert("Start a game first!!!!")
        return false
    }
    tatetiGame.resetGame()
    document.getElementById("piece_player1").value = "default"
    document.getElementById("piece_player2").value = "default"
    document.getElementById("playAgainBtn").style.visibility = 'hidden'

    var board = document.getElementById("boardTateti")

    for (var i = 0; i < board.rows.length; i++) {
        board.rows[i].cells[0].firstElementChild.value = "";
        board.rows[i].cells[1].firstElementChild.value = "";
        board.rows[i].cells[2].firstElementChild.value = "";
    }
}