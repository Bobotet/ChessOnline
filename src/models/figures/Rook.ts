import Figure, { FigureNames } from './Figure';
import blackFigureImg from '../../../public/images/figures/rook_b.png';
import whiteFigureImg from '../../../public/images/figures/rook_w.png';

export default class Rook extends Figure {
  constructor(color: 'WHITE' | 'BLACK', name: FigureNames | null) {
    super(color, name);
    this.img = color === 'BLACK' ? blackFigureImg : whiteFigureImg;
  }
}
