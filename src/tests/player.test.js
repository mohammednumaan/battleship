// IMPORT

const Player = require('../modules/player')
const Ship = require('../modules/ship')

// INITIALIZE PLAYERS

const player = new Player('player')
const machine = new Player('machine')

let ship1 = new Ship('Carrier', 5, false)
let ship2 = new Ship('Submarine', 2, true)


// TESTS

// Check if turns are switched properly

test('TEST 1 : Check if turns are switched', () => {

    player.game.placeShip(ship1, 0, 0)
    machine.game.placeShip(ship2,5, 5)

    player.switchTurn()
    player.attackShip(machine, 5, 5)

    
    expect(ship2.hits).toEqual([true, false])

    expect(machine.allShipsSunk()).toEqual(false)
})