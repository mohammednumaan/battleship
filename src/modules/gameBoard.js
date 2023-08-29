const gameBoard = () => {

    // INITIALIZE ARRAYS

    let board = new Array(10).fill(' ').map(item => (new Array(10).fill(' ')))
    let allShips = []
    let missedAttack = []
    let allShipSunk = false;

    const findShip = (array, target) => {
        return array.findIndex(ship => JSON.stringify(target) === JSON.stringify(ship))    
    }

    // CHECKS IF THE GIVEN COORDINATES ARE VALID

    const isValidCoords = (currentShip, x, y) => {
        let valid = null;
        if (!currentShip.vertical){
            valid = (y - 1 + currentShip.length > 9) ? false : true
            return valid
        }

        if (currentShip.vertical){
            valid = (x - 1 + currentShip.length > 9) ? false : true
            return valid
        }
        return valid;
    };

    // PLACES THE GIVEN SHIPS ON THE BOARD

    const placeShip = (ship, x, y) => {

        if(isValidCoords(ship,x,y) && board[x][y] === ' '){
            for (let i = 0; i < ship.length ; i++){
                if(ship.vertical) ship.shipCoords(x + i,y);
                else if (!ship.vertical) ship.shipCoords(x,y + i);
            };
            for (let i = 0; i < ship.length; i++){

                if (ship.vertical) board[x + i][y] = 'placed-ship'
                else if (!ship.vertical) board[x][y + i] = 'placed-ship'
            }
            allShips.push(ship)
            return true;
        }

        else return false;
    };


    // RECIEVES ATTACKS ON THE BOARD

    const recieveAttack = (x, y) => {
        let shipHit = null;
        if (board[x][y] === 'placed-ship'){
            allShips.forEach(ship => {
                let currentShip = ship.coords
                let currentIndex = findShip(currentShip, [x,y])
                if (currentIndex !== -1) ship.hit(currentIndex)
                board[x][y] = 'attacked-ship'
            })
            shipHit = true;
        }

        if(board[x][y] === ' '){
            missedAttack.push([x,y])
            board[x][y] = 'missed'
            shipHit = false;
        }
        return shipHit;
    }

    // CHECKS IF A SHIP IS SUNK

    const shipSunk = (ship) => ship.isSunk()

    // CHECKS IF ALL SHIPS ON THE BOARD ARE SUNK

    const allSunk = () => {
        if (allShips.every(shipSunk)){
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
                if (board[i][j] === 'attacked-ship' || board[i][j] === 'missed') array.push([i,j])
            }
        }
        return array;

    }
    
    // RETURN 

    return {board, allShips, allShipSunk, placeShip, isValidCoords, recieveAttack, findShip, allSunk, missedAttack, findTakenCoords}
}

// EXPORT

module.exports = gameBoard;

// END OF CODE