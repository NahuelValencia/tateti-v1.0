function selectCard(card) {
    console.log("valor  " + card.value + "id  " + card.id);
    var cardPlayer1 = document.getElementById("card_player1");
    var cardPlayer2 = document.getElementById("card_player2");

    if (card.id == cardPlayer1.id && card.selectedIndex == '1') {
        cardPlayer2.selectedIndex = 2
    } else if (card.id == cardPlayer1.id && card.selectedIndex == '2') {
        cardPlayer2.selectedIndex = 1
    } else if (card.id == cardPlayer2.id && card.selectedIndex == '1') {
        cardPlayer1.selectedIndex = 2
    } else if (card.id == cardPlayer2.id && card.selectedIndex == '2') {
        cardPlayer1.selectedIndex = 1
    }
}

function startGame() {
    var namePlayer1 = document.forms["players"]['player1'].value;
    var namePlayer2 = document.forms["players"]['player2'].value;
    var cardPlayer1 = document.forms["players"]["cardPlayer1"].value;
    var cardPlayer2 = document.forms["players"]["cardPlayer2"].value;

    if (namePlayer1 == "" || namePlayer2 == "") {
        alert("Names must be filled out");
        return false;
    }

    if (cardPlayer1 == "default" || cardPlayer2 == "default") {
        alert("Cards must be selected");
        return false;
    }

    var prototyePlayer1 = new Player(namePlayer1, cardPlayer1);
    var prototyePlayer2 = new Player(namePlayer2, cardPlayer2);

    //TODO determinar el turno aleatoriamente
    prototyePlayer1.setTurn(true)

    var prototyeTateti = new TatetiGame([prototyePlayer1, prototyePlayer2], "Started");

    console.log("Game started: " + prototyeTateti._player);

    showTurn(prototyeTateti._player)
}

function showTurn(players) {
    var displayLabel = document.getElementById('turnLabel')
    players.forEach(element => {
        if (element._turn) {
            displayLabel.innerText = 'Turno de ' + element._name
        }
    });
}