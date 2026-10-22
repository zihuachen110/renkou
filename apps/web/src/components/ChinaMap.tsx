import { useEffect, useRef } from "react";
import {
  Map,
  NavigationControl,
  type ExpressionSpecification,
  type MapGeoJSONFeature,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { ProvinceRow } from "../lib/types";
import type { Locale } from "../i18n";
import { getMessages } from "../i18n/messages";

type Props = {
  provinces: ProvinceRow[];
  selectedCode: string | null;
  onSelect: (code: string | null) => void;
  locale?: Locale;
};

function colorRamp(t: number): string {
  const a = [165, 243, 252];
  const b = [21, 94, 117];
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

/** No census coloring — avoid reading gray as "low population". */
const NO_DATA_FILL = "#d4d4d8";
const NO_DATA_CODES = ["710000", "810000", "820000", "100000_JD"];
/** Exclude South China Sea box from fit — it zooms the map out and shrinks Taiwan. */
const FIT_EXCLUDE = new Set(["100000_JD"]);

type GeoFeat = {
  type: "Feature";
  properties?: { adcode?: string | number; name?: string };
  geometry: { type: string; coordinates: unknown };
};

function ringBounds(
  coords: unknown,
  out: [number, number, number, number],
): void {
  if (!Array.isArray(coords) || coords.length === 0) return;
  if (typeof coords[0] === "number") {
    const [lng, lat] = coords as [number, number];
    out[0] = Math.min(out[0], lng);
    out[1] = Math.min(out[1], lat);
    out[2] = Math.max(out[2], lng);
    out[3] = Math.max(out[3], lat);
    return;
  }
  for (const c of coords) ringBounds(c, out);
}

function fitMainlandAndTaiwan(map: Map, features: GeoFeat[]) {
  const b: [number, number, number, number] = [
    Infinity,
    Infinity,
    -Infinity,
    -Infinity,
  ];
  for (const f of features) {
    const code = String(f.properties?.adcode ?? "");
    if (FIT_EXCLUDE.has(code)) continue;
    ringBounds(f.geometry.coordinates, b);
  }
  if (!Number.isFinite(b[0])) return;
  map.fitBounds(
    [
      [b[0], b[1]],
      [b[2], b[3]],
    ],
    { padding: { top: 28, bottom: 48, left: 28, right: 28 }, duration: 0 },
  );
}

function paintColors(map: Map, provinces: ProvinceRow[]) {
  if (!map.getLayer("province-fill")) return;
  if (!provinces.length) {
    map.setPaintProperty("province-fill", "fill-color", NO_DATA_FILL);
    return;
  }
  const max = Math.max(...provinces.map((p) => p.value));
  const colorExpr: ExpressionSpecification = [
    "match",
    ["to-string", ["get", "adcode"]],
    ...provinces.flatMap((p) => [p.region_code, colorRamp(p.value / max)]),
    ...NO_DATA_CODES.flatMap((code) => [code, NO_DATA_FILL]),
    NO_DATA_FILL,
  ];
  map.setPaintProperty("province-fill", "fill-color", colorExpr);
}

export default function ChinaMap({
  provinces,
  selectedCode,
  onSelect,
  locale = "zh-CN",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const readyRef = useRef(false);
  const provincesRef = useRef(provinces);
  const onSelectRef = useRef(onSelect);
  provincesRef.current = provinces;
  onSelectRef.current = onSelect;
  const mapCopy = getMessages(locale).map;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new Map({
      container: containerRef.current,
      // No glyphs/sprite — we only draw fill/line layers. External glyph
      // CDNs (e.g. demotiles.maplibre.org) often hang in CN and leave the
      // style forever unloaded → blank map canvas.
      style: {
        version: 8,
        sources: {},
        layers: [
          {
            id: "background",
            type: "background",
            paint: { "background-color": "#FAFAFA" },
          },
        ],
      },
      center: [105.5, 33],
      zoom: 3.4,
      attributionControl: { compact: true },
    });
    map.addControl(
      new NavigationControl({ showCompass: false }),
      "top-right",
    );
    mapRef.current = map;

    map.on("load", async () => {
      const res = await fetch("/geo/china_provinces.json");
      const geo = await res.json();
      map.addSource("provinces", { type: "geojson", data: geo });
      map.addLayer({
        id: "province-fill",
        type: "fill",
        source: "provinces",
        paint: { "fill-color": "#e4e4e7", "fill-opacity": 0.95 },
      });
      map.addLayer({
        id: "province-line",
        type: "line",
        source: "provinces",
        paint: { "line-color": "#ffffff", "line-width": 0.8 },
        filter: [
          "!",
          ["in", ["to-string", ["get", "adcode"]], ["literal", NO_DATA_CODES]],
        ],
      });
      // Stronger outline for Taiwan / HK / Macau so islands stay readable.
      map.addLayer({
        id: "province-line-nodata",
        type: "line",
        source: "provinces",
        paint: {
          "line-color": [
            "match",
            ["to-string", ["get", "adcode"]],
            "710000",
            "#3f3f46",
            "#71717a",
          ],
          "line-width": [
            "match",
            ["to-string", ["get", "adcode"]],
            "710000",
            1.8,
            1.2,
          ],
        },
        filter: [
          "in",
          ["to-string", ["get", "adcode"]],
          ["literal", NO_DATA_CODES],
        ],
      });
      map.addLayer({
        id: "province-highlight",
        type: "line",
        source: "provinces",
        paint: { "line-color": "#18181b", "line-width": 2 },
        filter: ["==", ["get", "adcode"], -1],
      });

      readyRef.current = true;
      map.resize();
      fitMainlandAndTaiwan(map, geo.features as GeoFeat[]);
      paintColors(map, provincesRef.current);

      map.on("click", "province-fill", (e) => {
        const f = e.features?.[0] as MapGeoJSONFeature | undefined;
        if (!f) return;
        onSelectRef.current(String(f.properties?.adcode ?? ""));
      });
      map.on("mouseenter", "province-fill", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "province-fill", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    return () => {
      readyRef.current = false;
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !readyRef.current) return;
    paintColors(map, provinces);
  }, [provinces]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer("province-highlight")) return;
    const code = selectedCode ? Number(selectedCode) : -1;
    map.setFilter("province-highlight", ["==", ["get", "adcode"], code]);
  }, [selectedCode]);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="h-full w-full" />
      <div className="pointer-events-none absolute bottom-4 left-4 w-44 rounded-DEFAULT border border-line bg-surface/95 p-2 text-[11px] text-muted">
        <div>{mapCopy.legendTitle}</div>
        <div className="my-1.5 h-2 rounded-[1px] bg-gradient-to-r from-map-low via-accent to-map-high" />
        <div className="flex justify-between">
          <span>{mapCopy.less}</span>
          <span>{mapCopy.more}</span>
        </div>
        <div className="mt-1.5 text-[10px] leading-snug">{mapCopy.legendNote}</div>
      </div>
    </div>
  );
}
