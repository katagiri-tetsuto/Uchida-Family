"use client";

import { useRef, useEffect } from "react";
import BookSpread from "@/components/ui/BookSpread";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const currentScrollLeft = useRef(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // 初期位置を右端に設定
    container.scrollLeft = container.scrollWidth;

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startY.current = e.clientY;
      currentScrollLeft.current = container.scrollLeft;
      container.style.cursor = "grabbing";
      e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaY = e.clientY - startY.current;
      // 下にドラッグ → 左にスクロール
      container.scrollLeft = currentScrollLeft.current - deltaY * 3;
    };

    const onMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        container.style.cursor = "grab";
      }
    };

    container.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <main className="flex min-h-screen w-full items-center bg-stone-700 overflow-hidden select-none">
      {/* 横スクロールコンテナ */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-32 overflow-x-scroll overflow-y-hidden w-full h-screen px-16 cursor-grab scrollbar-hide"
      >
        {/* 3つの本を並べる */}
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className="flex-shrink-0 w-[min(95vw,90vh*1.7)] pointer-events-none"
          >
            <BookSpread />
          </div>
        ))}
        {/* 右側の余白 */}
        <div className="flex-shrink-0 w-16" />
      </div>
    </main>
  );
}
