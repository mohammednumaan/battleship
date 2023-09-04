// IMPORT

const gameBoard = require("./gameBoard");

// PLAYER CLASS

class Player{

    constructor(name){
        this.name = name
        this.turn = false
        this.winner = false
        this.game = gameBoard()
    }

    switchTurn(){
        this.turn = (this.turn === false) ? true : false;
        return this.turn
    }

    attackShip(enemy, x, y){
        if(this.turn === false) return false;
        return enemy.game.recieveAttack(x, y)
    }

    machineAttackShip(enemy){
        this.machineAttackFunc(enemy)
    }

    machineAttackFunc(enemy){

        let attackCoords = this.findTakenMoves(enemy)
        console.log(attackCoords[0], attackCoords[1])
       
        const cell = document.querySelector(`[data-x ="${attackCoords[0]}"][data-y = "${attackCoords[1]}"]`)
        if(enemy.game.recieveAttack(attackCoords[0], attackCoords[1]) === true){
            cell.classList.add('ship-hit')
            this.machineAttackShip(enemy)
        } 
        else{
            cell.classList.add('miss-hit')
        }
    }

    findTakenMoves(enemy){
     
        const x = this.game.randomCoordinate()
        const y = this.game.randomCoordinate()
        let coords = [x, y]
        let takenMovesArray = enemy.game.allCoords
        if (takenMovesArray.length === 0) return coords;

        for (let i = 0; i < takenMovesArray.length; i++){
            if (takenMovesArray[i][0] === coords[0] && takenMovesArray[i][1] === coords[1]){
                return this.findTakenMoves(enemy)
            }
        }
        return coords;
;
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

// END OF CODE