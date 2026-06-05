class cavalier extends piece {
  constructor(isWhite, posX, posY, img) {
    super("c", isWhite, posX, posY, img);
  }

  showRoutes(x, y, isWhiteTurn) {
    if (this.isWhite !== isWhiteTurn) return;

    const moves = [
      { dx: -2, dy: -1 }, { dx: -2, dy: 1 },
      { dx: 2, dy: -1 },  { dx: 2, dy: 1 },
      { dx: -1, dy: -2 }, { dx: -1, dy: 2 },
      { dx: 1, dy: -2 },  { dx: 1, dy: 2 }
    ];

    for (let m of moves) {
      let nx = x + m.dx;
      let ny = y + m.dy;
      if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8) continue;
      if (plateau[ny][nx].piece !== "" && plateau[ny][nx].isWhite === isWhiteTurn) continue;
      this.tryMarkCell(x, y, nx, ny, isWhiteTurn);
    }
  }
}