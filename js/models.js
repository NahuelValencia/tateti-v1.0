var TatetiGame = function(player, board, status) {
    this._player = player;
    this._board = board;
    this.status = status;
    this._winner = new Array();
    this.totalGames = 0;
}

//Increase games qauntity
TatetiGame.prototype.increaseGameQty = function() {
    this.totalGames++;
}

//change game status
TatetiGame.prototype.changeStatus = function(newStatus) {
    this.status = newStatus;
    console.log("Game status: " + newStatus);
}

//get current player
TatetiGame.prototype.currentPlayer = function() {
    var player;
    this._player.forEach(element => {
        if (element.turn) {
            player = element;
        }
    });
    return player;
}

//change players turn
TatetiGame.prototype.changePlayerTurn = function() {
    this._player.forEach(element => {
        element.changeTurn(!element.turn);
    });
}

//set the winner
TatetiGame.prototype.newWinner = function(player) {
    this._winner.push(player);
    console.log("New winner: " + player._name);
}

//get cell selected by player
TatetiGame.prototype.cellSelected = function(row, column) {
    return this._board._cell[row][column];
}

//Reset all unnecessary data
TatetiGame.prototype.resetGame = function() {
    this.changeStatus("Play Again");
    this._player.forEach(element => {
        element.choosePiece(undefined);
        element.changeTurn(false);
    });
    this._board._cell.forEach(row => {
        row.forEach(cell => {
            cell.setCellStatus(false);
            cell.playerUsing(undefined);
        });
    });
    this._board.count = 0;
}

//check if a player has won
TatetiGame.prototype.isTateti = function(currentPlayer) {
    var cells = this._board._cell;
    var winner = undefined;
    var gameEnded = false;

    console.log("In isTateti");
    //check rows
    for (let row = 0; row < cells.length; row++) {
        if (!cells[row][0].isFree() && !cells[row][1].isFree() && !cells[row][2].isFree()) {
            if (cells[row][0].whoUseIt._id == currentPlayer._id &&
                cells[row][1].whoUseIt._id == currentPlayer._id &&
                cells[row][2].whoUseIt._id == currentPlayer._id) {

                this.newWinner(currentPlayer);
                winner = currentPlayer;
            }
        }
    }

    //check columns 
    for (let column = 0; column < cells.length; column++) {
        if (!cells[0][column].isFree() && !cells[1][column].isFree() && !cells[2][column].isFree()) {
            if (cells[0][column].whoUseIt._id == currentPlayer._id &&
                cells[1][column].whoUseIt._id == currentPlayer._id &&
                cells[2][column].whoUseIt._id == currentPlayer._id) {

                this.newWinner(currentPlayer);

                winner = currentPlayer;
            }
        }
    }

    //check diagonals
    var diagonal = new Array();
    var contraDiagonal = new Array();

    for (let row = 0; row < cells.length; row++) {
        if (!cells[row][row].isFree()) {
            diagonal.push(cells[row][row]);
        }
        if (!cells[row][cells.length - row - 1].isFree()) {
            contraDiagonal.push(cells[row][cells.length - row - 1]);
        }
    }

    if (diagonal.length == 3 && (diagonal[0].whoUseIt._id == currentPlayer._id && diagonal[1].whoUseIt._id == currentPlayer._id && diagonal[2].whoUseIt._id == currentPlayer._id)) {
        this.newWinner(currentPlayer);
        winner = currentPlayer;
    }

    if (contraDiagonal.length == 3 && (contraDiagonal[0].whoUseIt._id == currentPlayer._id && contraDiagonal[1].whoUseIt._id == currentPlayer._id && contraDiagonal[2].whoUseIt._id == currentPlayer._id)) {
        this.newWinner(currentPlayer);
        winner = currentPlayer;
    }

    if (winner != undefined) {
        this.changeStatus("Finish");
        gameEnded = true;
        console.log("Tenemos un nuevo ganador.");
    }

    return gameEnded;
}




var Player = function(name, id) {
    this._id = id;
    this._name = name;
    this._pieceSelected = undefined;
    this._won = 0;
    this._lost = 0;
    this._tied = 0;
    this.turn = false;
}

//changes player's turn
Player.prototype.changeTurn = function(playerTurn) {
    this.turn = playerTurn;
}

//set the piece to the player
Player.prototype.choosePiece = function(piece) {
    this._pieceSelected = piece;
}

Player.prototype.increaseWon = function() {
    this._won++;
}

Player.prototype.increaseLost = function(total) {
    this._lost = total - this._won - this._tied;
}

Player.prototype.increaseTied = function() {
    this._tied++;
}

var Board = function(game) {
    //this._game = game;
    this._cell = new Array();
    this.count = 0;
}





var Cell = function(row, column, name) {
    this._name = name;
    this._row = row;
    this._column = column;
    this.busy = false;
    this.whoUseIt = undefined;
    this.isFree = function() {
        return !this.busy;
    }
}

//change cell status to busy if user select it
Cell.prototype.setCellStatus = function(busy) {
    this.busy = busy;
}

//set the user to the cell
Cell.prototype.playerUsing = function(player) {
    this.whoUseIt = player;
}