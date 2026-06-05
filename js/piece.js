class piece {
  constructor(name, isWhite, posX, posY, img) {
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.isWhite = isWhite;
    this.img = img;
  }

  wouldLeaveKingInCheck(fromX, fromY, toX, toY, isWhiteTurn) {
    let savedSrcPiece = plateau[fromY][fromX].piece;
    let savedSrcIsWhite = plateau[fromY][fromX].isWhite;
    let savedDstPiece = plateau[toY][toX].piece;
    let savedDstIsWhite = plateau[toY][toX].isWhite;

    plateau[toY][toX].piece = savedSrcPiece;
    plateau[toY][toX].isWhite = isWhiteTurn;
    plateau[fromY][fromX].piece = "";
    plateau[fromY][fromX].isWhite = null;

    if (savedSrcPiece.name !== "K") {
      savedSrcPiece.posX = toX;
      savedSrcPiece.posY = toY;
    }

    let kingX = -1, kingY = -1;
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (plateau[y][x].piece !== "" && plateau[y][x].piece.name === "K" && plateau[y][x].piece.isWhite === isWhiteTurn) {
          kingX = x; kingY = y; break;
        }
      }
      if (kingX !== -1) break;
    }

    let inCheck = false;
    if (kingX !== -1) {
      inCheck = isKingAttacked(kingX, kingY, isWhiteTurn);
    }

    plateau[fromY][fromX].piece = savedSrcPiece;
    plateau[fromY][fromX].isWhite = savedSrcIsWhite;
    plateau[toY][toX].piece = savedDstPiece;
    plateau[toY][toX].isWhite = savedDstIsWhite;

    if (savedSrcPiece.name !== "K") {
      savedSrcPiece.posX = fromX;
      savedSrcPiece.posY = fromY;
    }

    return inCheck;
  }

  tryMarkCell(fromX, fromY, toX, toY, isWhiteTurn) {
    if (this.wouldLeaveKingInCheck(fromX, fromY, toX, toY, isWhiteTurn)) return;
    if (plateau[toY][toX].piece !== "" && plateau[toY][toX].piece.isWhite !== isWhiteTurn) {
      plateau[toY][toX].colorIndex = "lightcoral";
    } else {
      plateau[toY][toX].colorIndex = "lightblue";
    }
  }

  move(posX, posY) {
    if (plateau[posY][posX].colorIndex == "lightblue" || plateau[posY][posX].colorIndex == "lightcoral") {
      plateau[selectedPion.piece.posY][selectedPion.piece.posX].piece = "";
      plateau[selectedPion.piece.posY][selectedPion.piece.posX].isWhite = null;
      selectedPion.piece.posX = posX;
      selectedPion.piece.posY = posY;
      plateau[posY][posX].piece = selectedPion.piece;
      plateau[posY][posX].isWhite = isWhiteTurn;
      rebuild();
      isWhiteTurn = !isWhiteTurn;
      checkGameState();
      refresh();
    } else {
      rebuild();
      refresh();
    }
  }
}