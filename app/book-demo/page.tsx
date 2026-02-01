import BookSpread from "@/components/ui/BookSpread";

export default function BookDemo() {
  return (
    <main className="min-h-screen bg-stone-700 py-12">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        本の見開きデザイン
      </h1>

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

      {/* 別のスタイル例 */}
      <div className="mt-16">
        <BookSpread
          leftPage={
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-400">画像</span>
              </div>
              <p className="text-center text-sm text-gray-500 italic">
                図1: 山の風景
              </p>
            </div>
          }
          rightPage={
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">解説</h3>
              <p>
                この物語の舞台となる山は、
                四季折々の美しい景色が楽しめる場所です。
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>春には桜が咲き誇り</li>
                <li>夏には緑が生い茂り</li>
                <li>秋には紅葉が山を彩り</li>
                <li>冬には雪化粧をまといます</li>
              </ul>
            </div>
          }
        />
      </div>
    </main>
  );
}
