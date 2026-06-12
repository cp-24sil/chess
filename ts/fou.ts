import { piece } from './piece.js';
import { plateau } from './app.js';

export class fou extends piece {
  diags: { dx: number; dy: number }[]
  constructor(isWhite: boolean, posX: number, posY: number, img: HTMLImageElement, diags: Array<{ dx: number, dy: number }>) {
    super("f", isWhite, posX, posY, img);
    this.diags = diags;
  }

  showRoutes(x: number, y: number, isWhiteTurn: boolean) {
    if (this.isWhite !== isWhiteTurn) return;
    for (let d of this.diags) {
      let nx = x + d.dx;
      let ny = y + d.dy;
      while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
        if (plateau[ny]![nx]!.piece === "") {
          this.colorCell(x, y, nx, ny, isWhiteTurn);
        } else {
          const currentPiece = plateau[ny]![nx]!.piece;
          if (currentPiece !== "" && currentPiece.isWhite !== isWhiteTurn) this.colorCell(x, y, nx, ny, isWhiteTurn);
          break;
        }
        nx += d.dx;
        ny += d.dy;
      }
    }
  }
}