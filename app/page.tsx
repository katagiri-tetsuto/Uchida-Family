import BookSpread from "@/components/ui/BookSpread";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-stone-700 p-4">
      {/* 画面サイズに合わせてアスペクト比1.7:1を維持しながら最大化 */}
      <div className="w-full max-w-[min(95vw,90vh*1.7)]">
        <BookSpread />
      </div>
    </main>
  );
}
