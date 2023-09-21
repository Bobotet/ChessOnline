import Figure, { FigureNames } from './Figure';
import blackFigureImg from '../../../public/images/figures/knight_b.png';
import whiteFigureImg from '../../../public/images/figures/knight_w.png';
import Cell from '../Cell';

export default class Knight extends Figure {
  constructor(color: 'WHITE' | 'BLACK', name: FigureNames | null, cell: Cell) {
    super(color, name, cell);
    this.img = color === 'BLACK' ? blackFigureImg : whiteFigureImg;
  }

  public canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const dx = Math.abs(target.x - this.cell.x);
    const dy = Math.abs(target.y - this.cell.y);
    if ((dx === 1 && dy === 2) || (dx === 2 && dy === 1)) {
      return true;
    }
    return false;
  }
}
