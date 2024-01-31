function generateBattleshipBoard() {
    const boardSize = 10;
    const emptyBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill('~'));

    const ships = [
        { size: 4, quantity: 1 },
        { size: 3, quantity: 2 },
        { size: 2, quantity: 3 },
        { size: 1, quantity: 4 }
    ];

    for (const ship of ships) {
        for (let i = 0; i < ship.quantity; i++) {
            placeShip(emptyBoard, ship.size);
        }
    }

    return emptyBoard;
}

function isValidPlacement(board, row, col, size, orientation) {
    const isInsideBoard = (i, j) => i >= 0 && i < board.length && j >= 0 && j < board[0].length;
    const isCellEmpty = (i, j) => board[i][j] === '~';

    if (orientation === 'horizontal') {
        return Array.from({ length: size + 2 }).every((_, i) => 
            isInsideBoard(row, col + i - 1) && isCellEmpty(row, col + i - 1)
        );
    } else {
        return Array.from({ length: size + 2 }).every((_, i) =>
            isInsideBoard(row + i - 1, col) && isCellEmpty(row + i - 1, col)
        );
    }
}

function placeShip(board, size) {
    while (true) {
        const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';

        let row, col;
        if (orientation === 'horizontal') {
            row = Math.floor(Math.random() * board.length);
            col = Math.floor(Math.random() * (board[0].length - size + 1));
        } else {
            row = Math.floor(Math.random() * (board.length - size + 1));
            col = Math.floor(Math.random() * board[0].length);
        }

        if (isValidPlacement(board, row, col, size, orientation)) {
            if (orientation === 'horizontal') {
                for (let i = 0; i < size; i++) {
                    board[row][col + i] = 'X';
                }
            } else {
                for (let i = 0; i < size; i++) {
                    board[row + i][col] = 'X';
                }
            }
            break;
        }
    }
}

function printBoard(board) {
    for (const row of board) {
        console.log(row.join(' '));
    }
}

const battleshipBoard = generateBattleshipBoard();
printBoard(battleshipBoard);
