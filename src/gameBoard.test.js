// IMPORT

const gameBoard = require('./gameBoard')
const shipFactory = require('./ship')

// INITIALIZE 

let board = gameBoard();
let shipOne = new shipFactory('BoatOne', 2, false)
let shipTwo = new shipFactory('BoatTwo', 3, true)
let shipThree = new shipFactory('BoatThree', 2, false)
let shipFour = new shipFactory('BoatFour', 5, true)

// TESTS

// Test for placing ships

test('TEST 1 : Placing Ships', () => {

    board.placeShip(shipOne, 0, 3)
    board.placeShip(shipTwo, 1, 2)

    expect(board.board[0][3]).toEqual('placed-ship')
    expect(board.board[0][4]).toEqual('placed-ship')
    expect(board.board[1][2]).toEqual('placed-ship')
    expect(board.board[2][2]).toEqual('placed-ship')
});

// Test for checking valid coordinates

test('TEST 2 : Check Valid Coordinates' , () => {

    expect(board.placeShip(shipTwo, 0, 3)).toEqual(false)
});

test('TEST 2.1 : Check if given coordinates are out of bounds', () => {

    expect(board.isValidCoords(shipFour, 6,9)).toEqual(false)
    expect(board.isValidCoords(shipThree, 0,8)).toEqual(true)
});

// Test for checking if the placed ships are pushed into the ships array

test('TEST 3 : Check if Ships are pushed into the allShip Array', () => {

    expect(board.allShips).toEqual([shipOne,shipTwo])
});

// Test for recieveing attacks

test('TEST 4 : Check if the board is recieving attacks', () => {

    board.recieveAttack(0,4)
    expect(shipOne.hits).toEqual([false,true])
    
    board.recieveAttack(0,6)
    expect(board.missedAttack).toEqual([[0,6]])
});

// Test for checking a ship is sunk

test('TEST 5 : Check if an attacked ship is sunk', () => {

    board.recieveAttack(1, 2)
    board.recieveAttack(2, 2)
    board.recieveAttack(3, 2)
    expect(shipTwo.isSunk()).toEqual(true)

});

// Test for checking if all ships are sunk

test('TEST 6 : Check if all ships on the board are sunk', () => {
    board.recieveAttack(0, 3)
    expect(board.allSunk()).toEqual(true)
})

// END OF TESTS