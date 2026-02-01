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

    // 慣性スクロール用の変数
    let targetScrollLeft = 0;
    let currentScrollLeft = 0;
    let animationId: number | null = null;
    const ease = 0.12; // イージング係数（大きいほど速く追従）
    const speedMultiplier = 0.8; // スクロール速度（大きいほど速い）

    // 滑らかなアニメーション
    const animate = () => {
      const diff = targetScrollLeft - currentScrollLeft;

      // 差が小さくなったらアニメーション停止
      if (Math.abs(diff) < 0.5) {
        currentScrollLeft = targetScrollLeft;
        container.scrollLeft = currentScrollLeft;
        animationId = null;
        return;
      }

      // イージングを適用
      currentScrollLeft += diff * ease;
      container.scrollLeft = currentScrollLeft;
      animationId = requestAnimationFrame(animate);
    };

    // ホイールで横スクロール（下に回す → 左にスクロール）
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // 初回または停止中は現在位置を同期
      if (animationId === null) {
        currentScrollLeft = container.scrollLeft;
        targetScrollLeft = currentScrollLeft;
      }

      // deltaYが正（下スクロール）→ scrollLeftを減らす（左に移動）
      targetScrollLeft -= e.deltaY * speedMultiplier;

      // 範囲制限
      const maxScroll = container.scrollWidth - container.clientWidth;
      targetScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScroll));

      // アニメーション開始
      if (animationId === null) {
        animationId = requestAnimationFrame(animate);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
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
