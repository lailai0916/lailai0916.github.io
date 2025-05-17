import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { Chrono } from 'react-chrono';
import BrowserOnly from '@docusaurus/BrowserOnly';

const TITLE = '旅行';
const DESCRIPTION = '纸上得来终觉浅，绝知此事要躬行';

const items = [
  { title: '2011.09', cardTitle: '三亚', cardDetailedText: '三亚' },
  { title: '2011.11', cardTitle: '黄山', cardDetailedText: '黄山（宏村、西递）' },
  { title: '2012.04', cardTitle: '泰州、扬州', cardDetailedText: '泰州、扬州' },
  { title: '2012.06', cardTitle: '上海', cardDetailedText: '上海' },
  { title: '2013.02', cardTitle: '广州、中山', cardDetailedText: '广州、中山' },
  { title: '2013.05', cardTitle: '深圳、香港🇭🇰', cardDetailedText: '深圳、香港🇭🇰' },
  { title: '2013.09', cardTitle: '白山、通化、沈阳', cardDetailedText: '白山（长白山）、通化、沈阳' },
  { title: '2014.02', cardTitle: '南京', cardDetailedText: '南京' },
  { title: '2014.02', cardTitle: '天津', cardDetailedText: '天津' },
  { title: '2015.01', cardTitle: '越南🇻🇳', cardDetailedText: '越南🇻🇳' },
  { title: '2015.02', cardTitle: '南通、上海', cardDetailedText: '南通、上海（崇明岛）' },
  { title: '2015.05', cardTitle: '日本🇯🇵', cardDetailedText: '日本🇯🇵（本州）' },
  { title: '2015.10', cardTitle: '厦门、漳州', cardDetailedText: '厦门、漳州（土楼）' },
  { title: '2016.01', cardTitle: '福州', cardDetailedText: '福州' },
  { title: '2016.02', cardTitle: '济宁、泰安、北京', cardDetailedText: '济宁（曲阜）、泰安（泰山）、北京' },
  { title: '2016.07', cardTitle: '奥地利🇦🇹、斯洛伐克🇸🇰、匈牙利🇭🇺、捷克🇨🇿、斯洛文尼亚🇸🇮、德国🇩🇪', cardDetailedText: '奥地利🇦🇹、斯洛伐克🇸🇰、匈牙利🇭🇺、捷克🇨🇿、斯洛文尼亚🇸🇮、德国🇩🇪' },
  { title: '2016.09', cardTitle: '贵阳、安顺、黔东南、黔南', cardDetailedText: '贵阳、安顺（黄果树）、黔东南（西江）、黔南（荔波）' },
  { title: '2016.10', cardTitle: '泰州、镇江', cardDetailedText: '泰州、镇江' },
  { title: '2017.01', cardTitle: '日本🇯🇵', cardDetailedText: '日本🇯🇵（九州）' },
  { title: '2017.02', cardTitle: '土耳其🇹🇷', cardDetailedText: '土耳其🇹🇷' },
  { title: '2017.05', cardTitle: '新加坡🇸🇬', cardDetailedText: '新加坡🇸🇬' },
  { title: '2017.07', cardTitle: '合肥', cardDetailedText: '合肥' },
  { title: '2017.08', cardTitle: '澳大利亚🇦🇺', cardDetailedText: '澳大利亚🇦🇺' },
  { title: '2017.10', cardTitle: '哈尔滨、长春', cardDetailedText: '哈尔滨、长春' },
  { title: '2018.02', cardTitle: '西双版纳', cardDetailedText: '西双版纳' },
  { title: '2018.06', cardTitle: '呼和浩特、鄂尔多斯', cardDetailedText: '呼和浩特、鄂尔多斯' },
  { title: '2018.08', cardTitle: '日本🇯🇵', cardDetailedText: '日本🇯🇵（北海道）' },
  { title: '2018.10', cardTitle: '湘潭、长沙', cardDetailedText: '湘潭、长沙' },
  { title: '2019.01', cardTitle: '南宁、崇左、北海', cardDetailedText: '南宁、崇左（德天）、北海' },
  { title: '2019.02', cardTitle: '北京', cardDetailedText: '北京' },
  { title: '2019.07', cardTitle: '意大利🇮🇹、梵蒂冈🇻🇦、瑞士🇨🇭、法国🇫🇷', cardDetailedText: '意大利🇮🇹、梵蒂冈🇻🇦、瑞士🇨🇭、法国🇫🇷' },
  { title: '2020.07', cardTitle: '三亚、文昌、海口', cardDetailedText: '三亚、文昌、海口' },
  { title: '2021.05', cardTitle: '九江、武汉', cardDetailedText: '九江（庐山）、武汉' },
  { title: '2021.07', cardTitle: '烟台', cardDetailedText: '烟台' },
  { title: '2023.01', cardTitle: '泉州、莆田', cardDetailedText: '泉州、莆田（湄洲岛）' },
  { title: '2023.07', cardTitle: '马尔代夫🇲🇻', cardDetailedText: '马尔代夫🇲🇻' },
  { title: '2024.02', cardTitle: '南平、汕头、潮州、揭阳', cardDetailedText: '南平（武夷山）、汕头（南澳岛）、潮州、揭阳' },
  { title: '2024.08', cardTitle: '韩国🇰🇷', cardDetailedText: '韩国🇰🇷' },
  { title: '2025.01', cardTitle: '马来西亚🇲🇾', cardDetailedText: '马来西亚🇲🇾' },
];

/*
- 2011.09 三亚
- 2011.11 黄山（宏村、西递）
- 2012.04 泰州、扬州
- 2012.06 上海
- 2013.02 广州、中山
- 2013.05 深圳
- 2013.09 白山（长白山）、通化、沈阳
- 2014.02 南京
- 2014.02 天津
- 2015.02 南通、上海（崇明岛）
- 2015.10 厦门、漳州（土楼）
- 2016.01 福州
- 2016.02 济宁（曲阜）、泰安（泰山）、北京
- 2016.09 贵阳、安顺（黄果树）、黔东南（西江）、黔南（荔波）
- 2016.10 泰州、镇江
- 2017.07 合肥
- 2017.10 哈尔滨、长春
- 2018.02 西双版纳
- 2018.06 呼和浩特、鄂尔多斯
- 2018.10 湘潭、长沙
- 2019.01 南宁、崇左（德天）、北海
- 2019.02 北京
- 2020.07 三亚、文昌、海口
- 2021.05 九江（庐山）、武汉
- 2021.07 烟台
- 2023.01 泉州、莆田（湄洲岛）
- 2024.02 南平（武夷山）、汕头（南澳岛）、潮州、揭阳

- 2013.05 香港🇭🇰
- 2015.01 越南🇻🇳
- 2015.05 日本🇯🇵（本州）
- 2016.07 奥地利🇦🇹、斯洛伐克🇸🇰、匈牙利🇭🇺、捷克🇨🇿、斯洛文尼亚🇸🇮、德国🇩🇪
- 2017.01 日本🇯🇵（九州）
- 2017.02 土耳其🇹🇷
- 2017.05 新加坡🇸🇬
- 2017.08 澳大利亚🇦🇺
- 2018.08 日本🇯🇵（北海道）
- 2019.07 意大利🇮🇹、梵蒂冈🇻🇦、瑞士🇨🇭、法国🇫🇷
- 2023.07 马尔代夫🇲🇻
- 2024.08 韩国🇰🇷
- 2025.01 马来西亚🇲🇾
*/

function PageHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">{TITLE}</Heading>
      <p>{DESCRIPTION}</p>
    </section>
  );
}

function Timeline() {

  const theme = {
    primary: 'var(--ifm-color-primary)',
    secondary: 'var(--ifm-color-secondary)',
    cardBgColor: 'var(--ifm-background-surface-color)',
    cardTitleColor: 'var(--ifm-color-primary)',
    cardSubtitleColor: 'var(--ifm-font-color-base)',
    cardDetailsColor: 'var(--ifm-font-color-base)',
    titleColor: 'var(--ifm-font-color-base)',
  };

  return (
    <BrowserOnly>
      {() => (
        <Chrono
          items={[...items].reverse()}
          mode="VERTICAL_ALTERNATING"
          theme={theme}
          cardWidth={300}
          cardHeight={120}
          useReadMore={true}
          disableToolbar={true}
          disableInteraction={true}
        />
      )}
    </BrowserOnly>
  );
}

export default function TravelPage() {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <PageHeader />
        <Timeline />
      </main>
    </Layout>
  );
}
