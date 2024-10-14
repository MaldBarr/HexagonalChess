
export default class Figure {
    constructor (color, type, img, position) {
        this.color = color;
        this.type = type;
        this.img = img;
        this.position = position;
    }

    getFigureLegalMoves(board, enemyFigures) {
        let availablePositions = this.getDefaultMoves(board);
        availablePositions = availablePositions.filter(potentialPositon => {
            const boardCopy = [...board].map(square => Object.create(square)); //Copia del tablero
            const enemyFiguresCopy = enemyFigures.filter(fig => fig.position !== potentialPositon); // Remover figuras capturadas por este movimiento
            boardCopy[this.position - 1].occupiedBy = null;
            boardCopy[potentialPositon - 1].occupiedBy = this;
            return !this.enemyCouldCheck(boardCopy, enemyFiguresCopy);
        });
        return availablePositions;
    }

    canPromote() {
        return ((this.type === 'pawn' && this.type === 'white' && (this.position < 11)) || (this.type === 'pawn' && this.type === 'black' && (this.position === 56 || this.position === 67 || this.position === 76 || this.position === 83 || this.position === 88 || this.position === 91 || this.position === 90 || this.position === 87 || this.position === 82 || this.position === 75 || this.position === 66)));
    }

    seeIfCheck(board, fig = this) {
        const nextPositions = fig.getDefaultMoves(board);
        for (const position of nextPositions) {
            if (board[position - 1].occupiedBy?.type === 'king') return position;
        };
        return -1;
    }

    enemyCouldCheck(board, enemyFigures) {
        for (const fig of enemyFigures) {
            if (this.seeIfCheck(board, fig) !== -1) return true;
        }
        return false;
    }

    getDefaultMoves(board) {
        if (this.type === 'pawn') return this.getPawnMoves(board);
        if (this.type === 'knight') return this.getKnightMoves(board);
        if (this.type === 'rook') return [...this.getHorizontalMoves(board), ...this.getVerticalMoves(board)];
        if (this.type === 'bishop') return this.getDiagonalMoves(board);
        return [...this.getDiagonalMoves(board), ...this.getVerticalMoves(board), ...this.getHorizontalMoves(board)];
    }

    getVerticalMoves(board) {
        return [
            ...this.getAvailableSquares(board, 11),
            ...this.getAvailableSquares(board, -11),
        ];
    }

    getHorizontalMoves(board) {
        let rightMoves = this.getAvailableSquares(board, 1, true);
        let leftMoves = this.getAvailableSquares(board, -1, true);
        // If figure is on the border it shouldn't go in the direction of said border
        if (eighthCol.includes(this.position)) rightMoves = [];
        if (firstCol.includes(this.position) ) leftMoves = [];
        return [...rightMoves, ...leftMoves];
    }

    getDiagonalMoves(board) {
        const moves = [];
        if (!firstCol.includes(this.position)) {
            moves.push(...this.getAvailableSquares(board, -9, true));
            moves.push(...this.getAvailableSquares(board, 7, true));
        }
        if (!eighthCol.includes(this.position))  {
            moves.push(...this.getAvailableSquares(board, 9, true));
            moves.push(...this.getAvailableSquares(board, -7, true));
        }
        return moves;
    }

    getAvailableSquares(board, difference, goingSideways = false) {
        const moves = [];
        let nextPosition = this.position + difference;

        while (nextPosition < 92 && nextPosition > 0) {
            const squareIsFree = board[nextPosition - 1].occupiedBy === null;
            const enemyIsOnSquare = (board[nextPosition - 1].occupiedBy && board[nextPosition - 1].occupiedBy.color !== this.color);
            if (squareIsFree || enemyIsOnSquare) moves.push(nextPosition);
            else break;
            // El rey solo puede mover una casilla y si hay una casilla ocupada no debemos continuar.
            if (this.type === 'king' || enemyIsOnSquare) break;
            // Impide saltar a la siguiente fila.
            if (goingSideways && (firstCol.includes(nextPosition) || eighthCol.includes(nextPosition))) break;
            nextPosition += difference;
        }
        return moves;
    }

    getPawnMoves(board) {
        const moves = [];
        const isBlack = this.color === 'black';
        const nextPosFwd = this.position + (isBlack ? 11 : -11);
        const secondPosFwd = this.position + (isBlack ? 22 : -22);
        const nextPosLeft = this.position + (isBlack ? 9 : -9);
        const nextPosRight = this.position + (isBlack ? 7 : -7);
        const enemyIsOnLeftSquare = (board[nextPosLeft - 1]?.occupiedBy && board[nextPosLeft - 1].occupiedBy.color !== this.color);
        const enemyIsOnRightSquare = (board[nextPosRight - 1]?.occupiedBy && board[nextPosRight - 1].occupiedBy.color !== this.color);

        if (enemyIsOnLeftSquare) moves.push(nextPosLeft);
        if (enemyIsOnRightSquare) moves.push(nextPosRight);
        if (!board[nextPosFwd - 1].occupiedBy) moves.push(nextPosFwd);
        if (!this.lastPosition && !board[secondPosFwd - 1].occupiedBy && !board[nextPosFwd - 1].occupiedBy) moves.push(secondPosFwd);

        return moves;
    }

}