export type NationalPoint = {
  year: number;
  value: number;
  note?: string;
};

export type ProvinceRow = {
  region_code: string;
  region_name: string;
  value: number;
};

export type ProvincesByYear = Record<string, ProvinceRow[]>;

export type Meta = {
  indicator_code: string;
  indicator_name: string;
  unit: string;
  methodology_note: string;
  publisher: string;
  source_url: string;
  retrieved_at: string;
  license_note: string;
  province_years?: number[];
  geo_url?: string;
  geo_attribution?: string;
};
