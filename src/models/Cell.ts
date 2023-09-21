import Board from './Board';
import Figure from './figures/Figure';

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
      this.figure.moveFigure(target);
      if (target.figure) {
        this.board.addLostFigure(target.figure);
      }
      target.setFigure(this.figure);
      this.figure = null;
    }
  }

  /**Метод, который сообщает о вражеской фигуре на той клетке, куда хочет походить игрок */
  public isEnemy(target: Cell): boolean {
    if (target.figure) {
      return target?.figure?.color !== this.figure?.color;
    }
    return false;
  }
}
