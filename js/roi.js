class roi extends piece{
  constructor(isWhite, posX, posY) {
    super(name = "K", isWhite, posX, posY);
  }
  showRoutes(x, y, isWhiteTurn) {
    let Ka = x;
    let Kb = y;
    if (plateau[Kb][Ka].isWhite === isWhiteTurn) {
      if (Kb - 1 >= 0) {
        if (Ka - 1 >= 0) {
          if (plateau[Kb - 1][Ka - 1].piece === "")
            plateau[Kb - 1][Ka - 1].colorIndex = "lightblue";
          else if (plateau[Kb - 1][Ka - 1].isWhite !== isWhiteTurn)
            plateau[Kb - 1][Ka - 1].colorIndex = "lightcoral";
        }
        if (Ka + 1 < 8) {
          if (plateau[Kb - 1][Ka + 1].piece === "")
            plateau[Kb - 1][Ka + 1].colorIndex = "lightblue";
          else if (plateau[Kb - 1][Ka + 1].isWhite !== isWhiteTurn)
            plateau[Kb - 1][Ka + 1].colorIndex = "lightcoral";
        }
        if (plateau[Kb - 1][Ka].piece === "")
          plateau[Kb - 1][Ka].colorIndex = "lightblue";
        else if (plateau[Kb - 1][Ka].isWhite !== isWhiteTurn)
          plateau[Kb - 1][Ka].colorIndex = "lightcoral";
      }
      if (Kb + 1 < 8) {
        if (Ka - 1 >= 0) {
          if (plateau[Kb + 1][Ka - 1].piece === "")
            plateau[Kb + 1][Ka - 1].colorIndex = "lightblue";
          else if (plateau[Kb + 1][Ka - 1].isWhite !== isWhiteTurn)
            plateau[Kb + 1][Ka - 1].colorIndex = "lightcoral";
        } if (Ka + 1 < 8) {
          if (plateau[Kb + 1][Ka + 1].piece === "")
            plateau[Kb + 1][Ka + 1].colorIndex = "lightblue";
          else if (plateau[Kb + 1][Ka + 1].isWhite !== isWhiteTurn)
            plateau[Kb + 1][Ka + 1].colorIndex = "lightcoral";
        } if (plateau[Kb + 1][Ka].piece === "")
          plateau[Kb + 1][Ka].colorIndex = "lightblue";
        else if (plateau[Kb + 1][Ka].isWhite !== isWhiteTurn)
          plateau[Kb + 1][Ka].colorIndex = "lightcoral";
      }
      if (Ka + 1 < 8) {
        if (plateau[Kb][Ka + 1].piece === "")
          plateau[Kb][Ka + 1].colorIndex = "lightblue";
        else if (plateau[Kb][Ka + 1].isWhite !== isWhiteTurn)
          plateau[Kb][Ka + 1].colorIndex = "lightcoral";
      } if (Ka - 1 >= 0) {
        if (plateau[Kb][Ka - 1].piece === "")
          plateau[Kb][Ka - 1].colorIndex = "lightblue";
        else if (plateau[Kb][Ka - 1].isWhite !== isWhiteTurn)
          plateau[Kb][Ka - 1].colorIndex = "lightcoral";
      }
    } else {
      rebuild();
      refresh();
    }
  }
}