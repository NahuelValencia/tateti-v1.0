var TatetiGame = function(player, board, status) {
    this._player = player;
    this._board = board;
    this.status = status;
    this._winner = new Array();
}

//change game status
TatetiGame.prototype.changeStatus = function(newStatus) {
    this.status = newStatus;
    console.log("Game status: " + newStatus)
}

//get current player
TatetiGame.prototype.currentPlayer = function() {
    var player
    this._player.forEach(element => {
        if (element.turn) {
            player = element
        }
    });
    return player
}

//change players turn
TatetiGame.prototype.changePlayerTurn = function() {
    this._player.forEach(element => {
        element.changeTurn(!element.turn)
    });
}

//set the winner
TatetiGame.prototype.newWinner = function(player) {
    this._winner.push(player)
    console.log("New winner: " + player._name)
}

//get cell selected by player
TatetiGame.prototype.cellSelected = function(row, column) {
    return this._board._cell[row][column];
}

//check if a player has won
TatetiGame.prototype.isTateti = function(currentPlayer) {
    var cells = this._board._cell
    var winner = undefined
    var gameEnded = false

    console.log("In isTateti");
    //check rows
    for (let row = 0; row < cells.length; row++) {
        if (!cells[row][0].isFree() && !cells[row][1].isFree() && !cells[row][2].isFree()) {
            if (cells[row][0].whoUseIt._id == currentPlayer._id &&
                cells[row][1].whoUseIt._id == currentPlayer._id &&
                cells[row][2].whoUseIt._id == currentPlayer._id) {

                this.newWinner(currentPlayer)
                winner = currentPlayer
            }
        }
    }

    //check columns 
    for (let column = 0; column < cells.length; column++) {
        if (!cells[0][column].isFree() && !cells[1][column].isFree() && !cells[2][column].isFree()) {
            if (cells[0][column].whoUseIt._id == currentPlayer._id &&
                cells[1][column].whoUseIt._id == currentPlayer._id &&
                cells[2][column].whoUseIt._id == currentPlayer._id) {

                this.newWinner(currentPlayer)

                winner = currentPlayer
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
        this.newWinner(currentPlayer)
        winner = currentPlayer
    }

    if (contraDiagonal.length == 3 && (contraDiagonal[0].whoUseIt._id == currentPlayer._id && contraDiagonal[1].whoUseIt._id == currentPlayer._id && contraDiagonal[2].whoUseIt._id == currentPlayer._id)) {
        this.newWinner(currentPlayer)
        winner = currentPlayer
    }

    if (winner != undefined) {
        this.changeStatus("Finish")
        gameEnded = true
        console.log("Tenemos un nuevo ganador. Distinto de undefined")

    }

    return gameEnded
}




var Player = function(name, pieceSelected, id) {
    this._id = id;
    this._name = name;
    this._pieceSelected = pieceSelected;
    this.turn = false;
}

//changes player's turn
Player.prototype.changeTurn = function(playerTurn) {
    this.turn = playerTurn;
}





var Board = function(game) {
    //this._game = game;
    this._cell = new Array()
}





var Cell = function(row, column, name) {
    this._name = name;
    this._row = row;
    this._column = column;
    this.busy = false;
    this.whoUseIt = null;
    this.isFree = function() {
        return !this.busy
    }
}

//change cell status to busy if user select it
Cell.prototype.setCellStatus = function(busy) {
    this.busy = busy;
}

//set the user to the cell
Cell.prototype.playerUsing = function(player) {
    this.whoUseIt = player
}