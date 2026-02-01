# Agent Guidelines

このファイルはAI駆動開発においてAgentが参照する規約です。

---

## 🚨 重要：規約違反時の動作

### ユーザー指示が本規約に反する場合

1. **実行前に確認を取る**
   - 規約のどの部分に反するかを明示
   - 実行した場合の影響を説明

2. **最適な代替手法を提示**
   - 規約に沿った別のアプローチを提案
   - メリット・デメリットを比較

3. **ユーザーが実行を強制した場合**
   - 指示に従って実行する
   - **本ファイル（agent.md）を新しい規約に合わせて更新する**
   - 変更履歴を記録する

---

## 📌 プロジェクト概要

| 項目           | 内容                     |
| -------------- | ------------------------ |
| プロジェクト名 | Uchida Family            |
| 種別           | 静的Webサイト            |
| フレームワーク | Next.js 16 (App Router)  |
| 言語           | TypeScript (strict mode) |
| スタイリング   | Tailwind CSS             |
| 出力形式       | Static Export (SSG)      |

---

## 📁 ディレクトリ構造

```
app/
├── layout.tsx          # ルートレイアウト
├── page.tsx            # ホームページ
├── globals.css         # グローバルスタイル
└── (routes)/           # ページルート群（グループ化）

components/
├── ui/                 # 基本UIコンポーネント（Button, Card等）
├── layout/             # レイアウト（Header, Footer等）
└── sections/           # ページセクション（Hero, Feature等）

lib/
└── utils.ts            # ユーティリティ関数

types/
└── index.ts            # 共通型定義

public/
├── images/             # 画像ファイル
└── fonts/              # フォントファイル
```

---

## 📝 コーディング規約

### ファイル命名

| 種別           | 規則       | 例                              |
| -------------- | ---------- | ------------------------------- |
| コンポーネント | PascalCase | `Button.tsx`, `HeroSection.tsx` |
| ユーティリティ | camelCase  | `utils.ts`, `formatDate.ts`     |
| 型定義         | camelCase  | `types.ts`, `index.ts`          |
| ページ         | 小文字     | `page.tsx`, `layout.tsx`        |

### コンポーネント設計

```tsx
// ✅ 推奨：型定義を明示、export default を使用
type Props = {
  title: string;
  children: React.ReactNode;
};

export default function ComponentName({ title, children }: Props) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

### スタイリング

- Tailwind CSSのユーティリティクラスを使用
- 複雑なスタイルは `@apply` ではなくコンポーネント化で対応
- レスポンシブ: `sm:`, `md:`, `lg:` プレフィックスを使用

---

## ⛔ 禁止事項

| 禁止                   | 理由               | 代替手法                |
| ---------------------- | ------------------ | ----------------------- |
| `any` 型の使用         | 型安全性の低下     | 適切な型定義、`unknown` |
| インラインスタイル     | 一貫性の欠如       | Tailwind CSS            |
| `useEffect` の乱用     | 静的サイトでは不要 | SSG、Server Components  |
| 巨大なコンポーネント   | 保守性の低下       | 100行以下に分割         |
| 外部状態管理ライブラリ | 過剰な複雑性       | React組み込み機能       |

---

## ✅ 推奨パターン

### レイアウトコンポーネント

```tsx
// components/layout/Header.tsx
type Props = {
  siteName: string;
};

export default function Header({ siteName }: Props) {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <span className="text-xl font-bold">{siteName}</span>
      </nav>
    </header>
  );
}
```

### セクションコンポーネント

```tsx
// components/sections/Hero.tsx
type Props = {
  title: string;
  subtitle?: string;
};

export default function Hero({ title, subtitle }: Props) {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      {subtitle && <p className="mt-4 text-gray-600">{subtitle}</p>}
    </section>
  );
}
```

---

## 🔄 変更履歴

| 日付       | 変更内容 | 理由             |
| ---------- | -------- | ---------------- |
| 2026-02-01 | 初版作成 | プロジェクト開始 |
