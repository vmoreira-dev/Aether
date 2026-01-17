"use client";

import { useState } from "react";

export default function useCardHoverTilt(height: number = 320) {
  const [style, setStyle] = useState<React.CSSProperties>({
    height,
    transform: "rotateX(0deg) rotateY(0deg) scale(1)",
  });

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    if (!Number.isFinite(x) || !Number.isFinite(y)) return;

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
