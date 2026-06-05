class reine extends piece {
  constructor(isWhite, posX, posY, img) {
    super("Q", isWhite, posX, posY, img);
  }

  showRoutes(x, y, isWhiteTurn) {
    if (this.isWhite !== isWhiteTurn) return;

    const lines = [
      { dx: 0, dy: -1 }, { dx: 0, dy: 1 },
      { dx: -1, dy: 0 }, { dx: 1, dy: 0 }
    ];
    for (let d of lines) {
      let nx = x + d.dx;
      let ny = y + d.dy;
      while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
        if (plateau[ny][nx].piece === "") {
          this.tryMarkCell(x, y, nx, ny, isWhiteTurn);
        } else {
          if (plateau[ny][nx].isWhite !== isWhiteTurn) this.tryMarkCell(x, y, nx, ny, isWhiteTurn);
          break;
        }
        nx += d.dx;
        ny += d.dy;
      }
    }

    const diags = [
      { dx: -1, dy: -1 }, { dx: 1, dy: -1 },
      { dx: -1, dy: 1 },  { dx: 1, dy: 1 }
    ];
    for (let d of diags) {
      let nx = x + d.dx;
      let ny = y + d.dy;
      while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
        if (plateau[ny][nx].piece === "") {
          this.tryMarkCell(x, y, nx, ny, isWhiteTurn);
        } else {
          if (plateau[ny][nx].isWhite !== isWhiteTurn) this.tryMarkCell(x, y, nx, ny, isWhiteTurn);
          break;
        }
        nx += d.dx;
        ny += d.dy;
      }
    }
  }
}