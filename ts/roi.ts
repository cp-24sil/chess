class roi extends piece {
  moves: { dx: number, dy: number }[];
  hasMoved: boolean;
  constructor(isWhite: boolean, posX: number, posY: number, img: HTMLImageElement, moves: { dx: number, dy: number }[]) {
    super("K", isWhite, posX, posY, img);
    this.moves = moves;
    this.hasMoved = false;
  }

  move(posX: number, posY: number) {
    if (plateau[posY][posX].colorIndex == "lightblue" || plateau[posY][posX].colorIndex == "lightcoral") {
      let fromX = selectedPion.piece.posX;
      let fromY = selectedPion.piece.posY;

      if (Math.abs(posX - fromX) === 2) {
        let rookFromX = posX > fromX ? 7 : 0;
        let rookToX = posX > fromX ? posX - 1 : posX + 1;
        let rookPiece = plateau[fromY][rookFromX].piece;
        plateau[fromY][rookFromX].piece = "";
        plateau[fromY][rookToX].piece = rookPiece;
        rookPiece.posX = rookToX;
        rookPiece.posY = fromY;
        rookPiece.hasMoved = true;
      }

      plateau[fromY][fromX].piece = "";
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
    for (let m of this.moves) {
      let nx = x + m.dx;
      let ny = y + m.dy;
      if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8) continue;
      if (plateau[ny][nx].piece !== "" && plateau[ny][nx].piece.isWhite === isWhiteTurn) continue;
      this.colorCell(x, y, nx, ny, isWhiteTurn);
    }
    if (!this.hasMoved) {
      this.tryRoque(x, y, isWhiteTurn, 1);
      this.tryRoque(x, y, isWhiteTurn, -1);
    }
  }

  tryRoque(x: number, y: number, isWhiteTurn: boolean, direction: number) {
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