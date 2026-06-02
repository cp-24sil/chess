class cavalier extends piece {
  constructor(isWhite, posX, posY, img) {
    super("c", isWhite, posX, posY, img);
  }
  showRoutes(x, y, isWhiteTurn) {
    if (selectedPion.piece.isWhite === isWhiteTurn) {
      if (y - 2 >= 0) {
        if (x - 1 >= 0)
          if (plateau[y - 2][x - 1].piece === "" || plateau[y - 2][x - 1].isWhite !== selectedPion.piece.isWhite) {
            plateau[y - 2][x - 1].colorIndex = "lightblue";
            if (plateau[y - 2][x - 1].piece !== "" && plateau[y - 2][x - 1].isWhite !== selectedPion.piece.isWhite) {
              plateau[y - 2][x - 1].colorIndex = "lightcoral";
            }
          }
        if (x + 1 < 8)
          if (plateau[y - 2][x + 1].piece === "" || plateau[y - 2][x + 1].isWhite !== selectedPion.piece.isWhite) {
            plateau[y - 2][x + 1].colorIndex = "lightblue";
            if (plateau[y - 2][x + 1].piece !== "" && plateau[y - 2][x + 1].isWhite !== selectedPion.piece.isWhite) {
              plateau[y - 2][x + 1].colorIndex = "lightcoral";
            }
          }
      }
      if (y - 1 >= 0) {
        if (x - 2 >= 0)
          if (plateau[y - 1][x - 2].piece === "" || plateau[y - 1][x - 2].isWhite !== selectedPion.piece.isWhite) {
            plateau[y - 1][x - 2].colorIndex = "lightblue";
            if (plateau[y - 1][x - 2].piece !== "" && plateau[y - 1][x - 2].isWhite !== selectedPion.piece.isWhite) {
              plateau[y - 1][x - 2].colorIndex = "lightcoral";
            }
          }
        if (x + 2 < 8)
          if (plateau[y - 1][x + 2].piece === "" || plateau[y - 1][x + 2].isWhite !== selectedPion.piece.isWhite) {
            plateau[y - 1][x + 2].colorIndex = "lightblue";
            if (plateau[y - 1][x + 2].piece !== "" && plateau[y - 1][x + 2].isWhite !== selectedPion.piece.isWhite) {
              plateau[y - 1][x + 2].colorIndex = "lightcoral";
            }
          }
      }
      if (y + 1 < 8) {
        if (x + 2 < 8)
          if (plateau[y + 1][x + 2].piece === "" || plateau[y + 1][x + 2].isWhite !== selectedPion.piece.isWhite) {
            plateau[y + 1][x + 2].colorIndex = "lightblue";
            if (plateau[y + 1][x + 2].piece !== "" && plateau[y + 1][x + 2].isWhite !== selectedPion.piece.isWhite) {
              plateau[y + 1][x + 2].colorIndex = "lightcoral";
            }
          }
        if (x - 2 >= 0)
          if (plateau[y + 1][x - 2].piece === "" || plateau[y + 1][x - 2].isWhite !== selectedPion.piece.isWhite) {
            plateau[y + 1][x - 2].colorIndex = "lightblue";
            if (plateau[y + 1][x - 2].piece !== "" && plateau[y + 1][x - 2].isWhite !== selectedPion.piece.isWhite) {
              plateau[y + 1][x - 2].colorIndex = "lightcoral";
            }
          }
      }
      if (y + 2 < 8) {
        if (x - 1 >= 0)
          if (plateau[y + 2][x - 1].piece === "" || plateau[y + 2][x - 1].isWhite !== selectedPion.piece.isWhite) {
            plateau[y + 2][x - 1].colorIndex = "lightblue";
            if (plateau[y + 2][x - 1].piece !== "" && plateau[y + 2][x - 1].isWhite !== selectedPion.piece.isWhite) {
              plateau[y + 2][x - 1].colorIndex = "lightcoral";
            }
          }
        if (x + 1 < 8)
          if (plateau[y + 2][x + 1].piece === "" || plateau[y + 2][x + 1].isWhite !== selectedPion.piece.isWhite) {
            plateau[y + 2][x + 1].colorIndex = "lightblue";
            if (plateau[y + 2][x + 1].piece !== "" && plateau[y + 2][x + 1].isWhite !== selectedPion.piece.isWhite) {
              plateau[y + 2][x + 1].colorIndex = "lightcoral";
            }
          }
      }
    } else {
      rebuild();
      refresh();
    }
  }
}