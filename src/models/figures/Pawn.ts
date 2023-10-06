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
  canBeTakeOnThePass: boolean = false;
  constructor(color: 'WHITE' | 'BLACK', name: FigureNames | null, cell: Cell) {
    super(color, name, cell);
    this.img = color === 'BLACK' ? blackFigureImg : whiteFigureImg;
  }

  public setCanBeTakeOnThePass(canBeTakeOnThePass: boolean) {
    this.canBeTakeOnThePass = canBeTakeOnThePass;
  }

  public canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const direction = this.color === 'BLACK' ? 1 : -1;
    const firstStepDirection = this.color === 'BLACK' ? 2 : -2;
    /**Отмечаем соседей пешки для взятия на проходе */
    let rightNeighbour = null;
    let letftNeighbour = null;
    if (target.x === this.cell.x - 1 && target.y === this.cell.y + direction) {
      letftNeighbour = this.cell.board.getCell(target.x, target.y - direction)?.figure;
    }
    if (target.x === this.cell.x + 1 && target.y === this.cell.y + direction) {
      rightNeighbour = this.cell.board.getCell(target.x, target.y - direction)?.figure;
    }

    if (
      rightNeighbour &&
      rightNeighbour instanceof Pawn &&
      rightNeighbour!.color !== this.color &&
      rightNeighbour.canBeTakeOnThePass &&
      this.cell.board.takeOnThePassFigureId === rightNeighbour.id
    ) {
      return true;
    }
    if (
      letftNeighbour &&
      letftNeighbour instanceof Pawn &&
      letftNeighbour!.color !== this.color &&
      letftNeighbour.canBeTakeOnThePass &&
      this.cell.board.takeOnThePassFigureId === letftNeighbour.id
    ) {
      return true;
    }
    if (
      target.y === this.cell.y + direction &&
      target.x === this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }
    if (
      this.isFirstStep &&
      target.y === this.cell.y + firstStepDirection &&
      this.cell.board.getCell(target.x, target.y).isEmpty() &&
      this.cell.board.getCell(target.x, target.y - direction).isEmpty() &&
      target.x === this.cell.x
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
