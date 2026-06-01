class pion extends piece {

  constructor(isWhite, posX, posY) {
    super(name = "p", isWhite, posX, posY);
  }

  move() {
    if (plateau[posY][posX].colorIndex == "lightblue" || plateau[posY][posX].colorIndex == "lightcoral") {
      plateau[selectedPion.piece.posY][selectedPion.piece.posX].piece = "";
      plateau[posY][posX].piece = selectedPion.piece;
      selectedPion.piece.posX = posX;
      selectedPion.piece.posY = posY;
      plateau[posY][posX].isWhite = isWhiteTurn;
      if (posY == 0 || posY == 7) {
        document.getElementById('pion_bord').style.display = "flex";
        rebuild();
        refresh();
      } else {
        isWhiteTurn = !isWhiteTurn;
        document.getElementById("message").innerHTML = isWhiteTurn;
        rebuild();
        refresh();
      }
    } else {
      rebuild();
      refresh();
    }
  }

  showRoutes(x, y, isWhiteTurn) {
    if (this.isWhite === true && isWhiteTurn === true) {
      if (y - 1 >= 0)
        if (plateau[y - 1][x].piece === "")
          plateau[y - 1][x].colorIndex = "lightblue";
      if (y == 6)
        if (plateau[y - 2][x].piece === "")
          plateau[y - 2][x].colorIndex = "lightblue";
      if (x - 1 >= 0 && plateau[y - 1][x - 1].piece !== "" && plateau[y - 1][x - 1].isWhite !== plateau[y][x].isWhite) {
        plateau[y - 1][x - 1].colorIndex = "lightcoral";
      }
      if (x + 1 < 8 && plateau[y - 1][x + 1].piece !== "" && plateau[y - 1][x + 1].isWhite !== plateau[y][x].isWhite) {
        plateau[y - 1][x + 1].colorIndex = "lightcoral";
      }
    }
    else if (this.isWhite === false && isWhiteTurn === false) {
      if (y + 1 < 8)
        if (plateau[y + 1][x].piece === "")
          plateau[y + 1][x].colorIndex = "lightblue";
      if (y == 1)
        if (plateau[y + 2][x].piece === "")
          plateau[y + 2][x].colorIndex = "lightblue";
      if (x + 1 < 8 && plateau[y + 1][x + 1].piece !== "" && plateau[y + 1][x + 1].isWhite !== plateau[y][x].isWhite) {
        plateau[y + 1][x + 1].colorIndex = "lightcoral";
      }
      if (x - 1 >= 0 && plateau[y + 1][x - 1].piece !== "" && plateau[y + 1][x - 1].isWhite !== plateau[y][x].isWhite) {
        plateau[y + 1][x - 1].colorIndex = "lightcoral";
      }
    } else {
      selectedPion = null;
    }
  }
}
