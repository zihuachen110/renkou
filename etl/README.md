# ETL

将公开统计清洗为 `apps/web/public/data/` 下的静态 JSON。

## MVP 产物

| 文件 | 说明 |
|---|---|
| `national_series.json` | 全国年末总人口逐年序列（万人，现 1949–2025） |
| `provinces_by_year.json` | 省级截面（现 2000–2024；2010/2020 为普查公报精确值） |
| `provinces_2020.json` | 兼容用 2020 截面 |
| `meta.json` | 来源、口径、获取日期、`province_years` |
| `../geo/china_provinces.json` | 省界（DataV） |

原始年鉴 Excel 放在 `etl/raw/`（`yb20xx_*.xls`）。解析见 `parse_yearbook_xls.py`。

数据与授权见 `docs/data-provenance/`。

```bash
python etl/build_fixtures.py
```
