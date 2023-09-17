'use client';

import ChessBoard from '@/components/ChessBoard';
import Board from '@/models/Board';
import React, { useMemo, useState } from 'react';

export default function Home() {
  const [board, setBoard] = useState(new Board());

  const createNewBoard = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  };

  useMemo(() => {
    createNewBoard();
  }, []);

  return (
    <main className="flex justify-center mt-[100px]">
      <ChessBoard board={board} />
    </main>
  );
}
