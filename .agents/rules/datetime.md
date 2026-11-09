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
- Runtime Snapshot uses `YYYY-MM-DD HH:mm:ss` for build time, local time, and the deployment timestamp tooltip in both locales; these still use the visitor's timezone.
- Runtime Snapshot durations use narrow localized units (`70d`, `9m ago` in English); relative times retain numeric offsets (`1d ago`).
- Insights analytics and public Uptime Kuma status refresh every minute, aligned to whole minutes. Fetch immediately on entry, range changes, and return from a hidden tab; skip overlapping requests and pause polling while hidden. This is separate from Runtime Snapshot's one-second refresh.
- Insights' 24-hour, 7-day, and 30-day ranges are exact rolling windows ending at the captured current instant. Past Year starts at the visitor-local Sunday midnight on or before the rolling 365-day start and ends at the current instant: every historical week is complete, while the current week includes only elapsed time. `UmamiWindowProvider` shares one page-local window snapshot across the statistics, series, and metric requests in each minute refresh cycle. A range change or return from a hidden tab starts a fresh snapshot. Retries within the same cycle reuse it. Percentages compare the preceding equal-length window.
- Client query windows use `[startAt, endAt)`. Umami includes its API end boundary, so convert the exclusive end to `endAt - 1` once at each request boundary. Long-range series requests split into adjacent half-open windows before that conversion.
- Insights series use the visitor's local calendar boundaries. Hourly buckets start at each whole hour, six-hour buckets at 00/06/12/18, daily buckets at midnight, and weekly buckets at Sunday midnight. Fill missing buckets with zero and sum source counts without redistributing them. Keep every intersecting bucket, including partial first and last periods, so point counts follow the covered boundaries. Tooltip labels describe the full calendar bucket uniformly, including the first and last points, without a partial-period suffix; counts still reflect only the actual clipped coverage.
- Runtime Snapshot's system polling, latency measurements, and clock rows align to whole seconds by recalculating the delay from the current epoch time after each tick. Initialize immediately; pause network polling while the page is hidden, then fetch immediately and realign on return.

## Display zones

- Ordinary instants use `useVisitorTimeZone()` and display in the visitor's IANA timezone.
- SSR uses `Asia/Shanghai` as the stable canonical fallback; Docusaurus switches to the visitor timezone after hydration.
- Blog cards, archives, Calendar, Overview, and Moments derive their grouping keys from the same visitor timezone.
- Overview's monthly bar chart extends through the visitor's current month even when there are no posts in it. Fill missing months with zero posts. Seed the current month from build time for SSR and initial hydration, then use the visitor's current date after hydration.
- The homepage clock is the site owner's current local time and remains fixed to `Asia/Shanghai`.
- The birthday countdown is a global event anchored to `09-16T00:00:00+08:00`; every visitor enters the celebration at the same instant.
- After the birthday ends, the countdown targets the following year's birthday.

## Boundary contracts

- Uptime Kuma heartbeat strings are offsetless UTC. Parse them with `parseUtcDateTime()` before local display.
- Umami pageview buckets are already labeled in the visitor timezone requested by the client. Normalize both legacy space-separated labels and newer ISO-shaped labels with a literal `Z` in `src/utils/umamiSeries.ts` before merging and filling gaps. Preserve their written clock time; the API's `Z` does not make these bucket labels UTC instants.
- Docusaurus may normalize blog metadata to `Z`. That generated representation is valid; derive visitor-local date keys from the represented instant.
- Privacy's last-update plugin reads the newest Git commit instant for each locale's Markdown body. Convert it to an `Asia/Shanghai` date key before formatting it as a calendar date; changes to the page shell, components, or styles do not update the policy date.
- Travel's `YYYY-MM` values and Changelog's `YYYY-MM-DD` values are calendar labels. Their displayed month or date must remain unchanged in every timezone.
