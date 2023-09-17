import Cell from '@/models/Cell';
import Image from 'next/image';
import React from 'react';

interface ChessCellProps {
  cell: Cell;
}

export default function ChessCell({ cell }: ChessCellProps) {
  return (
    <div
      className={`w-[50px] h-[50px] ${cell.color === 'WHITE' ? 'bg-whiteCell' : 'bg-blackCell'} ${cell.x} ${cell.y}`}
    >
      {cell.figure?.img ? (
        <Image src={cell.figure.img} alt={cell.figure.name + cell.figure.color} width={50} height={50} />
      ) : null}
    </div>
  );
}
