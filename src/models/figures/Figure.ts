import { StaticImageData } from 'next/image';
import Cell from '../Cell';

export enum FigureNames {
  'BISHOP',
  'KING',
  'KNIGHT',
  'PAWN',
  'QUEEN',
  'ROOK',
}

export default class Figure {
  color: 'WHITE' | 'BLACK';
  img: StaticImageData | null;
  name: FigureNames | null;
  cell: Cell;
  id: number = Math.random();

  constructor(color: 'WHITE' | 'BLACK', name: FigureNames | null, cell: Cell) {
    this.color = color;
    this.img = null;
    this.name = name;
    this.cell = cell;
  }

  /**Метод отвечающий за передвижение фигур
   * В атрибуте target лежит клетка, на которую игрок хочет походить
   */
  public canMove(target: Cell): boolean {
    /**Свои фигуры бить нельзя */
    if (target.figure?.color === this.color) {
      return false;
    }
    /**Нельзя бить короля */
    if (target.figure?.name === FigureNames.KING) {
      return false;
    }
    return true;
  }
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  moveFigure(target: Cell) {}
}
