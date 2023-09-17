import Cell from './Cell';
import Bishop from './figures/Bishop';
import { FigureNames } from './figures/Figure';
import King from './figures/King';
import Knight from './figures/Knight';
import Pawn from './figures/Pawn';
import Queen from './figures/Queen';
import Rook from './figures/Rook';

export default class Board {
  cells: Cell[][] = [];

  public initCells() {
    for (let y = 0; y < 8; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < 8; x++) {
        if ((y + x) % 2 === 0) {
          row.push(new Cell(x, y, 'WHITE', null));
        } else {
          row.push(new Cell(x, y, 'BLACK', null));
        }
      }
      this.cells.push(row);
    }
  }

  public addFigures() {
    for (let y = 0; y < 8; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < 8; x++) {
        if (y === 1) {
          this.cells[y][x].figure = new Pawn('BLACK', FigureNames.PAWN);
        } else if (y === 6) {
          this.cells[y][x].figure = new Pawn('WHITE', FigureNames.PAWN);
        } else if (y === 0 && (x === 0 || x === 7)) {
          this.cells[y][x].figure = new Rook('BLACK', FigureNames.ROOK);
        } else if (y === 7 && (x === 0 || x === 7)) {
          this.cells[y][x].figure = new Rook('WHITE', FigureNames.ROOK);
        } else if (y === 0 && (x === 1 || x === 6)) {
          this.cells[y][x].figure = new Knight('BLACK', FigureNames.KNIGHT);
        } else if (y === 7 && (x === 1 || x === 6)) {
          this.cells[y][x].figure = new Knight('WHITE', FigureNames.KNIGHT);
        } else if (y === 0 && (x === 2 || x === 5)) {
          this.cells[y][x].figure = new Bishop('BLACK', FigureNames.BISHOP);
        } else if (y === 7 && (x === 2 || x === 5)) {
          this.cells[y][x].figure = new Bishop('WHITE', FigureNames.BISHOP);
        } else if (y === 0 && x === 3) {
          this.cells[y][x].figure = new Queen('BLACK', FigureNames.QUEEN);
        } else if (y === 7 && x === 3) {
          this.cells[y][x].figure = new Queen('WHITE', FigureNames.QUEEN);
        } else if (y === 0 && x === 4) {
          this.cells[y][x].figure = new King('BLACK', FigureNames.KING);
        } else if (y === 7 && x === 4) {
          this.cells[y][x].figure = new King('WHITE', FigureNames.KING);
        }
      }
      this.cells.push(row);
    }
  }
}
