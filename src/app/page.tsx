'use client';

import ChangeFigure from '@/components/ChangeFigure';
import ChessBoard from '@/components/ChessBoard';
import LostFigures from '@/components/LostFigures';
import Timer from '@/components/Timer';
/*import Timer from '@/components/TImer';*/
import Board from '@/models/Board';
import Player from '@/models/Player';
import { FigureNames } from '@/models/figures/Figure';
import React, { useMemo, useState } from 'react';

export default function Home() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer] = useState(new Player('WHITE'));
  const [blackPlayer] = useState(new Player('BLACK'));
  const [check, setCheck] = useState(false);
  const [mate, setMate] = useState(false);
  const [stalemate, setStalemate] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [changingFigureProcess, setChangingFigureProcess] = useState(false);
  const [changingFigure, setChangingFigure] = useState<{
    name: FigureNames.QUEEN | FigureNames.ROOK | FigureNames.KNIGHT | FigureNames.BISHOP;
    color: 'WHITE' | 'BLACK';
  } | null>(null);

  const createNewBoard = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  };

  const changePlayer = () => {
    currentPlayer === whitePlayer ? setCurrentPlayer(blackPlayer) : setCurrentPlayer(whitePlayer);
  };

  useMemo(() => {
    createNewBoard();
    setCurrentPlayer(whitePlayer);
  }, []);

  return (
    <main className="flex flex-col justify-center items-center mt-[100px]">
      <p>{check ? 'Шах' : 'нешах'}</p>
      <p>{mate ? 'Мат' : 'немат'}</p>
      <p>{stalemate ? 'Пат' : 'непат'}</p>
      <Timer currentPlayer={currentPlayer} restart={createNewBoard} />
      <LostFigures figures={board.lostWhiteFigures} />
      <ChessBoard
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        changePlayer={changePlayer}
        setCheck={setCheck}
        setMate={setMate}
        setStalemate={setStalemate}
        setChangingFigureProcess={setChangingFigureProcess}
        changingFigure={changingFigure}
        changingFigureProcess={changingFigureProcess}
      />
      <LostFigures figures={board.lostBlackFigures} />
      {changingFigureProcess ? (
        <ChangeFigure
          color={currentPlayer?.color === 'WHITE' ? 'BLACK' : 'WHITE'}
          setChangingFigure={setChangingFigure}
          setChangingFigureProcess={setChangingFigureProcess}
        />
      ) : null}
    </main>
  );
}
