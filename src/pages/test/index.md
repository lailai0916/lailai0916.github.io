---
title: Test
---

import { MDTitle } from '@site/src/components/laikit/markdown';

<MDTitle title="Test" description="Tests for new website features" />

$$
\underline{\widehat{\dbinom{\odot_\vee\odot}{\raisebox{-8pt}{"}\ \wr\ \raisebox{-8pt}{"}}}}
$$

## 注释

<Notation type="circle">This is a notation.</Notation>

## 例题

<Problem id="P3372" />

## 按键

<kbd>Ctrl</kbd> + <kbd>C</kbd>

<kbd>⌘</kbd> + <kbd>C</kbd>

## 脚注

- This is a test. [^1][^2]

[^1]: test #1

[^2]: test #2

## 实时编辑器

```jsx live
function Clock(props) {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }

  return (
    <div>
      <h2>It is {date.toLocaleTimeString()}.</h2>
    </div>
  );
}
```

## 窗口

<BrowserWindow>
  This is a browser window.
</BrowserWindow>

## 网页

<IframeWindow url="https://www.baidu.com" />

## Desmos

<Desmos id="mjjhvujgos" />
