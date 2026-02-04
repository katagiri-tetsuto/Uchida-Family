"use client";

import React, {
  ReactNode,
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";

// スケールコンテキストを作成
const ScaleContext = createContext<number>(1);

// スケール値を取得するためのフック
export function useBookScale() {
  return useContext(ScaleContext);
}

interface BookSpreadProps {
  leftPage?: ReactNode;
  rightPage?: ReactNode;
  leftTitle?: string;
  rightTitle?: string;
  className?: string;
}

export default function BookSpread({
  leftPage,
  rightPage,
  leftTitle,
  rightTitle,
  className = "",
}: BookSpreadProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        // 基準幅を800pxとして、現在の幅との比率でスケールを計算
        const containerWidth = containerRef.current.offsetWidth;
        const baseWidth = 800;
        setScale(containerWidth / baseWidth);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    // ResizeObserverでコンテナサイズの変更も監視
    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateScale);
      resizeObserver.disconnect();
    };
  }, []);

  // スケールに基づいた値を計算するヘルパー関数
  const s = (value: number) => `${value * scale}px`;

  return (
    <ScaleContext.Provider value={scale}>
      <div
        ref={containerRef}
        className={`relative w-full mx-auto flex flex-col items-center justify-center ${className}`}
      >
        {/* 黒い外枠（表紙） */}
        <div
          className="relative w-full aspect-[1.7/1] bg-[#2a2a2a] shadow-2xl flex items-center"
          style={{
            borderRadius: s(6),
            paddingLeft: s(32),
            paddingRight: s(32),
            paddingTop: s(12),
            paddingBottom: s(12),
          }}
        >
          {/* 左側の厚み（小口） */}
          <div
            className="absolute bg-[#e6ddd0] border-l border-y border-gray-400/30 z-0"
            style={{
              top: s(12),
              bottom: s(12),
              left: s(10),
              width: s(22),
              borderTopLeftRadius: s(3),
              borderBottomLeftRadius: s(3),
            }}
          >
            <div className="w-full h-full opacity-40 bg-[repeating-linear-gradient(180deg,transparent,transparent_1px,rgba(0,0,0,0.08)_1px,rgba(0,0,0,0.08)_2px)] mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
          </div>

          {/* 右側の厚み（小口） */}
          <div
            className="absolute bg-[#e6ddd0] border-r border-y border-gray-400/30 z-0"
            style={{
              top: s(12),
              bottom: s(12),
              right: s(10),
              width: s(22),
              borderTopRightRadius: s(3),
              borderBottomRightRadius: s(3),
            }}
          >
            <div className="w-full h-full opacity-40 bg-[repeating-linear-gradient(180deg,transparent,transparent_1px,rgba(0,0,0,0.08)_1px,rgba(0,0,0,0.08)_2px)] mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent" />
          </div>

          {/* 見開きページコンテナ */}
          <div
            className="relative flex-1 h-full flex bg-[#fdfaf5] overflow-hidden z-10 shadow-md"
            style={{ borderRadius: s(2) }}
          >
            {/* 古紙のテクスチャ（オーバーレイ） */}
            <div className="absolute inset-0 bg-[#f7f3e8] mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] pointer-events-none" />

            {/* 左ページ */}
            <div className="flex-1 relative h-full border-r border-[#e0dacc] overflow-hidden">
              {/* コンテンツエリア - 固定サイズでスケール */}
              <div
                className="absolute z-10 flex flex-col overflow-hidden"
                style={{
                  width: "400px",
                  height: "500px",
                  padding: "32px",
                  transform: `scale(${scale * 0.85})`,
                  transformOrigin: "top left",
                }}
              >
                {leftTitle && (
                  <div className="flex justify-center flex-shrink-0 mb-4">
                    <h2 className="font-serif text-gray-700 border-b-2 border-gray-300/50 text-xl pb-2 px-6">
                      {leftTitle}
                    </h2>
                  </div>
                )}
                <div className="flex-1 text-gray-800 font-serif overflow-hidden text-sm leading-relaxed">
                  {leftPage}
                </div>
              </div>

              {/* ノド（内側）の影 */}
              <div
                className="absolute top-0 bottom-0 right-0 bg-gradient-to-l from-black/15 via-black/5 to-transparent pointer-events-none mix-blend-multiply"
                style={{ width: s(60) }}
              />
            </div>

            {/* 右ページ */}
            <div className="flex-1 relative h-full overflow-hidden">
              {/* コンテンツエリア - 固定サイズでスケール */}
              <div
                className="absolute z-10 flex flex-col overflow-hidden"
                style={{
                  width: "400px",
                  height: "500px",
                  padding: "32px",
                  transform: `scale(${scale * 0.85})`,
                  transformOrigin: "top left",
                }}
              >
                {rightTitle && (
                  <div className="flex justify-center flex-shrink-0 mb-4">
                    <h2 className="font-serif text-gray-700 border-b-2 border-gray-300/50 text-xl pb-2 px-6">
                      {rightTitle}
                    </h2>
                  </div>
                )}
                <div className="flex-1 text-gray-800 font-serif overflow-hidden text-sm leading-relaxed">
                  {rightPage}
                </div>
              </div>

              {/* ノド（内側）の影 */}
              <div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-black/15 via-black/5 to-transparent pointer-events-none mix-blend-multiply"
                style={{ width: s(60) }}
              />
            </div>

            {/* 中央の綴じ目 */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-black/20" />
          </div>
        </div>
      </div>
    </ScaleContext.Provider>
  );
}
