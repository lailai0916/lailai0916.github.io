# 测试

网站新功能的测试...

## 获取例题

<Problem id="P3372" />

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

<IframeWindow url="https://generals.io" />

## Desmos

<Desmos url="mjjhvujgos" />
