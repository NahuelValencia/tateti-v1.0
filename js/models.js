var TatetiGame = function(player, board) {
    this._player = player;
    this._board = board;
    this.status = status;
    this._winner = new Array();
}
TatetiGame.prototype.changeStatus = function(newStatus) {
    this.status = newStatus;
}
TatetiGame.prototype.currentPlayer = function() {
    var player
    this._player.forEach(element => {
        if (element.turn) {
            player = element
        }
    });
    return player
}
TatetiGame.prototype.newWinner = function(player) {
    this._winner.push(player)
}

var Player = function(name, pieceSelected, id) {
    this._id = id;
    this._name = name;
    this._pieceSelected = pieceSelected;
    this.turn = false;
}
Player.prototype.changeTurn = function(playerTurn) {
    this.turn = playerTurn;
}

var Board = function(game) {
    //this._game = game;
    this._cell = new Array()
}
Board.prototype.addPiece = function(row, column, tatetiGame) {

    }
    //piece es un array

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
Cell.prototype.setCellStatus = function(busy) {
    this.busy = busy;
}
Cell.prototype.playerUsing = function(player) {
    this.whoUseIt = player
}