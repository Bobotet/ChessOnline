import Figure, { FigureNames } from './Figure';
import blackFigureImg from '../../../public/images/figures/pawn_b.png';
import whiteFigureImg from '../../../public/images/figures/pawn_w.png';

export default class Pawn extends Figure {
  constructor(color: 'WHITE' | 'BLACK', name: FigureNames | null) {
    super(color, name);
    this.img = color === 'BLACK' ? blackFigureImg : whiteFigureImg;
  }
}
