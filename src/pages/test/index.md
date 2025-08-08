---
title: Test
---

import Heading from '@theme/Heading';

<section className="margin-top--lg margin-bottom--lg text--center">
  <Heading as="h1">Test</Heading>
  <p>Tests for new website features</p>
</section>

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

<Desmos url="mjjhvujgos" />
