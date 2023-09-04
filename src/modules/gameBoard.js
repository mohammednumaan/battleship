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
                valid = ((y - 1) + i + currentShip.length > 9 ) ? false : true
                return valid
            }
            if (currentShip.vertical === true){
                valid = ((x - 1) + i + currentShip.length > 9) ? false : true
                return valid
            }
        }
    
        return valid;
    };


    // PLACES THE GIVEN SHIPS ON THE BOARD

    const placeShip = (ship, x, y) => {
        
        let coords = findPlacedShipCoords(ship, x, y, ship.vertical)

        if(isValidCoords(ship, x, y) === false){
            return false;
        }

        if(isPlaced(ship, x, y, coords, board) === true){
            return false;
        }


        coords.forEach(coord => {
            if (ship.vertical === true){
                board[coord][y] = 'p'
                ship.shipCoords(coord, y)
            }
            if (ship.vertical === false){
                board[x][coord] = 'p'
                ship.shipCoords(x, coord)
            }
            
        });
        shipArray.push(ship)

        return true;
                
    };


    // RECIEVES ATTACKS ON THE BOARD

    const recieveAttack = (x, y) => {
    
        let shipHit = null;
        allCoords.push([x, y])
        if (board[x][y] === 'p'){
            shipArray.forEach(ship => {
                let currentShip = ship.coords
        
                let currentIndex = findShip(currentShip, [x,y])
                if (currentIndex !== -1) ship.hit(currentIndex);
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

    const findTakenCoords = (x, y) => {
    
        for (let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                if (board[i][j] === 'a' || board[i][j] === 'm') return true;
            }   
        }
        return false;

    }

    

    const findPlacedShipCoords = (ship, x, y, vertical) => {
        let array = []
        let xCoord = Number(x)
        let yCoord = Number(y)
        if(vertical === false){
            array.push(yCoord)
            for (let i = 1; i < ship.length; i++){
                array.push(yCoord + i)

            }
        }
        if(vertical === true){
            array.push(xCoord)
            for (let i = 1; i < ship.length; i++){
                array.push(xCoord + i)
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
        let coordinate = Math.floor(Math.random() * 10)
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
        allSunk,
        randomCoordinate,
        findShip
    }
}

// EXPORT

module.exports = gameBoard;

// END OF CODE