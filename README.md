# 人口观（renkou）

面向公众的**非官方**中国人口数据探索站：引导式界面（趋势 + 分布 + 相对全国），静态部署。

## 文档

- [PRD](docs/PRD.md)
- [前端方案](docs/FRONTEND.md)
- [设计](docs/DESIGN.md)
- [SEO 审计](docs/SEO-AUDIT.md)
- [UI Mock](docs/ui-mockup/index.html)

## 开发

```bash
npm install
npm run dev
```

浏览器打开终端提示的本地地址（默认 `http://localhost:4321`）。

```bash
npm run build    # 输出 apps/web/dist
npm run preview
```

## 结构

```text
apps/web/     Astro SSG 站点
etl/          数据清洗 → public/data JSON
docs/         PRD / 设计 / Mock
```

当前 `public/data/` 由 ETL 生成：全国年末序列 1949–2025；省级截面 2000–2024（年鉴 + 普查精确值）。生成/覆盖：

```bash
python etl/build_fixtures.py
```

## 部署

连接 GitHub 后用 **Cloudflare Pages**：构建命令 `npm run build`，输出目录 `apps/web/dist`。

广告默认关闭；合规页：`/about` `/sources` `/privacy` `/ads`。
