"use client";

import React, { ReactNode } from "react";

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
  return (
    <div
      className={`relative w-full mx-auto flex flex-col items-center justify-center ${className}`}
    >
      {/* 黒い外枠（表紙） */}
      <div className="relative w-full aspect-[1.7/1] bg-[#2a2a2a] rounded-[6px] pl-4 pr-4 py-2 md:pl-8 md:pr-8 md:py-3 shadow-2xl flex items-center">
        {/* 左側の厚み（小口） */}
        <div className="absolute top-[8px] bottom-[8px] md:top-[12px] md:bottom-[12px] left-[6px] md:left-[10px] w-[10px] md:w-[22px] bg-[#e6ddd0] rounded-l-[3px] border-l border-y border-gray-400/30 z-0">
          <div className="w-full h-full opacity-40 bg-[repeating-linear-gradient(180deg,transparent,transparent_1px,rgba(0,0,0,0.08)_1px,rgba(0,0,0,0.08)_2px)] mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
        </div>

        {/* 右側の厚み（小口） */}
        <div className="absolute top-[8px] bottom-[8px] md:top-[12px] md:bottom-[12px] right-[6px] md:right-[10px] w-[10px] md:w-[22px] bg-[#e6ddd0] rounded-r-[3px] border-r border-y border-gray-400/30 z-0">
          <div className="w-full h-full opacity-40 bg-[repeating-linear-gradient(180deg,transparent,transparent_1px,rgba(0,0,0,0.08)_1px,rgba(0,0,0,0.08)_2px)] mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent" />
        </div>

        {/* 見開きページコンテナ */}
        <div className="relative flex-1 h-full flex bg-[#fdfaf5] rounded-[2px] overflow-hidden z-10 shadow-md">
          {/* 古紙のテクスチャ（オーバーレイ） */}
          <div className="absolute inset-0 bg-[#f7f3e8] mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] pointer-events-none" />

          {/* 左ページ */}
          <div className="flex-1 relative h-full border-r border-[#e0dacc] overflow-hidden">
            {/* コンテンツエリア */}
            <div className="absolute inset-0 z-10 p-8 md:p-14 flex flex-col overflow-hidden">
              {leftTitle && (
                <div className="mb-6 flex justify-center flex-shrink-0">
                  <h2 className="text-xl md:text-2xl font-serif text-gray-700 border-b-2 border-gray-300/50 pb-2 px-8">
                    {leftTitle}
                  </h2>
                </div>
              )}
              <div className="flex-1 text-gray-800 font-serif leading-loose text-sm md:text-base overflow-hidden">
                {leftPage}
              </div>
            </div>

            {/* ノド（内側）の影 */}
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black/15 via-black/5 to-transparent pointer-events-none mix-blend-multiply" />
          </div>

          {/* 右ページ */}
          <div className="flex-1 relative h-full overflow-hidden">
            {/* コンテンツエリア */}
            <div className="absolute inset-0 z-10 p-8 md:p-14 flex flex-col overflow-hidden">
              {rightTitle && (
                <div className="mb-6 flex justify-center flex-shrink-0">
                  <h2 className="text-xl md:text-2xl font-serif text-gray-700 border-b-2 border-gray-300/50 pb-2 px-8">
                    {rightTitle}
                  </h2>
                </div>
              )}
              <div className="flex-1 text-gray-800 font-serif leading-loose text-sm md:text-base overflow-hidden">
                {rightPage}
              </div>
            </div>

            {/* ノド（内側）の影 */}
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black/15 via-black/5 to-transparent pointer-events-none mix-blend-multiply" />
          </div>

          {/* 中央の綴じ目 */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-black/20" />
        </div>
      </div>
    </div>
  );
}
