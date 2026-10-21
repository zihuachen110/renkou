"""Parse NBS yearbook Excel 'Population at Year-end by Region' tables.

Returns {year: {english_or_chinese_name: value_wan}}.
"""
from __future__ import annotations

from pathlib import Path

import xlrd

EN_TO_CODE: dict[str, str] = {
    "Beijing": "110000",
    "Tianjin": "120000",
    "Hebei": "130000",
    "Shanxi": "140000",
    "Inner Mongolia": "150000",
    "Liaoning": "210000",
    "Jilin": "220000",
    "Heilongjiang": "230000",
    "Shanghai": "310000",
    "Jiangsu": "320000",
    "Zhejiang": "330000",
    "Anhui": "340000",
    "Fujian": "350000",
    "Jiangxi": "360000",
    "Shandong": "370000",
    "Henan": "410000",
    "Hubei": "420000",
    "Hunan": "430000",
    "Guangdong": "440000",
    "Guangxi": "450000",
    "Hainan": "460000",
    "Chongqing": "500000",
    "Sichuan": "510000",
    "Guizhou": "520000",
    "Yunnan": "530000",
    "Tibet": "540000",
    "Shaanxi": "610000",
    "Gansu": "620000",
    "Qinghai": "630000",
    "Ningxia": "640000",
    "Xinjiang": "650000",
}

ZH_TO_CODE: dict[str, str] = {
    "北京": "110000",
    "天津": "120000",
    "河北": "130000",
    "山西": "140000",
    "内蒙古": "150000",
    "辽宁": "210000",
    "吉林": "220000",
    "黑龙江": "230000",
    "上海": "310000",
    "江苏": "320000",
    "浙江": "330000",
    "安徽": "340000",
    "福建": "350000",
    "江西": "360000",
    "山东": "370000",
    "河南": "410000",
    "湖北": "420000",
    "湖南": "430000",
    "广东": "440000",
    "广西": "450000",
    "海南": "460000",
    "重庆": "500000",
    "四川": "510000",
    "贵州": "520000",
    "云南": "530000",
    "西藏": "540000",
    "陕西": "610000",
    "甘肃": "620000",
    "青海": "630000",
    "宁夏": "640000",
    "新疆": "650000",
}

CODE_TO_NAME = {
    "110000": "北京",
    "120000": "天津",
    "130000": "河北",
    "140000": "山西",
    "150000": "内蒙古",
    "210000": "辽宁",
    "220000": "吉林",
    "230000": "黑龙江",
    "310000": "上海",
    "320000": "江苏",
    "330000": "浙江",
    "340000": "安徽",
    "350000": "福建",
    "360000": "江西",
    "370000": "山东",
    "410000": "河南",
    "420000": "湖北",
    "430000": "湖南",
    "440000": "广东",
    "450000": "广西",
    "460000": "海南",
    "500000": "重庆",
    "510000": "四川",
    "520000": "贵州",
    "530000": "云南",
    "540000": "西藏",
    "610000": "陕西",
    "620000": "甘肃",
    "630000": "青海",
    "640000": "宁夏",
    "650000": "新疆",
}


def _norm_region(raw: object) -> str | None:
    if not isinstance(raw, str):
        return None
    name = " ".join(raw.replace("\xa0", " ").split()).strip()
    if not name or name.lower().startswith("national") or name in ("全国", "地区"):
        return None
    if name in EN_TO_CODE:
        return EN_TO_CODE[name]
    if name in ZH_TO_CODE:
        return ZH_TO_CODE[name]
    # fuzzy: "  Beijing" already stripped; try startswith EN names longer first
    for en, code in sorted(EN_TO_CODE.items(), key=lambda x: -len(x[0])):
        if name == en or name.startswith(en + " "):
            return code
    for zh, code in ZH_TO_CODE.items():
        if zh in name:
            return code
    return None


def _as_year(cell: object) -> int | None:
    if isinstance(cell, (int, float)) and 1990 <= float(cell) <= 2035:
        return int(cell)
    if isinstance(cell, str):
        s = cell.strip().replace("年", "")
        if s.isdigit() and 1990 <= int(s) <= 2035:
            return int(s)
    return None


def parse_region_year_xls(path: Path) -> dict[int, dict[str, float]]:
    """Parse one yearbook sheet into {year: {region_code: wan}}."""
    book = xlrd.open_workbook(str(path))
    sh = book.sheet_by_index(0)

    header_row = None
    years: list[tuple[int, int]] = []  # (col, year)
    for r in range(min(10, sh.nrows)):
        cols: list[tuple[int, int]] = []
        for c in range(sh.ncols):
            y = _as_year(sh.cell_value(r, c))
            if y is not None:
                cols.append((c, y))
        if len(cols) >= 3:
            header_row = r
            years = cols
            break
    if header_row is None:
        raise ValueError(f"No year header in {path}")

    out: dict[int, dict[str, float]] = {y: {} for _, y in years}
    for r in range(header_row + 1, sh.nrows):
        code = _norm_region(sh.cell_value(r, 0))
        if not code:
            continue
        for c, y in years:
            val = sh.cell_value(r, c)
            if val in ("", None):
                continue
            try:
                num = float(val)
            except (TypeError, ValueError):
                continue
            if num <= 0:
                continue
            out[y][code] = round(num, 2)
    # drop empty years
    return {y: m for y, m in out.items() if len(m) >= 28}


def merge_sources(paths: list[Path]) -> dict[int, dict[str, float]]:
    """Overlay sources in order; later files win (usually newer revisions)."""
    merged: dict[int, dict[str, float]] = {}
    for path in paths:
        part = parse_region_year_xls(path)
        for y, m in part.items():
            merged.setdefault(y, {}).update(m)
    return merged
