'use strict'

const GHOST = '&#9781'
var gGhosts = []

var gIntervalGhosts

function createGhosts(board) {
    gGhosts = []
    // DONE: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: generateColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // console.log(ghost.location)

    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    // console.log('moveDiff:', moveDiff)
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === GHOST) return
    if (nextCell === WALL) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) return
        gameOver()
        return
    }

    // DONE: moving from current location:
    // DONE: update the model 
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 } // right
        case 2: return { i: 1, j: 0 } // down
        case 3: return { i: 0, j: -1 } // left
        case 4: return { i: -1, j: 0 } // up
    }
}

function getGhostHTML(ghost) {
    if (gPacman.isSuper) {
        return `<span style="color:red;">${GHOST}</span>`
    }
    return `<span style="color:${ghost.color};">${GHOST}</span>`
}

function generateColor() {
    const hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
    var code = ""
    for (var i = 0; i < 6; i++) {
        code += hexArray[Math.floor(Math.random() * 16)]
    }
    return `#${code}`
}
