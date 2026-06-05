class tour extends piece {
  constructor(isWhite, posX, posY, img) {
    super("t", isWhite, posX, posY, img);
    this.hasMoved = false;
  }

  move(posX, posY) {
    if (plateau[posY][posX].colorIndex == "lightblue" || plateau[posY][posX].colorIndex == "lightcoral") {
      plateau[selectedPion.piece.posY][selectedPion.piece.posX].piece = "";
      plateau[selectedPion.piece.posY][selectedPion.piece.posX].isWhite = null;
      selectedPion.piece.posX = posX;
      selectedPion.piece.posY = posY;
      plateau[posY][posX].piece = selectedPion.piece;
      plateau[posY][posX].isWhite = isWhiteTurn;
      this.hasMoved = true;
      enPassantTarget = null;
      rebuild();
      isWhiteTurn = !isWhiteTurn;
      checkGameState();
      refresh();
    } else {
      rebuild();
      refresh();
    }
  }

  showRoutes(x, y, isWhiteTurn) {
    if (this.isWhite !== isWhiteTurn) return;
    for (let i = y - 1; i >= 0; i--) {
      if (plateau[i][x].piece === "") {
        this.tryMarkCell(x, y, x, i, isWhiteTurn);
      } else {
        if (plateau[i][x].isWhite !== isWhiteTurn) this.tryMarkCell(x, y, x, i, isWhiteTurn);
        break;
      }
    }
    for (let i = y + 1; i < 8; i++) {
      if (plateau[i][x].piece === "") {
        this.tryMarkCell(x, y, x, i, isWhiteTurn);
      } else {
        if (plateau[i][x].isWhite !== isWhiteTurn) this.tryMarkCell(x, y, x, i, isWhiteTurn);
        break;
      }
    }
    for (let i = x - 1; i >= 0; i--) {
      if (plateau[y][i].piece === "") {
        this.tryMarkCell(x, y, i, y, isWhiteTurn);
      } else {
        if (plateau[y][i].isWhite !== isWhiteTurn) this.tryMarkCell(x, y, i, y, isWhiteTurn);
        break;
      }
    }
    for (let i = x + 1; i < 8; i++) {
      if (plateau[y][i].piece === "") {
        this.tryMarkCell(x, y, i, y, isWhiteTurn);
      } else {
        if (plateau[y][i].isWhite !== isWhiteTurn) this.tryMarkCell(x, y, i, y, isWhiteTurn);
        break;
      }
    }
  }
}