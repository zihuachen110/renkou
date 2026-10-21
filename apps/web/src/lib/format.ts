/** value in 万人 → display 亿人 with 2 decimals */
export function toYi(wan: number): string {
  return (wan / 10000).toFixed(2);
}

export function fmtWan(wan: number, locale = "zh-CN"): string {
  return wan.toLocaleString(locale === "en" ? "en-US" : "zh-CN");
}

export function shareOfNational(partWan: number, nationalWan: number): string {
  return ((partWan / nationalWan) * 100).toFixed(1);
}
