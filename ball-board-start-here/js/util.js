function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function drawCell() {
    var idx = getRandomInt(0, gEmptyCells.length)
    var cell = gEmptyCells[idx]
    gEmptyCells.splice(idx, 1)
    return cell
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getEmptyCells(board) {
    gEmptyCells = []
    for (var i = 1; i < gBoard.length - 1; i++) {

        for (var j = 1; j < gBoard[0].length - 1; j++) {
            if (board[i][j].gameElement === null) {
                var emptyCell = { i: i, j: j }
                gEmptyCells.push(emptyCell)
            }

        }
    }
    return gEmptyCells
}