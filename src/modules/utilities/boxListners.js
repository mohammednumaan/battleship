// IMPORT

import { boardContainer, user, machine, placedAllShips, currentShip, getNextShip, highlightShips } from "../dom";

// BOX/CELLS EVENT LISTNERS

function boxEventListners(box){

    box.addEventListener('mouseenter', (event) => {

        if (placedAllShips === true) return

        if (user.game.isValidCoords(currentShip, Number(event.target.dataset.x), Number(event.target.dataset.y)) === false){
            // highlightShips(box, 'add', 'wrong-ship')
            return;
        }
        highlightShips(box, 'add', 'ship-highlight')
    })

   
    box.addEventListener('mouseleave', (event) => {
        
        if (placedAllShips === true) return
    
        if (user.game.isValidCoords(currentShip, Number(event.target.dataset.x), Number(event.target.dataset.y)) === false){
            return;
        }
        highlightShips(box,'remove', 'ship-highlight')

    });
    
    box.addEventListener('click', (event) => {
        
        highlightShips(box, 'remove', 'ship-highlight')
        if(placedAllShips === true){
            return;
        }

        if (user.game.placeShip(currentShip, Number(event.target.dataset.x), Number(event.target.dataset.y)) === false){
            return;
        }

        if (user.game.isValidCoords(currentShip, Number(event.target.dataset.x), Number(event.target.dataset.y)) === false){
            return;
        }

        if(currentShip === user.game.allShips[4]) {
            placedAllShips = true;
        }
               
        user.game.placeShip(currentShip, Number(event.target.dataset.x), Number(event.target.dataset.y))
        highlightShips(box, 'add', 'placed-ship')
        getNextShip()

    }); 
    
}

// EXPORT

export {boxEventListners}

// END OF CODE