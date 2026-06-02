class roi extends piece {
  constructor(isWhite, posX, posY, img) {
    super("K", isWhite, posX, posY, img);
    this.kingAsMove = false;
  }
  showRoutes(x, y, isWhiteTurn) {
    let Ka = x;
    let Kb = y;
    let nbPathValid = 0;
    if (plateau[Kb][Ka].isWhite === isWhiteTurn) {
      if (Kb - 1 >= 0) {
        if (Ka - 1 >= 0) {
          if (plateau[Kb - 1][Ka - 1].piece === "") {
            plateau[Kb - 1][Ka - 1].colorIndex = "lightblue";
            nbPathValid++;
          } else if (plateau[Kb - 1][Ka - 1].isWhite !== isWhiteTurn) {
            plateau[Kb - 1][Ka - 1].colorIndex = "lightcoral";
            nbPathValid++;
          }
        }
        if (Ka + 1 < 8) {
          if (plateau[Kb - 1][Ka + 1].piece === "") {
            plateau[Kb - 1][Ka + 1].colorIndex = "lightblue";
            nbPathValid++;
          } else if (plateau[Kb - 1][Ka + 1].isWhite !== isWhiteTurn) {
            plateau[Kb - 1][Ka + 1].colorIndex = "lightcoral";
            nbPathValid++;
          }
        }
        if (plateau[Kb - 1][Ka].piece === "") {
          plateau[Kb - 1][Ka].colorIndex = "lightblue";
          nbPathValid++;
        } else if (plateau[Kb - 1][Ka].isWhite !== isWhiteTurn) {
          plateau[Kb - 1][Ka].colorIndex = "lightcoral";
          nbPathValid++;
        }
      }
      if (Kb + 1 < 8) {
        if (Ka - 1 >= 0) {
          if (plateau[Kb + 1][Ka - 1].piece === "") {
            plateau[Kb + 1][Ka - 1].colorIndex = "lightblue";
            nbPathValid++;
          } else if (plateau[Kb + 1][Ka - 1].isWhite !== isWhiteTurn) {
            plateau[Kb + 1][Ka - 1].colorIndex = "lightcoral";
            nbPathValid++;
          }
        } if (Ka + 1 < 8) {
          if (plateau[Kb + 1][Ka + 1].piece === "") {
            plateau[Kb + 1][Ka + 1].colorIndex = "lightblue";
            nbPathValid++;
          } else if (plateau[Kb + 1][Ka + 1].isWhite !== isWhiteTurn) {
            plateau[Kb + 1][Ka + 1].colorIndex = "lightcoral";
            nbPathValid++;
          }
        } if (plateau[Kb + 1][Ka].piece === "") {
          plateau[Kb + 1][Ka].colorIndex = "lightblue";
          nbPathValid++;
        } else if (plateau[Kb + 1][Ka].isWhite !== isWhiteTurn) {
          plateau[Kb + 1][Ka].colorIndex = "lightcoral";
          nbPathValid++;
        }
      }
      if (Ka + 1 < 8) {
        if (plateau[Kb][Ka + 1].piece === "") {
          plateau[Kb][Ka + 1].colorIndex = "lightblue";
          nbPathValid++;
        } else if (plateau[Kb][Ka + 1].isWhite !== isWhiteTurn) {
          plateau[Kb][Ka + 1].colorIndex = "lightcoral";
          nbPathValid++;
        }
      } if (Ka - 1 >= 0) {
        if (plateau[Kb][Ka - 1].piece === "") {
          plateau[Kb][Ka - 1].colorIndex = "lightblue";
          nbPathValid++;
        } else if (plateau[Kb][Ka - 1].isWhite !== isWhiteTurn) {
          plateau[Kb][Ka - 1].colorIndex = "lightcoral";
          nbPathValid++;
        }
      }
      console.log("Chemins disponibles pour le roi :", nbPathValid);

      if (KingIsInChess) {
        console.log(nbPathValid);
        if (nbPathValid === 0) {
          document.getElementById("message").innerHTML = "ÉCHEC ET MAT !";
        } else {
          document.getElementById("message").innerHTML = "ÉCHEC AU ROI !";
          this.kingAsMove = true;
        }
      }
    } else {
      rebuild();
      refresh();
    }
  }

  move() {
    if (plateau[posY][posX].colorIndex == "lightblue" || plateau[posY][posX].colorIndex == "lightcoral") {
      plateau[selectedPion.piece.posY][selectedPion.piece.posX].piece = "";
      selectedPion.piece.posX = posX;
      selectedPion.piece.posY = posY;
      plateau[posY][posX].piece = selectedPion.piece;
      plateau[posY][posX].isWhite = isWhiteTurn;
      this.kingAsMove = true;
      rebuild();
      isWhiteTurn = !isWhiteTurn;
      document.getElementById("message").innerHTML = isWhiteTurn ? "Au tour des Blancs" : "Au tour des Noirs";
      refresh();
    } else {
      rebuild();
      refresh();
    }
  }

  isInChess(isWhiteTurn, x, y) {
    let kingAttacked = false;

    for (let i = y - 1; i >= 0; i--) {
      if (plateau[i][x].piece !== "") {
        if (plateau[i][x].piece.isWhite !== isWhiteTurn) {
          if (plateau[i][x].piece.name === "t" || plateau[i][x].piece.name === "Q") kingAttacked = true;
        }
        break;
      }
    }
    for (let i = y + 1; i < 8; i++) {
      if (plateau[i][x].piece !== "") {
        if (plateau[i][x].piece.isWhite !== isWhiteTurn) {
          if (plateau[i][x].piece.name === "t" || plateau[i][x].piece.name === "Q") kingAttacked = true;
        }
        break;
      }
    }
    for (let i = x - 1; i >= 0; i--) {
      if (plateau[y][i].piece !== "") {
        if (plateau[y][i].piece.isWhite !== isWhiteTurn) {
          if (plateau[y][i].piece.name === "t" || plateau[y][i].piece.name === "Q") kingAttacked = true;
        }
        break;
      }
    }
    for (let i = x + 1; i < 8; i++) {
      if (plateau[y][i].piece !== "") {
        if (plateau[y][i].piece.isWhite !== isWhiteTurn) {
          if (plateau[y][i].piece.name === "t" || plateau[y][i].piece.name === "Q") kingAttacked = true;
        }
        break;
      }
    }
    const diags = [
      { dx: -1, dy: -1 }, { dx: 1, dy: -1 },
      { dx: -1, dy: 1 }, { dx: 1, dy: 1 }
    ];
    for (let d of diags) {
      let nx = x + d.dx;
      let ny = y + d.dy;
      while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
        if (plateau[ny][nx].piece !== "") {
          if (plateau[ny][nx].piece.isWhite !== isWhiteTurn) {
            if (plateau[ny][nx].piece.name === "f" || plateau[ny][nx].piece.name === "Q") kingAttacked = true;
          }
          break;
        }
        nx += d.dx;
        ny += d.dy;
      }
    }
    let pawnRow = isWhiteTurn ? y - 1 : y + 1;
    if (pawnRow >= 0 && pawnRow < 8) {
      if (x - 1 >= 0 && plateau[pawnRow][x - 1].piece !== "") {
        if (plateau[pawnRow][x - 1].piece.isWhite !== isWhiteTurn && plateau[pawnRow][x - 1].piece.name === "p") kingAttacked = true;
      }
      if (x + 1 < 8 && plateau[pawnRow][x + 1].piece !== "") {
        if (plateau[pawnRow][x + 1].piece.isWhite !== isWhiteTurn && plateau[pawnRow][x + 1].piece.name === "p") kingAttacked = true;
      }
    }

    if (y - 2 >= 0) {
      if (x - 1 >= 0)
        if (plateau[y - 2][x - 1].piece !== "" && plateau[y - 2][x - 1].isWhite !== selectedPion.piece.isWhite) kingAttacked = true;
      if (x + 1 < 8)
        if (plateau[y - 2][x + 1].piece !== "" && plateau[y - 2][x + 1].isWhite !== selectedPion.piece.isWhite) kingAttacked = true;
    }
    if (y - 1 >= 0) {
      if (x - 2 >= 0)
        if (plateau[y - 1][x - 2].piece !== "" && plateau[y - 1][x - 2].isWhite !== selectedPion.piece.isWhite) kingAttacked = true;
      if (x + 2 < 8)
        if (plateau[y - 1][x + 2].piece !== "" && plateau[y - 1][x + 2].isWhite !== selectedPion.piece.isWhite) kingAttacked = true;
    }
    if (y + 1 < 8) {
      if (x + 2 < 8)
        if (plateau[y + 1][x + 2].piece !== "" && plateau[y + 1][x + 2].isWhite !== selectedPion.piece.isWhite) kingAttacked = true;
      if (x - 2 >= 0)
        if (plateau[y + 1][x - 2].piece !== "" && plateau[y + 1][x - 2].isWhite !== selectedPion.piece.isWhite) kingAttacked = true;
    }
    if (y + 2 < 8) {
      if (x - 1 >= 0)
        if (plateau[y + 2][x - 1].piece !== "" && plateau[y + 2][x - 1].isWhite !== selectedPion.piece.isWhite) kingAttacked = true;
      if (x + 1 < 8)
        if (plateau[y + 2][x + 1].piece !== "" && plateau[y + 2][x + 1].isWhite !== selectedPion.piece.isWhite) kingAttacked = true;
    }
    KingIsInChess = kingAttacked;
    return kingAttacked;
  }
}
