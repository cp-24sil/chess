class roi extends piece {
  constructor(isWhite, posX, posY, img) {
    super("K", isWhite, posX, posY, img);
    this.hasMoved = false;
  }

  move(posX, posY) {
    if (plateau[posY][posX].colorIndex == "lightblue" || plateau[posY][posX].colorIndex == "lightcoral") {
      let fromX = selectedPion.piece.posX;
      let fromY = selectedPion.piece.posY;

      if (Math.abs(posX - fromX) === 2) {
        let rookFromX = posX > fromX ? 7 : 0;
        let rookToX = posX > fromX ? posX - 1 : posX + 1;
        let rookPiece = plateau[fromY][rookFromX].piece;
        plateau[fromY][rookFromX].piece = "";
        plateau[fromY][rookFromX].isWhite = null;
        plateau[fromY][rookToX].piece = rookPiece;
        plateau[fromY][rookToX].isWhite = isWhiteTurn;
        rookPiece.posX = rookToX;
        rookPiece.posY = fromY;
        rookPiece.hasMoved = true;
      }

      plateau[fromY][fromX].piece = "";
      plateau[fromY][fromX].isWhite = null;
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

    const moves = [
      { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
      { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
      { dx: -1, dy: 1 }, { dx: 0, dy: 1 }, { dx: 1, dy: 1 }
    ];

    for (let m of moves) {
      let nx = x + m.dx;
      let ny = y + m.dy;
      if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8) continue;
      if (plateau[ny][nx].piece !== "" && plateau[ny][nx].isWhite === isWhiteTurn) continue;
      this.colorCell(x, y, nx, ny, isWhiteTurn);
    }
    if (!this.hasMoved) {
      this.tryRoque(x, y, isWhiteTurn, 1);
      this.tryRoque(x, y, isWhiteTurn, -1);
    }
  }

  tryRoque(x, y, isWhiteTurn, direction) {
    if (isKingAttacked(x, y, isWhiteTurn)) return;

    let rookX = direction === 1 ? 7 : 0;
    let rookPiece = plateau[y][rookX].piece;
    if (rookPiece === "" || rookPiece.name !== "t" || rookPiece.hasMoved) return;

    let startX = Math.min(x, rookX) + 1;
    let endX = Math.max(x, rookX) - 1;
    for (let i = startX; i <= endX; i++) {
      if (plateau[y][i].piece !== "") return;
    }

    let step = direction;
    for (let i = 1; i <= 2; i++) {
      let checkX = x + step * i;
      plateau[y][x].piece = "";
      plateau[y][checkX].piece = this;
      this.posX = checkX;
      let attacked = isKingAttacked(checkX, y, isWhiteTurn);
      plateau[y][checkX].piece = "";
      plateau[y][x].piece = this;
      this.posX = x;
      if (attacked) return;
    }

    let destX = x + direction * 2;
    plateau[y][destX].colorIndex = "lightblue";
  }
}