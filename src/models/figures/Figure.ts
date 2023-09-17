import { StaticImageData } from 'next/image';

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

  constructor(color: 'WHITE' | 'BLACK', name: FigureNames | null) {
    this.color = color;
    this.img = null;
    this.name = name;
  }
}
