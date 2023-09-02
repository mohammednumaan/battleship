import {gameLoop, generateBoard } from './modules/dom'
import './style.css'

const board = require('./modules/gameBoard')
const Player = require('./modules/player')


generateBoard()
let player = new Player('idk')
