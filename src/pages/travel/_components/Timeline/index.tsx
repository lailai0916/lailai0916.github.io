import { Chrono } from 'react-chrono';
import BrowserOnly from '@docusaurus/BrowserOnly';

const items = [
  { title: 'September 2011', cardTitle: '海南', cardDetailedText: '三亚' },
  { title: 'November 2011', cardTitle: '安徽', cardDetailedText: '黄山（宏村、西递）' },
  { title: 'April 2012', cardTitle: '江苏', cardDetailedText: '泰州、扬州' },
  { title: 'June 2012', cardTitle: '上海', cardDetailedText: '上海' },
  { title: 'February 2013', cardTitle: '广东', cardDetailedText: '广州、中山' },
  { title: 'May 2013', cardTitle: '广东、香港🇭🇰', cardDetailedText: '深圳、香港' },
  { title: 'September 2013', cardTitle: '吉林、辽宁', cardDetailedText: '白山（长白山）、通化、沈阳' },
  { title: 'February 2014', cardTitle: '江苏', cardDetailedText: '南京' },
  { title: 'February 2014', cardTitle: '天津', cardDetailedText: '天津' },
  { title: 'January 2015', cardTitle: '越南🇻🇳', cardDetailedText: '越南' },
  { title: 'February 2015', cardTitle: '江苏、上海', cardDetailedText: '南通、上海（崇明岛）' },
  { title: 'May 2015', cardTitle: '日本🇯🇵', cardDetailedText: '日本（本州）' },
  { title: 'October 2015', cardTitle: '福建', cardDetailedText: '厦门、漳州（土楼）' },
  { title: 'January 2016', cardTitle: '福建', cardDetailedText: '福州' },
  { title: 'February 2016', cardTitle: '山东、北京', cardDetailedText: '济宁（曲阜）、泰安（泰山）、北京' },
  { title: 'July 2016', cardTitle: '奥地利🇦🇹、斯洛伐克🇸🇰、匈牙利🇭🇺、捷克🇨🇿、斯洛文尼亚🇸🇮、德国🇩🇪', cardDetailedText: '奥地利、斯洛伐克、匈牙利、捷克、斯洛文尼亚、德国' },
  { title: 'September 2016', cardTitle: '贵州', cardDetailedText: '贵阳、安顺（黄果树）、黔东南（西江）、黔南（荔波）' },
  { title: 'October 2016', cardTitle: '江苏', cardDetailedText: '泰州、镇江' },
  { title: 'January 2017', cardTitle: '日本🇯🇵', cardDetailedText: '日本（九州）' },
  { title: 'February 2017', cardTitle: '土耳其🇹🇷', cardDetailedText: '土耳其' },
  { title: 'May 2017', cardTitle: '新加坡🇸🇬', cardDetailedText: '新加坡' },
  { title: 'July 2017', cardTitle: '安徽', cardDetailedText: '合肥' },
  { title: 'August 2017', cardTitle: '澳大利亚🇦🇺', cardDetailedText: '澳大利亚' },
  { title: 'October 2017', cardTitle: '黑龙江、吉林', cardDetailedText: '哈尔滨、长春' },
  { title: 'February 2018', cardTitle: '云南', cardDetailedText: '西双版纳' },
  { title: 'June 2018', cardTitle: '内蒙古', cardDetailedText: '呼和浩特、鄂尔多斯' },
  { title: 'August 2018', cardTitle: '日本🇯🇵', cardDetailedText: '日本（北海道）' },
  { title: 'October 2018', cardTitle: '湖南', cardDetailedText: '湘潭、长沙' },
  { title: 'January 2019', cardTitle: '广西', cardDetailedText: '南宁、崇左（德天）、北海' },
  { title: 'February 2019', cardTitle: '北京', cardDetailedText: '北京' },
  { title: 'July 2019', cardTitle: '意大利🇮🇹、梵蒂冈🇻🇦、瑞士🇨🇭、法国🇫🇷', cardDetailedText: '意大利、梵蒂冈、瑞士、法国' },
  { title: 'July 2020', cardTitle: '海南', cardDetailedText: '三亚、文昌、海口' },
  { title: 'May 2021', cardTitle: '江西、湖北', cardDetailedText: '九江（庐山）、武汉' },
  { title: 'July 2021', cardTitle: '山东', cardDetailedText: '烟台' },
  { title: 'January 2023', cardTitle: '福建', cardDetailedText: '泉州、莆田（湄洲岛）' },
  { title: 'July 2023', cardTitle: '马尔代夫🇲🇻', cardDetailedText: '马累、诺鲁环礁（伊露岛）' },
  { title: 'February 2024', cardTitle: '福建、广东', cardDetailedText: '南平（武夷山）、汕头（南澳岛）、潮州、揭阳' },
  { title: 'August 2024', cardTitle: '韩国🇰🇷', cardDetailedText: '首尔、釜山' },
  { title: 'January 2025', cardTitle: '马来西亚🇲🇾', cardDetailedText: '吉隆坡‌、怡保、乔治' },
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

export default function Timeline() {

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
          cardHeight={100}
          useReadMore={true}
          disableInteraction={true}
        />
      )}
    </BrowserOnly>
  );
}
