class pion extends piece {
  hasMoved: boolean;
  constructor(isWhite: boolean, posX: number, posY: number, img: HTMLImageElement) {
    super("p", isWhite, posX, posY, img);
    this.hasMoved = false;
  }

  move(posX: number, posY: number) {
    if (plateau[posY][posX].colorIndex == "lightblue" || plateau[posY][posX].colorIndex == "lightcoral") {
      if (enPassantTarget && posX === enPassantTarget.x && posY === enPassantTarget.y) {
        let capturedY = isWhiteTurn ? posY + 1 : posY - 1;
        plateau[capturedY][posX].piece = "";
      }

      let isDoubleMove = Math.abs(posY - selectedPion.piece.posY) === 2;

      plateau[selectedPion.piece.posY][selectedPion.piece.posX].piece = "";
      plateau[posY][posX].piece = selectedPion.piece;
      selectedPion.piece.posX = posX;
      selectedPion.piece.posY = posY;
      selectedPion.piece.hasMoved = true;

      if (isDoubleMove) {
        enPassantTarget = { x: posX, y: isWhiteTurn ? posY + 1 : posY - 1, pawnY: posY };
      } else {
        enPassantTarget = null;
      }

      if (posY === 0 || posY === 7) {
        plateau[posY][posX].piece = new reine(isWhiteTurn, posX, posY, getQueenImg(isWhiteTurn));
        rebuild();
        refresh();
        checkGameState(!isWhiteTurn);
        return !isWhiteTurn;
      }

      rebuild();
      checkGameState(!isWhiteTurn);
      refresh();
      return !isWhiteTurn;
    } else {
      rebuild();
      refresh();
      return isWhiteTurn;
    }
  }

  showRoutes(x: number, y: number, isWhiteTurn: boolean) {
    if (this.isWhite !== isWhiteTurn) return;

    let dir = this.isWhite ? -1 : 1;
    let startRow = this.isWhite ? 6 : 1;

    if (y + dir >= 0 && y + dir < 8 && plateau[y + dir][x].piece === "") {
      this.colorCell(x, y, x, y + dir, isWhiteTurn);

      if (y === startRow && plateau[y + dir * 2][x].piece === "") {
        this.colorCell(x, y, x, y + dir * 2, isWhiteTurn);
      }
    }

    if (x - 1 >= 0 && y + dir >= 0 && y + dir < 8) {
      if (plateau[y + dir][x - 1].piece !== "" && plateau[y + dir][x - 1].piece.isWhite !== isWhiteTurn) {
        this.colorCell(x, y, x - 1, y + dir, isWhiteTurn);
      }
      if (enPassantTarget && x - 1 === enPassantTarget.x && y + dir === enPassantTarget.y) {
        this.colorCell(x, y, x - 1, y + dir, isWhiteTurn);
      }
    }

    if (x + 1 < 8 && y + dir >= 0 && y + dir < 8) {
      if (plateau[y + dir][x + 1].piece !== "" && plateau[y + dir][x + 1].piece.isWhite !== isWhiteTurn) {
        this.colorCell(x, y, x + 1, y + dir, isWhiteTurn);
      }
      if (enPassantTarget && x + 1 === enPassantTarget.x && y + dir === enPassantTarget.y) {
        this.colorCell(x, y, x + 1, y + dir, isWhiteTurn);
      }
    }
  }
}