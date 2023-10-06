import Board from './Board';
import Figure, { FigureNames } from './figures/Figure';
import Pawn from './figures/Pawn';

export default class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: 'WHITE' | 'BLACK';
  figure: Figure | null;
  available: boolean;
  board: Board;

  constructor(x: number, y: number, color: 'WHITE' | 'BLACK', figure: Figure | null, board: Board) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.available = false;
    this.board = board;
  }

  /**Метод, который возвращает true если на клетке есть фигура и наоборот */
  isEmpty(): boolean {
    return !this.figure;
  }

  /**Метод, который переопределяет фигуру на клетке */
  setFigure(figure: Figure) {
    this.figure = figure;
    /**Так как у класса Figure есть информация о Cell, эту информацию нужно обновлять при переставлении фигуры */
    this.figure.cell = this;
  }

  /**Проверяет вертикаль на наличие фигур */
  isEmptyVertical(target: Cell): boolean {
    /**Возвращаем false если клетка не находится в одной колонке с фигурой */
    if (this.x !== target.x) {
      return false;
    }
    /**Находим максимальное и манимальное значение y*/
    const min = Math.min(target.y, this.y);
    const max = Math.max(target.y, this.y);
    /**Если от максимального до минимального значения есть хоть одна фигура,
     *  то возвращаем false на клетку с этой фигурой */
    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  /**Проверяет горизонталь на наличие фигур */
  isEmptyHorizontal(target: Cell): boolean {
    /**Возвращаем false если клетка не находится в одной строке с фигурой */
    if (this.y !== target.y) {
      return false;
    }
    /**Находим максимальное и манимальное значение x*/
    const min = Math.min(target.x, this.x);
    const max = Math.max(target.x, this.x);
    /**Если от максимального до минимального значения есть хоть одна фигура,
     *  то возвращаем false на клетку с этой фигурой */
    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  /**Проверяет диагональ на наличие фигур */
  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absX !== absY) {
      return false;
    }
    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;
    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  /**Метод, который отрабатывает при перемещении фигуры */
  moveFigure(target: Cell) {
    if (this?.figure?.canMove(target)) {
      /**Реализация взятия на проходе */
      if (this.figure instanceof Pawn) {
        if (this.figure.color === 'BLACK') {
          if (
            this.board.getCell(target.x, target.y - 1) &&
            this.board.getCell(target.x, target.y - 1).figure &&
            this.board.getCell(target.x, target.y - 1).figure instanceof Pawn &&
            this.board.getCell(target.x, target.y - 1).figure?.color !== this.figure.color &&
            //@ts-ignore: error message
            this.board.getCell(target.x, target.y - 1).figure!.canBeTakeOnThePass
          ) {
            //@ts-ignore: error message
            this.board.addLostFigure(this.board.getCell(target.x, target.y - 1).figure);
            this.board.getCell(target.x, target.y).setFigure(this.figure);
            this.board.getCell(target.x, target.y - 1).figure = null;
            this.figure = null;
          } else {
            this.figure.moveFigure(target);
            if (target.figure) {
              this.board.addLostFigure(target.figure);
            }
            target.setFigure(this.figure);
            this.figure = null;
          }
        } else {
          if (
            this.board.getCell(target.x, target.y + 1) &&
            this.board.getCell(target.x, target.y + 1).figure &&
            this.board.getCell(target.x, target.y + 1).figure instanceof Pawn &&
            this.board.getCell(target.x, target.y + 1).figure?.color !== this.figure.color &&
            //@ts-ignore: error message
            this.board.getCell(target.x, target.y + 1).figure!.canBeTakeOnThePass
          ) {
            //@ts-ignore: error message
            this.board.addLostFigure(this.board.getCell(target.x, target.y + 1).figure);
            this.board.getCell(target.x, target.y).setFigure(this.figure);
            this.figure = null;
            this.board.getCell(target.x, target.y + 1).figure = null;
          } else {
            this.figure.moveFigure(target);
            if (target.figure) {
              this.board.addLostFigure(target.figure);
            }
            target.setFigure(this.figure);
            this.figure = null;
          }
        }
      } else {
        this.figure.moveFigure(target);
        if (target.figure) {
          this.board.addLostFigure(target.figure);
        }
        target.setFigure(this.figure);
        this.figure = null;
      }
    }
  }

  /**Метод, который сообщает о вражеской фигуре на той клетке, куда хочет походить игрок */
  public isEnemy(target: Cell): boolean {
    if (target.figure) {
      return target?.figure?.color !== this.figure?.color;
    }
    return false;
  }

  /**Метод, который проверяет, находится ли клетка под атакой (нужен для того, чтобы король не мог ходить под шах) */
  public isCellUnderAttack(target: Cell, figureColor: 'WHITE' | 'BLACK') {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (
          this.board.getCell(x, y).figure?.name !== FigureNames.KING &&
          this.board.getCell(x, y).figure?.color !== figureColor
        ) {
          if (this.board.getCell(x, y).figure?.name === FigureNames.PAWN) {
            const direction = this.board.getCell(x, y).figure?.color === 'BLACK' ? 1 : -1;
            if (y + direction === target.y && (x + 1 === target.x || x - 1 === target.x)) {
              return false;
            }
          } else if (this.board.getCell(x, y).figure?.canMove(target)) {
            return false;
          }
        } else if (
          this.board.getCell(x, y).figure?.name === FigureNames.KING &&
          this.board.getCell(x, y).figure?.color !== figureColor
        ) {
          if (
            (target.y === y && target.x === x + 1) ||
            (target.y === y + 1 && target.x === x + 1) ||
            (target.y === y + 1 && target.x === x) ||
            (target.y === y + 1 && target.x === x - 1) ||
            (target.y === y && target.x === x - 1) ||
            (target.y === y - 1 && target.x === x) ||
            (target.y === y - 1 && target.x === x - 1) ||
            (target.y === y - 1 && target.x === x + 1)
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
