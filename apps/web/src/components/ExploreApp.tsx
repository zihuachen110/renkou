import { useEffect, useMemo, useRef, useState } from "react";
import type { Meta, NationalPoint, ProvinceRow, ProvincesByYear } from "../lib/types";
import { fmtWan, shareOfNational, toYi } from "../lib/format";
import type { Locale } from "../i18n";
import { getMessages, localePath, regionDisplayName } from "../i18n";
import ChinaMap from "./ChinaMap";

type Tab = "map" | "rank" | "table";

type Props = {
  national: NationalPoint[];
  provincesByYear: ProvincesByYear;
  meta: Meta;
  locale?: Locale;
};

function isKeyYear(y: number, first: number, last: number): boolean {
  return y === first || y === last || y % 10 === 0;
}

function localizedMeta(meta: Meta, locale: Locale) {
  const m = getMessages(locale).meta;
  return {
    ...meta,
    indicator_name: m.indicatorName,
    unit: m.unit,
    methodology_note: m.methodologyNote,
    publisher: m.publisher,
    license_note: m.licenseNote,
    geo_attribution: m.geoAttribution,
  };
}

export default function ExploreApp({
  national,
  provincesByYear,
  meta,
  locale = "zh-CN",
}: Props) {
  const t = getMessages(locale).explore;
  const displayMeta = useMemo(() => localizedMeta(meta, locale), [meta, locale]);
  const sourcesHref = localePath(locale, "/sources");

  const latest = national[national.length - 1];
  const provinceYears = meta.province_years ?? [2010, 2020];
  const latestProvinceYear = provinceYears[provinceYears.length - 1] ?? latest.year;
  const [year, setYear] = useState(latestProvinceYear);
  const [tab, setTab] = useState<Tab>("map");
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const yearStripRef = useRef<HTMLDivElement>(null);

  const nationalWan = useMemo(() => {
    const row = national.find((d) => d.year === year) ?? latest;
    return row.value;
  }, [national, year, latest]);

  const hasProvinceData = provinceYears.includes(year);
  const provinces: ProvinceRow[] = useMemo(
    () => (hasProvinceData ? provincesByYear[String(year)] ?? [] : []),
    [hasProvinceData, provincesByYear, year],
  );

  const maxP = useMemo(
    () => (provinces.length ? Math.max(...provinces.map((p) => p.value)) : 1),
    [provinces],
  );

  const selected = provinces.find((p) => p.region_code === selectedCode);

  const sorted = useMemo(
    () => [...provinces].sort((a, b) => b.value - a.value),
    [provinces],
  );

  function nameOf(p: ProvinceRow) {
    return regionDisplayName(p.region_code, p.region_name, locale);
  }

  function changeYear(y: number) {
    setYear(y);
    setSelectedCode(null);
  }

  useEffect(() => {
    const strip = yearStripRef.current;
    if (!strip) return;
    const active = strip.querySelector<HTMLElement>('[aria-pressed="true"]');
    active?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [year]);

  function downloadCsv() {
    const header =
      "region_code,region_name,year,value_wan,share_pct,source_url,retrieved_at,methodology_note\n";
    const lines = sorted.map((p) => {
      const share = shareOfNational(p.value, nationalWan);
      return [
        p.region_code,
        nameOf(p),
        year,
        p.value,
        share,
        displayMeta.source_url,
        displayMeta.retrieved_at,
        displayMeta.methodology_note.replace(/,/g, "，"),
      ].join(",");
    });
    const blob = new Blob([header + lines.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `population_provinces_${year}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const trend = useMemo(() => {
    const w = 560;
    const h = 160;
    const pad = { t: 20, r: 16, b: 16, l: 16 };
    const vals = national.map((d) => d.value);
    const min = Math.min(...vals) * 0.98;
    const max = Math.max(...vals) * 1.01;
    const x = (i: number) =>
      pad.l + (i / (national.length - 1)) * (w - pad.l - pad.r);
    const y = (v: number) =>
      pad.t + (1 - (v - min) / (max - min)) * (h - pad.t - pad.b);
    const pts = national.map((d, i) => [x(i), y(d.value)] as const);
    const line = pts
      .map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
      .join(" ");
    const area = `${line} L${pts[pts.length - 1][0]},${h - pad.b} L${pts[0][0]},${h - pad.b} Z`;
    const activeIdx = national.findIndex((d) => d.year === year);
    const firstYear = national[0]?.year ?? year;
    const lastYear = national[national.length - 1]?.year ?? year;
    return { pts, line, area, activeIdx, h, pad, firstYear, lastYear };
  }, [national, year]);

  return (
    <>
      <section
        className="grid items-end gap-12 border-b border-line py-10 md:grid-cols-2"
        aria-labelledby="hero-title"
      >
        <div>
          <p
            id="hero-title"
            className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-accent"
          >
            {t.heroLabel}
          </p>
          <h1 className="m-0 font-mono text-[clamp(3rem,7vw,4.5rem)] font-semibold leading-none tracking-tight">
            {toYi(nationalWan)}
            <span className="ml-2 font-sans text-[0.28em] font-medium text-muted">
              {t.unitYi}
            </span>
          </h1>
          <p className="mt-4 max-w-[36ch] text-[17px] leading-relaxed text-muted">
            {t.heroLeadBefore}
            <strong className="font-semibold text-ink">{year}</strong>
            {t.heroLeadAfter}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-muted">
            <span>{t.scopeLabel}</span>
            <span>·</span>
            <a href={sourcesHref}>{t.sourcesLink}</a>
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-2 flex items-baseline justify-between">
            <h2 className="m-0 text-[13px] font-semibold text-muted">
              {t.trendTitle(national[0]?.year ?? year, latest.year)}
            </h2>
            <span className="text-xs text-muted">{t.trendHint}</span>
          </div>
          <div className="h-40 border-b border-line pb-1">
            <svg viewBox="0 0 560 160" className="h-full w-full" aria-hidden>
              <defs>
                <linearGradient id="fillG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0e7490" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#0e7490" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={trend.area} fill="url(#fillG)" />
              <path
                d={trend.line}
                fill="none"
                stroke="#0e7490"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {trend.pts.map((p, i) => {
                const y = national[i].year;
                const on = y === year;
                const key = isKeyYear(y, trend.firstYear, trend.lastYear);
                return (
                  <g key={y}>
                    <circle
                      cx={p[0]}
                      cy={p[1]}
                      r={10}
                      fill="transparent"
                      className="cursor-pointer"
                      onClick={() => changeYear(y)}
                    />
                    {(on || key) && (
                      <circle
                        cx={p[0]}
                        cy={p[1]}
                        r={on ? 5 : 2.5}
                        fill={on ? "#0e7490" : "#fff"}
                        stroke="#0e7490"
                        strokeWidth="2"
                        className="pointer-events-none"
                      />
                    )}
                  </g>
                );
              })}
              {trend.activeIdx >= 0 && (
                <line
                  x1={trend.pts[trend.activeIdx][0]}
                  y1={trend.pts[trend.activeIdx][1]}
                  x2={trend.pts[trend.activeIdx][0]}
                  y2={trend.h - trend.pad.b}
                  stroke="#0e7490"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.5"
                />
              )}
            </svg>
          </div>
          <div
            ref={yearStripRef}
            className="mt-2.5 flex gap-0.5 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]"
            role="group"
            aria-label={t.yearAria}
          >
            {national.map((d) => (
              <button
                key={d.year}
                type="button"
                aria-pressed={d.year === year}
                onClick={() => changeYear(d.year)}
                className={`relative min-h-9 shrink-0 cursor-pointer border-0 bg-transparent px-1.5 py-2 text-[12px] font-medium tabular-nums ${
                  d.year === year
                    ? "font-bold text-accent after:absolute after:bottom-0 after:left-[15%] after:right-[15%] after:h-0.5 after:bg-accent"
                    : isKeyYear(d.year, trend.firstYear, trend.lastYear)
                      ? "text-ink/70 hover:text-ink"
                      : "text-muted hover:text-ink"
                }`}
              >
                {d.year}
              </button>
            ))}
          </div>
          {!hasProvinceData && (
            <p className="mt-2 text-xs text-muted">
              {t.provinceRangeNote(provinceYears[0], latestProvinceYear)}
            </p>
          )}
        </div>
      </section>

      <section
        id="explore"
        className="mt-10 overflow-hidden rounded-DEFAULT border border-line bg-surface"
        aria-label={t.exploreAria}
      >
        <div className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-3">
          <div
            className="inline-flex overflow-hidden rounded-DEFAULT border border-line"
            role="tablist"
          >
            {(
              [
                ["map", t.tabMap],
                ["rank", t.tabRank],
                ["table", t.tabTable],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`h-8 cursor-pointer border-0 px-3.5 text-[13px] font-semibold ${
                  tab === id
                    ? "bg-accent text-white"
                    : "bg-bg text-muted hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            <span>
              {t.totalPop} ·{" "}
              <strong className="font-semibold text-ink">{year}</strong>
            </span>
            <span>·</span>
            <span>
              {selected
                ? `${t.crumbNational} › ${nameOf(selected)}`
                : `${t.crumbNational} › ${t.crumbProvince}`}
            </span>
            <span className="text-xs">{t.cityDrillHint}</span>
          </div>
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={downloadCsv}
              disabled={!sorted.length}
              className="h-8 cursor-pointer rounded-DEFAULT border border-line bg-surface px-3 text-[13px] font-semibold text-ink hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t.downloadCsv}
            </button>
            <a
              href={sourcesHref}
              className="inline-flex h-8 items-center rounded-DEFAULT border border-line bg-surface px-3 text-[13px] font-semibold text-ink no-underline hover:border-zinc-400"
            >
              {t.sourceBtn}
            </a>
          </div>
        </div>

        <div className="grid min-h-[440px] md:grid-cols-[1fr_280px]">
          <div className="relative min-h-[380px] border-line md:border-r">
            {tab === "map" &&
              (hasProvinceData ? (
                <ChinaMap
                  provinces={provinces}
                  selectedCode={selectedCode}
                  locale={locale}
                  onSelect={(code) => {
                    if (
                      code &&
                      provinces.some((p) => p.region_code === code)
                    ) {
                      setSelectedCode(code);
                    }
                  }}
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center p-8 text-center text-sm text-muted">
                  <p>{t.noProvince(year, provinceYears[0], latestProvinceYear)}</p>
                </div>
              ))}
            {tab === "rank" && (
              <div className="overflow-auto p-5">
                <DataTable
                  rows={sorted}
                  nationalWan={nationalWan}
                  selectedCode={selectedCode}
                  onSelect={setSelectedCode}
                  withRank
                  locale={locale}
                />
              </div>
            )}
            {tab === "table" && (
              <div className="overflow-auto p-5">
                <DataTable
                  rows={sorted}
                  nationalWan={nationalWan}
                  selectedCode={selectedCode}
                  onSelect={setSelectedCode}
                  withRank={false}
                  locale={locale}
                />
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-5 bg-bg px-[18px] py-5">
            <div>
              <h3 className="m-0 mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                {t.selectedLabel}
              </h3>
              <p className="m-0 text-[22px] font-bold tracking-tight">
                {selected ? nameOf(selected) : t.national}
              </p>
              <p className="mt-2 font-mono text-[32px] font-semibold tracking-tight">
                {toYi(selected ? selected.value : nationalWan)}
                <small className="ml-1.5 font-sans text-sm font-medium text-muted">
                  {t.unitYi}
                </small>
              </p>
              <p className="mt-2.5 text-[13px] font-semibold leading-snug text-ink">
                {selected ? (
                  <>
                    {t.shareOfNational(
                      shareOfNational(selected.value, nationalWan),
                    )}
                    <span className="mt-0.5 block text-xs font-normal text-muted">
                      {t.shareHint}
                    </span>
                  </>
                ) : (
                  <>
                    {t.nationalScope}
                    <span className="mt-0.5 block text-xs font-normal text-muted">
                      {t.nationalHint}
                    </span>
                  </>
                )}
              </p>
              <p className="mt-2 text-xs text-muted">
                {t.sourcePrefix}
                {displayMeta.publisher} ·{" "}
                <a href={sourcesHref}>{t.traceLink}</a>
              </p>
              {selected && (
                <button
                  type="button"
                  className="mt-2 cursor-pointer border-0 bg-transparent p-0 text-xs text-accent"
                  onClick={() => setSelectedCode(null)}
                >
                  {t.backNational}
                </button>
              )}
            </div>
            <div>
              <h3 className="m-0 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                {t.provinceRank}
              </h3>
              <ul className="m-0 grid list-none gap-2 p-0">
                {sorted.slice(0, 5).map((p, idx) => (
                  <li key={p.region_code}>
                    <button
                      type="button"
                      onClick={() => setSelectedCode(p.region_code)}
                      className="grid w-full cursor-pointer grid-cols-[18px_1fr_auto] items-center gap-2 border-0 bg-transparent p-0 text-left text-xs text-ink"
                    >
                      <span className="text-muted">{idx + 1}</span>
                      <span className="font-medium">{nameOf(p)}</span>
                      <span className="font-mono text-[11px] text-muted">
                        {toYi(p.value)}
                      </span>
                      <span className="col-span-2 col-start-2 mt-[-2px] h-1 overflow-hidden rounded-[1px] bg-line">
                        <i
                          className="block h-full bg-accent"
                          style={{ width: `${(p.value / maxP) * 100}%` }}
                        />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div
          className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line bg-bg px-4 py-3 text-xs text-muted"
          aria-label={t.metaAria}
        >
          <span>
            {t.sourcePrefix}
            <strong className="font-semibold text-ink">
              {displayMeta.publisher}
            </strong>
          </span>
          <span>
            {t.scopePrefix}
            <strong className="font-semibold text-ink">{t.scopeValue}</strong>
          </span>
          <span>
            {t.retrievedPrefix}
            <strong className="font-semibold text-ink">
              {displayMeta.retrieved_at}
            </strong>
          </span>
          {displayMeta.geo_attribution && (
            <span>
              {t.boundaryPrefix}
              <strong className="font-semibold text-ink">
                {displayMeta.geo_attribution}
              </strong>
            </span>
          )}
          <a href={sourcesHref}>{t.fullMethod}</a>
        </div>
      </section>
    </>
  );
}

function DataTable({
  rows,
  nationalWan,
  selectedCode,
  onSelect,
  withRank,
  locale,
}: {
  rows: ProvinceRow[];
  nationalWan: number;
  selectedCode: string | null;
  onSelect: (code: string) => void;
  withRank: boolean;
  locale: Locale;
}) {
  const t = getMessages(locale).explore;
  return (
    <table className="w-full border-collapse text-[13px]">
      <thead>
        <tr>
          {withRank && (
            <th className="border-b border-line px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-muted">
              #
            </th>
          )}
          <th className="border-b border-line px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-muted">
            {t.colRegion}
          </th>
          <th className="border-b border-line px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-muted">
            {t.colPopWan}
          </th>
          <th className="border-b border-line px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-muted">
            {t.colShare}
          </th>
          {!withRank && (
            <th className="border-b border-line px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-muted">
              {t.colSource}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {rows.map((p, i) => (
          <tr
            key={p.region_code}
            onClick={() => onSelect(p.region_code)}
            className={`cursor-pointer ${
              selectedCode === p.region_code ? "bg-accent-soft" : "hover:bg-accent-soft"
            }`}
          >
            {withRank && (
              <td className="border-b border-line px-3 py-3 font-mono text-xs">
                {i + 1}
              </td>
            )}
            <td className="border-b border-line px-3 py-3">
              {regionDisplayName(p.region_code, p.region_name, locale)}
            </td>
            <td className="border-b border-line px-3 py-3 font-mono text-xs">
              {fmtWan(p.value, locale)}
            </td>
            <td className="border-b border-line px-3 py-3 font-mono text-xs">
              {shareOfNational(p.value, nationalWan)}%
            </td>
            {!withRank && (
              <td className="border-b border-line px-3 py-3 text-muted">
                {t.sourceYearbook}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
