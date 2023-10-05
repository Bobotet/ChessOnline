import Figure, { FigureNames } from './Figure';
import blackFigureImg from '../../../public/images/figures/rook_b.png';
import whiteFigureImg from '../../../public/images/figures/rook_w.png';
import Cell from '../Cell';

export default class Rook extends Figure {
  isFirstStep: boolean = true;
  constructor(color: 'WHITE' | 'BLACK', name: FigureNames | null, cell: Cell) {
    super(color, name, cell);
    this.img = color === 'BLACK' ? blackFigureImg : whiteFigureImg;
  }

  public canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.cell.isEmptyVertical(target) || this.cell.isEmptyHorizontal(target)) {
      return true;
    }
    return false;
  }

  /**Метод, который срабатывает при передвижении фигуры */
  public moveFigure(target: Cell): void {
    super.moveFigure(target);
    /**Проверка пешки на первый ход */
    this.isFirstStep = false;
  }
}
