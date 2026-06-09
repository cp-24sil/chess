const canvas = document.getElementById("display");
const canvasPieceBlack = document.getElementById("displayPieceblack");
const canvasPieceWhite = document.getElementById("displayPieceWhite");
canvas.addEventListener("click", onClick);
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
const ctxPieceBlack = canvasPieceBlack.getContext("2d");
const ctxPieceWhite = canvasPieceWhite.getContext("2d");
const lines = [
  { dx: 0, dy: -1 }, { dx: 0, dy: 1 },
  { dx: -1, dy: 0 }, { dx: 1, dy: 0 }
];
const diags = [
  { dx: -1, dy: -1 }, { dx: 1, dy: -1 },
  { dx: -1, dy: 1 }, { dx: 1, dy: 1 }
];
const knightMoves = [
  { dx: -2, dy: -1 }, { dx: -2, dy: 1 },
  { dx: 2, dy: -1 }, { dx: 2, dy: 1 },
  { dx: -1, dy: -2 }, { dx: -1, dy: 2 },
  { dx: 1, dy: -2 }, { dx: 1, dy: 2 }
];
const kingMoves = [
  { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
  { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
  { dx: -1, dy: 1 }, { dx: 0, dy: 1 }, { dx: 1, dy: 1 }
];
const CELL_SIZE = 50;
const plateau = [[null], [null]];
const pieceEat = [[], []];
const queenImgs = { w: null, b: null };
let selectedPion = null;
let enPassantTarget = null;
let isWhiteTurn = true;
let gameOver = false;

function getQueenImg(isWhite) {
  return isWhite ? queenImgs.w : queenImgs.b;
}

function init() {
  selectedPion = null;
  enPassantTarget = null;
  isWhiteTurn = true;
  gameOver = false;
  document.getElementById("message").innerHTML = "";
  document.getElementById("turn").innerHTML = "Au tour des Blancs";
  ctxPieceWhite.clearRect(0, 0, canvasPieceWhite.width, canvasPieceWhite.height);
  ctxPieceBlack.clearRect(0, 0, canvasPieceBlack.width, canvasPieceBlack.height);
  for (let y = 0; y < 8; y++) {
    plateau[y] = [];
    if (y < 2)
      pieceEat.length = 0;

    for (let x = 0; x < 8; x++) {
      plateau[y][x] = {
        colorIndex: (x + y) % 2 !== 0 ? "#DEB887" : "white",
        piece: "",
        isWhite: null
      };
    }
  }
  placePieces();
  refresh();
}

function makePieceImg(src, callback) {
  let img = new Image();
  img.onload = callback || refresh;
  img.src = src;
  return img;
}

function placePieces() {
  const backRow = ["t", "c", "f", "Q", "K", "f", "c", "t"];
  for (let side = 0; side < 2; side++) {
    let isWhite = side === 1;
    let bOrW = isWhite ? "w" : "b";
    let y = isWhite ? 7 : 0;
    for (let x = 0; x < 8; x++) {
      let pieceImg = makePieceImg(`./assets/img/${imgName(backRow[x])}-${bOrW}.svg`);
      let p;
      switch (backRow[x]) {
        case "t": p = new tour(isWhite, x, y, pieceImg); break;
        case "c": p = new cavalier(isWhite, x, y, pieceImg); break;
        case "f": p = new fou(isWhite, x, y, pieceImg); break;
        case "Q": p = new reine(isWhite, x, y, pieceImg); break;
        case "K": p = new roi(isWhite, x, y, pieceImg); break;
      }
      plateau[y][x].piece = p;
      plateau[y][x].isWhite = isWhite;
      if (backRow[x] === "Q") {
        if (isWhite) queenImgs.w = pieceImg;
        else queenImgs.b = pieceImg;
      }
    }
    let py = isWhite ? 6 : 1;
    let pawnImg = makePieceImg(`./assets/img/pawn-${bOrW}.svg`);
    for (let x = 0; x < 8; x++) {
      plateau[py][x].piece = new pion(isWhite, x, py, pawnImg);
      plateau[py][x].isWhite = isWhite;
    }
  }
}

function imgName(name) {
  const map = { t: "rook", c: "knight", f: "bishop", Q: "queen", K: "king", p: "pawn" };
  return map[name] || name;
}

function refresh() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      ctx.fillStyle = plateau[y][x].colorIndex;
      ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      ctx.strokeStyle = "#00000022";
      ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      let p = plateau[y][x].piece;
      if (p !== "" && p.img && p.img.complete && p.img.naturalWidth > 0) {
        ctx.drawImage(p.img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }
}

function rebuild() {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      plateau[y][x].colorIndex = (x + y) % 2 !== 0 ? "#DEB887" : "white";
    }
  }
}

function onClick(e) {
  if (gameOver) return;
  let rect = canvas.getBoundingClientRect();
  let posX = Math.floor((e.clientX - rect.left) / CELL_SIZE);
  let posY = Math.floor((e.clientY - rect.top) / CELL_SIZE);
  if (posX < 0 || posX >= 8 || posY < 0 || posY >= 8) return;
  if (selectedPion !== null) {
    if (posX === selectedPion.piece.posX && posY === selectedPion.piece.posY) {
      selectedPion = null;
      rebuild();
      refresh();
      return;
    }
    if (plateau[posY][posX].piece !== "" && plateau[posY][posX].piece.isWhite === isWhiteTurn) {
      selectedPion = { piece: plateau[posY][posX].piece };
      rebuild();
      showRoutes(posX, posY);
      refresh();
      return;
    }
    if (plateau[posY][posX].piece != '' && plateau[posY][posX].colorIndex == 'lightcoral') {
      pieceEat.push(plateau[posY][posX].piece);
      ctxPieceWhite.clearRect(0, 0, canvasPieceWhite.width, canvasPieceWhite.height);
      ctxPieceBlack.clearRect(0, 0, canvasPieceBlack.width, canvasPieceBlack.height);

      let xWhite = 0;
      let xBlack = 0;
      const size = CELL_SIZE / 2;
      for (let piece of pieceEat) {
        if (piece && piece.img && piece.img.naturalWidth > 0) {
          if (piece.isWhite) {
            ctxPieceWhite.drawImage(piece.img, xWhite * size, 0, size, size);
            ctxPieceWhite.fillStyle = '#2a2b36';
            xWhite++;
          } else {
            ctxPieceBlack.drawImage(piece.img, xBlack * size, 0, size, size);
            ctxPieceBlack.fillStyle = '#2a2b36';
            xBlack++;
          }
        }
      }
    }
    selectedPion.piece.move(posX, posY);
    selectedPion = null;
  } else {
    if (plateau[posY][posX].piece !== "" && plateau[posY][posX].piece.isWhite === isWhiteTurn) {
      selectedPion = { piece: plateau[posY][posX].piece };
      rebuild();
      showRoutes(posX, posY);
      refresh();
    }
  }
}

function showRoutes(x, y) {
  plateau[y][x].colorIndex = "#90ee9050";
  selectedPion.piece.showRoutes(x, y, isWhiteTurn);
}

function isKingAttacked(x, y, isWhiteTurn) {
  for (let d of lines) {
    let nx = x + d.dx;
    let ny = y + d.dy;
    while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
      if (plateau[ny][nx].piece !== "") {
        if (plateau[ny][nx].piece.isWhite !== isWhiteTurn) {
          let n = plateau[ny][nx].piece.name;
          if (n === "t" || n === "Q") return true;
        }
        break;
      }
      nx += d.dx;
      ny += d.dy;
    }
  }
  for (let d of diags) {
    let nx = x + d.dx;
    let ny = y + d.dy;
    while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
      if (plateau[ny][nx].piece !== "") {
        if (plateau[ny][nx].piece.isWhite !== isWhiteTurn) {
          let n = plateau[ny][nx].piece.name;
          if (n === "f" || n === "Q") return true;
        }
        break;
      }
      nx += d.dx;
      ny += d.dy;
    }
  }
  for (let m of knightMoves) {
    let nx = x + m.dx;
    let ny = y + m.dy;
    if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
      if (plateau[ny][nx].piece !== "" && plateau[ny][nx].piece.isWhite !== isWhiteTurn && plateau[ny][nx].piece.name === "c") return true;
    }
  }
  let pawnDir = isWhiteTurn ? -1 : 1;
  let pawnRow = y + pawnDir;
  if (pawnRow >= 0 && pawnRow < 8) {
    if (x - 1 >= 0 && plateau[pawnRow][x - 1].piece !== "" && plateau[pawnRow][x - 1].piece.isWhite !== isWhiteTurn && plateau[pawnRow][x - 1].piece.name === "p") return true;
    if (x + 1 < 8 && plateau[pawnRow][x + 1].piece !== "" && plateau[pawnRow][x + 1].piece.isWhite !== isWhiteTurn && plateau[pawnRow][x + 1].piece.name === "p") return true;
  }
  for (let m of kingMoves) {
    let nx = x + m.dx, ny = y + m.dy;
    if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
      if (plateau[ny][nx].piece !== "" && plateau[ny][nx].piece.isWhite !== isWhiteTurn && plateau[ny][nx].piece.name === "K") return true;
    }
  }
  return false;
}


function checkGameState() {
  let hasLegalMove = hasAnyLegalMove(isWhiteTurn);
  let kingX = -1
  let kingY = -1;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (plateau[y][x].piece !== "" && plateau[y][x].piece.name === "K" && plateau[y][x].piece.isWhite === isWhiteTurn) {
        kingX = x; kingY = y; break;
      }
    }
    if (kingX !== -1) break;
  }
  let inCheck = isKingAttacked(kingX, kingY, isWhiteTurn);
  if (!hasLegalMove) {
    if (inCheck) {
      gameOver = true;
      let winner = isWhiteTurn ? "Noirs" : "Blancs";
      document.getElementById("message").innerHTML = `ÉCHEC ET MAT ! Les ${winner} gagnent !`;
      document.getElementById("turn").innerHTML = "Partie terminée";
    } else {
      gameOver = true;
      document.getElementById("message").innerHTML = "PAT ! Match nul.";
      document.getElementById("turn").innerHTML = "Partie terminée";
    }
  } else if (inCheck) {
    document.getElementById("message").innerHTML = "Échec au Roi !";
    document.getElementById("turn").innerHTML = isWhiteTurn ? "Au tour des Blancs" : "Au tour des Noirs";
  } else {
    document.getElementById("message").innerHTML = "";
    document.getElementById("turn").innerHTML = isWhiteTurn ? "Au tour des Blancs" : "Au tour des Noirs";
  }
}

function hasAnyLegalMove(isWhiteTurn) {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      let p = plateau[y][x].piece;
      if (p === "" || p.isWhite !== isWhiteTurn) continue;
      let savedSelected = selectedPion;
      selectedPion = { piece: p };
      p.showRoutes(x, y, isWhiteTurn);
      let hasMove = false;
      for (let ry = 0; ry < 8; ry++) {
        for (let rx = 0; rx < 8; rx++) {
          if (plateau[ry][rx].colorIndex === "lightblue" || plateau[ry][rx].colorIndex === "lightcoral") {
            hasMove = true;
          }
        }
      }
      rebuild();
      selectedPion = savedSelected;
      if (hasMove) return true;
    }
  }
  return false;
}