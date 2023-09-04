// IMPORT

const gameBoard = require('../modules/gameBoard')

// INITIALIZE 

let game = gameBoard();

let shipOne = game.allShips[4]

let shipTwo = game.allShips[3]
shipTwo.vertical = true;

let shipThree = game.allShips[2]

let shipFour = game.allShips[0]
shipFour.vertical = true;

// TESTS

// Test for placing ships

test('TEST 1 : Placing Ships', () => {

    game.placeShip(shipOne, 0, 3, game.board)
    game.placeShip(shipTwo, 1, 2, game.board)

    expect(game.board[0][3]).toEqual('p')
    expect(game.board[0][4]).toEqual('p')
    expect(game.board[1][2]).toEqual('p')
    expect(game.board[2][2]).toEqual('p')
    expect(game.board[3][2]).toEqual('p')
});

// Test for checking valid coordinates

test('TEST 2 : Check Valid Coordinates' , () => {

    expect(game.placeShip(shipTwo, 0, 3)).toEqual(false)
});

test('TEST 2.1 : Check if given coordinates are out of bounds', () => {

    expect(game.isValidCoords(shipThree, 0,8)).toEqual(false)
    expect(game.isValidCoords(shipFour, 6,9)).toEqual(false)
});

// Test for checking if the placed ships are pushed into the ships array

test('TEST 3 : Check if Ships are pushed into the allShip Array', () => {

    expect(game.shipArray).toEqual([shipOne,shipTwo])
});

// Test for recieveing attacks

test('TEST 4 : Check if the board is recieving attacks', () => {

    game.recieveAttack(0,4)
    expect(shipOne.hits).toEqual([false,true])
    
    game.recieveAttack(0,6)
    expect(game.missedAttack).toEqual([[0,6]])
});

// Test for checking a ship is sunk

test('TEST 5 : Check if an attacked ship is sunk', () => {

    game.recieveAttack(1, 2)
    game.recieveAttack(2, 2)
    game.recieveAttack(3, 2)
    expect(shipTwo.isSunk()).toEqual(true)

});

// Test for checking if all ships are sunk

test('TEST 6 : Check if all ships on the board are sunk', () => {
    game.recieveAttack(0, 3)
    expect(game.allSunk()).toEqual(true)
})

// Test for checking already clicked/taken coordinates

// test('TEST 7 : Check if a pair of coordinates are taken', () => {
//     game.placeShip(shipFour, 2, 4)
//     game.recieveAttack(3,6)
//     game.recieveAttack(3,4)
//     expect(game.findTakenCoords()).toEqual([[0, 3], [0, 4], [0, 6], [1, 2], [2, 2], [3, 2], [3, 4], [3, 6]])
// })

// Test for checking machine's placement of ships

// test('TEST 8 : Check if machine ships are placed', () => {
//     board.placeMachineShips()
//     console.log(board.board)
// })

// END OF TESTS