import type { TravelItem } from '@site/src/data/travel';

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

export function iso2FromText(text: string): string[] {
  const flags = text.match(FLAG_REGEX) ?? [];
  return flags.map(flagEmojiToISO2).filter((x): x is string => !!x);
}

export function getTravelCountryCodes(items: readonly TravelItem[]): string[] {
  return items.flatMap((item) => iso2FromText(item.cardTitle));
}
