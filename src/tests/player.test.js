// IMPORT

const Player = require('../modules/player')

// INITIALIZE PLAYERS

const player = new Player('player')
const machine = new Player('machine')

let shipOne = player.game.allShips[4]
let shipTwo = player.game.allShips[2]


// TESTS

// Check if turns are switched properly

test('TEST 1 : Check if turns are switched', () => {

    player.switchTurn()
    expect(player.turn).toEqual(true)
    expect(machine.turn).toEqual(false)

    player.switchTurn()
    machine.switchTurn()

    expect(machine.turn).toEqual(true)
    expect(player.turn).toEqual(false)

})

// Check if player's ships are placed properly 

test('TEST 2 : Check if ships are placed on their respective boards', () => {

    player.switchTurn()
    player.game.placeShip(shipOne, 0, 1)

    player.switchTurn()
    machine.switchTurn()

    machine.game.placeShip(shipTwo, 5, 5)

    expect(player.game.board[0][1]).toEqual('p')
    expect(player.game.board[5][5]).toEqual(' ')

    expect(machine.game.board[5][5]).toEqual('p')
    expect(machine.game.board[0][1]).toEqual(' ')

})

// Check if a players ships are attacked porperly

test('TEST 3 : Check if ships are attacked on their respective boards', () => {

    player.switchTurn()
    player.attackShip(machine, 5, 6)
    player.attackShip(machine, 5, 7)

    expect(machine.game.board[5][6]).toEqual('a')
    expect(machine.game.board[3][8]).toEqual(' ')
    expect(shipTwo.hits).toEqual([false, true, true])

    player.switchTurn()
    machine.switchTurn()

    machine.attackShip(player, 0, 1)
    expect(player.game.board[0][1]).toEqual('a')
    expect(machine.game.board[0][1]).toEqual(' ')

})

// Check if a players ship is sunk

test('TEST 4 : Check if a player ship is sunk', () => {

    let index = machine.game.shipArray.indexOf(shipTwo)

    player.switchTurn()
    player.attackShip(machine, 5, 5)

    expect(shipTwo.isSunk()).toEqual(true)
    expect(machine.game.shipArray[index].hits).toEqual([true, true, true])
    expect(machine.game.shipArray[index].isSunk()).toEqual(true)
})