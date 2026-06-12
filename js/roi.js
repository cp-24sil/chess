import { piece } from './piece.js';
import * as app from './app.js';
export class roi extends piece {
    // hasMoved: boolean;
    constructor(isWhite, posX, posY, img, moves) {
        super("K", isWhite, posX, posY, img);
        this.moves = moves;
        // this.hasMoved = false;
    }
    move(posX, posY) {
        if (app.plateau[posY][posX].colorIndex == "lightblue" || app.plateau[posY][posX].colorIndex == "lightcoral") {
            let fromX = app.selectedPion.piece.posX;
            let fromY = app.selectedPion.piece.posY;
            if (Math.abs(posX - fromX) === 2) {
                let rookFromX = posX > fromX ? 7 : 0;
                let rookToX = posX > fromX ? posX - 1 : posX + 1;
                let rookPiece = app.plateau[fromY][rookFromX].piece;
                app.plateau[fromY][rookFromX].piece = "";
                app.plateau[fromY][rookToX].piece = rookPiece;
                if (rookPiece !== "") {
                    rookPiece.posX = rookToX;
                    rookPiece.posY = fromY;
                    rookPiece.hasMoved = true;
                }
            }
            app.plateau[fromY][fromX].piece = "";
            app.selectedPion.piece.posX = posX;
            app.selectedPion.piece.posY = posY;
            app.plateau[posY][posX].piece = app.selectedPion.piece;
            this.hasMoved = true;
            app.setEnPassantTarget(null);
            app.rebuild();
            app.checkGameState(!app.isWhiteTurn);
            app.refresh();
            return !app.isWhiteTurn;
        }
        else {
            app.rebuild();
            app.refresh();
            return app.isWhiteTurn;
        }
    }
    showRoutes(x, y, isWhiteTurn) {
        if (this.isWhite !== isWhiteTurn)
            return;
        for (let m of this.moves) {
            let nx = x + m.dx;
            let ny = y + m.dy;
            if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8)
                continue;
            if (app.plateau[ny][nx].piece !== "" && app.plateau[ny][nx].piece.isWhite === isWhiteTurn)
                continue;
            this.colorCell(x, y, nx, ny, isWhiteTurn);
        }
        if (!this.hasMoved) {
            this.tryRoque(x, y, isWhiteTurn, 1);
            this.tryRoque(x, y, isWhiteTurn, -1);
        }
    }
    tryRoque(x, y, isWhiteTurn, direction) {
        if (app.isKingAttacked(x, y, isWhiteTurn))
            return;
        let rookX = direction === 1 ? 7 : 0;
        let rookPiece = app.plateau[y][rookX].piece;
        if (rookPiece === "" || rookPiece.name !== "t" || rookPiece.hasMoved)
            return;
        let startX = Math.min(x, rookX) + 1;
        let endX = Math.max(x, rookX) - 1;
        for (let i = startX; i <= endX; i++) {
            if (app.plateau[y][i].piece !== "")
                return;
        }
        let step = direction;
        for (let i = 1; i <= 2; i++) {
            let checkX = x + step * i;
            app.plateau[y][x].piece = "";
            app.plateau[y][checkX].piece = this;
            this.posX = checkX;
            let attacked = app.isKingAttacked(checkX, y, isWhiteTurn);
            app.plateau[y][checkX].piece = "";
            app.plateau[y][x].piece = this;
            this.posX = x;
            if (attacked)
                return;
        }
        let destX = x + direction * 2;
        app.plateau[y][destX].colorIndex = "lightblue";
    }
}
//# sourceMappingURL=roi.js.map