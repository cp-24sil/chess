class reine extends piece{
  constructor(isWhite, posX, posY, img) {
    super("Q", isWhite, posX, posY, img);
  }
  showRoutes(x, y, isWhiteTurn) {
    let Qa = x;
    let Qb = y;
    canA = true;
    canB = true;
    canC = true;
    canD = true;
    for (let i = Qb; i > 0; i--) {
      if (selectedPion.piece.isWhite == isWhiteTurn)
        if (plateau[i - 1][Qa].piece === "")
          plateau[i - 1][Qa].colorIndex = "lightblue";
        else if (plateau[i - 1][Qa].isWhite !== selectedPion.piece.isWhite) {
          plateau[i - 1][Qa].colorIndex = "lightcoral";
          break;
        }
        else {
          break;
        }
    }
    for (let i = Qb + 1; i < 8; i++) {
      if (selectedPion.piece.isWhite == isWhiteTurn)
        if (plateau[i][Qa].piece === "")
          plateau[i][Qa].colorIndex = "lightblue";
        else if (plateau[i][Qa].isWhite !== selectedPion.piece.isWhite) {
          plateau[i][Qa].colorIndex = "lightcoral";
          break;
        }
        else {
          break;
        }
    }
    for (let i = Qa; i > 0; i--) {
      if (selectedPion.piece.isWhite == isWhiteTurn)
        if (plateau[Qb][i - 1].piece === "")
          plateau[Qb][i - 1].colorIndex = "lightblue";
        else if (plateau[Qb][i - 1].isWhite !== selectedPion.piece.isWhite) {
          plateau[Qb][i - 1].colorIndex = "lightcoral";
          break;
        }
        else {
          break;
        }
    }
    for (let i = Qa + 1; i < 8; i++) {
      if (selectedPion.piece.isWhite == isWhiteTurn)
        if (plateau[Qb][i].piece === "")
          plateau[Qb][i].colorIndex = "lightblue";
        else if (plateau[Qb][i].isWhite !== selectedPion.piece.isWhite) {
          plateau[Qb][i].colorIndex = "lightcoral";
          break;
        }
        else {
          break;
        }
    }
    canA = true;
    canB = true;
    canC = true;
    canD = true;
    if (selectedPion.piece.isWhite === isWhiteTurn) {
      for (let i = 1; i < 8; i++) {
        if (Qb - i >= 0) {
          if (Qa - i >= 0)
            if ((plateau[Qb - i][Qa - i].piece === "" || plateau[Qb - i][Qa - i].isWhite != isWhiteTurn) && canA === true) {
              plateau[Qb - i][Qa - i].colorIndex = "lightblue";
              if (plateau[Qb - i][Qa - i].piece !== "" && plateau[Qb - i][Qa - i].isWhite != isWhiteTurn) {
                plateau[Qb - i][Qa - i].colorIndex = "lightcoral";
                canA = false;
              }
            }
            else canA = false;
          if (Qa + i < 8)
            if ((plateau[Qb - i][Qa + i].piece === "" || plateau[Qb - i][Qa + i].isWhite != isWhiteTurn) && canB === true) {
              plateau[Qb - i][Qa + i].colorIndex = "lightblue";
              if (plateau[Qb - i][Qa + i].piece !== "" && plateau[Qb - i][Qa + i].isWhite != isWhiteTurn) {
                plateau[Qb - i][Qa + i].colorIndex = "lightcoral";
                canB = false;
              }
            }
            else canB = false;
        }
        if (Qb + i < 8) {
          if (Qa - i >= 0)
            if ((plateau[Qb + i][Qa - i].piece === "" || plateau[Qb + i][Qa - i].isWhite != isWhiteTurn) && canC === true) {
              plateau[Qb + i][Qa - i].colorIndex = "lightblue";
              if (plateau[Qb + i][Qa - i].piece !== "" && plateau[Qb + i][Qa - i].isWhite != isWhiteTurn) {
                plateau[Qb + i][Qa - i].colorIndex = "lightcoral";
                canC = false;
              }
            }
            else canC = false;
          if (Qa + i < 8)
            if ((plateau[Qb + i][Qa + i].piece === "" || plateau[Qb + i][Qa + i].isWhite != isWhiteTurn) && canD === true) {
              plateau[Qb + i][Qa + i].colorIndex = "lightblue";
              if (plateau[Qb + i][Qa + i].piece !== "" && plateau[Qb + i][Qa + i].isWhite != isWhiteTurn) {
                plateau[Qb + i][Qa + i].colorIndex = "lightcoral";
                canD = false
              }
            }
            else canD = false;
        }
      }
    } else {
      rebuild();
      refresh();
    }
  }
}