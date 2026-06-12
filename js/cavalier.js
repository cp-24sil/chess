import { piece } from './piece.js';
import { plateau } from './app.js';
export class cavalier extends piece {
    constructor(isWhite, posX, posY, img, moves) {
        super("c", isWhite, posX, posY, img);
        this.moves = moves;
    }
    showRoutes(x, y, isWhiteTurn) {
        if (this.isWhite !== isWhiteTurn)
            return;
        for (let m of this.moves) {
            let nx = x + m.dx;
            let ny = y + m.dy;
            if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8)
                continue;
            const currentPiece = plateau[ny][nx].piece;
            if (currentPiece !== "" && currentPiece.isWhite === isWhiteTurn)
                continue;
            this.colorCell(x, y, nx, ny, isWhiteTurn);
        }
    }
}
//# sourceMappingURL=cavalier.js.map