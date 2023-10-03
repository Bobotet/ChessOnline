import Figure, { FigureNames } from './Figure';
import blackFigureImg from '../../../public/images/figures/pawn_b.png';
import whiteFigureImg from '../../../public/images/figures/pawn_w.png';
import Cell from '../Cell';
import Queen from './Queen';
import Rook from './Rook';
import Knight from './Knight';
import Bishop from './Bishop';

export default class Pawn extends Figure {
  isFirstStep: boolean = true;
  constructor(color: 'WHITE' | 'BLACK', name: FigureNames | null, cell: Cell) {
    super(color, name, cell);
    this.img = color === 'BLACK' ? blackFigureImg : whiteFigureImg;
  }

  public canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const direction = this.color === 'BLACK' ? 1 : -1;
    const firstStepDirection = this.color === 'BLACK' ? 2 : -2;
    if (
      (target.y === this.cell.y + direction || (this.isFirstStep && target.y === this.cell.y + firstStepDirection)) &&
      target.x === this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }
    if (
      target.y === this.cell.y + direction &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      this.cell.isEnemy(target)
    ) {
      return true;
    }
    return false;
  }

  public moveFigure(target: Cell): void {
    super.moveFigure(target);
    /**Проверка пешки на первый ход */
    this.isFirstStep = false;
  }

  /**Метод, который определяет, может ли пешка трансформироваться в другую фигуру */
  static pawnCanTransform(figure: Figure): boolean {
    if (figure.color === 'WHITE' && figure.cell.y === 0) {
      return true;
    }
    if (figure.color === 'BLACK' && figure.cell.y === 7) {
      return true;
    }
    return false;
  }

  /**Трансформирует пешку */
  static pawnTransform(
    changedFigure: {
      name: FigureNames.QUEEN | FigureNames.ROOK | FigureNames.KNIGHT | FigureNames.BISHOP;
      color: 'WHITE' | 'BLACK';
    } | null,
    cell: Cell
  ) {
    let figure: Figure | null = null;
    switch (changedFigure?.name) {
      case FigureNames.QUEEN: {
        figure = new Queen(changedFigure.color, FigureNames.QUEEN, cell);
        break;
      }
      case FigureNames.ROOK: {
        figure = new Rook(changedFigure.color, FigureNames.QUEEN, cell);
        break;
      }
      case FigureNames.KNIGHT: {
        figure = new Knight(changedFigure.color, FigureNames.QUEEN, cell);
        break;
      }
      case FigureNames.BISHOP: {
        figure = new Bishop(changedFigure.color, FigureNames.QUEEN, cell);
        break;
      }
      default: {
        break;
      }
    }
    figure ? cell.setFigure(figure) : null;
  }
}
