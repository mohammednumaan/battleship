const gameBoard = require("./gameBoard");
const Ship = require("./ship");

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

    attackShip(player, x, y){
        if(this.turn === false) return false;
        player.game.recieveAttack(x, y)
    }

    allShipsSunk(){
        if(this.game.allSunk()){
            this.winner = false;
            return true;
        }
        return false;
    }

    getRandomMoves(){
        let number = Math.floor(Math.random() * 10)
        if (number === 0) return number;
        return number;
    }
}


let p1 = new Player('p1')
let p2 = new Player('p2')

let ship1 = new Ship('Carrier', 5, false)
let ship2 = new Ship('Submarine', 2, true)

p1.game.placeShip(ship1, 0, 0)
p2.game.placeShip(ship2, 5, 5)

p1.switchTurn()

p1.attackShip(p2, 5, 5)
p1.attackShip(p2, 2, 5)
p1.attackShip(p2, 2, 0)

console.log(ship2.isSunk())
console.log(p2.game.board)
console.log(p2.game.findTakenCoords())

module.exports = Player;