import Cell from '@/models/Cell';
import Image from 'next/image';
import React from 'react';

interface ChessCellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

export default function ChessCell({ cell, selected, click }: ChessCellProps) {
  return (
    <div
      onClick={() => click(cell)}
      className={`flex items-center w-[60px] h-[60px] ${cell.color === 'WHITE' ? 'bg-whiteCell' : 'bg-blackCell'} ${
        selected ? 'border-4 border-sky-500' : ''
      } ${cell.available && cell.figure && cell.color === 'WHITE' ? '!bg-activeWhiteCell' : ''}  ${
        cell.available && cell.figure && cell.color === 'BLACK' ? '!bg-activeBlackCell' : ''
      } ${cell.available ? 'cursor-pointer' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={() => click(cell)}
    >
      {cell.figure?.img ? (
        <Image
          src={cell.figure.img}
          alt={cell.figure.name + cell.figure.color}
          width={60}
          height={60}
          className="cursor-pointer"
          draggable
          onDragStart={() => {
            click(cell);
          }}
        />
      ) : null}
      {cell.available && !cell.figure ? (
        <div className="w-[15px] h-[15px] rounded-xl bg-[#777] mx-auto opacity-60" />
      ) : (
        ''
      )}
    </div>
  );
}
