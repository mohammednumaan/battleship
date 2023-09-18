// IMPORT

import { boxEventListners } from './utilities/boxListners';
import { directionSwitch } from './utilities/switchButton';
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

// GENERATES BOARD NAMES

function displayBoardNames(){

    const nameContainer = document.createElement('div')
    const userBoardName = document.createElement('p')
    const machineBoardName = document.createElement('p')

    userBoardName.textContent = "Your Board"
    machineBoardName.textContent = "Machine's Board"

    nameContainer.classList.add('name-container')
    userBoardName.classList.add('user-board-name')
    machineBoardName.classList.add('machine-board-name')

    nameContainer.appendChild(userBoardName)
    nameContainer.appendChild(machineBoardName)
    document.body.appendChild(nameContainer)

}

// GENERATES WINNER MESSAGE AND RESTART BUTTON

function endGame(winner){

    boardContainer.classList.add('overlay')
    document.body.children[2].classList.add('overlay')
    document.body.children[0].classList.add('overlay')
    
    const winnerDiv = document.createElement('div')
    winnerDiv.classList.add('winner-div')
    
    winnerDiv.classList.add('show')
    const winnerMessage = document.createElement('p')
    winnerMessage.classList.add('winner-message')

    const restartButton = document.createElement('button')
    restartButton.id = 'restart-btn'

    restartButton.textContent = 'Restart Game?'
    winnerMessage.innerHTML = `
    <p>
        <h1>${winner} Wins The Game!</h1>
        ${winner} Was The First To Sink All Of The Enemy Ships

    </p>`

    winnerDiv.appendChild(winnerMessage)
    winnerDiv.appendChild(restartButton)
    document.body.appendChild(winnerDiv)
    document.body.children[5].classList.add('hide')

    restartButton.addEventListener('click', () => {

        winnerDiv.classList.add('slideOut')
        boardContainer.classList.add('backdropOut')
        window.location.reload()
    })


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
 
    displayBoardNames()

    placeUserShips()
    placeMachineShips()
    

    const machineBoard = document.querySelectorAll('.machine-cell')
    machineBoard.forEach(box => {

        box.addEventListener('click', (event) => {
            document.body.children[5].classList.add('attack-message-unreveal')
            if (placedAllShips === false) return;
            if (user.turn === false) return;

            attackGameLoop(event.target)

            if(gameWinner() === true){
                if(user.winner == true) endGame('User');
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

// GET THE NEXT SHIP IN THE USERS SHIP ARRAY

function getNextShip() {
    let currentShipIndex = user.game.allShips.indexOf(currentShip)
    currentShip = user.game.allShips[currentShipIndex + 1]

    if(currentShipIndex === 4){
        let array = document.body.children
        array[3].classList.add('hide')
        array[4].classList.add('hide')

        const attackMessage = document.createElement('p')
        attackMessage.textContent = 'Attack Here! Good Luck :)'
        attackMessage.classList.add('attack-message')
        document.body.appendChild(attackMessage)
    }
}

// EXPORT

export {
    generateBoard, 
    gameLoop, 
    getNextShip, 
    highlightShips, 
    placedAllShips, 
    user, 
    machine, 
    currentShip, 
    isCurrentShipVertical,
    boardContainer
}


// END OF CODE