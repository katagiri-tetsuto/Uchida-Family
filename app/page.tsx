"use client";

import { useRef, useState, useEffect } from "react";
import BookSpread from "@/components/ui/BookSpread";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartY(e.clientY);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const deltaY = e.clientY - startY;
    // 下にドラッグ → 左にスクロール（deltaYが正なら左に移動）
    scrollContainerRef.current.scrollLeft = scrollLeft - deltaY * 2;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <main className="flex min-h-screen w-full items-center bg-stone-700 overflow-hidden">
      {/* 横スクロールコンテナ */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-8 overflow-x-auto overflow-y-hidden w-full h-screen px-8 cursor-grab active:cursor-grabbing scrollbar-hide"
        style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* 3つの本を並べる */}
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className="flex-shrink-0 w-[min(90vw,85vh*1.7)] h-[min(90vw/1.7,85vh)]"
          >
            <BookSpread />
          </div>
        ))}
        {/* 右側の余白 */}
        <div className="flex-shrink-0 w-8" />
      </div>
    </main>
  );
}
