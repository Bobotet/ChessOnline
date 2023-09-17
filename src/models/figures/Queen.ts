import Figure, { FigureNames } from './Figure';
import blackFigureImg from '../../../public/images/figures/queen_b.png';
import whiteFigureImg from '../../../public/images/figures/queen_w.png';

export default class Queen extends Figure {
  constructor(color: 'WHITE' | 'BLACK', name: FigureNames | null) {
    super(color, name);
    this.img = color === 'BLACK' ? blackFigureImg : whiteFigureImg;
  }
}
