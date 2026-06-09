class reine extends piece {
  constructor(isWhite, posX, posY, img, lines, diags) {
    super("Q", isWhite, posX, posY, img);
    this.lines = lines;
    this.diags = diags;
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
    for (let d of this.diags) {
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