import { gameLoop } from "./dom"

function header(){
    const headerDiv = document.createElement('div')
    const headerTitle = document.createElement('h1')

    headerTitle.textContent = 'BATTLESHIP'
    headerDiv.classList.add('header')

    headerDiv.appendChild(headerTitle)
    document.body.appendChild(headerDiv)

    return headerDiv
}

function gameInstructions(){
    const instructions = document.createElement('div')
    const instructionsDiv = document.createElement('div')
    const instructionsTitle = document.createElement('h3')
    const instructionsDetails = document.createElement('div')

    instructionsTitle.textContent = 'Instructions'
    instructions.classList.add('instructions')
    instructionsDiv.classList.add('main-instructions')
    instructionsDetails.classList.add('instructions-info')

    instructionsDiv.appendChild(instructionsTitle)
    instructionsDiv.appendChild(instructionsDetails)
    instructions.appendChild(instructionsDiv)
    
    document.body.appendChild(instructions)

    instructionsDetails.innerHTML = 
    `<p>
        Welcome To Battleship!<br>Battleship is a strategy type guessing game for two players.
        <p>Game Instructions :<p>
        <ul>
            <li>Objective Of This Game : To Be The First One To Sink The Enemy's Ships.</li>
            <li>Your Board : Your Board Belongs on the Left Hand Side.</li>
            <li>Set Your Board : Press Start To Begin Placing Your Ships. To Change Direction, Simply Click the <b>Direction</b> Button.</li>
            <li>Set Your Ships : Hover Over The Board To Place Your Ships.<li>
            <li>Turns : Your Turn is First Turn.</li>
        </ul>
        <p class='note'>After Placing Your Ships, the battle has begun! Good Luck! :)</p>
    </p>`

    return instructionsDiv;
}

function startGame(){
    gameInstructions()
    const startGameButton = document.createElement('button')
    startGameButton.id = 'start-game-btn'
    startGameButton.textContent = 'Start Game.'

    startGameButton.addEventListener('click', () => {
        document.body.innerHTML = ''
        header()
        gameLoop()
    })
    document.body.appendChild(startGameButton)
}

export {header, gameInstructions, startGame}