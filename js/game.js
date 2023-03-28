'use strict'

const CHERRY = '&#127826'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = 'O'
var cherryInterval = 0

const gGame = {
    score: 0,
    isOn: false,
    foodCount: 0
}

var gBoard

function onInit() {
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    setInterval(cherryAdd, 5000)

    gGame.isOn = true
    console.log(gBoard[2][3])
}

function buildBoard() {
    const size = 10
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    placeSuperFood(board)
    return board
}

function updateScore(diff) {
    // DONE: update model and dom
    // Model
    gGame.score += diff
    // DOM
    const elScore = document.querySelector('.score')
    elScore.innerText = gGame.score

}

function gameOver() {
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '🪦')
    gGame.isOn = false

    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    if (gGame.foodCount > 0) {
        var elmodalHeader = document.querySelector('.modal h1')
        elmodalHeader.innerText = 'Game Over!'
    }
}

function resetGame() {
    updateScore(gGame.score * -1)
    onInit()
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

function placeSuperFood(board) {
    board[1][1] = SUPERFOOD
    board[1][8] = SUPERFOOD
    board[8][1] = SUPERFOOD
    board[8][8] = SUPERFOOD
}