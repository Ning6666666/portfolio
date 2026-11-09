# 廖振宁个人作品集

React + Vite 搭建的暗色个人作品集基础版，版心最大宽度约 1700px，包含全屏 Hero、个人经历、精选项目、个人优势与整屏联系页。

## 本地运行

```bash
npm install
npm run dev
```

默认地址：`http://127.0.0.1:5173/`

## 构建

```bash
npm run build
npm run preview
```

## 内容与素材

- 页面内容与项目数据集中在 `src/App.jsx`。
- 页面样式集中在 `src/styles.css`。
- 网站使用的图片、视频与简历 PDF 位于 `public/media`。
- 原始高清视觉稿位于 `design-assets/renders`，便于后续替换或继续加工。
- `tools/art` 保存项目视觉的可编辑 HTML 源文件。

当前项目主视觉是基于简历内容制作的原创概念稿，不是最终作品截图。后续拿到真实项目画面后，可直接替换 `public/media` 中的同名 WebP 文件，或修改 `src/App.jsx` 里的 `projects` 数据。

## 检查

开发服务器运行时，可执行：

```bash
node tools/smoke.mjs
```

会检查多尺寸横向溢出、图片与视频加载、项目弹层和移动端菜单。
