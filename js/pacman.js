'use strict'

const PACMAN = '😷'
var gPacman
var gRemoved = []

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log(gGhosts)
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    // console.log('nextLocation:', nextLocation)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // DONE: return if cannot move
    if (nextCell === WALL) return
    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) removeGhost(nextLocation.i, nextLocation.j)
        else gameOver()
    }
    if (nextCell === FOOD) {
        updateScore(1)
        victoryCheck()
    }
    if (nextCell === CHERRY) {
        updateScore(10)
    }
    if (nextCell === SUPERFOOD) {
        console.log(gGhosts)
        if (gPacman.isSuper) return
        updateScore(1)
        gPacman.isSuper = true
        setTimeout(reviveGhost, 5000)
        victoryCheck()
    }


    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)


    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)

    console.log(findEmptyCell())
}

function getNextLocation(eventKeyboard) {
    // console.log('eventKeyboard:', eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    // DONE: figure out nextLocation
    return nextLocation
}

function foodLeftCounter() {
    var foodCount = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell === FOOD) foodCount++
        }
    }
    // console.log('Food Left: ', foodCount)
    return foodCount
}

function removeGhost(idxI, idxJ) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        if (currGhost.location.i === idxI && currGhost.location.j === idxJ) {
            var ghost = gGhosts.splice(i, 1)
            gRemoved.push(ghost[0])
            console.log('ghosttttt', ghost)
            console.log(gGhosts)
            // if (!gRemoved[0]) gRemoved[0] = ghost
            // else gRemoved.push(ghost)
            return
        }
    }

}

function victoryCheck() {
    gGame.foodCount = foodLeftCounter() - 1
    if (gGame.foodCount === 0) gameOver()
}

function reviveGhost() {
    gPacman.isSuper = false

    for (var i = 0; i < gRemoved.length; i++) {
        gGhosts.push(gRemoved[i])
    }
    gRemoved = []
}

function cherryAdd() {
    var position = findEmptyCell()
    gBoard[position.i][position.j] = CHERRY
    renderCell(position, CHERRY)
}

