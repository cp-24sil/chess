class tour extends piece {
  constructor(isWhite, posX, posY) {
    super(name = "t", isWhite, posX, posY);
  }

  showRoutes(x, y, isWhiteTurn) {
    for (let i = y; i > 0; i--) {
      if (selectedPion.piece.isWhite == isWhiteTurn)
        if (plateau[i - 1][x].piece === "")
          plateau[i - 1][x].colorIndex = "lightblue";
        else if (plateau[i - 1][x].isWhite !== selectedPion.piece.isWhite) {
          plateau[i - 1][x].colorIndex = "lightcoral";
          if(plateau[i - 1][x].isWhite !== selectedPion.piece.isWhite && plateau[i-1][x].piece.name === "K"){
            isKinChess = true;
          }
          break;
        }
        else {
          break;
        }
    }
    for (let i = y + 1; i < 8; i++) {
      if (selectedPion.piece.isWhite == isWhiteTurn)
        if (plateau[i][x].piece === "")
          plateau[i][x].colorIndex = "lightblue";
        else if (plateau[i][x].isWhite !== selectedPion.piece.isWhite) {
          plateau[i][x].colorIndex = "lightcoral";
          if(plateau[i][x].isWhite !== selectedPion.piece.isWhite && plateau[i-1][x].piece.name === "K"){
            isKinChess = true;
          }
          break;
        }
        else {
          break;
        }
    }
    for (let i = x; i > 0; i--) {
      if (selectedPion.piece.isWhite == isWhiteTurn)
        if (plateau[y][i - 1].piece === "")
          plateau[y][i - 1].colorIndex = "lightblue";
        else if (plateau[y][i - 1].isWhite !== selectedPion.piece.isWhite) {
          plateau[y][i - 1].colorIndex = "lightcoral";
          if(plateau[y][i-1].isWhite !== selectedPion.piece.isWhite && plateau[y][i-1].piece.name === "K"){
            isKinChess = true;
          }
          break;
        }
        else {
          break;
        }
    }
    for (let i = x + 1; i < 8; i++) {
      if (selectedPion.piece.isWhite == isWhiteTurn)
        if (plateau[y][i].piece === "")
          plateau[y][i].colorIndex = "lightblue";
        else if (plateau[y][i].isWhite !== selectedPion.piece.isWhite) {
          plateau[y][i].colorIndex = "lightcoral";
          if(plateau[y][i].isWhite !== selectedPion.piece.isWhite && plateau[y][i].piece.name === "K"){
            isKinChess = true;
          }
          break;
        }
        else {
          break;
        }
    }
  }
}