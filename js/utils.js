var prototyeTateti;
var prototypeBoard;

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

function startGame() {
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

    var prototyePlayer1 = new Player(namePlayer1, piecePlayer1);
    var prototyePlayer2 = new Player(namePlayer2, piecePlayer2);

    //TODO determinar el turno aleatoriamente
    prototyePlayer1.setTurn(true);

    prototyeTateti = new TatetiGame([prototyePlayer1, prototyePlayer2], "Started");

    console.log("Game started: " + prototyeTateti._player);

    showTurn(prototyeTateti._player);
    prepareBoard(prototyeTateti);

}

function showTurn(players) {
    var displayLabel = document.getElementById('turnLabel');
    players.forEach(element => {
        if (element._turn) {
            displayLabel.innerText = element._name + "'s turn. Piece: " + element._pieceSelected;
        }
    });
}

function prepareBoard(tatetiGame) {
    var protorypeCell0 = new Cell(0, 0)
    var protorypeCell1 = new Cell(0, 1)
    var protorypeCell2 = new Cell(0, 2)
    var protorypeCell3 = new Cell(1, 0)
    var protorypeCell4 = new Cell(1, 1)
    var protorypeCell5 = new Cell(1, 2)
    var protorypeCell6 = new Cell(2, 0)
    var protorypeCell7 = new Cell(2, 1)
    var protorypeCell8 = new Cell(2, 2)

    prototypeBoard = new Board(tatetiGame)
    prototypeBoard._cell.push(protorypeCell0, protorypeCell1, protorypeCell2,
        protorypeCell3, protorypeCell4, protorypeCell5,
        protorypeCell6, protorypeCell7, protorypeCell8
    )
    console.log()
}

function play(btn, row, column) {

    var displayPiece = document.getElementById(btn.id);

    if (prototyeTateti != null) {
        prototyeTateti._player.forEach(element => {
            if (element._turn) {
                displayPiece.value = element._pieceSelected;
            }
            element.setTurn(!element._turn)
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