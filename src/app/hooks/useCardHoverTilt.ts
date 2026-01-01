"use client";

import { useState } from "react";

export default function useCardHoverTilt(height: number) {
  const [style, setStyle] = useState<React.CSSProperties>({ height });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setStyle({
      height,
      transform: `rotateX(${(0.5 - y) * 2.5}deg) rotateY(${
        (x - 0.5) * 2.5
      }deg) scale(1.01)`,
    });
  }

  function handleLeave() {
    setStyle({
      height,
      transform: "rotateX(0deg) rotateY(0deg) scale(1)",
    });
  }

  return { style, handleMove, handleLeave };
}
