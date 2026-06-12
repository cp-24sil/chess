import { plateau, isKingAttacked, selectedPion, isWhiteTurn, rebuild, refresh, checkGameState } from './app.js';

export class piece {
  name: string;
  posX: number;
  posY: number;
  isWhite: boolean;
  img: HTMLImageElement;
  hasMoved: boolean = false;
  constructor(name: string, isWhite: boolean, posX: number, posY: number, img: HTMLImageElement) {
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.isWhite = isWhite;
    this.img = img;
  }

  wouldLeaveKingInCheck(fromX: number, fromY: number, toX: number, toY: number, isWhiteTurn: boolean) {
    let savedSrcPiece = plateau[fromY]![fromX]!.piece;
    let savedDstPiece = plateau[toY]![toX]!.piece;

    plateau[toY]![toX]!.piece = savedSrcPiece;
    plateau[fromY]![fromX]!.piece = "";

    if (savedSrcPiece === "") return false;

    if (savedSrcPiece.name !== "K") {
      savedSrcPiece.posX = toX;
      savedSrcPiece.posY = toY;
    }

    let kingX = -1;
    let kingY = -1;
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const currentPiece = plateau[y]![x]!.piece;
        if (currentPiece !== "" && currentPiece.name === "K" && currentPiece.isWhite === isWhiteTurn) {
          kingX = x; kingY = y; break;
        }
      }
      if (kingX !== -1) break;
    }

    let inCheck = false;
    if (kingX !== -1) {
      inCheck = isKingAttacked(kingX, kingY, isWhiteTurn);
    }

    plateau[fromY]![fromX]!.piece = savedSrcPiece;
    plateau[toY]![toX]!.piece = savedDstPiece;

    if (savedSrcPiece.name !== "K") {
      savedSrcPiece.posX = fromX;
      savedSrcPiece.posY = fromY;
    }

    return inCheck;
  }

  colorCell(fromX: number, fromY: number, toX: number, toY: number, isWhiteTurn: boolean) {
    if (this.wouldLeaveKingInCheck(fromX, fromY, toX, toY, isWhiteTurn)) return;
    if (plateau[toY]![toX]!.piece !== "" && plateau[toY]![toX]!.piece.isWhite !== isWhiteTurn) {
      plateau[toY]![toX]!.colorIndex = "lightcoral";
    } else {
      plateau[toY]![toX]!.colorIndex = "lightblue";
    }
  }

  move(posX: number, posY: number) {
    if (plateau[posY]![posX]!.colorIndex == "lightblue" || plateau[posY]![posX]!.colorIndex == "lightcoral") {
      plateau[selectedPion!.piece.posY]![selectedPion!.piece.posX]!.piece = "";
      selectedPion!.piece.posX = posX;
      selectedPion!.piece.posY = posY;
      plateau[posY]![posX]!.piece = selectedPion!.piece;
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
}