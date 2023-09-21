import Figure, { FigureNames } from './Figure';
import blackFigureImg from '../../../public/images/figures/king_b.png';
import whiteFigureImg from '../../../public/images/figures/king_w.png';
import Cell from '../Cell';

export default class King extends Figure {
  constructor(color: 'WHITE' | 'BLACK', name: FigureNames | null, cell: Cell) {
    super(color, name, cell);
    this.img = color === 'BLACK' ? blackFigureImg : whiteFigureImg;
  }

  public canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
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
        this.cell.isEnemy(this.cell.board.getCell(target.x, target.y)))
    ) {
      return true;
    }
    return false;
  }
}
