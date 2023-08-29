// SHIP CLASS

class shipFactory{

    // Construct a ship object

    constructor(name, length, vertical = false){
        this.name = name
        this.length = length
        this.vertical = vertical;
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

    isSunk(){

        let sunk = false;
        this.hits.every(index => {
            if(this.hits.length === this.length && index === true) sunk = true  ;
            else sunk = false;
        });

        return sunk;
    }
}

// EXPORT

module.exports = shipFactory;

// END OF CODE