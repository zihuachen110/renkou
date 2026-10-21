"""Build population JSON from curated NBS public figures.

Sources: see docs/data-provenance/README.md
Values stored as 万人 (persons / 10000).
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ETL = Path(__file__).resolve().parent
ROOT = ETL.parent
OUT = ROOT / "apps" / "web" / "public" / "data"
RAW = ETL / "raw"

sys.path.insert(0, str(ETL))
from parse_yearbook_xls import CODE_TO_NAME, merge_sources  # noqa: E402

# 全国年末总人口（万人）：中国统计年鉴 / 国家数据「总人口」口径。
# 普查年与公报精确值可能差数万人；此处用年鉴年末序列保证逐年可比。
# 1953/1964/1982/1990/2000/2010/2020 为普查推算数；早期多为户籍统计推算，
# 1982 年后非普查年多为抽样调查推算；2025 为 1% 人口抽样调查推算。
NATIONAL_YEAR_END: list[tuple[int, int, str]] = [
    (1949, 54167, "户籍统计推算"),
    (1950, 55196, "户籍统计推算"),
    (1951, 56300, "户籍统计推算"),
    (1952, 57482, "户籍统计推算"),
    (1953, 58796, "一普推算·年末"),
    (1954, 60266, "户籍统计推算"),
    (1955, 61465, "户籍统计推算"),
    (1956, 62828, "户籍统计推算"),
    (1957, 64653, "户籍统计推算"),
    (1958, 65994, "户籍统计推算"),
    (1959, 67207, "户籍统计推算"),
    (1960, 66207, "户籍统计推算"),
    (1961, 65859, "户籍统计推算"),
    (1962, 67295, "户籍统计推算"),
    (1963, 69172, "户籍统计推算"),
    (1964, 70499, "二普推算·年末"),
    (1965, 72538, "户籍统计推算"),
    (1966, 74542, "户籍统计推算"),
    (1967, 76368, "户籍统计推算"),
    (1968, 78534, "户籍统计推算"),
    (1969, 80671, "户籍统计推算"),
    (1970, 82992, "户籍统计推算"),
    (1971, 85229, "户籍统计推算"),
    (1972, 87177, "户籍统计推算"),
    (1973, 89211, "户籍统计推算"),
    (1974, 90859, "户籍统计推算"),
    (1975, 92420, "户籍统计推算"),
    (1976, 93717, "户籍统计推算"),
    (1977, 94974, "户籍统计推算"),
    (1978, 96259, "户籍统计推算"),
    (1979, 97542, "户籍统计推算"),
    (1980, 98705, "户籍统计推算"),
    (1981, 100072, "户籍统计推算"),
    (1982, 101654, "三普推算·年末"),
    (1983, 103008, "抽样调查推算"),
    (1984, 104357, "抽样调查推算"),
    (1985, 105851, "抽样调查推算"),
    (1986, 107507, "抽样调查推算"),
    (1987, 109300, "抽样调查推算"),
    (1988, 111026, "抽样调查推算"),
    (1989, 112704, "抽样调查推算"),
    (1990, 114333, "四普推算·年末"),
    (1991, 115823, "抽样调查推算"),
    (1992, 117171, "抽样调查推算"),
    (1993, 118517, "抽样调查推算"),
    (1994, 119850, "抽样调查推算"),
    (1995, 121121, "1%人口抽样调查推算"),
    (1996, 122389, "抽样调查推算"),
    (1997, 123626, "抽样调查推算"),
    (1998, 124761, "抽样调查推算"),
    (1999, 125786, "抽样调查推算"),
    (2000, 126743, "五普推算·年末"),
    (2001, 127627, "抽样调查推算"),
    (2002, 128453, "抽样调查推算"),
    (2003, 129227, "抽样调查推算"),
    (2004, 129988, "抽样调查推算"),
    (2005, 130756, "1%人口抽样调查推算"),
    (2006, 131448, "抽样调查推算"),
    (2007, 132129, "抽样调查推算"),
    (2008, 132802, "抽样调查推算"),
    (2009, 133450, "抽样调查推算"),
    (2010, 134091, "六普推算·年末"),
    (2011, 134735, "抽样调查推算"),
    (2012, 135404, "抽样调查推算"),
    (2013, 136072, "抽样调查推算"),
    (2014, 136782, "抽样调查推算"),
    (2015, 137462, "1%人口抽样调查推算"),
    (2016, 138271, "抽样调查推算"),
    (2017, 139008, "抽样调查推算"),
    (2018, 139538, "抽样调查推算"),
    (2019, 140005, "抽样调查推算"),
    (2020, 141178, "七普推算·年末"),
    (2021, 141260, "抽样调查推算"),
    (2022, 141175, "抽样调查推算"),
    (2023, 140967, "抽样调查推算"),
    (2024, 140828, "抽样调查推算"),
    (2025, 140489, "1%人口抽样调查推算"),
]

# region_code -> (name_short, persons_2010, persons_2020)
# 2010: 六普公报第2号；2020: 七普公报第三号（精确到人，覆盖年鉴整万人舍入）
CENSUS_PROVINCES: list[tuple[str, str, int, int]] = [
    ("110000", "北京", 19612368, 21893095),
    ("120000", "天津", 12938224, 13866009),
    ("130000", "河北", 71854202, 74610235),
    ("140000", "山西", 35712111, 34915616),
    ("150000", "内蒙古", 24706321, 24049155),
    ("210000", "辽宁", 43746323, 42591407),
    ("220000", "吉林", 27462297, 24073453),
    ("230000", "黑龙江", 38312224, 31850088),
    ("310000", "上海", 23019148, 24870895),
    ("320000", "江苏", 78659903, 84748016),
    ("330000", "浙江", 54426891, 64567588),
    ("340000", "安徽", 59500510, 61027171),
    ("350000", "福建", 36894216, 41540086),
    ("360000", "江西", 44567475, 45188635),
    ("370000", "山东", 95793065, 101527453),
    ("410000", "河南", 94023567, 99365519),
    ("420000", "湖北", 57237740, 57752557),
    ("430000", "湖南", 65683722, 66444864),
    ("440000", "广东", 104303132, 126012510),
    ("450000", "广西", 46026629, 50126804),
    ("460000", "海南", 8671518, 10081232),
    ("500000", "重庆", 28846170, 32054159),
    ("510000", "四川", 80418200, 83674866),
    ("520000", "贵州", 34746468, 38562148),
    ("530000", "云南", 45966239, 47209277),
    ("540000", "西藏", 3002166, 3648100),
    ("610000", "陕西", 37327378, 39528999),
    ("620000", "甘肃", 25575254, 25019831),
    ("630000", "青海", 5626722, 5923957),
    ("640000", "宁夏", 6301350, 7202654),
    ("650000", "新疆", 21813334, 25852345),
]

# Overlay order: older → newer yearbook so later revisions win.
YEARBOOK_XLS = [
    RAW / "yb2011_D0313e.xls",
    RAW / "yb2012_D0304e.xls",
    RAW / "yb2013_Z0305E.xls",
    RAW / "yb2014_Z0205E.xls",
    RAW / "yb2021_E02-05.xls",
]

# Transcribed from Yearbook 2025 Table 2-5 image (E02-05.jpg); fills 2021–2024.
YEARBOOK_IMG_JSON = RAW / "provinces_yb2025_2015_2024.json"


def to_wan(persons: int) -> float:
    return round(persons / 10000, 2)


def rows_from_map(by_code: dict[str, float]) -> list[dict]:
    out = []
    for code in sorted(CODE_TO_NAME.keys()):
        if code not in by_code:
            continue
        out.append(
            {
                "region_code": code,
                "region_name": CODE_TO_NAME[code],
                "value": round(float(by_code[code]), 2),
            }
        )
    return out


def census_rows(year: int) -> list[dict]:
    idx = 0 if year == 2010 else 1
    out = []
    for code, name, p2010, p2020 in CENSUS_PROVINCES:
        persons = p2010 if idx == 0 else p2020
        out.append(
            {
                "region_code": code,
                "region_name": name,
                "value": to_wan(persons),
            }
        )
    return out


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    national = [
        {"year": y, "value": v, "note": note} for y, v, note in NATIONAL_YEAR_END
    ]

    missing = [p for p in YEARBOOK_XLS if not p.exists()]
    if missing:
        raise SystemExit(f"Missing yearbook xls: {missing}")

    merged = merge_sources(YEARBOOK_XLS)

    if YEARBOOK_IMG_JSON.exists():
        img = json.loads(YEARBOOK_IMG_JSON.read_text(encoding="utf-8"))
        for code, year_map in img["by_code"].items():
            for y_str, val in year_map.items():
                y = int(y_str)
                merged.setdefault(y, {})[code] = float(val)

    provinces_by_year: dict[str, list[dict]] = {
        str(y): rows_from_map(m) for y, m in sorted(merged.items())
    }

    # Census bulletins override yearbook rounding for 2010 / 2020.
    provinces_by_year["2010"] = census_rows(2010)
    provinces_by_year["2020"] = census_rows(2020)

    for y, rows in provinces_by_year.items():
        if len(rows) != 31:
            raise SystemExit(f"Year {y} has {len(rows)} provinces, expected 31")

    province_years = sorted(int(y) for y in provinces_by_year.keys())

    meta = {
        "indicator_code": "population_total",
        "indicator_name": "常住总人口",
        "unit": "万人",
        "methodology_note": (
            "常住人口·年末数。全国为年鉴/国家数据逐年序列（1949–2025）；"
            f"省级截面为统计年鉴「各地区年末人口」{province_years[0]}–{province_years[-1]}，"
            "其中 2010/2020 用六普/七普公报精确值覆盖年鉴舍入；"
            "2021–2024 自《中国统计年鉴2025》表 2-5 图片转录。"
            "2025 分省年末数年鉴尚未刊出。早期年份多为户籍统计推算，口径与近年常住人口不完全等同。"
        ),
        "publisher": "国家统计局（年鉴/国家数据·年末总人口；年鉴分省年末人口；普查公报·分省）",
        "source_url": "https://www.stats.gov.cn/sj/ndsj/",
        "retrieved_at": "2026-10-21",
        "license_note": "公开统计整理展示；非官方。边界为 DataV 可视化用 GeoJSON（含台港澳等要素），非正式审图号；人口着色仅大陆31省区市。",
        "province_years": province_years,
        "geo_url": "/geo/china_provinces.json",
        "geo_attribution": "阿里云 DataV areas_v3 bound/100000_full.json",
    }

    (OUT / "national_series.json").write_text(
        json.dumps(national, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    (OUT / "provinces_by_year.json").write_text(
        json.dumps(provinces_by_year, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    (OUT / "provinces_2020.json").write_text(
        json.dumps(provinces_by_year["2020"], ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    (OUT / "meta.json").write_text(
        json.dumps(meta, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"Wrote to {OUT}")
    print(
        f"Province years: {province_years[0]}–{province_years[-1]} "
        f"({len(province_years)} years)"
    )
    print(f"Provinces per year: {len(provinces_by_year[str(province_years[0])])}")


if __name__ == "__main__":
    main()
