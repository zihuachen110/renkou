/** English display names keyed by GB/T 2260 region code. */
export const REGION_NAMES_EN: Record<string, string> = {
  "110000": "Beijing",
  "120000": "Tianjin",
  "130000": "Hebei",
  "140000": "Shanxi",
  "150000": "Inner Mongolia",
  "210000": "Liaoning",
  "220000": "Jilin",
  "230000": "Heilongjiang",
  "310000": "Shanghai",
  "320000": "Jiangsu",
  "330000": "Zhejiang",
  "340000": "Anhui",
  "350000": "Fujian",
  "360000": "Jiangxi",
  "370000": "Shandong",
  "410000": "Henan",
  "420000": "Hubei",
  "430000": "Hunan",
  "440000": "Guangdong",
  "450000": "Guangxi",
  "460000": "Hainan",
  "500000": "Chongqing",
  "510000": "Sichuan",
  "520000": "Guizhou",
  "530000": "Yunnan",
  "540000": "Tibet",
  "610000": "Shaanxi",
  "620000": "Gansu",
  "630000": "Qinghai",
  "640000": "Ningxia",
  "650000": "Xinjiang",
};

export function regionDisplayName(
  code: string,
  zhName: string,
  locale: string,
): string {
  if (locale === "en") return REGION_NAMES_EN[code] ?? zhName;
  return zhName;
}
