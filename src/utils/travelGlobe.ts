import * as countries from 'i18n-iso-countries';
import type { TravelItem } from '@site/src/data/travel';

type GlobeGeometry = {
  type: string;
  coordinates: unknown[];
};

export type GlobeCountryFeature = {
  properties: {
    NAME?: string;
    ISO_A3?: string;
    ADM0_A3?: string;
    [key: string]: unknown;
  };
  geometry: GlobeGeometry;
};

export type WorldGeoJson = {
  features: GlobeCountryFeature[];
};

export type TravelPolygon = GlobeCountryFeature & {
  visited: boolean;
};

export function getFeatureIso3(feature: GlobeCountryFeature): string {
  const iso = feature.properties.ISO_A3;
  if (iso && iso !== '-99') return iso;
  return feature.properties.ADM0_A3 ?? '';
}

const FLAG_REGEX = /[\u{1F1E6}-\u{1F1FF}]{2}/gu;

function flagEmojiToISO2(flag: string): string | null {
  const chars = Array.from(flag);
  if (chars.length < 2) return null;

  const a = chars[0].codePointAt(0)!;
  const b = chars[1].codePointAt(0)!;
  if (a < 0x1f1e6 || a > 0x1f1ff || b < 0x1f1e6 || b > 0x1f1ff) return null;

  return (
    String.fromCharCode(65 + (a - 0x1f1e6)) +
    String.fromCharCode(65 + (b - 0x1f1e6))
  );
}

function iso2ToISO3(code: string): string | null {
  const normalizedCode = code.toUpperCase();

  return countries.alpha2ToAlpha3(normalizedCode) || null;
}

function iso3FromText(text: string): string[] {
  const flags = text.match(FLAG_REGEX) ?? [];

  return flags
    .map(flagEmojiToISO2)
    .filter((x): x is string => !!x)
    .map(iso2ToISO3)
    .filter((x): x is string => !!x);
}

export function getTravelCountryCodes(items: readonly TravelItem[]): string[] {
  return items.flatMap((item) => iso3FromText(item.title));
}

export function buildTravelPolygons(
  features: readonly GlobeCountryFeature[],
  visitedCountries: ReadonlySet<string>
): TravelPolygon[] {
  return features.map((feature) => ({
    ...feature,
    visited: visitedCountries.has(getFeatureIso3(feature)),
  }));
}
