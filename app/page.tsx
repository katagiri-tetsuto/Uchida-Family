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
        className="flex items-center gap-80 overflow-x-scroll overflow-y-hidden w-full h-screen px-16 scrollbar-hide"
        style={{ opacity: isReady ? 1 : 0 }}
      >
        {/* 残りの本（プレースホルダーとしてシンプルに） */}
        {[3, 2].map((num) => (
          <div key={num} className="flex-shrink-0 w-[min(95vw,90vh*1.7)]">
            <BookSpread
              leftPage={
                <div className="h-full flex items-center justify-center">
                  <span className="text-gray-300 font-serif text-4xl italic">
                    Vol. {num}
                  </span>
                </div>
              }
              rightPage={
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400 font-serif">準備中...</p>
                </div>
              }
            />
          </div>
        ))}

        {/* 1つ目（自己紹介） - 右端（最後）に配置 */}
        <div className="flex-shrink-0 w-[min(95vw,90vh*1.7)]">
          <BookSpread
            leftPage={
              <div className="h-full flex flex-col items-center justify-center p-4">
                {/* 写真風のデザイン */}
                <div className="bg-white p-3 shadow-lg rotate-[-2deg] transform transition-transform hover:scale-105 duration-500 hover:rotate-0">
                  <div className="w-48 h-64 md:w-64 md:h-80 bg-stone-200 relative overflow-hidden flex items-center justify-center">
                    {/* 写真プレースホルダー */}
                    <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center text-neutral-400">
                      <span className="text-4xl font-thin tracking-widest opacity-50">
                        PHOTO
                      </span>
                    </div>
                    {/* 画像がある場合はここに <Image /> を配置 */}
                  </div>
                </div>

                <div className="mt-8 text-center space-y-2 font-serif">
                  <h3 className="text-xl text-gray-800 tracking-widest border-b border-gray-400 pb-1">
                    内田 太郎
                  </h3>
                  <p className="text-xs text-gray-500 tracking-wider">
                    Taro Uchida / Designer
                  </p>
                </div>
              </div>
            }
            rightPage={
              <div className="h-full flex flex-col justify-center p-2 md:p-6">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-serif text-gray-800 tracking-widest mb-2">
                    ご挨拶
                  </h2>
                  <div className="w-8 h-px bg-gray-400 mx-auto"></div>
                </div>

                <div className="space-y-6 text-sm md:text-base leading-relaxed font-serif text-gray-700">
                  <p>
                    はじめまして。内田と申します。
                    <br />
                    この本をお手に取っていただき、ありがとうございます。
                  </p>
                  <p>
                    私は普段、デジタルプロダクトのデザインを中心に活動していますが、
                    温かみのあるアナログな表現も大好きです。
                    このポートフォリオでは、そんな私の「好き」を詰め込んだ
                    世界観を表現してみました。
                  </p>
                  <p>
                    休日はカメラを持って散歩に出かけたり、
                    お気に入りのカフェで読書をして過ごしています。
                    日常のふとした瞬間に隠れている「美しさ」を見つけることが、
                    私のデザインのインスピレーションの源です。
                  </p>
                  <p>どうぞ、ごゆっくりご覧ください。</p>
                </div>

                <div className="mt-auto pt-8 flex justify-end">
                  {/* サイン風 */}
                  <span className="font-serif italic text-gray-500 text-lg">
                    T.Uchida
                  </span>
                </div>
              </div>
            }
          />
        </div>
        {/* 右側の余白 */}
        <div className="flex-shrink-0 w-16" />
      </div>
    </main>
  );
}
