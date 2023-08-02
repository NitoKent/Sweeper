const gLevel = {
    SIZE: 4,
    MINES: 2
};

const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

const gBoard = [];

 function onInit() { 
 createBoard();
    renderBoard();
}

function createBoard() {
    const size = gLevel.SIZE;
    const mines = gLevel.MINES;
    const numbers = []
    for (let i = 1; i <= size * size; i++) {
        numbers.push(i);
      }

    gBoard.length = 0; 
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            const cell = {
                row: i,
                col: j,
                isOpen: true,
                isMine: false,
                isMarked: false,
                minesAroundCount: 0,
            
            };
            
            row.push(cell);
        }
        gBoard.push(row);
    }

    placeMines(mines);
    setMinesNegsCount();
}
function renderBoard() {
    let strHTML = '';
    for (let i = 0; i < gLevel.SIZE; i++) {
        strHTML += `<tr>\n`;
        for (let j = 0; j < gLevel.SIZE; j++) {
            const cell = gBoard[i][j];
            const display = cell.collor = "block"
            const className = cell.isMine ? 'mine' : `cell-${i}-${j}` 
            const content = cell.isMine ? "💣" : cell.minesAroundCount || "" 
            const title = `Cell: ${i + 1}, ${j + 1}`;

            strHTML += `\t<td title="${title}" color="${display}" class="${className}" onclick="onCellClicked(this, ${i}, ${j})">
                        ${content}</td>\n`;
        }
       
        strHTML += `</tr>\n`;
    }

    const board = document.getElementById("board");
    board.innerHTML = strHTML;
}
 function onCellClicked(td, i, j) {
    const cell = gBoard[i][j];
   
    if(!cell.isMine && cell.minesAroundCount === 0){
       alert('WINN') 
            
    }

 }

function placeMines(mines) {
    const size = gLevel.SIZE;
    const boardSize = size * size;
    let count = 0;

    while (count < mines) {
        const randomIndex = Math.floor(Math.random() * boardSize);
        const row = Math.floor(randomIndex / size);
        const col = randomIndex % size;

        if (!gBoard[row][col].isMine) {
            gBoard[row][col].isMine = true;
            count++;
        }
    }
}

function setMinesNegsCount() {
    for (let i = 0; i < gLevel.SIZE; i++) {
        for (let j = 0; j < gLevel.SIZE; j++) {
            const cell = gBoard[i][j];
            if (!cell.isMine) {
                cell.minesAroundCount = countMinesAround(cell);
            }
        }
    }
}

function countMinesAround(cell) {
    let count = 0;
    const size = gLevel.SIZE;
    const rowStart = Math.max(0, cell.row - 1);
    const rowEnd = Math.min(size - 1, cell.row + 1);
    const colStart = Math.max(0, cell.col - 1);
    const colEnd = Math.min(size - 1, cell.col + 1);

    for (let i = rowStart; i <= rowEnd; i++) {
        for (let j = colStart; j <= colEnd; j++) {
            if (gBoard[i][j].isMine) {
                count++;
            }
        }
    }

    return count;
}
