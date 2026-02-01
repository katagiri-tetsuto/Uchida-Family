import BookSpread from "@/components/ui/BookSpread";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-stone-700 p-4">
      {/* 画面サイズに合わせてアスペクト比1.4:1を維持しながら最大化 */}
      <div className="w-full max-w-[min(95vw,90vh*1.4)]">
        <BookSpread
          leftTitle="第一章"
          rightTitle="物語の始まり"
          leftPage={
            <div className="space-y-4">
              <p>
                むかしむかし、ある山の麓に小さな村がありました。
                その村には、心優しい少年が住んでいました。
              </p>
              <p>
                少年は毎日、山へ薪を取りに行き、
                帰り道には野の花を摘んで母に届けるのでした。
              </p>
              <p>
                ある晴れた日のこと、少年は山道でふしぎな光を見つけました。
                それは、まるで星のかけらのように輝いていたのです。
              </p>
            </div>
          }
          rightPage={
            <div className="space-y-4">
              <p>
                「これは何だろう？」
                少年は不思議に思いながら、その光に手を伸ばしました。
              </p>
              <p>
                すると光は、まるで生きているかのように
                少年の手のひらの上でふわりと浮かび上がりました。
              </p>
              <p>
                「怖がらないで」 光の中から、小さな声が聞こえてきました。
                「わたしは、この山を守る精霊です」
              </p>
              <p>
                少年は驚きましたが、 その声がとても優しかったので安心しました。
              </p>
            </div>
          }
        />
      </div>
    </main>
  );
}
