// IMPORT

const Player = require('./player')

// INITIALIZES PLAYERS

const user = new Player('player');
const machine = new Player('cpu');

// INITIALIZING A GLOBAL BOARD CONTAINER

const boardContainer = document.createElement('div')
boardContainer.classList.add('board-container')

// INITIALIZING VARIABLES

let currentShip = user.game.allShips[0];
let isCurrentShipVertical = currentShip.vertical

let placedAllShips = false;
let gameOver = false;

// GENERATES PLAYER'S BOARDS/GRIDS

function generateBoard(playerBoard, containerName, classToAdd){
    const container = generateContainer(containerName)
    for (let i = 0; i < playerBoard.length; i++){
        for(let j = 0; j < playerBoard.length; j++){
            const cell = document.createElement('div')
            cell.classList.add(classToAdd)
            container.appendChild(cell) 
            cell.dataset.x = i
            cell.dataset.y = j
        };
    };
};

// GENERATES PLAYER'S CONTAINERS

function generateContainer(classToAdd){

    const container = document.createElement('div')
    container.classList.add(classToAdd)

    boardContainer.appendChild(container)
    document.body.appendChild(boardContainer)
    return container;
};

// GENERATES WINNER MESSAGE AND RESTART BUTTON

function endGame(winner){
    
    const winnerDiv = document.createElement('div')
    winnerDiv.classList.add('winner-div')

    const winnerMessage = document.createElement('p')
    winnerMessage.classList.add('winner-message')

    const restartButton = document.createElement('button')
    restartButton.id = 'restart-btn'

    restartButton.textContent = 'Restart Game?'
    winnerMessage.innerHTML = `
    <p>
        <h1>${winner} Win The Game!</h1>
        ${winner} Was The First To Sink All Of The Enemy Ships

    </p>`

    winnerDiv.appendChild(winnerMessage)
    winnerDiv.appendChild(restartButton)
    document.body.appendChild(winnerDiv)

    restartButton.addEventListener('click', () => {
        window.location.reload()
    })

    // boardContainer.classList.add('overlay')

}

// GENERAL BOARD CLASS FUNCTION 

function highlightShips(box, performAction, classes){
    const allCoords = user.game.findPlacedShipCoords(currentShip, box.dataset.x, box.dataset.y, isCurrentShipVertical)
    allCoords.forEach(coord => {

        if(isCurrentShipVertical === true){
            let boxHighlight = document.querySelector(`[data-x="${coord}"][data-y="${box.dataset.y}"]`);
            boxHighlight.classList[performAction](classes);
        }

        if(isCurrentShipVertical === false){
            let boxHighlight = document.querySelector(`[data-x="${box.dataset.x}"][data-y="${coord}"]`);
            boxHighlight.classList[performAction](classes);
        }

    });
}


// MAIN GAME LOOP

function gameLoop() {
    user.switchTurn()

    generateBoard(user.game.board, 'user-board', 'user-cell')
    generateBoard(machine.game.board, 'machine-board', 'machine-cell')
    placeUserShips()
    placeMachineShips()

    const machineBoard = document.querySelectorAll('.machine-cell')
    machineBoard.forEach(box => {

        box.addEventListener('click', (event) => {
            if (placedAllShips === false) return;
            if (user.turn === false) return;
            
            attackGameLoop(event.target)

            if(gameWinner() === true){
                if(user.winner == true) endGame('You');
                else endGame('Machine');
            }  
        });
    })
}

// MAIN ATTACK GAME LOOP

function attackGameLoop(box) {

    const x = Number(box.dataset.x)
    const y = Number(box.dataset.y)

    if(gameOver === true) return;
    if (machine.game.board[x][y] === 'm' || machine.game.board[x][y] === 'a') return ;

    if (user.attackShip(machine, x, y) === true){
        box.classList.add('ship-hit') 
    }
    else{
        machine.machineAttackShip(user)
        box.classList.add('miss-hit')   
    }


}


// PLACE SHIPS ON THE BOARD (ONLY FOR USER PLAYER OBJECT)

function placeUserShips() {

    directionSwitch()
    let boxes = document.querySelectorAll('.user-cell')
    boxes.forEach(box => boxEventListners(box))
    
}

// PLACE SHIPS ON THE BOARD (ONLY FOR MACHINE OBJECT)

function placeMachineShips(){
    machine.game.placeMachineShips()
}


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

// CHECKS THE GAME WINNER

function gameWinner(){

    if (machine.game.allSunk()){
        user.winner = true;
        gameOver = true;
        // endGame('You')
    }

    if (user.game.allSunk()){
        machine.winner = true;
        gameOver = true
        // endGame('Machine')
    }
    return gameOver;
}


// SWITCHED SHIPS DIRECTION FOR SHIP PLACEMENT (ONLY FOR USER PLAYER OBJECT)

function directionSwitch() {
    const switchDirection = document.createElement('button')

    switchDirection.type = 'button'
    switchDirection.id = 'direction-button'
    switchDirection.textContent = `Direction`
    document.body.appendChild(switchDirection)

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

}

function getNextShip() {
    let currentShipIndex = user.game.allShips.indexOf(currentShip)
    currentShip = user.game.allShips[currentShipIndex + 1]
}
export {generateBoard, gameLoop}