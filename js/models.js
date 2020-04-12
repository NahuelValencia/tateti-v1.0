var TatetiGame = function(player, state) {
    this._player = player;
    this._state = state;
}

var Player = function(name, cardSelected) {
    this._name = name;
    this._cardSelected = cardSelected;
    this._turn = false
}
Player.prototype.setTurn = function(playerTurn) {
    this._turn = playerTurn
}