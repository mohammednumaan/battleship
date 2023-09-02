import Player from "./player"

const player = new Player('player');
const machine = new Player('cpu');
let currentShip = player.game.allShips[0];
let gameOver = false;


function generateBoard(){
    const container = generateContainer()

    for (let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            const cell = document.createElement('div')
            cell.classList.add('board-cell')
            container.appendChild(cell) 
            cell.dataset.x = i
            cell.dataset.y = j
        };
    };
};


function generateContainer(){
    const container = document.createElement('div')
    container.classList.add('board-container')
    document.body.appendChild(container)
    return container;
};

function checkWinner(){
    if (machine.game.allShipSunk()){
        gameOver = true;
        player.winner = true;
    }
    else if (player.game.allShipSunk()){
        gameOver = true;
        machine.winner = true;
    }
}

function gameLoop(){

    player.switchTurn()
    

}

export {generateBoard, gameLoop}