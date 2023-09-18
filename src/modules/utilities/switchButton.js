// IMPORT

import { isCurrentShipVertical, user } from "../dom"

// SWITCHED SHIPS DIRECTION FOR SHIP PLACEMENT (ONLY FOR USER PLAYER OBJECT)

function directionSwitch() {

    const message = document.createElement('p')
    message.classList.add('message')
    message.textContent = 'Place Your Ships :)'

    const switchDirection = document.createElement('button')
    switchDirection.type = 'button'
    switchDirection.id = 'direction-button'
    switchDirection.textContent = `Direction`

    document.body.appendChild(switchDirection)
    document.body.appendChild(message)
    
    switchDirection.addEventListener('click', () => {

        if(isCurrentShipVertical === true){
            switchDirection.textContent = `Horizontal`
            user.game.allShips.forEach(ship => ship.vertical = false)
            isCurrentShipVertical = false;

        }
        else{
            switchDirection.textContent = `Vertical`
            user.game.allShips.forEach(ship => ship.vertical = true)
            isCurrentShipVertical = true; 
        }
    })

    return switchDirection;
}

// EXPORT

export {directionSwitch}

// END OF CODE