var tatetiGame = undefined;
var justStarted = true;

function selectPiece(piece) {
    console.log("valor  " + piece.value + ", id  " + piece.id);
    var piecePlayer1 = document.getElementById("piece_player1");
    var piecePlayer2 = document.getElementById("piece_player2");

    //Asign pieces. If player1 choose 'X' then player2 has 'O'
    if (piece.id == piecePlayer1.id && piece.selectedIndex == '1') {
        piecePlayer2.selectedIndex = 2;
    } else if (piece.id == piecePlayer1.id && piece.selectedIndex == '2') {
        piecePlayer2.selectedIndex = 1;
    } else if (piece.id == piecePlayer2.id && piece.selectedIndex == '1') {
        piecePlayer1.selectedIndex = 2;
    } else if (piece.id == piecePlayer2.id && piece.selectedIndex == '2') {
        piecePlayer1.selectedIndex = 1;
    }

    //when players choose to play again and change pieces
    if (tatetiGame != undefined && tatetiGame.status() === 'Play Again') {
        tatetiGame.player()[0].choosePiece(piecePlayer1.value);
        tatetiGame.player()[1].choosePiece(piecePlayer2.value);
        tatetiGame.changeStatus("Started");

        //set turn to the player how has chosen an X
        tatetiGame.player().forEach(element => {
            if (element.pieceSelected() == 'X') {
                element.changeTurn(true);
            }
        })

        showTurn(tatetiGame.player());
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

    //set the name in the table score
    document.getElementById('namePlayer1').innerText = namePlayer1;
    document.getElementById('namePlayer2').innerText = namePlayer2;

    //create players
    var player1 = new Player(namePlayer1, 1);
    var player2 = new Player(namePlayer2, 2);

    //set the pieces
    player1.choosePiece(piecePlayer1);
    player2.choosePiece(piecePlayer2);

    //create Board and Cells
    var board = prepareBoard();

    //create the Game
    tatetiGame = new TatetiGame([player1, player2], board, "Started");

    //set turn to the player how has chosen an X
    tatetiGame.player().forEach(element => {
        if (element.pieceSelected() == 'X') {
            element.changeTurn(true);
        }
    })

    console.log("Game status: " + tatetiGame.status());

    showTurn(tatetiGame.player());

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
    board.cell().push([cell0, cell1, cell2], [cell3, cell4, cell5], [cell6, cell7, cell8]);

    return board;

}

function showTurn(players) {
    var displayLabel = document.getElementById('turnLabel');
    players.forEach(element => {
        if (element.turn()) {
            displayLabel.innerText = element.name() + "'s turn. Piece: " + element.pieceSelected();
        }
    });
}

function showWinner(player) {
    var displayLabel = document.getElementById('turnLabel');
    displayLabel.innerText = player.name() + " is the new winner !";
    refreshTableScore();
}

function showTie() {
    var displayLabel = document.getElementById('turnLabel');
    displayLabel.innerText = "It is a tie !";
    refreshTableScore();
}

function refreshTableScore() {
    var wonPlayer1 = document.getElementById('won1');
    var wonPlayer2 = document.getElementById('won2');
    var lostPlayer1 = document.getElementById('lost1');
    var lostPlayer2 = document.getElementById('lost2');
    var tiedPlayer1 = document.getElementById('tied1');
    var tiedPlayer2 = document.getElementById('tied2');

    var totalGames = document.getElementById('totalGames');
    totalGames.innerText = tatetiGame.totalGames();

    tatetiGame.player().forEach(element => {

        if (element.playerId() == 1) {
            wonPlayer1.innerText = element.won();
            lostPlayer1.innerText = element.lost();
            tiedPlayer1.innerText = element.tied();
        }

        if (element.playerId() == 2) {
            wonPlayer2.innerText = element.won();
            lostPlayer2.innerText = element.lost();
            tiedPlayer2.innerText = element.tied();
        }
    });
}

function play(btn, row, column, name) {
    //para evitar jugar sin que se haya creado un juego
    if (tatetiGame == undefined) {
        alert("Check the player data");
        return false;
    }

    //si el juego a terminado no se puede seguir jugando
    if (tatetiGame.status() == "Finish") {
        return;
    }

    //chequea que los jugadores tengan fichas
    if (tatetiGame.status() == "Play Again") {
        alert("Choose pieces");
        return false;
    }

    var currentPlayer = tatetiGame.currentPlayer();
    console.log("Current player(): " + currentPlayer.name());

    //ver si mejorar o borrar
    if (justStarted) {
        justStarted = false;
        tatetiGame.changeStatus("In progress");
    }

    var cellSelected = tatetiGame.cellSelected(row, column);

    //check if the cell is busy otherwise, set cell Status as busy
    if (cellSelected.isFree()) {
        tatetiGame.board().increaseCount();

        //set the status of the cell to busy
        cellSelected.setCellStatus(!cellSelected.busy());

        //set the player who use the cell to the CELL 
        cellSelected.playerUsing(currentPlayer);

        //draw piece in the board
        var displayPiece = document.getElementById(btn.id);
        displayPiece.value = currentPlayer.pieceSelected();

        //change players turn
        tatetiGame.changePlayerTurn();

        //muestra turno en pantalla
        showTurn(tatetiGame.player());

    } else {
        alert("Cell already used");
        return false;
    }

    checkEndGame(currentPlayer);
}

function checkEndGame(currentPlayer) {
    if (tatetiGame.isTateti(currentPlayer)) { //winner
        tatetiGame.increaseGameQty();
        currentPlayer.increaseWon();

        tatetiGame.player().forEach(element => {
            if (element.playerId() != currentPlayer.playerId()) {
                element.increaseLost(tatetiGame.totalGames());
            }
        });

        showWinner(currentPlayer);
        document.getElementById("playAgainBtn").style.visibility = 'visible';

    } else if (tatetiGame.board().count() == 9) { //tie
        tatetiGame.increaseGameQty();
        tatetiGame.player().forEach(element => {
            element.increaseTied();
        });

        showTie();
        document.getElementById("playAgainBtn").style.visibility = 'visible';

    }
}

function clearBoard() {
    location.reload();
}

function playAgain() {
    if (tatetiGame == undefined) {
        alert("Start a game first!!!!");
        return false;
    }
    tatetiGame.resetGame();
    document.getElementById("piece_player1").value = "default";
    document.getElementById("piece_player2").value = "default";
    document.getElementById("playAgainBtn").style.visibility = 'hidden';

    var board = document.getElementById("boardTateti");

    for (var i = 0; i < board.rows.length; i++) {
        board.rows[i].cells[0].firstElementChild.value = "";
        board.rows[i].cells[1].firstElementChild.value = "";
        board.rows[i].cells[2].firstElementChild.value = "";
    }
}