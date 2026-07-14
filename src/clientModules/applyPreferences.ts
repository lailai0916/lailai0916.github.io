// Replays the visitor's stored appearance preferences (font family, font size,
// line height, accent color) onto :root as the bundle loads. The settings page
// writes these from its own effects, so without this they would only take effect
// while that page is mounted — a reload on any other route dropped back to the
// defaults.
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { applyStoredColors } from '@site/src/utils/colorUtils';
import { applyStoredPreferences } from '@site/src/utils/preferences';

if (ExecutionEnvironment.canUseDOM) {
  applyStoredPreferences();
  applyStoredColors();
}
