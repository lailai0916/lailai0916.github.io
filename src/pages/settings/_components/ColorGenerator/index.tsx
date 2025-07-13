/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Color from 'color';
import { useColorMode } from '@docusaurus/theme-common';
import { Icon } from '@iconify/react';
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
import IconText from '@site/src/components/IconText';
import styles from './styles.module.css';

function wcagContrast(foreground: string, background: string) {
  const contrast = Color(foreground).contrast(Color(background));
  // eslint-disable-next-line no-nested-ternary
  return contrast > 7 ? 'AAA ✓' : contrast > 4.5 ? 'AA ✓' : 'Fail ✗';
}

export default function ColorGenerator() {
  const colors = [
    '#1d9bf0',
    '#ffd400',
    '#f91880',
    '#7856ff',
    '#ff7a00',
    '#00ba7c',
  ];

  const { colorMode, setColorMode } = useColorMode();

  const isDarkTheme = colorMode === 'dark';

  const [inputColor, setInputColor] = useState(
    isDarkTheme ? DARK_PRIMARY_COLOR : LIGHT_PRIMARY_COLOR
  );
  const [baseColor, setBaseColor] = useState(
    isDarkTheme ? DARK_PRIMARY_COLOR : LIGHT_PRIMARY_COLOR
  );
  const [background, setBackground] = useState(
    isDarkTheme ? DARK_BACKGROUND_COLOR : LIGHT_BACKGROUND_COLOR
  );
  const [shades, setShades] = useState(COLOR_SHADES);
  const [storage, setStorage] = useState(
    isDarkTheme ? darkStorage : lightStorage
  );

  useEffect(() => {
    setStorage(isDarkTheme ? darkStorage : lightStorage);
  }, [isDarkTheme]);

  // Switch modes -> update state by stored values
  useEffect(() => {
    const DEFAULT_PRIMARY_COLOR = isDarkTheme
      ? DARK_PRIMARY_COLOR
      : LIGHT_PRIMARY_COLOR;
    const DEFAULT_BACKGROUND_COLOR = isDarkTheme
      ? DARK_BACKGROUND_COLOR
      : LIGHT_BACKGROUND_COLOR;
    const storedValues = JSON.parse(
      storage.get() ?? '{}'
    ) as Partial<ColorState>;
    setInputColor(storedValues.baseColor ?? DEFAULT_PRIMARY_COLOR);
    setBaseColor(storedValues.baseColor ?? DEFAULT_PRIMARY_COLOR);
    setBackground(storedValues.background ?? DEFAULT_BACKGROUND_COLOR);
    setShades(storedValues.shades ?? COLOR_SHADES);
  }, [storage, isDarkTheme]);

  // State changes -> update DOM styles
  useEffect(() => {
    updateDOMColors({ baseColor, background, shades }, isDarkTheme);
    storage.set(JSON.stringify({ baseColor, background, shades }));
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
    <div className="card" style={{ height: '100%' }}>
      <div className="card__header">
        <h3 style={{ margin: 0, fontSize: '2.5rem' }}>
          <Icon icon="lucide:palette" />
        </h3>
        <h4 style={{ margin: 0 }}>颜色生成器</h4>
      </div>
      <div className="card__body">
        <p>自定义网站主色调，实时预览效果</p>

        {/* 颜色输入区域 */}
        <div className="margin-bottom--md">
          <div className="margin-bottom--sm">
            <label
              htmlFor="primary_color"
              className="margin-bottom--xs"
              style={{ display: 'block', fontWeight: 'bold' }}
            >
              主色调值：
            </label>
            <div
              style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
            >
              <input
                id="primary_color"
                type="text"
                className={clsx(styles.input, 'flex-1')}
                value={inputColor}
                onChange={updateColor}
                placeholder="#1d9bf0"
              />
              <input
                type="color"
                className={styles.colorInput}
                value={baseColor}
                onChange={updateColor}
                title="选择颜色"
              />
            </div>
          </div>
        </div>

        {/* 颜色预览 */}
        <div className="margin-bottom--md">
          <label
            className="margin-bottom--xs"
            style={{ display: 'block', fontWeight: 'bold' }}
          >
            色阶预览：
          </label>
          <div
            className={styles.colorPreview}
            style={{
              background: `linear-gradient(to right, ${getAdjustedColors(
                shades,
                baseColor
              )
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((value) => value.hex)
                .join(', ')})`,
              height: '40px',
              borderRadius: '8px',
              border: '1px solid var(--ifm-color-emphasis-300)',
            }}
          />
        </div>

        {/* 预设颜色选择 */}
        <div className="margin-bottom--md">
          <label
            className="margin-bottom--xs"
            style={{ display: 'block', fontWeight: 'bold' }}
          >
            预设颜色：
          </label>
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {colors.map((color) => (
              <button
                key={color}
                className="clean-btn"
                onClick={() => {
                  setInputColor(color);
                  setBaseColor(color);
                }}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  border:
                    baseColor === color
                      ? '3px solid var(--ifm-color-primary)'
                      : '2px solid var(--ifm-color-emphasis-300)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
                title={`使用颜色 ${color}`}
              />
            ))}
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="button-group button-group--block">
          <button
            type="button"
            className="button button--secondary"
            onClick={() => setColorMode(isDarkTheme ? 'light' : 'dark')}
          >
            <IconText icon={isDarkTheme ? 'lucide:sun' : 'lucide:moon'}>
              {isDarkTheme ? '切换浅色' : '切换深色'}
            </IconText>
          </button>
          <button
            type="button"
            className="button button--outline"
            onClick={() => {
              const DEFAULT_PRIMARY_COLOR = isDarkTheme
                ? DARK_PRIMARY_COLOR
                : LIGHT_PRIMARY_COLOR;
              const DEFAULT_BACKGROUND_COLOR = isDarkTheme
                ? DARK_BACKGROUND_COLOR
                : LIGHT_BACKGROUND_COLOR;
              setInputColor(DEFAULT_PRIMARY_COLOR);
              setBaseColor(DEFAULT_PRIMARY_COLOR);
              setBackground(DEFAULT_BACKGROUND_COLOR);
              setShades(COLOR_SHADES);
            }}
          >
            <IconText icon="lucide:rotate-ccw">重置默认</IconText>
          </button>
        </div>

        {/* 使用提示 */}
        <div
          className="alert alert--info margin-top--md"
          style={{ fontSize: '0.875rem' }}
        >
          <strong>
            <IconText icon="lucide:lightbulb">提示：</IconText>
          </strong>{' '}
          颜色更改会实时应用到整个网站，设置会自动保存到本地存储。
        </div>
      </div>
    </div>
  );
}
