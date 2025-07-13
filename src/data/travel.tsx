export interface TravelStatItem {
  number: string;
  title: string;
  icon: string;
}

export interface TravelItem {
  title: string;
  cardTitle: string;
  cardDetailedText: string;
}

export const TRAVEL_STAT_LIST: TravelStatItem[] = [
  { number: '20+', title: '国家/地区', icon: 'material-symbols:public' },
  { number: '50+', title: '城市', icon: 'material-symbols:location-city' },
  { number: '13年', title: '历程', icon: 'material-symbols:schedule' },
];

export const TRAVEL_LIST: TravelItem[] = [
  {
    title: '2011-09',
    cardTitle: '海南',
    cardDetailedText: '三亚',
  },
  {
    title: '2011-11',
    cardTitle: '安徽',
    cardDetailedText: '黄山（宏村、西递）',
  },
  {
    title: '2012-04',
    cardTitle: '江苏',
    cardDetailedText: '泰州、扬州',
  },
  {
    title: '2012-06',
    cardTitle: '上海',
    cardDetailedText: '上海',
  },
  {
    title: '2013-02',
    cardTitle: '广东',
    cardDetailedText: '广州、中山',
  },
  {
    title: '2013-05',
    cardTitle: '广东、香港🇭🇰',
    cardDetailedText: '深圳、香港',
  },
  {
    title: '2013-09',
    cardTitle: '吉林、辽宁',
    cardDetailedText: '白山（长白山）、通化、沈阳',
  },
  {
    title: '2014-02',
    cardTitle: '江苏',
    cardDetailedText: '南京',
  },
  {
    title: '2014-02',
    cardTitle: '天津',
    cardDetailedText: '天津',
  },
  {
    title: '2015-01',
    cardTitle: '越南🇻🇳',
    cardDetailedText: '越南',
  },
  {
    title: '2015-02',
    cardTitle: '江苏、上海',
    cardDetailedText: '南通、上海（崇明岛）',
  },
  {
    title: '2015-05',
    cardTitle: '日本🇯🇵',
    cardDetailedText: '本州',
  },
  {
    title: '2015-10',
    cardTitle: '福建',
    cardDetailedText: '厦门、漳州（土楼）',
  },
  {
    title: '2016-01',
    cardTitle: '福建',
    cardDetailedText: '福州',
  },
  {
    title: '2016-02',
    cardTitle: '山东、北京',
    cardDetailedText: '济宁（曲阜）、泰安（泰山）、北京',
  },
  {
    title: '2016-07',
    cardTitle: '奥地利🇦🇹、斯洛伐克🇸🇰、匈牙利🇭🇺、捷克🇨🇿、斯洛文尼亚🇸🇮、德国🇩🇪',
    cardDetailedText: '奥地利、斯洛伐克、匈牙利、捷克、斯洛文尼亚、德国',
  },
  {
    title: '2016-09',
    cardTitle: '贵州',
    cardDetailedText: '贵阳、安顺（黄果树）、黔东南（西江）、黔南（荔波）',
  },
  {
    title: '2016-10',
    cardTitle: '江苏',
    cardDetailedText: '泰州、镇江',
  },
  {
    title: '2017-01',
    cardTitle: '日本🇯🇵',
    cardDetailedText: '九州（熊本）',
  },
  {
    title: '2017-02',
    cardTitle: '土耳其🇹🇷',
    cardDetailedText: '土耳其',
  },
  {
    title: '2017-05',
    cardTitle: '新加坡🇸🇬',
    cardDetailedText: '新加坡',
  },
  {
    title: '2017-07',
    cardTitle: '安徽',
    cardDetailedText: '合肥',
  },
  {
    title: '2017-08',
    cardTitle: '澳大利亚🇦🇺',
    cardDetailedText: '澳大利亚',
  },
  {
    title: '2017-10',
    cardTitle: '黑龙江、吉林',
    cardDetailedText: '哈尔滨、长春',
  },
  {
    title: '2018-02',
    cardTitle: '云南',
    cardDetailedText: '西双版纳',
  },
  {
    title: '2018-06',
    cardTitle: '内蒙古',
    cardDetailedText: '呼和浩特、鄂尔多斯',
  },
  {
    title: '2018-08',
    cardTitle: '日本🇯🇵',
    cardDetailedText: '北海道',
  },
  {
    title: '2018-10',
    cardTitle: '湖南',
    cardDetailedText: '湘潭、长沙',
  },
  {
    title: '2019-01',
    cardTitle: '广西',
    cardDetailedText: '南宁、崇左（德天）、北海',
  },
  {
    title: '2019-02',
    cardTitle: '北京',
    cardDetailedText: '北京',
  },
  {
    title: '2019-07',
    cardTitle: '意大利🇮🇹、梵蒂冈🇻🇦、瑞士🇨🇭、法国🇫🇷',
    cardDetailedText: '意大利、梵蒂冈、瑞士、法国',
  },
  {
    title: '2020-07',
    cardTitle: '海南',
    cardDetailedText: '三亚、文昌、海口',
  },
  {
    title: '2021-05',
    cardTitle: '江西、湖北',
    cardDetailedText: '九江（庐山）、武汉',
  },
  {
    title: '2021-07',
    cardTitle: '山东',
    cardDetailedText: '烟台',
  },
  {
    title: '2023-01',
    cardTitle: '福建',
    cardDetailedText: '泉州、莆田（湄洲岛）',
  },
  {
    title: '2023-07',
    cardTitle: '马尔代夫🇲🇻',
    cardDetailedText: '马累、诺鲁环礁（伊露岛）',
  },
  {
    title: '2024-02',
    cardTitle: '福建、广东',
    cardDetailedText: '南平（武夷山）、汕头（南澳岛）、潮州、揭阳',
  },
  {
    title: '2024-08',
    cardTitle: '韩国🇰🇷',
    cardDetailedText: '首尔、釜山',
  },
  {
    title: '2025-01',
    cardTitle: '马来西亚🇲🇾',
    cardDetailedText: '吉隆坡、怡保、乔治',
  },
];
