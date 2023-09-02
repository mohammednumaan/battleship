// IMPORT

const gameBoard = require("./gameBoard");

// PLAYER CLASS

class Player{

    constructor(name){
        this.name = name;
        this.turn = false;
        this.winner = false;
        this.game = gameBoard()
    }

    switchTurn(){
        this.turn = (this.turn === false) ? true : false;
        return this.turn
    }

    attackShip(enemy, x, y){
        if(this.turn === false) return false;
        enemy.game.recieveAttack(x, y)
    }

    allShipsSunk(){
        if(this.game.allSunk()){
            this.winner = false;
            return true;
        }
        return false;
    }
}

// EXPORT

module.exports = Player;
