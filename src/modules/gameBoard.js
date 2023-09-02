const Player = require('./player')
const Ship = require('./ship')
const gameBoard = () => {

    // INITIALIZE ARRAYS

    let board = new Array(10).fill(' ').map(item => (new Array(10).fill(' ')))
    let missedAttack = []
    let allCoords = []
    let allShipSunk = false;
    let shipArray = []
    let allShips = [
        
        new Ship('Carrier', 5),
        new Ship('Battleship', 4),
        new Ship('Cruiser', 3),
        new Ship('Submarine', 3),
        new Ship('Destroyer', 2)
    ]

    const findShip = (array, target) => {
        return array.findIndex(ship => JSON.stringify(target) === JSON.stringify(ship))    
    }

    // CHECKS IF THE GIVEN COORDINATES ARE VALID

    const isValidCoords = (currentShip, x, y) => {
        let valid = null;

        for (let i = 0; i < currentShip.length; i++){

            if (currentShip.vertical === false){
                valid = ((y - 1 + i) + currentShip.length > 9 ) ? false : true
                return valid
            }
            if (currentShip.vertical === true){
                valid = ((x - 1  + i) + currentShip.length > 9) ? false : true
                return valid
            }
        }
    
        return valid;
    };


    // PLACES THE GIVEN SHIPS ON THE BOARD

    const placeShip = (ship, x, y) => {
        
        let coords = findPlacedShipCoords(ship, x, y)

        if(isValidCoords(ship, x, y) === false){
            return false;
        }

        if(isPlaced(ship, x, y, coords, board) === true){
            return false;
        }


        coords.forEach(coord => {
            if (ship.vertical === true){
                ship.shipCoords(coord, y)
                board[coord][y] = 'p'
            }
            if (ship.vertical === false){
                ship.shipCoords(x, coord)
                board[x][coord] = 'p'
            }
            shipArray.push(ship)
        });

        return true;
                
    };


    // RECIEVES ATTACKS ON THE BOARD

    const recieveAttack = (x, y) => {
        let shipHit = null;
        if (board[x][y] === 'p'){
            shipArray.forEach(ship => {
                let currentShip = ship.coords
                let currentIndex = findShip(currentShip, [x,y])
                console.log(currentIndex)
                if (currentIndex !== -1) ship.hit(currentIndex)
                board[x][y] = 'a'
            })
            shipHit = true;
        }

        if(board[x][y] === ' '){
            missedAttack.push([x,y])
            board[x][y] = 'm'
            shipHit = false;
        }
        return shipHit;
    }

    // CHECKS IF A SHIP IS SUNK

    const shipSunk = (ship) => ship.isSunk()

    // CHECKS IF ALL SHIPS ON THE BOARD ARE SUNK

    const allSunk = () => {
        if (shipArray.every(shipSunk)){
            allShipSunk = true;
        }
        else allShipSunk = false;
        return allShipSunk;
    }

    // FIND TAKEN COORDINATES/MOVES

    const findTakenCoords = () => {
        let array = []
        for (let i = 0; i < 10; i++){
            for (let j = 0; j < 10; j++){
                if (board[i][j] === 'a' || board[i][j] === 'm') array.push([i,j])
            }
        }
        return array;

    }

    const findPlacedShipCoords = (ship, x, y) => {
        let array = []
        if(ship.vertical === false){
            array.push(y)
            for (let i = 1; i < ship.length; i++){
                array.push(Number(y + i))
            }
        }
        if(ship.vertical === true){
            array.push(x)
            for (let i = 1; i < ship.length; i++){
                array.push(Number(x + i))
            }
        }

        return array;
        
    }

    const isPlaced = (ship, x, y, shipCoords, boardArray) => {
        if(ship.vertical === true){
            for (const coords of shipCoords){
                if (boardArray[coords][y] != ' ')
                return true;
            }
        }

        if(ship.vertical === false){
            for (const coords of shipCoords){
                if (boardArray[x][coords] != ' ')
                return true;
            }
        }
        return false;

    }

    // GENERATE RANDOM NUMBERS FOR MACHINE MOVES

    const randomCoordinate = () => {
        let coordinate = Math.floor(Math.random() * 9)
        if (coordinate === 0) return randomCoordinate();
        return coordinate;
    }

    // GENERATE RANDOM DIRECTION FOR MACHINE MOVES

    const randomDirection = () => {
        let allDirections = [true, false]  // --> every ship objects has a vertical property which is of boolean value. 
        let selectedDirection = Math.floor(Math.random() * allDirections.length)
        return allDirections[selectedDirection]
    }

    // PLACE MACHINE SHIPS ON THE BOARD
    const placeMachineShips = (board,) => {
        allShips.forEach(ship => {
            placeMachineShipsFunc(ship, board)
        })

    }


    const placeMachineShipsFunc = (ship, board) => {
        ship.vertical = randomDirection()
        if (placeShip(ship, randomCoordinate(), randomCoordinate()) === false){
            placeMachineShipsFunc(ship, board)
        }

        
    }
    
    // RETURN 

    return {
        board,
        shipArray, 
        allCoords,
        allShips, 
        missedAttack,
        allShipSunk, 
        placeShip, 
        placeMachineShips,
        isPlaced,
        isValidCoords, 
        findTakenCoords, 
        findPlacedShipCoords,
        recieveAttack, 
        allSunk
    }
}

const user = new Player('user');
const machine = new Player('cpu');

user.game.placeShip(user.game.allShips[4], 0 , 0)
machine.game.placeShip(machine.game.allShips[4], 4, 0)

user.switchTurn()
user.attackShip(machine, 4, 1)
console.log(machine.allShips[4].hits)

module.exports = gameBoard;

// END OF CODE