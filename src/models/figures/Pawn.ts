import Figure, { FigureNames } from './Figure';
import blackFigureImg from '../../../public/images/figures/pawn_b.png';
import whiteFigureImg from '../../../public/images/figures/pawn_w.png';
import Cell from '../Cell';

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
  moveFigure(target: Cell): void {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}
