"use client";

import { useRef, useEffect, useState } from "react";
import BookSpread from "@/components/ui/BookSpread";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // 初期位置を右端に設定
    requestAnimationFrame(() => {
      container.scrollLeft = container.scrollWidth;
      setIsReady(true);
    });

    // ホイールで横スクロール（下に回す → 左にスクロール）
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // deltaYが正（下スクロール）→ scrollLeftを減らす（左に移動）
      container.scrollLeft -= e.deltaY * 2;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <main className="flex min-h-screen w-full items-center bg-stone-700 overflow-hidden">
      {/* 横スクロールコンテナ */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-32 overflow-x-scroll overflow-y-hidden w-full h-screen px-16 scrollbar-hide"
        style={{ opacity: isReady ? 1 : 0 }}
      >
        {/* 3つの本を並べる */}
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex-shrink-0 w-[min(95vw,90vh*1.7)]">
            <BookSpread />
          </div>
        ))}
        {/* 右側の余白 */}
        <div className="flex-shrink-0 w-16" />
      </div>
    </main>
  );
}
