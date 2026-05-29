class fou extends piece {
  constructor(isWhite, posX, posY) {
    super(name = "f", isWhite, posX, posY);
  }
  showRoutes(x, y, isWhiteTurn) {
    let Fa = x;
    let Fb = y;
    canA = true;
    canB = true;
    canC = true;
    canD = true;
    if (selectedPion.piece.isWhite === isWhiteTurn) {
      for (let i = 1; i < 8; i++) {
        if (Fb - i >= 0) {
          if (Fa - i >= 0)
            if ((plateau[Fb - i][Fa - i].piece === "" || plateau[Fb - i][Fa - i].isWhite != isWhiteTurn) && canA === true) {
              plateau[Fb - i][Fa - i].colorIndex = "lightblue";
              if (plateau[Fb - i][Fa - i].piece !== "" && plateau[Fb - i][Fa - i].isWhite != isWhiteTurn) {
                plateau[Fb - i][Fa - i].colorIndex = "lightcoral";
                canA = false;
                if (plateau[Fb - i][Fa - i].piece === "K" && plateau[Fb - i][Fa - i].isWhite != isWhiteTurn) {
                  isKinChess = true;
                }
              }
            }
            else canA = false;
          if (Fa + i < 8)
            if ((plateau[Fb - i][Fa + i].piece === "" || plateau[Fb - i][Fa + i].isWhite != isWhiteTurn) && canB === true) {
              plateau[Fb - i][Fa + i].colorIndex = "lightblue";
              if (plateau[Fb - i][Fa + i].piece !== "" && plateau[Fb - i][Fa + i].isWhite != isWhiteTurn) {
                plateau[Fb - i][Fa + i].colorIndex = "lightcoral";
                canB = false;
                if (plateau[Fb - i][Fa + i].piece !== "" && plateau[Fb - i][Fa + i].isWhite != isWhiteTurn) {
                  isKinChess = true;
                }
              }
            }
            else canB = false;
        }
        if (Fb + i < 8) {
          if (Fa - i >= 0)
            if ((plateau[Fb + i][Fa - i].piece === "" || plateau[Fb + i][Fa - i].isWhite != isWhiteTurn) && canC === true) {
              plateau[Fb + i][Fa - i].colorIndex = "lightblue";
              if (plateau[Fb + i][Fa - i].piece !== "" && plateau[Fb + i][Fa - i].isWhite != isWhiteTurn) {
                plateau[Fb + i][Fa - i].colorIndex = "lightcoral";
                canC = false;
                if(plateau[Fb + i][Fa - i].piece !== "" && plateau[Fb + i][Fa - i].isWhite != isWhiteTurn){
                  isKinChess = true;
                }
              }
            }
            else canC = false;
          if (Fa + i < 8)
            if ((plateau[Fb + i][Fa + i].piece === "" || plateau[Fb + i][Fa + i].isWhite != isWhiteTurn) && canD === true) {
              plateau[Fb + i][Fa + i].colorIndex = "lightblue";
              if (plateau[Fb + i][Fa + i].piece !== "" && plateau[Fb + i][Fa + i].isWhite != isWhiteTurn) {
                plateau[Fb + i][Fa + i].colorIndex = "lightcoral";
                canD = false;
                if(plateau[Fb + i][Fa + i].piece !== "" && plateau[Fb + i][Fa + i].isWhite != isWhiteTurn){
                  isKinChess = true;
                }
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
