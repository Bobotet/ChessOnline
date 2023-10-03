import React, { Fragment, useEffect, useState } from 'react';
import Board from '@/models/Board';
import Cell from '@/models/Cell';
import Player from '@/models/Player';
import { FigureNames } from '@/models/figures/Figure';
import Pawn from '@/models/figures/Pawn';
import ChessCell from './ChessCell';

const horizontalLine = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalLine = [8, 7, 6, 5, 4, 3, 2, 1];

interface ChessBoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  changePlayer: () => void;
  setCheck: (check: boolean) => void;
  setMate: (mate: boolean) => void;
  setStalemate: (stalemate: boolean) => void;
  setChangingFigureProcess: (changingFigureProcess: boolean) => void;
  changingFigure: {
    name: FigureNames.QUEEN | FigureNames.ROOK | FigureNames.KNIGHT | FigureNames.BISHOP;
    color: 'WHITE' | 'BLACK';
  } | null;
  changingFigureProcess: boolean;
}

export default function ChessBoard({
  board,
  setBoard,
  currentPlayer,
  changePlayer,
  setCheck,
  setMate,
  setStalemate,
  setChangingFigureProcess,
  changingFigure,
  changingFigureProcess,
}: ChessBoardProps) {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [changeCell, setChangeCell] = useState<Cell | null>(null);

  /**Функция, которая проверяет шах и/или мат */
  const checkOrMate = () => {
    if (board.checkBlackKing()) {
      setCheck(true);
      setMate(board.checkMate('BLACK'));
    } else if (board.checkWhiteKing()) {
      setCheck(true);
      setMate(board.checkMate('WHITE'));
    } else {
      setCheck(false);
      setMate(false);
      /**Проверка пата */
      setStalemate(board.checkMate(currentPlayer?.color === 'WHITE' ? 'BLACK' : 'WHITE'));
    }
  };

  /**Функия отрабатывающая при нажатии на клетку */
  const click = (cell: Cell) => {
    if (changingFigureProcess) return;
    /*Передвигаем фигуру*/
    /**Срабатывает, когда игрок уже выделил фигуру и нажал на другую клетку */
    if (selectedCell && cell.figure?.name !== FigureNames.KING && cell.available) {
      selectedCell.moveFigure(cell);
      if (cell.figure?.name === FigureNames.PAWN) {
        if (Pawn.pawnCanTransform(cell.figure)) {
          setChangeCell(cell);
          setChangingFigureProcess(true);
        } else {
          setChangingFigureProcess(false);
        }
      }
      setSelectedCell(null);
      checkOrMate();
      /**Передает ход след игроку */
      changePlayer();
    } else {
      /**Срабатывает, если до нажатия на клетку игрок не выделял фигур */
      if (cell?.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  };

  /**Функция, копирующая доску */
  const copyBoard = () => {
    setBoard(board.copyBoard());
  };

  /**Функция, подсвечивающая клетки */
  const highLight = () => {
    board.highLightCells(selectedCell);
    copyBoard();
  };

  useEffect(() => {
    highLight();
  }, [selectedCell]);

  useEffect(() => {
    if (changeCell) {
      Pawn.pawnTransform(changingFigure, changeCell);
      setChangeCell(null);
      checkOrMate();
    }
  }, [changingFigure]);
  return (
    <div className="grid grid-rows-boardVartical grid-cols-boardHorizontal">
      <div className="flex flex-col items-center justify-around">
        {verticalLine.map((e, index) => (
          <span key={index} className="text-[18px]">
            {e}
          </span>
        ))}
      </div>
      <div className="grid grid-rows-8 grid-cols-8 w-[480px] h-[480px]">
        {board.cells.map((row, index) => (
          <Fragment key={index}>
            {row.map((cell) => (
              <ChessCell
                key={`${cell.x}${cell.y}`}
                click={() => click(cell)}
                cell={cell}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div className="flex justify-around items-center w-[480px] ml-[20px]">
        {horizontalLine.map((e) => (
          <span key={e} className="text-[18px]">
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}
