import Cell from './Cell';
import Bishop from './figures/Bishop';
import Figure, { FigureNames } from './figures/Figure';
import King from './figures/King';
import Knight from './figures/Knight';
import Pawn from './figures/Pawn';
import Queen from './figures/Queen';
import Rook from './figures/Rook';

export default class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];

  /**Метод, который инициализирует клетки */
  public initCells() {
    for (let y = 0; y < 8; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < 8; x++) {
        if ((y + x) % 2 === 0) {
          row.push(new Cell(x, y, 'WHITE', null, this));
        } else {
          row.push(new Cell(x, y, 'BLACK', null, this));
        }
      }
      this.cells.push(row);
    }
  }

  /**Метод, который подсвечивает клетки */
  public highLightCells(selectedCell: Cell | null) {
    for (let y = 0; y < this.cells.length; y++) {
      const row = this.cells[y];
      for (let x = 0; x < row.length; x++) {
        const target = row[x];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  /**Метод, который копирует доску */
  public copyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    return newBoard;
  }

  /**Метод, который получает в качестве аргументов координаты клетки и возвращает клетку */
  getCell(x: number, y: number): Cell {
    return this.cells[y][x];
  }

  /**Метод, который создаёт изначальную расстановку фигур */
  public addFigures() {
    for (let x = 0; x < 8; x++) {
      this.cells[1][x].figure = new Pawn('BLACK', FigureNames.PAWN, this.cells[1][x]);
      this.cells[6][x].figure = new Pawn('WHITE', FigureNames.PAWN, this.cells[6][x]);
    }
    this.cells[0][7].figure = new Rook('BLACK', FigureNames.ROOK, this.cells[0][7]);
    this.cells[0][0].figure = new Rook('BLACK', FigureNames.ROOK, this.cells[0][0]);
    this.cells[7][7].figure = new Rook('WHITE', FigureNames.ROOK, this.cells[7][7]);
    this.cells[7][0].figure = new Rook('WHITE', FigureNames.ROOK, this.cells[7][0]);

    this.cells[0][1].figure = new Knight('BLACK', FigureNames.KNIGHT, this.cells[0][1]);
    this.cells[0][6].figure = new Knight('BLACK', FigureNames.KNIGHT, this.cells[0][6]);
    this.cells[7][1].figure = new Knight('WHITE', FigureNames.KNIGHT, this.cells[7][1]);
    this.cells[7][6].figure = new Knight('WHITE', FigureNames.KNIGHT, this.cells[7][6]);

    this.cells[0][2].figure = new Bishop('BLACK', FigureNames.BISHOP, this.cells[0][2]);
    this.cells[0][5].figure = new Bishop('BLACK', FigureNames.BISHOP, this.cells[0][5]);
    this.cells[7][2].figure = new Bishop('WHITE', FigureNames.BISHOP, this.cells[7][2]);
    this.cells[7][5].figure = new Bishop('WHITE', FigureNames.BISHOP, this.cells[7][5]);

    this.cells[0][3].figure = new Queen('BLACK', FigureNames.QUEEN, this.cells[0][3]);
    this.cells[7][3].figure = new Queen('WHITE', FigureNames.QUEEN, this.cells[7][3]);

    this.cells[0][4].figure = new King('BLACK', FigureNames.KING, this.cells[0][4]);
    this.cells[7][4].figure = new King('WHITE', FigureNames.KING, this.cells[7][4]);
  }

  /**Добавляет сбитые фигуры в массив сбитых фигур */
  public addLostFigure(figure: Figure) {
    if (figure.color === 'WHITE') {
      this.lostWhiteFigures.push(figure);
    } else {
      this.lostBlackFigures.push(figure);
    }
  }
}
