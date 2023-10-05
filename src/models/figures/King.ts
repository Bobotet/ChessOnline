import Figure, { FigureNames } from './Figure';
import blackFigureImg from '../../../public/images/figures/king_b.png';
import whiteFigureImg from '../../../public/images/figures/king_w.png';
import Cell from '../Cell';

export default class King extends Figure {
  isFirstStep: boolean = true;
  leftRook: Figure | null = null;
  rightRook: Figure | null = null;
  constructor(color: 'WHITE' | 'BLACK', name: FigureNames | null, cell: Cell) {
    super(color, name, cell);
    this.img = color === 'BLACK' ? blackFigureImg : whiteFigureImg;
  }

  /**Проверяет клетки, на которые может походить король */
  public canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.checkCastling(target)) {
      return true;
    }
    if (
      ((target.y === this.cell.y && target.x === this.cell.x + 1) ||
        (target.y === this.cell.y + 1 && target.x === this.cell.x + 1) ||
        (target.y === this.cell.y + 1 && target.x === this.cell.x) ||
        (target.y === this.cell.y + 1 && target.x === this.cell.x - 1) ||
        (target.y === this.cell.y && target.x === this.cell.x - 1) ||
        (target.y === this.cell.y - 1 && target.x === this.cell.x) ||
        (target.y === this.cell.y - 1 && target.x === this.cell.x - 1) ||
        (target.y === this.cell.y - 1 && target.x === this.cell.x + 1)) &&
      (this.cell.board.getCell(target.x, target.y).isEmpty() ||
        this.cell.isEnemy(this.cell.board.getCell(target.x, target.y))) &&
      this.cell.isCellUnderAttack(target, this.color)
    ) {
      return true;
    }
    return false;
  }

  /**Метод, который проверяет, доступна ли королю рокировка */
  public checkCastling(target: Cell): boolean {
    if (this.isFirstStep && target.figure === null) {
      if (this.color === 'WHITE' && this.cell.y === 7) {
        if (
          target.x === 2 &&
          target.y === 7 &&
          this.cell.board.getCell(2, 7).figure === null &&
          this.cell.board.getCell(3, 7).figure === null &&
          !this.cell.isCellUnderAttack(this.cell.board.getCell(3, 7), 'BLACK')
        ) {
          return true;
        }
        if (
          target.x === 6 &&
          target.y === 7 &&
          this.cell.board.getCell(6, 7).figure === null &&
          !this.cell.isCellUnderAttack(this.cell.board.getCell(5, 7), 'BLACK')
        ) {
          return true;
        }
      } else if (this.color === 'BLACK' && this.cell.y === 0) {
        if (
          target.x === 2 &&
          target.y === 0 &&
          this.cell.board.getCell(2, 0).figure === null &&
          this.cell.board.getCell(3, 0).figure === null &&
          !this.cell.isCellUnderAttack(this.cell.board.getCell(3, 0), 'WHITE')
        ) {
          return true;
        }
        if (
          target.x === 6 &&
          target.y === 0 &&
          this.cell.board.getCell(6, 0).figure === null &&
          !this.cell.isCellUnderAttack(this.cell.board.getCell(5, 0), 'WHITE')
        ) {
          return true;
        }
      }
    }
    return false;
  }

  /**Метод, который срабатывает при передвижении фигуры */
  public moveFigure(target: Cell): void {
    super.moveFigure(target);
    /**Проверка пешки на первый ход */
    this.isFirstStep = false;
  }

  /**Метод, который привязывает ладью к королю для рокировки */
  setRooks(): void {
    if (this.color === 'WHITE') {
      this.leftRook = this.cell.board.getCell(0, 7).figure;
      this.rightRook = this.cell.board.getCell(7, 7).figure;
    } else {
      this.leftRook = this.cell.board.getCell(0, 0).figure;
      this.rightRook = this.cell.board.getCell(7, 0).figure;
    }
  }
}
