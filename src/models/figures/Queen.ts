import Figure, { FigureNames } from './Figure';
import blackFigureImg from '../../../public/images/figures/queen_b.png';
import whiteFigureImg from '../../../public/images/figures/queen_w.png';
import Cell from '../Cell';

export default class Queen extends Figure {
  constructor(color: 'WHITE' | 'BLACK', name: FigureNames | null, cell: Cell) {
    super(color, name, cell);
    this.img = color === 'BLACK' ? blackFigureImg : whiteFigureImg;
  }

  public canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.cell.isEmptyVertical(target) || this.cell.isEmptyHorizontal(target) || this.cell.isEmptyDiagonal(target)) {
      return true;
    }
    return false;
  }
}
