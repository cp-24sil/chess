class piece {
  constructor(name, isWhite, posX, posY) {
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.isWhite = isWhite;
  }

  move() {
    if (plateau[posY][posX].colorIndex == "lightblue" || plateau[posY][posX].colorIndex == "lightcoral") {
      plateau[selectedPion.piece.posY][selectedPion.piece.posX].piece = "";
      selectedPion.piece.posX = posX;
      selectedPion.piece.posY = posY;
      plateau[posY][posX].piece = selectedPion.piece;
      plateau[posY][posX].isWhite = isWhiteTurn;
      rebuild();
      isWhiteTurn = !isWhiteTurn;
      document.getElementById("message").innerHTML = isWhiteTurn;
      refresh();
    } else {
      rebuild();
      refresh();
    }
  }
}