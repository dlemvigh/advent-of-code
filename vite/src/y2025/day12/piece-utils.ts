import { Piece } from "./types";

export function getAllDistincePieceOrientations(pieces: Piece[]): Piece[][] {
    return pieces.map(piece => getDistincePieceOrientations(getAllPieceOrientations(piece)));
}

function getDistincePieceOrientations(pieces: Piece[]): Piece[] {
    const seen = new Set<string>();
    const unique: Piece[] = [];
    
    for (const piece of pieces) {
        const key = pieceToString(piece);
        if (!seen.has(key)) {
            seen.add(key);
            unique.push(piece);
        }
    }
    
    return unique;
}

function pieceToString(piece: Piece): string {
    return piece.map(row => row.map(cell => cell ? '1' : '0').join('')).join('|');
}

function getAllPieceOrientations(piece: Piece): Piece[] {
    const orientations: Piece[] = [];
    
    // Generate 4 rotations (0°, 90°, 180°, 270°)
    let current = piece;
    for (let i = 0; i < 4; i++) {
        orientations.push(current);
        current = rotatePiece(current);
    }
    
    // Flip and generate 4 more rotations
    current = flipPiece(piece);
    for (let i = 0; i < 4; i++) {
        orientations.push(current);
        current = rotatePiece(current);
    }
    
    return orientations;
}

function rotatePiece(piece: Piece): Piece {
    const rows = piece.length;
    const cols = piece[0].length;
    
    // After 90° clockwise rotation, dimensions swap: NxM becomes MxN
    const rotated: Piece = Array.from({ length: cols }, () => Array(rows).fill(false));
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Map: [row][col] -> [col][rows-1-row]
            rotated[col][rows - 1 - row] = piece[row][col];
        }
    }   
    
    return rotated;
}

function flipPiece(piece: Piece): Piece {
    const rows = piece.length;
    const cols = piece[0].length;
    
    // Flip horizontally (mirror left-right)
    const flipped: Piece = Array.from({ length: rows }, () => Array(cols).fill(false));
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Map: [row][col] -> [row][cols-1-col]
            flipped[row][cols - 1 - col] = piece[row][col];
        }
    }
    
    return flipped;
}