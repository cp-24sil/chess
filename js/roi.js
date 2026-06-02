class roi extends piece {
  constructor(isWhite, posX, posY) {
    super(name = "K", isWhite, posX, posY);
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
      console.log(nbPathValid);
      if (nbPathValid == 0 && KingIsInChess != false) {
        
      }
    } else {
      rebuild();
      refresh();
    }
  }

  isInChess(isWhiteTurn, x, y) {
    let Ka = x;
    let Kb = y;
    let canA = true;
    let canB = true;
    let canC = true;
    let canD = true;
    let nbIsChess = 0;
    let initialIsKingInChess = KingIsInChess;
    for (let i = Kb; i > 0; i--) {
      if (plateau[i - 1][Ka].piece === "")
        plateau[i - 1][Ka].colorIndex = "lightblue";
      else if (plateau[i - 1][Ka].isWhite !== selectedPion.piece.isWhite) {
        plateau[i - 1][Ka].colorIndex = "lightcoral";
        if (plateau[Kb - i][Ka].piece.name === "t" || plateau[Kb - i][Ka].piece.name === "Q") {
          KingIsInChess = { inChess: true, piece: selectedPion.piece, nb: nbIsChess++ };
        }
        break;
      }
      else {
        break;
      }
    }
    for (let i = Kb + 1; i < 8; i++) {
      if (plateau[i][Ka].piece === "")
        plateau[i][Ka].colorIndex = "lightblue";
      else if (plateau[i][Ka].isWhite !== selectedPion.piece.isWhite) {
        plateau[i][Ka].colorIndex = "lightcoral";
        if (plateau[i][Ka].piece.name === "t" || plateau[i][Ka].piece.name === "Q") {
          KingIsInChess = { inChess: true, piece: selectedPion.piece, nb: nbIsChess++ };
        }
        break;
      }
      else {
        break;
      }
    }
    for (let i = Ka; i > 0; i--) {
      if (plateau[Kb][i - 1].piece === "")
        plateau[Kb][i - 1].colorIndex = "lightblue";
      else if (plateau[Kb][i - 1].isWhite !== selectedPion.piece.isWhite) {
        plateau[Kb][i - 1].colorIndex = "lightcoral";
        if (plateau[Kb][i - 1].piece.name === "t" || plateau[Kb][i - 1].piece.name === "Q") {
          KingIsInChess = { inChess: true, piece: selectedPion.piece, nb: nbIsChess++ };
        }
        break;
      }
      else {
        break;
      }
    }
    for (let i = Ka + 1; i < 8; i++) {
      if (plateau[Kb][i].piece === "")
        plateau[Kb][i].colorIndex = "lightblue";
      else if (plateau[Kb][i].isWhite !== selectedPion.piece.isWhite) {
        plateau[Kb][i].colorIndex = "lightcoral";
        if (plateau[Kb][i].piece.name === "t" || plateau[Kb][i].piece.name === "Q") {
          KingIsInChess = { inChess: true, piece: selectedPion.piece, nb: nbIsChess++ };
        }
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
    for (let i = 1; i < 8; i++) {
      if (Kb - i >= 0) {
        if (Ka - i >= 0)
          if ((plateau[Kb - i][Ka - i].piece === "" || plateau[Kb - i][Ka - i].isWhite != selectedPion.piece.isWhite) && canA === true) {
            plateau[Kb - i][Ka - i].colorIndex = "lightblue";
            if (plateau[Kb - i][Ka - i].piece !== "" && plateau[Kb - i][Ka - i].isWhite != selectedPion.piece.isWhite) {
              plateau[Kb - i][Ka - i].colorIndex = "lightcoral";
              if (plateau[Kb - i][Ka - i].piece.name === "f" || plateau[Kb - i][Ka - i].piece.name === "Q") {
                KingIsInChess = { inChess: true, piece: selectedPion.piece, nb: nbIsChess++ };
              }
              canA = false;
            }
          }
          else canA = false;
        if (Ka + i < 8)
          if ((plateau[Kb - i][Ka + i].piece === "" || plateau[Kb - i][Ka + i].isWhite != selectedPion.piece.isWhite) && canB === true) {
            plateau[Kb - i][Ka + i].colorIndex = "lightblue";
            if (plateau[Kb - i][Ka + i].piece !== "" && plateau[Kb - i][Ka + i].isWhite != selectedPion.piece.isWhite) {
              plateau[Kb - i][Ka + i].colorIndex = "lightcoral";
              if (plateau[Kb - i][Ka + i].piece.name === "f" || plateau[Kb - i][Ka + i].piece.name === "Q") {
                KingIsInChess = { inChess: true, piece: selectedPion.piece, nb: nbIsChess++ };
              }
              canB = false;
            }
          }
          else canB = false;
      }
      if (Kb + i < 8) {
        if (Ka - i >= 0)
          if ((plateau[Kb + i][Ka - i].piece === "" || plateau[Kb + i][Ka - i].isWhite != selectedPion.piece.isWhite) && canC === true) {
            plateau[Kb + i][Ka - i].colorIndex = "lightblue";
            if (plateau[Kb + i][Ka - i].piece !== "" && plateau[Kb + i][Ka - i].isWhite != selectedPion.piece.isWhite) {
              plateau[Kb + i][Ka - i].colorIndex = "lightcoral";
              if (plateau[Kb + i][Ka - i].piece.name === "f" || plateau[Kb + i][Ka - i].piece.name === "Q") {
                KingIsInChess = { inChess: true, piece: selectedPion.piece, nb: nbIsChess++ };
              }
              canC = false;
            }
          }
          else canC = false;
        if (Ka + i < 8)
          if ((plateau[Kb + i][Ka + i].piece === "" || plateau[Kb + i][Ka + i].isWhite != selectedPion.piece.isWhite) && canD === true) {
            plateau[Kb + i][Ka + i].colorIndex = "lightblue";
            if (plateau[Kb + i][Ka + i].piece !== "" && plateau[Kb + i][Ka + i].isWhite != selectedPion.piece.isWhite) {
              plateau[Kb + i][Ka + i].colorIndex = "lightcoral";
              if (plateau[Kb + i][Ka + i].piece.name === "f" || plateau[Kb + i][Ka + i].piece.name === "Q") {
                KingIsInChess = { inChess: true, piece: selectedPion.piece, nb: nbIsChess++ };
              }
              canD = false
            }
          }
          else canD = false;
      }
    }
    rebuild();
    if (KingIsInChess != false)
      return KingIsInChess.inChess;
    else if (KingIsInChess.nbIsChess == initialIsKingInChess.nbIsChess) {
      KingIsInChess = false;
      return KingIsInChess;
    }
    else return KingIsInChess;
  }
}