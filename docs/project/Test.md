import BrowserWindow from '@site/src/components/BrowserWindow';
import IframeWindow from '@site/src/components/BrowserWindow/IframeWindow';
import Desmos from '@site/src/components/BrowserWindow/Desmos';

# 测试

Testing new website features...

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

## 折叠

<details>
<summary>参考代码</summary>

```jsx
<Tabs
  defaultValue="apple"
  values={[
    {label: 'Apple 1', value: 'apple'},
    {label: 'Orange 1', value: 'orange'},
    {label: 'Banana 1', value: 'banana'},
  ]}>
  <TabItem value="apple" label="Apple 2">
    This is an apple 🍎
  </TabItem>
  <TabItem value="orange" label="Orange 2">
    This is an orange 🍊
  </TabItem>
  <TabItem value="banana" label="Banana 2" default>
    This is a banana 🍌
  </TabItem>
</Tabs>
```

</details>

## 窗口

<BrowserWindow>
  This is a browser window.
</BrowserWindow>

## 网页

<IframeWindow url="https://generals.io" />

## Desmos

<Desmos url="mjjhvujgos" />
