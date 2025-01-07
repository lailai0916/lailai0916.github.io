/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import Color from 'color';
import {useColorMode} from '@docusaurus/theme-common';
import {
  type ColorState,
  COLOR_SHADES,
  LIGHT_PRIMARY_COLOR,
  DARK_PRIMARY_COLOR,
  LIGHT_BACKGROUND_COLOR,
  DARK_BACKGROUND_COLOR,
  getAdjustedColors,
  lightStorage,
  darkStorage,
  updateDOMColors,
} from '@site/src/utils/colorUtils';
import styles from './styles.module.css';

function wcagContrast(foreground: string, background: string) {
  const contrast = Color(foreground).contrast(Color(background));
  // eslint-disable-next-line no-nested-ternary
  return contrast > 7 ? 'AAA 🏅' : contrast > 4.5 ? 'AA 👍' : 'Fail 🔴';
}

export default function ColorGenerator(): JSX.Element {
  const colors = [
    "#1d9bf0",
    "#ffd400",
    "#f91880",
    "#7856ff",
    "#ff7a00",
    "#00ba7c",
  ];

  const {colorMode, setColorMode} = useColorMode();

  const isDarkTheme = colorMode === 'dark';

  const DEFAULT_PRIMARY_COLOR = isDarkTheme
    ? DARK_PRIMARY_COLOR
    : LIGHT_PRIMARY_COLOR;
  const DEFAULT_BACKGROUND_COLOR = isDarkTheme
    ? DARK_BACKGROUND_COLOR
    : LIGHT_BACKGROUND_COLOR;

  const [inputColor, setInputColor] = useState(DEFAULT_PRIMARY_COLOR);
  const [baseColor, setBaseColor] = useState(DEFAULT_PRIMARY_COLOR);
  const [background, setBackground] = useState(DEFAULT_BACKGROUND_COLOR);
  const [shades, setShades] = useState(COLOR_SHADES);
  const [storage, setStorage] = useState(
    isDarkTheme ? darkStorage : lightStorage,
  );

  useEffect(() => {
    setStorage(isDarkTheme ? darkStorage : lightStorage);
  }, [isDarkTheme]);

  // Switch modes -> update state by stored values
  useEffect(() => {
    const storedValues = JSON.parse(
      storage.get() ?? '{}',
    ) as Partial<ColorState>;
    setInputColor(storedValues.baseColor ?? DEFAULT_PRIMARY_COLOR);
    setBaseColor(storedValues.baseColor ?? DEFAULT_PRIMARY_COLOR);
    setBackground(storedValues.background ?? DEFAULT_BACKGROUND_COLOR);
    setShades(storedValues.shades ?? COLOR_SHADES);
  }, [storage, DEFAULT_BACKGROUND_COLOR, DEFAULT_PRIMARY_COLOR]);

  // State changes -> update DOM styles
  useEffect(() => {
    updateDOMColors({baseColor, background, shades}, isDarkTheme);
    storage.set(JSON.stringify({baseColor, background, shades}));
  }, [baseColor, background, shades, storage, isDarkTheme]);

  function updateColor(event: React.ChangeEvent<HTMLInputElement>) {
    // Only prepend # when there isn't one.
    // e.g. ccc -> #ccc, #ccc -> #ccc, ##ccc -> ##ccc,
    const colorValue = event.target.value.replace(/^(?=[^#])/, '#');
    setInputColor(colorValue);

    try {
      setBaseColor(Color(colorValue).hex());
    } catch {
      // Don't update for invalid colors.
    }
  }

  return (
    <div style={{ maxWidth: '70ch', margin: 'auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <div className={styles.container}>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="primary_color">
            <strong className="margin-right--sm">
              主色调：
            </strong>
          </label>
          <input
            id="primary_color"
            type="text"
            className={clsx(styles.input, 'margin-right--sm')}
            value={inputColor}
            onChange={updateColor}
          />
        </div>
        <div>
          <input
            type="color"
            className={styles.colorInput}
            // value has to always be a valid color, so baseColor instead of
            // inputColor
            value={baseColor}
            onChange={updateColor}
          />
          <button
            type="button"
            className="clean-btn button button--secondary margin-left--md"
            onClick={() => setColorMode(isDarkTheme ? 'light' : 'dark')}>
            {isDarkTheme ? '深色' : '浅色'}
          </button>
          <button
            type="button"
            className="clean-btn button button--secondary margin-left--md"
            onClick={() => {
              setInputColor(DEFAULT_PRIMARY_COLOR);
              setBaseColor(DEFAULT_PRIMARY_COLOR);
              setBackground(DEFAULT_BACKGROUND_COLOR);
              setShades(COLOR_SHADES);
            }}>
            重置
          </button>
        </div>
      </div>
      <div>
        <span
          className={styles.color}
          style={{
            background: `linear-gradient(to right, ${getAdjustedColors(shades, baseColor).sort((a, b) => a.displayOrder - b.displayOrder).map(value => value.hex).join(', ')})`,
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {colors.map((color) => (
          <svg
            width="45"
            height="45"
            viewBox="0 0 24 24"
            aria-hidden="true"
            onClick={() => {
              setInputColor(color);
              setBaseColor(color);
            }}
            style={{ cursor: 'pointer', borderRadius: '50%' }}
          >
            <g>
              <circle cx="12" cy="12" r="10.3" fill={color} />
            </g>
          </svg>
        ))}
      </div>
    </div>
  );
}
