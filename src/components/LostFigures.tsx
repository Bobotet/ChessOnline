import React from 'react';
import Figure from '@/models/figures/Figure';
import Image from 'next/image';

interface LostFiguresProps {
  figures: Figure[];
}

export default function LostFigures({ figures }: LostFiguresProps) {
  return (
    <div className="w-[420px] flex justify-start items-start">
      {figures.map((figure) =>
        figure.img ? <Image key={figure.id} src={figure.img} alt={`${figure.name}`} width={40} height={40} /> : null
      )}
    </div>
  );
}
