'use client';

import Player from '@/models/Player';
import React, { useEffect, useRef, useState } from 'react';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

export default function Timer({ currentPlayer, restart }: TimerProps) {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);

  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  const decrementWhitePlayer = () => {
    setWhiteTime((prev) => prev - 1);
  };

  const decrementBlackPlayer = () => {
    setBlackTime((prev) => prev - 1);
  };

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback = currentPlayer?.color === 'WHITE' ? decrementWhitePlayer : decrementBlackPlayer;
    timer.current = setInterval(callback, 1000);
  };

  const handleRestart = () => {
    setBlackTime(300);
    setWhiteTime(300);
    restart();
  };

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  return (
    <div>
      <button type="button" onClick={handleRestart}>
        Restart
      </button>
      <h3>{`Чёрные - ${blackTime}`}</h3>
      <h3>{`Белые - ${whiteTime}`}</h3>
    </div>
  );
}
