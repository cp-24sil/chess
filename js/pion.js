class pion extends piece {

  constructor(isWhite, posX, posY) {
    super(name = "p", isWhite, posX, posY);
  }

  showRoutes(x, y, isWhiteTurn) {
    if (this.isWhite === true && isWhiteTurn === true) {
      if (plateau[y - 1][x].piece === "")
        plateau[y - 1][x].colorIndex = "lightblue";
      if (y == 6)
        if (plateau[y - 2][x].piece === "")
          plateau[y - 2][x].colorIndex = "lightblue";
      if (x - 1 >= 0 && plateau[y - 1][x - 1].piece !== "" && plateau[y - 1][x - 1].isWhite !== plateau[y][x].isWhite)
        plateau[y - 1][x - 1].colorIndex = "lightcoral";
      if (x + 1 < 8 && plateau[y - 1][x + 1].piece !== "" && plateau[y - 1][x + 1].isWhite !== plateau[y][x].isWhite)
        plateau[y - 1][x + 1].colorIndex = "lightcoral";
    }
    else if (this.isWhite === false && isWhiteTurn === false) {
      if (plateau[y + 1][x].piece === "")
        plateau[y + 1][x].colorIndex = "lightblue";
      if (y == 1)
        if (plateau[y + 2][x].piece === "")
          plateau[y + 2][x].colorIndex = "lightblue";
      if (x + 1 < 8 && plateau[y + 1][x + 1].piece !== "" && plateau[y + 1][x + 1].isWhite !== plateau[y][x].isWhite)
        plateau[y + 1][x + 1].colorIndex = "lightcoral";
      if (x - 1 >= 0 && plateau[y + 1][x - 1].piece !== "" && plateau[y + 1][x - 1].isWhite !== plateau[y][x].isWhite)
        plateau[y + 1][x - 1].colorIndex = "lightcoral";
    } else {
      selectedPion = null;
    }
  }
}
