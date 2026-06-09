import { piece } from './piece';

export class cavalier extends piece {
  moves: { dx: number, dy: number }[];
  constructor(isWhite: boolean, posX: number, posY: number, img: HTMLImageElement, moves: Array<{ dx: number, dy: number }>) {
    super("c", isWhite, posX, posY, img);
    this.moves = moves;
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
  }
}

