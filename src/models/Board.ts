// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
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
  whiteKing: Figure | null = null;
  blackKing: Figure | null = null;

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
        if (target.figure?.name === FigureNames.KING) {
          target.available = false;
          continue;
        }
        /**Проверяет, будет ли шах, если игрок походит на данную клетку */
        let kingUnderAttack = false;
        if (selectedCell) {
          kingUnderAttack = this.kingWIllBeUnderCheck(selectedCell, this.getCell(x, y));
        }
        target.available = !!selectedCell?.figure?.canMove(target) && !kingUnderAttack;
      }
    }
  }

  /**Метод, который копирует доску */
  public copyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.whiteKing = this.whiteKing;
    newBoard.blackKing = this.blackKing;
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

    this.whiteKing = this.cells[7][4].figure;
    this.blackKing = this.cells[0][4].figure;
  }

  /**Добавляет сбитые фигуры в массив сбитых фигур */
  public addLostFigure(figure: Figure) {
    if (figure.color === 'WHITE') {
      this.lostWhiteFigures.push(figure);
    } else {
      this.lostBlackFigures.push(figure);
    }
  }

  /**Метод который проверяет, находится ли под шахом белый король */
  public checkWhiteKing(king: King | null = this.whiteKing) {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.cells[y][x].figure?.canMove(king!.cell)) {
          return true;
        }
      }
    }
    return false;
  }

  /**Метод который проверяет, находится ли под шахом чёрный король*/
  public checkBlackKing(king: King | null = this.blackKing) {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.cells[y][x].figure?.canMove(king!.cell)) {
          return true;
        }
      }
    }
    return false;
  }

  /**Метод, который проверяет, окажется ли король под шахом если совершится ход */
  public kingWIllBeUnderCheck(fromCell: Cell, toCell: Cell): boolean {
    const moveFigureColor = fromCell.figure?.color;
    let king;
    const newBoard = _.cloneDeep(this);
    newBoard.getCell(fromCell.x, fromCell.y).moveFigure(newBoard.getCell(toCell.x, toCell.y));
    if (toCell.figure?.name === FigureNames.KING) {
      king = toCell.figure;
    }
    if (moveFigureColor === 'WHITE') {
      if (king) {
        return newBoard.checkWhiteKing(king);
      }
      return newBoard.checkWhiteKing();
    }
    if (king) {
      return newBoard.checkBlackKing(king);
    }
    return newBoard.checkBlackKing();
  }

  /**Метод, который проверяет мат */
  /**В аргумент принимает цвет игрока, у которога мы проверяем мат */
  public checkMate(color: 'WHITE' | 'BLACK'): boolean {
    const newBoard = _.cloneDeep(this);
    for (let y = 0; y < newBoard.cells.length; y++) {
      const row = newBoard.cells[y];
      for (let x = 0; x < row.length; x++) {
        const target = row[x];
        if (target.figure?.color === color) {
          if (!newBoard.checkMoves(target)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  /**Метод, который проверяет, может ли хоть одна фигура данного игрока куда-нибудь походить */
  public checkMoves(selectedCell: Cell | null) {
    for (let y = 0; y < this.cells.length; y++) {
      const row = this.cells[y];
      for (let x = 0; x < row.length; x++) {
        const target = row[x];
        if (target.figure?.name === FigureNames.KING) {
          target.available = false;
          continue;
        }
        /**Проверяет, будет ли шах, если игрок походит на данную клетку */
        let kingUnderAttack = false;
        if (selectedCell) {
          kingUnderAttack = this.kingWIllBeUnderCheck(selectedCell, this.getCell(x, y));
        }
        if (!!selectedCell?.figure?.canMove(target) && !kingUnderAttack) {
          return false;
        }
      }
    }
    return true;
  }
}
