class tour extends piece {
  constructor(isWhite, posX, posY, img, lines) {
    super("t", isWhite, posX, posY, img);
    this.lines = lines;
    this.hasMoved = false;
  }

  move(posX, posY) {
    if (plateau[posY][posX].colorIndex == "lightblue" || plateau[posY][posX].colorIndex == "lightcoral") {
      plateau[selectedPion.piece.posY][selectedPion.piece.posX].piece = "";
      selectedPion.piece.posX = posX;
      selectedPion.piece.posY = posY;
      plateau[posY][posX].piece = selectedPion.piece;
      this.hasMoved = true;
      enPassantTarget = null;
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

  showRoutes(x, y, isWhiteTurn) {
    if (this.isWhite !== isWhiteTurn) return;
    for (let d of this.lines) {
      let nx = x + d.dx;
      let ny = y + d.dy;
      while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
        if (plateau[ny][nx].piece === "") {
          this.colorCell(x, y, nx, ny, isWhiteTurn);
        } else {
          if (plateau[ny][nx].piece.isWhite !== isWhiteTurn) this.colorCell(x, y, nx, ny, isWhiteTurn);
          break;
        }
        nx += d.dx;
        ny += d.dy;
      }
    }
  }
}