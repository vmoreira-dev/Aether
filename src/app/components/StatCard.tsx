"use client";

import { useState } from "react";

type TiltStyle = React.CSSProperties;

export default function useCardHoverTilt() {
  const [style, setStyle] = useState<TiltStyle>({
    transform: "rotateX(0deg) rotateY(0deg) scale(1)",
  });

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    if (!Number.isFinite(x) || !Number.isFinite(y)) return;

    setStyle({
      transform: `
        rotateX(${(0.5 - y) * 2.5}deg)
        rotateY(${(x - 0.5) * 2.5}deg)
        scale(1.02)
      `,
    });
  }

  function handleLeave() {
    setStyle({
      transform: "rotateX(0deg) rotateY(0deg) scale(1)",
    });
  }

  return {
    style,
    handleMove,
    handleLeave,
  };
}
