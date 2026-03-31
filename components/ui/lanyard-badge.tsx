"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CARD_WIDTH = 220;
const CARD_HEIGHT = 300;
const CONTAINER_W = 384;
const CONTAINER_H = 480;
const ANCHOR_X = CONTAINER_W / 2;
const ANCHOR_Y = 40;
const REST_X = 82;
const REST_Y = 150;

export function LanyardBadge() {
  const [dragging, setDragging] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [card, setCard] = useState({
    x: REST_X,
    y: REST_Y,
    vx: 0,
    vy: 0,
    angle: 0,
    av: 0,
  });
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const animate = () => {
      setCard((c) => {
        let nx = c.x;
        let ny = c.y;
        let nvx = c.vx;
        let nvy = c.vy;
        if (!dragging) {
          const springX = (REST_X - c.x) * 0.028;
          const springY = (REST_Y - c.y) * 0.022;
          nvx = (c.vx + springX) * 0.9;
          nvy = (c.vy + springY) * 0.9;
          nx = c.x + nvx;
          ny = c.y + nvy;
        }

        const ropeDx = ANCHOR_X - (nx + CARD_WIDTH / 2);
        const nav = (c.av + ropeDx * 0.0006 - c.angle * 0.1) * 0.86;
        const nangle = c.angle + nav;
        return { x: nx, y: ny, vx: nvx, vy: nvy, angle: nangle, av: nav };
      });
      raf = window.requestAnimationFrame(animate);
    };
    raf = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(raf);
  }, [dragging]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    dragOffset.current.x = e.clientX - card.x;
    dragOffset.current.y = e.clientY - card.y;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [card.x, card.y]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) return;
      const nextX = e.clientX - dragOffset.current.x;
      const nextY = e.clientY - dragOffset.current.y;
      setCard((prev) => ({
        ...prev,
        x: Math.max(0, Math.min(CONTAINER_W - CARD_WIDTH, nextX)),
        y: Math.max(72, Math.min(CONTAINER_H - CARD_HEIGHT, nextY)),
        vx: 0,
        vy: 0,
      }));
    },
    [dragging],
  );

  const onPointerUp = useCallback(() => setDragging(false), []);

  const cardCenterX = card.x + CARD_WIDTH / 2;
  const cardTopY = card.y + 2;
  const controlX = (ANCHOR_X + cardCenterX) / 2 + (cardCenterX - ANCHOR_X) * 0.1;
  const controlY = (ANCHOR_Y + cardTopY) / 2 + 26;
  const ropePath = `M ${ANCHOR_X} ${ANCHOR_Y} Q ${controlX} ${controlY} ${cardCenterX} ${cardTopY}`;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="relative select-none"
        style={{ width: CONTAINER_W, height: CONTAINER_H }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          <circle cx={ANCHOR_X} cy={ANCHOR_Y} r="6.5" fill="#a1faff" />
          <path d={ropePath} stroke="#a1faff" strokeWidth="10" strokeLinecap="round" opacity="0.2" fill="none" />
          <path d={ropePath} stroke="#a1faff" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </svg>

        <div
          className="absolute rounded-xl border border-primary/70 overflow-hidden bg-surface-container-high shadow-[0_0_26px_rgba(161,250,255,0.36)]"
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            transform: `translate3d(${card.x}px, ${card.y}px, 0) rotate(${card.angle}rad) perspective(900px)`,
            transformOrigin: "50% 0%",
            cursor: dragging ? "grabbing" : "grab",
            touchAction: "none",
          }}
          onPointerDown={onPointerDown}
        >
          {imgError ? (
            <div className="w-full h-full bg-slate-300" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/img/avt.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
              style={{ objectPosition: "50% 42%" }}
              onError={() => setImgError(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
