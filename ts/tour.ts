import { piece } from './piece.js';
import * as app from './app.js';

export class tour extends piece {
  lines: { dx: number, dy: number }[];
  hasMoved: boolean;
  constructor(isWhite: boolean, posX: number, posY: number, img: HTMLImageElement, lines: { dx: number, dy: number }[]) {
    super("t", isWhite, posX, posY, img);
    this.lines = lines;
    this.hasMoved = false;
  }

  move(posX: number, posY: number) {
    if (app.plateau[posY]![posX]!.colorIndex == "lightblue" || app.plateau[posY]![posX]!.colorIndex == "lightcoral") {
      app.plateau[app.selectedPion!.piece.posY]![app.selectedPion!.piece.posX]!.piece = "";
      app.selectedPion!.piece.posX = posX;
      app.selectedPion!.piece.posY = posY;
      app.plateau[posY]![posX]!.piece = app.selectedPion!.piece;
      this.hasMoved = true;
      app.setEnPassantTarget(null);
      app.rebuild();
      app.checkGameState(!app.isWhiteTurn);
      app.refresh();
      return !app.isWhiteTurn;
    } else {
      app.rebuild();
      app.refresh();
      return app.isWhiteTurn;
    }
  }

  showRoutes(x: number, y: number, isWhiteTurn: boolean) {
    if (this.isWhite !== isWhiteTurn) return;
    for (let d of this.lines) {
      let nx = x + d.dx;
      let ny = y + d.dy;
      while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
        if (app.plateau[ny]![nx]!.piece === "") {
          this.colorCell(x, y, nx, ny, isWhiteTurn);
        } else {
          const currentPiece = app.plateau[ny]![nx]!.piece;
          if (currentPiece !== "" && currentPiece.isWhite !== isWhiteTurn) this.colorCell(x, y, nx, ny, isWhiteTurn);
          break;
        }
        nx += d.dx;
        ny += d.dy;
      }
    }
  }
}