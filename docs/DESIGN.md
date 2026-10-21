# 设计方向 v0.4

## Design read

面向公众的**有引导的数据探索**界面（科普平台，非官方）。  
第一眼回答三问中的「全国多少人、怎么变」；分布在探索器；对比在详情卡「相对全国」。  
可信、清晰、易读优先于科技感。

**Dials**：Variance 5 · Motion 3 · Density 5  

---

## 产品×视觉原则

1. 默认视图有内容，禁止「空仪表盘等筛选」。  
2. 图表类型全站一致（线 / 地图 / 条 / 表）。  
3. 元数据是设计的一部分（`MetaBar` 常驻）。  
4. 单一强调色；地图用同色相明度编码。  
5. 数字用等宽体；展示「亿人」、表可用「万人」。  

---

## 参考

| 站点 | 学什么 |
|---|---|
| [Our World in Data](https://ourworldindata.org) | Overview → zoom → details；图/表切换；来源进工具条 |
| [Census Data Viz Gallery](https://www.census.gov/dataviz/) | 人口叙事节奏 |
| 田纳西公众人口仪表盘调研结论（文档引用） | 三问：对比 / 分布 / 趋势 |

---

## Token（锁定）

| Token | HEX |
|---|---|
| bg | `#FAFAFA` |
| surface | `#FFFFFF` |
| ink | `#18181B` |
| muted | `#71717A` |
| line | `#E4E4E7` |
| accent / chart | `#0E7490` |
| accent-soft | `#ECFEFF` |
| map-low | `#A5F3FC` |
| map-high | `#155E75` |

字体：Fira Sans + Fira Code  
字号：12 / 13 / 14 / 16 / 18 / 22 / 32（详情）/ 56–72（Hero）  
字重：400 / 600  
间距：8 的倍数；页边 24；max-width 1120  
圆角：2px  
按钮高：32px  
卡片：默认不用；探索器用单层边框容器  

对比：正文 ≥ 4.5:1；信息不单靠颜色（数值 + 表双通道）。

---

## 详情卡「相对全国」文案

- 全国：`当前为全国口径 · 各年变化见上方趋势`  
- 地区：`占全国 x.x%`（可附「第 n / 省数」若排名易算）  

预览：[`ui-mockup/index.html`](./ui-mockup/index.html)
