# 前端方案 v0.4

| 项 | 内容 |
|---|---|
| 对应 PRD | [PRD.md](./PRD.md) v0.2 |
| 设计 | [DESIGN.md](./DESIGN.md) |
| UI 预览 | [ui-mockup/index.html](./ui-mockup/index.html) |
| 状态 | **有引导的数据探索** · 三问题 · 图表白名单 |

---

## 1. 定位

不是「人口数据展示页」，而是 **有引导的数据探索界面**：默认视图先讲清楚，再让用户下钻与切换视图。

用户三问 → 界面映射：

| 问题 | 组件 |
|---|---|
| 和熟悉的地方比？ | `PlaceDetail`：**相对全国占比** |
| 内部怎么分布？ | `MapView` + `RankChart` |
| 变好还是变坏？ | `YearTrend` + Hero 联动年份 |

---

## 2. 页面结构

```text
Disclaimer（非官方）
Header
Hero: NationalHero | YearTrend          ← Q3 + 认知锚点
ExploreShell                             ← 同一模块
  Toolbar: Tabs(地图|排名|表) · 年 · 面包屑 · 下载 · 来源
  Body: VizPane | PlaceDetail + RankList
MetaBar: 来源 · 口径 · 获取/更新日期      ← 可信（固定）
Insights: 老龄化入口 | 方法入口
AdsSlot（可关）
Footer
```

---

## 3. 默认状态

```text
indicator = population_total
year      = max(availableYears)
level     = country
tab       = map
selected  = null  → 详情显示全国 + 文案「当前为全国口径」
```

筛选仅暴露：年份、地区层级（下钻）。无性别/城乡。

---

## 4. 组件规格

| 组件 | 职责 | 要点 |
|---|---|---|
| `NationalHero` | 全国总值 | 展示单位 **亿人**（1 位小数）；口径一行 |
| `YearTrend` | 各年折线 | 点击改 `year`；线宽 2.5px；选中点 r=6 |
| `ExploreShell` | Tab 容器 | 地图/排名/表共享同一 `year`+筛选 |
| `MapView` | 分级地图 | 国→省→市；色带同一色相明度变化 |
| `RankChart` | 条形排序 | **按数值降序**；点击选中地区 |
| `DataTable` | 表兜底 | 万人或原始单位；可下载 |
| `PlaceDetail` | 详情卡 | 见下节 |
| `MetaBar` | 元数据 | 来源名、口径「常住人口」、retrieved_at、链到 `/sources` |
| `TopicAgingLink` | 专题入口 | 不进 Hero |
| `AdsSlot` | 广告 | `ads.enabled` |

### 4.1 `PlaceDetail`（相对全国 · P0）

| 选中 | 主数字 | 对比行 |
|---|---|---|
| 全国 | 全国总人口（亿人） | 「当前为全国口径 · 参照见各年趋势」 |
| 省 / 市 | 该地人口（亿人） | 「占全国 **x.x%**」（value / national[year]） |

另固定一行：来源摘要 + 溯源链接。  
单位与 Hero 一致用亿人；表内可用万人。

---

## 5. 图表白名单（实现约束）

只允许：折线、分级地图、条形排序、表。  
禁止 MVP：金字塔、双轴、3D、每指标定制奇异图。

---

## 6. 视觉 token

以 [DESIGN.md](./DESIGN.md) 为准（`#FAFAFA` / `#0E7490` / Fira Sans + Fira Code / 圆角 2px）。

---

## 7. 技术落点

```text
apps/web/          Astro SSG
  components/      上表岛屿组件
  public/data/     静态 JSON
etl/               Python → JSON + meta
```

状态：内存 +（P1）URL query：`?year=2020&province=440000`。

---

## 8. 验收（前端）

- [ ] 默认进入即可读懂三问中的趋势与分布入口  
- [ ] 选中地区出现相对全国占比  
- [ ] MetaBar 常驻可见  
- [ ] Tab 三视图数据一致  
- [ ] 老龄化不在 Hero 主标题  

---

## 9. 下一步工程

初始化 Astro 脚手架；fixture 数据接真组件；ETL 出全国/省序列。
