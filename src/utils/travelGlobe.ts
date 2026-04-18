import * as countries from 'i18n-iso-countries';
import type { TravelItem } from '@site/src/data/travel';

export type GlobeGeometry = {
  type: string;
  coordinates: unknown[];
};

export type GlobeCountryFeature = {
  id: string;
  properties: {
    name: string;
    name_zh?: string;
    name_en?: string;
  };
  geometry: GlobeGeometry;
};

export type TravelPolygon = GlobeCountryFeature & {
  visited: boolean;
};

const WORLD_GEOJSON = require('@site/static/json/datamaps.world.json') as {
  features: GlobeCountryFeature[];
};

// Some values in the travel data and GeoJSON source are not standard ISO 3166-1.
const ISO2_TO_ISO3_OVERRIDES: Record<string, string> = {
  XK: 'XKX',
};

const GEOJSON_ISO3_OVERRIDES: Record<string, string> = {
  '-99': 'SOM',
};

const FLAG_REGEX = /[\u{1F1E6}-\u{1F1FF}]{2}/gu;

export function flagEmojiToISO2(flag: string): string | null {
  const chars = Array.from(flag);
  if (chars.length < 2) return null;

  const a = chars[0].codePointAt(0);
  const b = chars[1].codePointAt(0);
  if (!a || !b) return null;
  if (a < 0x1f1e6 || a > 0x1f1ff || b < 0x1f1e6 || b > 0x1f1ff) return null;

  return (
    String.fromCharCode(65 + (a - 0x1f1e6)) +
    String.fromCharCode(65 + (b - 0x1f1e6))
  );
}

export function iso2ToISO3(code: string): string | null {
  const normalizedCode = code.toUpperCase();

  return (
    ISO2_TO_ISO3_OVERRIDES[normalizedCode] ||
    countries.alpha2ToAlpha3(normalizedCode) ||
    null
  );
}

export function normalizeGeoJSONISO3(code: string): string {
  return GEOJSON_ISO3_OVERRIDES[code] || code;
}

export function iso3FromText(text: string): string[] {
  const flags = text.match(FLAG_REGEX) ?? [];

  return flags
    .map(flagEmojiToISO2)
    .filter((x): x is string => !!x)
    .map(iso2ToISO3)
    .filter((x): x is string => !!x);
}

export function getTravelCountryCodes(items: readonly TravelItem[]): string[] {
  return items.flatMap((item) => iso3FromText(item.cardTitle));
}

export function getTravelPolygons(
  visitedCountries: ReadonlySet<string>
): TravelPolygon[] {
  return WORLD_GEOJSON.features.map((feature) => ({
    ...feature,
    visited: visitedCountries.has(normalizeGeoJSONISO3(feature.id)),
  }));
}
