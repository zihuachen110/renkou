# Yearbook Excel sources

NBS *China Statistical Yearbook* English tables “Population at Year-end by Region”, retrieved 2026-10-21.

| File | Yearbook | Table |
|---|---|---|
| `yb2011_D0313e.xls` | 2011 | 3-13 |
| `yb2012_D0304e.xls` | 2012 | 3-4 |
| `yb2013_Z0305E.xls` | 2013 | 3-5 |
| `yb2014_Z0205E.xls` | 2014 | 2-5 |
| `yb2021_E02-05.xls` | 2021 | 2-5 |
| `provinces_yb2025_2015_2024.json` | 2025 (image) | 2-5 → 2021–2024 |

Overlay order in `build_fixtures.py`: older → newer Excel, then image JSON for 2021–2024. Census bulletins then override 2010/2020.
