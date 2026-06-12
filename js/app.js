import { tour } from "./tour.js";
import { cavalier } from "./cavalier.js";
import { fou } from "./fou.js";
import { reine } from "./reine.js";
import { roi } from "./roi.js";
import { pion } from "./pion.js";
const canvas = document.getElementById("display");
const canvasPieceBlack = document.getElementById("displayPieceblack");
const canvasPieceWhite = document.getElementById("displayPieceWhite");
canvas.addEventListener("click", onClick);
const ctx = canvas.getContext("2d");
const ctxPieceBlack = canvasPieceBlack.getContext("2d");
const ctxPieceWhite = canvasPieceWhite.getContext("2d");
const CELL_SIZE = 50;
export const lines = [
    { dx: 0, dy: -1 }, { dx: 0, dy: 1 },
    { dx: -1, dy: 0 }, { dx: 1, dy: 0 }
];
export const diags = [
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
export const plateau = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => ({ colorIndex: "", piece: "" })));
const pieceEat = [];
const queenImgs = { w: null, b: null };
export let selectedPion = null;
export let enPassantTarget = null;
export function setEnPassantTarget(target) {
    enPassantTarget = target;
}
export let isWhiteTurn = true;
let gameOver = false;
export function getQueenImg(isWhite) {
    return isWhite ? queenImgs.w : queenImgs.b;
}
export function init() {
    selectedPion = null;
    enPassantTarget = null;
    isWhiteTurn = true;
    gameOver = false;
    document.getElementById("message").innerHTML = "";
    document.getElementById("turn").innerHTML = "Au tour des Blancs";
    ctxPieceWhite.clearRect(0, 0, canvasPieceWhite.width, canvasPieceWhite.height);
    ctxPieceBlack.clearRect(0, 0, canvasPieceBlack.width, canvasPieceBlack.height);
    pieceEat.length = 0;
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            plateau[y][x] = {
                colorIndex: (x + y) % 2 !== 0 ? "#DEB887" : "white",
                piece: "",
            };
        }
    }
    placePieces();
    refresh();
}
window.init = init;
document.addEventListener("DOMContentLoaded", () => {
    init();
    const newGameBtn = document.getElementById("btn-nouvelle-partie");
    if (newGameBtn) {
        newGameBtn.addEventListener("click", init);
    }
});
function makePieceImg(src) {
    const img = new Image();
    img.onload = refresh;
    img.src = src;
    return img;
}
function placePieces() {
    const borderRow = ["t", "c", "f", "Q", "K", "f", "c", "t"];
    for (let side = 0; side < 2; side++) {
        const isWhite = side === 1;
        const bOrW = isWhite ? "w" : "b";
        const y = isWhite ? 7 : 0;
        for (let x = 0; x < 8; x++) {
            const pieceImg = makePieceImg(`./assets/img/${imgName(borderRow[x])}-${bOrW}.svg`);
            let p = null;
            switch (borderRow[x]) {
                case "t":
                    p = new tour(isWhite, x, y, pieceImg, lines);
                    break;
                case "c":
                    p = new cavalier(isWhite, x, y, pieceImg, knightMoves);
                    break;
                case "f":
                    p = new fou(isWhite, x, y, pieceImg, diags);
                    break;
                case "Q":
                    p = new reine(isWhite, x, y, pieceImg, lines, diags);
                    break;
                case "K":
                    p = new roi(isWhite, x, y, pieceImg, kingMoves);
                    break;
            }
            if (p) {
                plateau[y][x].piece = p;
                if (borderRow[x] === "Q") {
                    if (isWhite)
                        queenImgs.w = pieceImg;
                    else
                        queenImgs.b = pieceImg;
                }
            }
        }
        const py = isWhite ? 6 : 1;
        const pawnImg = makePieceImg(`./assets/img/pawn-${bOrW}.svg`);
        for (let x = 0; x < 8; x++) {
            plateau[py][x].piece = new pion(isWhite, x, py, pawnImg);
        }
    }
}
function imgName(name) {
    const map = { t: "rook", c: "knight", f: "bishop", Q: "queen", K: "king", p: "pawn" };
    return map[name] || name;
}
export function refresh() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            ctx.fillStyle = plateau[y][x].colorIndex;
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            ctx.strokeStyle = "#00000022";
            ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            const p = plateau[y][x].piece;
            if (p !== "" && p.img && p.img.complete && p.img.naturalWidth > 0) {
                ctx.drawImage(p.img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}
export function rebuild() {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            plateau[y][x].colorIndex = (x + y) % 2 !== 0 ? "#DEB887" : "white";
        }
    }
}
function onClick(e) {
    if (gameOver)
        return;
    const rect = canvas.getBoundingClientRect();
    const posX = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    const posY = Math.floor((e.clientY - rect.top) / CELL_SIZE);
    if (posX < 0 || posX >= 8 || posY < 0 || posY >= 8)
        return;
    if (selectedPion !== null) {
        if (posX === selectedPion.piece.posX && posY === selectedPion.piece.posY) {
            selectedPion = null;
            rebuild();
            refresh();
            return;
        }
        const targetPiece = plateau[posY][posX].piece;
        if (targetPiece !== "" && targetPiece.isWhite === isWhiteTurn) {
            selectedPion = { piece: targetPiece };
            rebuild();
            showRoutes(posX, posY);
            refresh();
            return;
        }
        if (targetPiece !== "" && plateau[posY][posX].colorIndex === "lightcoral") {
            pieceEat.push(targetPiece);
            ctxPieceWhite.clearRect(0, 0, canvasPieceWhite.width, canvasPieceWhite.height);
            ctxPieceBlack.clearRect(0, 0, canvasPieceBlack.width, canvasPieceBlack.height);
            let xWhite = 0;
            let xBlack = 0;
            const size = CELL_SIZE / 2;
            for (const piece of pieceEat) {
                if (piece && piece.img && piece.img.naturalWidth > 0) {
                    if (piece.isWhite) {
                        ctxPieceWhite.drawImage(piece.img, xWhite * size, 0, size, size);
                        xWhite++;
                    }
                    else {
                        ctxPieceBlack.drawImage(piece.img, xBlack * size, 0, size, size);
                        xBlack++;
                    }
                }
            }
        }
        isWhiteTurn = selectedPion.piece.move(posX, posY);
        selectedPion = null;
    }
    else {
        const targetPiece = plateau[posY][posX].piece;
        if (targetPiece !== "" && targetPiece.isWhite === isWhiteTurn) {
            selectedPion = { piece: targetPiece };
            rebuild();
            showRoutes(posX, posY);
            refresh();
        }
    }
}
function showRoutes(x, y) {
    plateau[y][x].colorIndex = "#90ee9050";
    if (selectedPion) {
        selectedPion.piece.showRoutes(x, y, isWhiteTurn);
    }
}
export function isKingAttacked(x, y, isWhiteTurn) {
    var _a;
    for (const d of lines) {
        let nx = x + d.dx;
        let ny = y + d.dy;
        while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
            const p = plateau[ny][nx].piece;
            if (p !== "") {
                if (p.isWhite !== isWhiteTurn) {
                    const n = p.name;
                    if (n === "t" || n === "Q")
                        return true;
                }
                break;
            }
            nx += d.dx;
            ny += d.dy;
        }
    }
    for (const d of diags) {
        let nx = x + d.dx;
        let ny = y + d.dy;
        while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
            const p = plateau[ny][nx].piece;
            if (p !== "") {
                if (p.isWhite !== isWhiteTurn) {
                    const n = p.name;
                    if (n === "f" || n === "Q")
                        return true;
                }
                break;
            }
            nx += d.dx;
            ny += d.dy;
        }
    }
    for (const m of knightMoves) {
        const nx = x + m.dx;
        const ny = y + m.dy;
        if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
            const p = plateau[ny][nx].piece;
            if (p !== "" && p.isWhite !== isWhiteTurn && p.name === "c")
                return true;
        }
    }
    const pawnDir = isWhiteTurn ? -1 : 1;
    const pawnRow = y + pawnDir;
    if (pawnRow >= 0 && pawnRow < 8) {
        const leftPiece = plateau[pawnRow][x - 1].piece;
        if (x - 1 >= 0 && leftPiece && leftPiece.name !== "" && leftPiece.isWhite !== isWhiteTurn && leftPiece.name === "p")
            return true;
        const rightPiece = (_a = plateau[pawnRow][x + 1]) === null || _a === void 0 ? void 0 : _a.piece;
        if (x + 1 < 8 && rightPiece && rightPiece.name !== "" && rightPiece.isWhite !== isWhiteTurn && rightPiece.name === "p")
            return true;
    }
    for (const m of kingMoves) {
        const nx = x + m.dx;
        const ny = y + m.dy;
        if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
            const p = plateau[ny][nx].piece;
            if (p !== "" && p.isWhite !== isWhiteTurn && p.name === "K")
                return true;
        }
    }
    return false;
}
export function checkGameState(isWhiteTurn) {
    const hasLegalMove = hasAnyLegalMove(isWhiteTurn);
    let kingX = -1;
    let kingY = -1;
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            const p = plateau[y][x].piece;
            if (p !== "" && p.name === "K" && p.isWhite === isWhiteTurn) {
                kingX = x;
                kingY = y;
                break;
            }
        }
        if (kingX !== -1)
            break;
    }
    const inCheck = isKingAttacked(kingX, kingY, isWhiteTurn);
    const messageElem = document.getElementById("message");
    const turnElem = document.getElementById("turn");
    if (!hasLegalMove) {
        gameOver = true;
        if (inCheck) {
            const winner = isWhiteTurn ? "Noirs" : "Blancs";
            messageElem.innerHTML = `ÉCHEC ET MAT ! Les ${winner} gagnent !`;
        }
        else {
            messageElem.innerHTML = "PAT ! Match nul.";
        }
        turnElem.innerHTML = "Partie terminée";
    }
    else if (inCheck) {
        messageElem.innerHTML = "Échec au Roi !";
        turnElem.innerHTML = isWhiteTurn ? "Au tour des Blancs" : "Au tour des Noirs";
    }
    else {
        messageElem.innerHTML = "";
        turnElem.innerHTML = isWhiteTurn ? "Au tour des Blancs" : "Au tour des Noirs";
    }
}
function hasAnyLegalMove(isWhiteTurn) {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            const p = plateau[y][x].piece;
            if (p === "" || p.isWhite !== isWhiteTurn)
                continue;
            const savedSelected = selectedPion;
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
            if (hasMove)
                return true;
        }
    }
    return false;
}
//# sourceMappingURL=app.js.map
