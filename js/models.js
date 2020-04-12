var TatetiGame = function(player, state) {
    this._player = player;
    this._state = state;
}

var Player = function(name, pieceSelected) {
    this._name = name;
    this._pieceSelected = pieceSelected;
    this._turn = false;
}
Player.prototype.setTurn = function(playerTurn) {
    this._turn = playerTurn;
}

var Board = function(game) {
    this._game = game;
    this._cell = new Array();
}
Board.prototype.addPiece = function(row, column, tatetiGame) {

    }
    //piece es un array

var Cell = function(row, column) {
    this._name = "celda";
    this._row = row;
    this._column = column;
    this._busy = false;
}