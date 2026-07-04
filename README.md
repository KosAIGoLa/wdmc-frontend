# 瓦當麥可活動整合有限公司官網

這是瓦當麥可活動整合有限公司（WDMC）的官方企業網站，使用 SvelteKit + Tailwind CSS 建構的靜態網站。

## 技術棧

- **框架**：SvelteKit 2 + Svelte 5（Runes mode）
- **樣式**：Tailwind CSS v4
- **轉接器**：`@sveltejs/adapter-static`（輸出純靜態檔案）
- **字體**：Google Fonts Noto Sans TC
- **測試**：Vitest + Playwright
- **程式碼品質**：ESLint + Prettier

## 專案結構

```
src/
  app.html              # HTML 入口與字體載入
  routes/
    +layout.svelte      # 根版面（載入 layout.css）
    +layout.ts          # 設定所有頁面 prerender = true
    layout.css          # Tailwind 入口 + 全域字體
    +page.svelte        # 首頁
    about/              # 關於我們
    active/             # 尾牙春酒專案
    activity/           # 勢爵影視
    community/          # 硬體搭建
    contact/            # 聯絡我們
    kids/               # 童樂會
    news/               # 案例分享
    opening/            # 開工動土｜開幕剪綵
    privacy/            # 隱私權條款
    staff/              # 培訓活動工作人員
    talent/             # 表演娛樂
    wdmc/               # 瓦當活動企劃
  lib/
    components/         # Header、Footer、FloatSidebar
    data/site.ts        # 網站資料、導覽項目、聯絡資訊
static/                 # 靜態資源（圖片等）
build/                  # 靜態輸出目錄（執行 build 後產生）
```

## 常用指令

```sh
# 安裝依賴
pnpm install

# 開發伺服器
pnpm dev

# 型別檢查
pnpm check

# 程式碼檢查
pnpm lint

# 格式化
pnpm format

# 建置靜態網站
pnpm build

# 預覽建置結果
pnpm preview
```

## 建置與部署

本專案使用 `@sveltejs/adapter-static`，執行 `pnpm build` 後會產生 `build/` 目錄，可直接部署到任何靜態檔案伺服器（例如 Nginx、GitHub Pages、Cloudflare Pages 等）。

為了符合 `adapter-static` 的要求，已在 `src/routes/+layout.ts` 設定：

```ts
export const prerender = true;
```

## 建置優化

- Vite 會自動壓縮 JS/CSS 資源。
- 建置完成後，自訂 Vite plugin 會使用 `html-minifier-terser` 壓縮 `build/` 內所有 HTML 檔案，進一步減少體積。
