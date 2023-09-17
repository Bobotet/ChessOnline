import Figure from './figures/Figure';

export default class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: 'WHITE' | 'BLACK';
  figure: Figure | null;
  available: boolean;

  constructor(x: number, y: number, color: 'WHITE' | 'BLACK', figure: Figure | null) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.available = false;
  }
}
