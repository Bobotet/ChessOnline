import React, { Fragment } from 'react';
import Board from '@/models/Board';
import ChessCell from './ChessCell';

const horizontalLine = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalLine = [1, 2, 3, 4, 5, 6, 7, 8];

interface ChessBoardProps {
  board: Board;
}

export default function ChessBoard({ board }: ChessBoardProps) {
  return (
    <div className="grid grid-rows-boardVartical grid-cols-boardHorizontal">
      <div className="flex flex-col items-center justify-around">
        {verticalLine.map((e, index) => (
          <span key={index} className="text-[18px]">
            {e}
          </span>
        ))}
      </div>
      <div className="grid grid-rows-8 grid-cols-8 w-[400px] h-[400px]">
        {board.cells.map((row, index) => (
          <Fragment key={index}>
            {row.map((cell) => (
              <ChessCell key={`${cell.x}${cell.y}`} cell={cell} />
            ))}
          </Fragment>
        ))}
      </div>
      <div className="flex justify-around items-center w-[400px] ml-[20px]">
        {horizontalLine.map((e) => (
          <span key={e}>{e}</span>
        ))}
      </div>
    </div>
  );
}
