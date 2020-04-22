var TatetiGame = function(player, board, status) {
    this._player = player;
    this._board = board;
    this._status = status;
    this._winner = new Array();
    this._totalGames = 0;
}

//get players
TatetiGame.prototype.player = function() {
    return this._player;
}

//get board
TatetiGame.prototype.board = function() {
    return this._board;
}

//get game status
TatetiGame.prototype.status = function() {
    return this._status;
}

//change game status
TatetiGame.prototype.changeStatus = function(newStatus) {
    this._status = newStatus;
    console.log("Game status: " + newStatus);
}

//get winners
TatetiGame.prototype.winner = function() {
    return this._winner;
}

TatetiGame.prototype.totalGames = function() {
    return this._totalGames;
}

//Increase games qauntity
TatetiGame.prototype.increaseGameQty = function() {
    this._totalGames++;
}

//get current player
TatetiGame.prototype.currentPlayer = function() {
    var currentPlayer;
    this._player.forEach(element => {
        if (element.turn()) {
            currentPlayer = element;
        }
    });
    return currentPlayer;
}

//change players turn
TatetiGame.prototype.changePlayerTurn = function() {
    this._player.forEach(element => {
        element.changeTurn(!element.turn());
    });
}

//set the winner
TatetiGame.prototype.newWinner = function(player) {
    this._winner.push(player);
    console.log("New winner: " + player.name());
}

//get cell selected by player
TatetiGame.prototype.cellSelected = function(row, column) {
    return this._board.cell()[row][column];
}

//Reset all unnecessary data
TatetiGame.prototype.resetGame = function() {
    this.changeStatus("Play Again");
    this._player.forEach(element => {
        element.choosePiece(undefined);
        element.changeTurn(false);
    });
    this._board.cell().forEach(row => {
        row.forEach(cell => {
            cell.setCellStatus(false);
            cell.playerUsing(undefined);
        });
    });
    this._board.resetCount();
}

//check if a player has won
TatetiGame.prototype.isTateti = function(currentPlayer) {
    var cells = this._board.cell();
    var winner = undefined;
    var gameEnded = false;

    console.log("In isTateti");
    //check rows
    for (let row = 0; row < cells.length; row++) {
        if (!cells[row][0].isFree() && !cells[row][1].isFree() && !cells[row][2].isFree()) {
            if (cells[row][0].whoUseIt().playerId() == currentPlayer.playerId() &&
                cells[row][1].whoUseIt().playerId() == currentPlayer.playerId() &&
                cells[row][2].whoUseIt().playerId() == currentPlayer.playerId()) {

                this.newWinner(currentPlayer);
                winner = currentPlayer;
            }
        }
    }

    //check columns 
    for (let column = 0; column < cells.length; column++) {
        if (!cells[0][column].isFree() && !cells[1][column].isFree() && !cells[2][column].isFree()) {
            if (cells[0][column].whoUseIt().playerId() == currentPlayer.playerId() &&
                cells[1][column].whoUseIt().playerId() == currentPlayer.playerId() &&
                cells[2][column].whoUseIt().playerId() == currentPlayer.playerId()) {

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

    if (diagonal.length == 3 && (diagonal[0].whoUseIt().playerId() == currentPlayer.playerId() && diagonal[1].whoUseIt().playerId() == currentPlayer.playerId() && diagonal[2].whoUseIt().playerId() == currentPlayer.playerId())) {
        this.newWinner(currentPlayer);
        winner = currentPlayer;
    }

    if (contraDiagonal.length == 3 && (contraDiagonal[0].whoUseIt().playerId() == currentPlayer.playerId() && contraDiagonal[1].whoUseIt().playerId() == currentPlayer.playerId() && contraDiagonal[2].whoUseIt().playerId() == currentPlayer.playerId())) {
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
    this._turn = false;
}

// get player'id
Player.prototype.playerId = function() {
    return this._id;
}

//get name
Player.prototype.name = function() {
    return this._name;
}

//get turn
Player.prototype.turn = function() {
    return this._turn;
}

//changes player's turn
Player.prototype.changeTurn = function(playerTurn) {
    this._turn = playerTurn;
}

//get piece selected
Player.prototype.pieceSelected = function() {
    return this._pieceSelected;
}

//set the piece to the player
Player.prototype.choosePiece = function(piece) {
    this._pieceSelected = piece;
}

//get won
Player.prototype.won = function() {
    return this._won;
}

Player.prototype.increaseWon = function() {
    this._won++;
}

//get lost
Player.prototype.lost = function() {
    return this._lost;
}

Player.prototype.increaseLost = function(total) {
    this._lost = total - this._won - this._tied;
}

//get tied
Player.prototype.tied = function() {
    return this._tied;
}

Player.prototype.increaseTied = function() {
    this._tied++;
}



var Board = function(game) {
    //this._game = game;
    this._cell = new Array();
    this._count = 0;
}

//get cell
Board.prototype.cell = function() {
    return this._cell;
}

//get count
Board.prototype.count = function() {
    return this._count;
}

//reset count
Board.prototype.resetCount = function() {
    this._count = 0;
}

Board.prototype.increaseCount = function() {
    this._count++;
}


var Cell = function(row, column, name) {
    this._name = name;
    this._row = row;
    this._column = column;
    this._busy = false;
    this._whoUseIt = undefined;
    this.isFree = function() {
        return !this._busy;
    }
}

//get busy
Cell.prototype.busy = function() {
    return this._busy;
}

//get whoUseIt
Cell.prototype.whoUseIt = function() {
    return this._whoUseIt;
}

//change cell status to busy if user select it
Cell.prototype.setCellStatus = function(busy) {
    this._busy = busy;
}

//set the user to the cell
Cell.prototype.playerUsing = function(player) {
    this._whoUseIt = player;
}