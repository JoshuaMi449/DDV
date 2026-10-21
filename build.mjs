import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const icon = fs.readFileSync(path.join(root, "assets/ddv-plus-160.png")).toString("base64");
const template = fs.readFileSync(path.join(root, "body.template.html"), "utf8");
const body = template.replaceAll("__ICON_DATA_URI__", `data:image/png;base64,${icon}`);
fs.writeFileSync(path.join(root, "body.html"), body);

const title = (/<title>([\s\S]*?)<\/title>/.exec(body)?.[1] ?? "DDV+ 公众号管家").trim();
const content = body.replace(/<title>[\s\S]*?<\/title>/, "");
const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="DDV+ 是为多公众号运营者做的 macOS 工作台：账号、存稿、发表、数据看板。闭源商业软件，数据留在本机。">
  <meta name="theme-color" content="#f4f7fb" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#08111c" media="(prefers-color-scheme: dark)">
  <link rel="icon" type="image/png" href="assets/favicon.png">
  <link rel="apple-touch-icon" href="assets/favicon.png">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="为多公众号运营者做的 macOS 工作台：账号、存稿、发表、数据看板。">
  <meta property="og:image" content="assets/ddv-plus-512.png">
  <meta name="twitter:card" content="summary_large_image">
</head>
<body>
${content}
</body>
</html>
`;
fs.writeFileSync(path.join(root, "index.html"), html);
console.log(`Built index.html (${(html.length / 1024).toFixed(1)} KB) and body.html (${(body.length / 1024).toFixed(1)} KB)`);
