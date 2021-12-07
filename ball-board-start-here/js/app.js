var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';
var GLUE = 'GLUE';

var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';

var gBoard;
var gGamerPos;
var gEmptyCells
var gBallCollectCount = 0
var gBallsInGame = 2
var gInterval

function initGame() {
    gGamerPos = { i: 2, j: 9 };
    gBoard = buildBoard();
    renderBoard(gBoard);
    addNewBall()
}

function buildBoard() {
    // Create the Matrix
    var board = createMat(10, 12)


    // Put FLOOR everywhere and WALL at edges
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            // Put FLOOR in a regular cell
            var cell = { type: FLOOR, gameElement: null };

            // Place Walls at edges
            if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
                cell.type = WALL;
            }

            if (i === 5 && j === board[0].length - 1 || i === 5 && j === 0 || i === 0 && j === 6 || i === board.length - 1 && j === 6) {
                cell.type = FLOOR;
            }


            // Add created cell to The game board
            board[i][j] = cell;
        }
    }

    // Place the gamer at selected position
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

    // Place the Balls (currently randomly chosen positions)
    board[3][8].gameElement = BALL;
    board[7][4].gameElement = BALL;


    console.log(board);
    return board;
}

// Render the board to an HTML table
function renderBoard(board) {

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];

            var cellClass = getClassName({ i: i, j: j })

            // TODO - change to short if statement
            // if (currCell.type === FLOOR) cellClass += ' floor';
            // else if (currCell.type === WALL) cellClass += ' wall';
            cellClass += (currCell.type === FLOOR) ? ' floor' : ' wall';

            //TODO - Change To template string
            strHTML += '\t<td class="cell ' + cellClass +
                '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

            // TODO - change to switch case statement
            if (currCell.gameElement === GAMER) {
                strHTML += GAMER_IMG;
            } else if (currCell.gameElement === BALL) {
                strHTML += BALL_IMG;
            }

            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }

    console.log('strHTML is:');
    // console.log(strHTML);
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;


}


// Move the player to a specific location

function moveTo(i, j) {

    var targetCell = gBoard[i][j];
    if (targetCell.type === WALL) return;

    // Calculate distance to make sure we are moving to a neighbor cell
    var iAbsDiff = Math.abs(i - gGamerPos.i);
    var jAbsDiff = Math.abs(j - gGamerPos.j);

    // If the clicked Cell is one of the four allowed
    if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0) || (jAbsDiff === 11 && iAbsDiff === 0) || (iAbsDiff === 9 && jAbsDiff === 0)) {

        if (targetCell.gameElement === BALL) {
            console.log('Collecting!');
            gBallCollectCount++
            ballCollectCount(gBallCollectCount)
            gBallsInGame--

            if (gBallsInGame === 0) {
                gameOver()
            }



        }

        // MOVING from current position
        // Model:
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
        // Dom:
        renderCell(gGamerPos, '');

        // MOVING to selected position
        // Model:
        gGamerPos.i = i;
        gGamerPos.j = j;
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
        // DOM:
        renderCell(gGamerPos, GAMER_IMG);

    } // else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}




// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

    var i = gGamerPos.i;
    var j = gGamerPos.j;


    switch (event.key) {
        case 'ArrowLeft':
            // if (i === 5 && j === 0) moveTo(5, 11)
            if (i === 5 && j === 0) {
                moveTo(i, j + 11)
            } else {
                moveTo(i, j - 1);
            }
            break;
        case 'ArrowRight':
            if (i === 5 && j === 11) {
                moveTo(i, j - 11)
            } else {
                moveTo(i, j + 1);
            }
            break;
        case 'ArrowUp':
            if (i === 0 && j === 6) {
                moveTo(i + 9, j)
            } else {
                moveTo(i - 1, j);
            }
            break;
        case 'ArrowDown':
            if (i === 9 && j === 6) {
                moveTo(i - 9, j)
            } else {
                moveTo(i + 1, j);
            }
            break;

    }

}

// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}


function addNewBall() {
    getEmptyCells(gBoard)
    gInterval = setInterval(function() {
        gBallsInGame++
        // console.log('gBallsInGame:', gBallsInGame);
        var cellForBall = drawCell()
        renderCell(cellForBall, BALL_IMG)
        gBoard[cellForBall.i][cellForBall.j].gameElement = BALL
        if (gBallsInGame === 80) clearInterval(gInterval)
    }, 1000 * 4)
}

function ballCollectCount(balls) {
    var elBallCollectCount = document.querySelector('.counter')
    elBallCollectCount.innerHTML = balls
}



function gameOver() {
    clearInterval(gInterval)
    console.log('game over');
    openModal()
}

function openModal() {

    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'

}

function closeModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'

}

function resetGame(elbtn) {
    closeModal()
    ballCollectCount('')
    gBallCollectCount = 0
    gBallsInGame = 2
    initGame()
}

// glue()

// function glue() {
//     var i = getRandomInt(1, 8)
//     var j = getRandomInt(1, 10)
//     renderCell({ i: i, j: j }, GLUE)



// }

// function unGlue() {}