// SHIP CLASS

class Ship{

    // Construct a ship object

    constructor(name, length, vertical = false){
        this.name = name
        this.length = length
        this.vertical = vertical
        this.hits = Array(length).fill(false)
        this.coords = []
    }

    // Update/Add coordinates to the coordinates array

    shipCoords(x, y){
        this.coords.push([x,y])
    }

    // Specifies the direction of the ship

    isVertical(){
        return this.vertical = (this.vertical === false) ? false : true
    }

    // Ship object checks/recieves a hit

    hit(index){
        if (index >= 0 && index < this.length) this.hits[index] = true;
      
    }

    // Checks if the ship is sunk

    sunkValue(index){
        let value = (index === true) ? true : false;
        return value;
    }

    isSunk(){
        if(this.hits.every(this.sunkValue)) return true;
        return false;
    }

}

// EXPORT

module.exports = Ship;

// END OF CODE