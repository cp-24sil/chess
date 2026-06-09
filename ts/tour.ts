class tour extends piece {
  lines: { dx: number, dy: number }[];
  hasMoved: boolean;
  constructor(isWhite: boolean, posX: number, posY: number, img: HTMLImageElement, lines: { dx: number, dy: number }[]) {
    super("t", isWhite, posX, posY, img);
    this.lines = lines;
    this.hasMoved = false;
  }

  move(posX: number, posY: number) {
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

  showRoutes(x: number, y: number, isWhiteTurn: boolean) {
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