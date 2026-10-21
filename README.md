# DDV 官网

这个目录只包含官网代码，不包含 DDV+ 应用源码。作为独立仓库发布到 GitHub Pages，安装包放在 GitHub Releases。

- 仓库：`JoshuaMi449/DDV`
- 站点：`https://joshuami449.github.io/DDV/`
- 当前版本：`3.1.1`

## 本地构建

```bash
node build.mjs
open index.html
```

- `body.template.html`：页面源文件（内联 CSS / JS）。
- `body.html`：构建产物，供 Artifact 预览使用。
- `index.html`：完整 HTML，供 GitHub Pages 使用。
- `assets/`：应用图标与 favicon。

## 发布到 GitHub Pages

```bash
git init -b main
git add .
git commit -m "DDV website 3.1.1"
gh repo create JoshuaMi449/DDV --public --source=. --remote=origin --push
gh api --method POST repos/JoshuaMi449/DDV/pages \
  -f 'source[branch]=main' -f 'source[path]=/'
```

站点地址：`https://joshuami449.github.io/DDV/`。

## 安装包与下载

GitHub Pages 不适合放约 159 MB 的安装包，下载统一走 Releases：

```bash
gh release create v3.1.1 \
  /Users/mac/DDV-plus-clean/ddv_plus/release-prod/DDV+-3.1.1-arm64.dmg \
  /Users/mac/DDV-plus-clean/ddv_plus/release-prod/DDV+-3.1.1-arm64-mac.zip \
  /Users/mac/DDV-plus-clean/ddv_plus/release-prod/latest-mac.yml \
  --title "DDV v3.1.1" --notes "macOS · Apple Silicon"
```

- 下载按钮统一指向 `https://github.com/JoshuaMi449/DDV/releases/latest`。
- 如果仓库名不同，改 `body.template.html` 末尾的 `DOWNLOAD_URL`，再运行 `node build.mjs`。
- `latest-mac.yml` 由应用仓库的 `npm run update:feed` 生成；更新源为
  `https://github.com/JoshuaMi449/DDV/releases/latest/download`。

## 边界

- 官网不出现任何竞品名称、Logo 或可识别 UI。
- 官网不托管应用源码。
- 页面不声称未经验证的能力；安装包内如遇系统安全提示，按页面说明处理。
