import './style.css'
import { gameLoop } from './modules/dom'
import { gameInstructions, header, startGame } from './modules/starterDOM'


const gameBoard = require('./modules/gameBoard')
const Player = require('./modules/player')


header()
startGame()


