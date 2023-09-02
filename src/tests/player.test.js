// IMPORT

const Player = require('../modules/player')
const Ship = require('../modules/ship')

// INITIALIZE PLAYERS

const player = new Player('player')
const machine = new Player('machine')

let shipOne = player.game.allShips[4]
let shipTwo = player.game.allShips[2]


// TESTS

// Check if turns are switched properly

test('TEST 1 : Check if turns are switched', () => {

    player.game.placeShip(shipOne, 0, 0)
    machine.game.placeShip(shipTwo, 5, 5)

    player.switchTurn()
    player.attackShip(machine, 5, 5)

    player.switchTurn()
    machine.switchTurn()
    machine.attackShip(player, 0, 1)
    machine.attackShip(player, 1, 6)
    
    expect(shipTwo.hits).toEqual([true, false])
    expect(shipOne.hits).toEqual([false, true])
    expect(player.game.board[1][6]).toEqual('m')
    
})