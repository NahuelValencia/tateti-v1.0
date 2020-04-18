var prototyeTateti;
var justStarted = true;
var count = 0;

function selectPiece(piece) {
    console.log("valor  " + piece.value + "id  " + piece.id);
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
}

function prepareGame() {
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
    var prototyePlayer1 = new Player(namePlayer1, piecePlayer1, 1);
    var prototyePlayer2 = new Player(namePlayer2, piecePlayer2, 2);

    //TODO determinar el turno aleatoriamente
    prototyePlayer1.changeTurn(true);

    //create Board and Cells
    var prototypeBoard = prepareBoard();

    //create the Game
    prototyeTateti = new TatetiGame([prototyePlayer1, prototyePlayer2], prototypeBoard, "Started");

    console.log("Game started: " + prototyeTateti.status);

    showTurn(prototyeTateti._player);

}

function showTurn(players) {
    var displayLabel = document.getElementById('turnLabel');
    players.forEach(element => {
        if (element.turn) {
            displayLabel.innerText = element._name + "'s turn. Piece: " + element._pieceSelected;
        }
    });
}

function prepareBoard() {
    var protorypeCell0 = new Cell(0, 0, "btn1");
    var protorypeCell1 = new Cell(0, 1, "btn2");
    var protorypeCell2 = new Cell(0, 2, "btn3");
    var protorypeCell3 = new Cell(1, 0, "btn4");
    var protorypeCell4 = new Cell(1, 1, "btn5");
    var protorypeCell5 = new Cell(1, 2, "btn6");
    var protorypeCell6 = new Cell(2, 0, "btn7");
    var protorypeCell7 = new Cell(2, 1, "btn8");
    var protorypeCell8 = new Cell(2, 2, "btn9");

    var board = new Board();
    board._cell.push([protorypeCell0, protorypeCell1, protorypeCell2], [protorypeCell3, protorypeCell4, protorypeCell5], [protorypeCell6, protorypeCell7, protorypeCell8]);

    return board;

}

function play(btn, row, column, name) {
    console.log("Current player: " + prototyeTateti.currentPlayer()._id)
    var currentPlayer = prototyeTateti.currentPlayer()

    if (justStarted) {
        justStarted = false;
        prototyeTateti.changeStatus("In progress");
    }
    console.log("Game in progress: " + prototyeTateti.status);

    if (prototyeTateti == null) {
        alert("There is no players");
        return false;
    }

    //check if the cell is busy otherwise, set cell Status as busy
    var cellSelected = prototyeTateti._board._cell[row][column];
    if (cellSelected.isFree()) {
        count++;

        cellSelected.setCellStatus(!cellSelected.busy);

        //set the player who use the cell to the CELL 
        cellSelected.whoUseIt = currentPlayer

        console.log("Change status for cell " + cellSelected._name + " to " + cellSelected.busy);

        //draw piece in the board
        var displayPiece = document.getElementById(btn.id);
        //draw X or O and change turn
        displayPiece.value = currentPlayer._pieceSelected

        //change player status
        prototyeTateti._player.forEach(element => {
            element.changeTurn(!element.turn)
        });

        //muestra otro turno
        showTurn(prototyeTateti._player)

    } else {
        alert("Cell already used");
        return false;
    }

    if (count >= 3) {
        isTateti(currentPlayer);
    }
}

//borrar
function setPlayerToCell() {
    var actualPlayer;
    prototyeTateti._player.forEach(element => {
        if (element.turn) {
            actualPlayer = element;
        }
    });
    return actualPlayer;
}

var interestValues = []

function isTateti(currentPlayer) {
    var cells = prototyeTateti._board._cell

    //check rows
    for (let row = 0; row < cells.length; row++) {
        if (!cells[row][0].isFree() && !cells[row][1].isFree() && !cells[row][2].isFree()) {
            if (cells[row][0].whoUseIt._id == currentPlayer._id &&
                cells[row][1].whoUseIt._id == currentPlayer._id &&
                cells[row][2].whoUseIt._id == currentPlayer._id) {

                prototyeTateti.newWinner(currentPlayer)
                return
            }
        }
    }

    //check columns 
    for (let column = 0; column < cells.length; column++) {
        if (!cells[0][column].isFree() && !cells[1][column].isFree() && !cells[2][column].isFree()) {
            if (cells[0][column].whoUseIt._id == currentPlayer._id &&
                cells[1][column].whoUseIt._id == currentPlayer._id &&
                cells[2][column].whoUseIt._id == currentPlayer._id) {

                prototyeTateti.newWinner(currentPlayer)

                return
            }
        }
    }

    //check diagonals
    var diagonal = new Array()
    var contraDiagonal = new Array()

    for (let row = 0; row < cells.length; row++) {
        if (!cells[row][row].isFree()) {
            diagonal.push(cells[row][row])
        }
        if (!cells[row][cells.length - row - 1].isFree()) {
            contraDiagonal.push(cells[row][cells.length - row - 1])
        }
    }

    if (diagonal.length == 3 && (diagonal[0].whoUseIt._id == currentPlayer._id && diagonal[1].whoUseIt._id == currentPlayer._id && diagonal[2].whoUseIt._id == currentPlayer._id)) {
        prototyeTateti.newWinner(currentPlayer)
        return
    }

    if (contraDiagonal.length == 3 && (contraDiagonal[0].whoUseIt._id == currentPlayer._id && contraDiagonal[1].whoUseIt._id == currentPlayer._id && contraDiagonal[2].whoUseIt._id == currentPlayer._id)) {
        prototyeTateti.newWinner(currentPlayer)
        return
    }
}

function clearBoard() {
    location.reload()
}