import React from 'react';
import Image from 'next/image';
import { FigureNames } from '@/models/figures/Figure';
import blackKnightImg from '../../public/images/figures/knight_b.png';
import whiteKnightImg from '../../public/images/figures/knight_w.png';
import blackRookImg from '../../public/images/figures/rook_b.png';
import whiteRookImg from '../../public/images/figures/rook_w.png';
import blackQueenImg from '../../public/images/figures/queen_b.png';
import whiteQueenImg from '../../public/images/figures/queen_w.png';
import blackBishopImg from '../../public/images/figures/bishop_b.png';
import whiteBishopImg from '../../public/images/figures/bishop_w.png';

interface ChangeFigureProps {
  color: 'WHITE' | 'BLACK';
  setChangingFigure: (changingFigure: {
    name: FigureNames.QUEEN | FigureNames.ROOK | FigureNames.KNIGHT | FigureNames.BISHOP;
    color: 'WHITE' | 'BLACK';
  }) => void;
  setChangingFigureProcess: (changingFigureProcess: boolean) => void;
}

export default function ChangeFigure({ color, setChangingFigure, setChangingFigureProcess }: ChangeFigureProps) {
  const chageFigure = (
    changeFigureName: FigureNames.QUEEN | FigureNames.ROOK | FigureNames.KNIGHT | FigureNames.BISHOP,
    changeFigurColor: 'WHITE' | 'BLACK'
  ) => {
    setChangingFigure({ name: changeFigureName, color: changeFigurColor });
    setChangingFigureProcess(false);
  };
  return (
    <div className="absolute">
      <h2 className="text-[30px] font-semibold">Выберите фигуру:</h2>
      <div className="flex flex-row">
        <Image
          src={color === 'WHITE' ? whiteQueenImg : blackQueenImg}
          alt="queen"
          width={60}
          height={60}
          className="cursor-pointer"
          onClick={() => chageFigure(FigureNames.QUEEN, color)}
        />
        <Image
          src={color === 'WHITE' ? whiteRookImg : blackRookImg}
          alt="rook"
          width={60}
          height={60}
          className="cursor-pointer"
          onClick={() => chageFigure(FigureNames.ROOK, color)}
        />
        <Image
          src={color === 'WHITE' ? whiteKnightImg : blackKnightImg}
          alt="knight"
          width={60}
          height={60}
          className="cursor-pointer"
          onClick={() => chageFigure(FigureNames.KNIGHT, color)}
        />
        <Image
          src={color === 'WHITE' ? whiteBishopImg : blackBishopImg}
          alt="bishop"
          width={60}
          height={60}
          className="cursor-pointer"
          onClick={() => chageFigure(FigureNames.BISHOP, color)}
        />
      </div>
    </div>
  );
}
