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
    var prototyePlayer1 = new Player(namePlayer1, piecePlayer1);
    var prototyePlayer2 = new Player(namePlayer2, piecePlayer2);

    //TODO determinar el turno aleatoriamente
    prototyePlayer1.setTurn(true);

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
    if (justStarted) {
        justStarted = false;
        prototyeTateti.changeStatus("In progress");
    }
    console.log("Game in progress: " + prototyeTateti.status);

    //check if the cell is busy otherwise, set cell Status as busy
    var cellSelected = prototyeTateti._board._cell[row][column];
    if (cellSelected._name == name && cellSelected.isFree()) {
        count++;

        cellSelected.setCellStatus(!cellSelected.busy);
        console.log("Change status for cell " + cellSelected._name + " to " + cellSelected.busy);

        drawPiece(btn);


    } else {
        alert("Cell already used");
        return false;
    }
}

function drawPiece(btn) {
    var displayPiece = document.getElementById(btn.id);

    if (prototyeTateti != null) {
        //draw X or O and change turn
        prototyeTateti._player.forEach(element => {
            if (element.turn) {
                displayPiece.value = element._pieceSelected;
            }
            element.setTurn(!element.turn)
        });
        showTurn(prototyeTateti._player)

    } else {
        alert("There is no players");
        return false;
    }

    //prototypeBoard.addPiece(row, column, prototyeTateti)
}

function clearBoard() {
    location.reload()
}