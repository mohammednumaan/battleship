// IMPORT

const shipFactory = require('./ship')

// INITIALIZE TEST SHIPS

const testShipOne = new shipFactory('Carrier', 5, true)
const testShipTwo = new shipFactory('Submarine', 2, false)

// TESTS

// Check if the ship is an object

test('TEST 1 : Check if the Ship is an object' , () => {
    expect(testShipOne).toEqual({
        "coords" : [], "hits": [false,false,false,false,false], "vertical": true, "length": 5, "name": "Carrier"
    });
});


// Check if the ship is in a vertical direction

test('TEST 2 : Check if ship is in a vertical direction', () => {
    expect(testShipOne.isVertical()).toBe(true)
});

// Check if the ship is not in a vertical direction

test('TEST 3 : Check if ship is not in a vertical direction', () => {
    expect(testShipTwo.isVertical()).toBe(false)
});

// END OF TESTS