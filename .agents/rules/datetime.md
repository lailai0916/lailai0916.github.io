---
paths:
  - 'src/**/*.{ts,tsx}'
  - 'docusaurus.config.ts'
---

# Date and time rules

Date-time behavior follows the value's meaning, not one blanket timezone conversion.

## Value types

| Type           | Source form                          | Behavior                                              |
| -------------- | ------------------------------------ | ----------------------------------------------------- |
| Instant        | `YYYY-MM-DDTHH:mm:ss+08:00`          | Display in the visitor's local timezone               |
| Calendar date  | `YYYY-MM-DD`                         | Keep the written date; never convert through `Date`   |
| Calendar month | `YYYY-MM`                            | Keep the written month; never convert through `Date`  |
| Duration       | Numeric seconds or milliseconds      | Has no timezone                                       |
| Unix epoch     | Numeric milliseconds since the epoch | Has no storage timezone; localize only when displayed |

- Repository-owned, human-readable instant strings use an explicit `+08:00` offset.
- Framework-generated values and external API payloads retain their contract format. Normalize them only at their input boundary.
- Use `src/utils/dateTime.ts` for parsing, formatting, date keys, month keys, and chronological comparison. Do not add direct instant parsing or `toLocale*` formatting in consumers.
- Human-visible clock times use `hourCycle: 'h23'` and therefore range from `00:00` through `23:59`. Do not use `hour12`.

## Display zones

- Ordinary instants use `useVisitorTimeZone()` and display in the visitor's IANA timezone.
- SSR uses `Asia/Shanghai` as the stable canonical fallback; Docusaurus switches to the visitor timezone after hydration.
- Blog cards, archives, Calendar, Overview, and Moments derive their grouping keys from the same visitor timezone.
- The homepage clock is the site owner's current local time and remains fixed to `Asia/Shanghai`.
- The birthday countdown is a global event anchored to `09-16T00:00:00+08:00`; every visitor enters the celebration at the same instant.

## Boundary contracts

- Uptime Kuma heartbeat strings are offsetless UTC. Parse them with `parseUtcDateTime()` before local display.
- Umami pageview buckets are already labeled in the visitor timezone requested by the client. Treat them as local bucket labels; never append `Z` or convert them again.
- Docusaurus may normalize blog metadata to `Z`. That generated representation is valid; derive visitor-local date keys from the represented instant.
- Privacy's last-update plugin reads the newest Git commit instant for each locale's Markdown body. Convert it to an `Asia/Shanghai` date key before formatting it as a calendar date; changes to the page shell, components, or styles do not update the policy date.
- Travel's `YYYY-MM` values and Changelog's `YYYY-MM-DD` values are calendar labels. Their displayed month or date must remain unchanged in every timezone.
