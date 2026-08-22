import { translate } from '@docusaurus/Translate';

export interface TravelItem {
  date: string;
  title: string;
  description: string;
  href?: string;
}

export const TRAVEL_LIST: TravelItem[] = [
  {
    date: '2011-09',
    title: translate({
      id: 'data.travel.trip201109.title',
      message: '🇨🇳 Hainan',
    }),
    description: translate({
      id: 'data.travel.trip201109.description',
      message: 'Sanya',
    }),
  },
  {
    date: '2011-11',
    title: translate({
      id: 'data.travel.trip201111.title',
      message: '🇨🇳 Anhui',
    }),
    description: translate({
      id: 'data.travel.trip201111.description',
      message: 'Huangshan (Hongcun, Xidi)',
    }),
  },
  {
    date: '2012-04',
    title: translate({
      id: 'data.travel.trip201204.title',
      message: '🇨🇳 Jiangsu',
    }),
    description: translate({
      id: 'data.travel.trip201204.description',
      message: 'Taizhou, Yangzhou',
    }),
  },
  {
    date: '2012-06',
    title: translate({
      id: 'data.travel.trip201206.title',
      message: '🇨🇳 Shanghai',
    }),
    description: translate({
      id: 'data.travel.trip201206.description',
      message: 'Shanghai',
    }),
  },
  {
    date: '2013-02',
    title: translate({
      id: 'data.travel.trip201302.title',
      message: '🇨🇳 Guangdong',
    }),
    description: translate({
      id: 'data.travel.trip201302.description',
      message: 'Guangzhou, Zhongshan',
    }),
  },
  {
    date: '2013-05',
    title: translate({
      id: 'data.travel.trip201305.title',
      message: '🇨🇳 Guangdong & 🇭🇰 Hong Kong',
    }),
    description: translate({
      id: 'data.travel.trip201305.description',
      message: 'Shenzhen, Hong Kong',
    }),
  },
  {
    date: '2013-09',
    title: translate({
      id: 'data.travel.trip201309.title',
      message: '🇨🇳 Jilin & Liaoning',
    }),
    description: translate({
      id: 'data.travel.trip201309.description',
      message: 'Baishan (Changbai Mountain), Tonghua, Shenyang',
    }),
  },
  {
    date: '2014-02',
    title: translate({
      id: 'data.travel.trip201402Jiangsu.title',
      message: '🇨🇳 Jiangsu',
    }),
    description: translate({
      id: 'data.travel.trip201402Jiangsu.description',
      message: 'Nanjing',
    }),
  },
  {
    date: '2014-02',
    title: translate({
      id: 'data.travel.trip201402Tianjin.title',
      message: '🇨🇳 Tianjin',
    }),
    description: translate({
      id: 'data.travel.trip201402Tianjin.description',
      message: 'Tianjin',
    }),
  },
  {
    date: '2015-01',
    title: translate({
      id: 'data.travel.trip201501.title',
      message: '🇻🇳 Vietnam',
    }),
    description: translate({
      id: 'data.travel.trip201501.description',
      message: 'Da Nang',
    }),
  },
  {
    date: '2015-02',
    title: translate({
      id: 'data.travel.trip201502.title',
      message: '🇨🇳 Jiangsu & Shanghai',
    }),
    description: translate({
      id: 'data.travel.trip201502.description',
      message: 'Nantong, Shanghai (Chongming Island)',
    }),
  },
  {
    date: '2015-05',
    title: translate({
      id: 'data.travel.trip201505.title',
      message: '🇯🇵 Japan',
    }),
    description: translate({
      id: 'data.travel.trip201505.description',
      message: 'Osaka, Kyoto, Nagoya, Hakone, Tokyo, Narita',
    }),
  },
  {
    date: '2015-10',
    title: translate({
      id: 'data.travel.trip201510.title',
      message: '🇨🇳 Fujian',
    }),
    description: translate({
      id: 'data.travel.trip201510.description',
      message: 'Xiamen, Zhangzhou (Tulou)',
    }),
  },
  {
    date: '2016-01',
    title: translate({
      id: 'data.travel.trip201601.title',
      message: '🇨🇳 Fujian',
    }),
    description: translate({
      id: 'data.travel.trip201601.description',
      message: 'Fuzhou',
    }),
  },
  {
    date: '2016-02',
    title: translate({
      id: 'data.travel.trip201602.title',
      message: '🇨🇳 Shandong & Beijing',
    }),
    description: translate({
      id: 'data.travel.trip201602.description',
      message: "Jining (Qufu), Tai'an (Mount Tai), Beijing",
    }),
  },
  {
    date: '2016-07',
    title: translate({
      id: 'data.travel.trip201607.title',
      message: '🇦🇹 Austria & 🇸🇰 Slovakia & 🇭🇺 Hungary & 🇸🇮 Slovenia & 🇨🇿 Czechia & 🇩🇪 Germany',
    }),
    description: translate({
      id: 'data.travel.trip201607.description',
      message:
        'Vienna, Bratislava, Budapest, Maribor, Hallstatt, Salzburg, Linz, Český Krumlov, Prague, Karlovy Vary, Weimar, Dresden, Potsdam, Berlin',
    }),
  },
  {
    date: '2016-09',
    title: translate({
      id: 'data.travel.trip201609.title',
      message: '🇨🇳 Guizhou',
    }),
    description: translate({
      id: 'data.travel.trip201609.description',
      message:
        'Guiyang, Anshun (Huangguoshu Waterfall), Qiandongnan (Xijiang Qianhu Miao Village), Qiannan (Libo)',
    }),
  },
  {
    date: '2016-10',
    title: translate({
      id: 'data.travel.trip201610.title',
      message: '🇨🇳 Jiangsu',
    }),
    description: translate({
      id: 'data.travel.trip201610.description',
      message: 'Taizhou, Zhenjiang',
    }),
  },
  {
    date: '2017-01',
    title: translate({
      id: 'data.travel.trip201701.title',
      message: '🇯🇵 Japan',
    }),
    description: translate({
      id: 'data.travel.trip201701.description',
      message: 'Shanghai ⇌ Kumamoto (Quantum of the Seas)',
    }),
  },
  {
    date: '2017-02',
    title: translate({
      id: 'data.travel.trip201702.title',
      message: '🇹🇷 Turkey',
    }),
    description: translate({
      id: 'data.travel.trip201702.description',
      message: 'Istanbul, Izmir (Ephesus), Denizli (Pamukkale), Cappadocia',
    }),
  },
  {
    date: '2017-05',
    title: translate({
      id: 'data.travel.trip201705.title',
      message: '🇸🇬 Singapore',
    }),
    description: translate({
      id: 'data.travel.trip201705.description',
      message: 'Singapore',
    }),
  },
  {
    date: '2017-07',
    title: translate({
      id: 'data.travel.trip201707.title',
      message: '🇨🇳 Anhui',
    }),
    description: translate({
      id: 'data.travel.trip201707.description',
      message: 'Hefei',
    }),
  },
  {
    date: '2017-08',
    title: translate({
      id: 'data.travel.trip201708.title',
      message: '🇦🇺 Australia',
    }),
    description: translate({
      id: 'data.travel.trip201708.description',
      message:
        'Brisbane, Gold Coast, Cairns (Green Island Great Barrier Reef, mangroves), Sydney (Blue Mountains National Park), Melbourne (Great Ocean Road)',
    }),
  },
  {
    date: '2017-10',
    title: translate({
      id: 'data.travel.trip201710.title',
      message: '🇨🇳 Heilongjiang & Jilin',
    }),
    description: translate({
      id: 'data.travel.trip201710.description',
      message: 'Harbin, Changchun',
    }),
  },
  {
    date: '2018-02',
    title: translate({
      id: 'data.travel.trip201802.title',
      message: '🇨🇳 Yunnan',
    }),
    description: translate({
      id: 'data.travel.trip201802.description',
      message: 'Xishuangbanna',
    }),
  },
  {
    date: '2018-06',
    title: translate({
      id: 'data.travel.trip201806.title',
      message: '🇨🇳 Inner Mongolia',
    }),
    description: translate({
      id: 'data.travel.trip201806.description',
      message: 'Hohhot, Ordos',
    }),
  },
  {
    date: '2018-08',
    title: translate({
      id: 'data.travel.trip201808.title',
      message: '🇯🇵 Japan',
    }),
    description: translate({
      id: 'data.travel.trip201808.description',
      message: 'Hakodate, Noboribetsu, Lake Toya, Furano (Farm Tomita), Otaru, Sapporo',
    }),
  },
  {
    date: '2018-10',
    title: translate({
      id: 'data.travel.trip201810.title',
      message: '🇨🇳 Hunan',
    }),
    description: translate({
      id: 'data.travel.trip201810.description',
      message: 'Xiangtan, Changsha',
    }),
  },
  {
    date: '2019-01',
    title: translate({
      id: 'data.travel.trip201901.title',
      message: '🇨🇳 Guangxi',
    }),
    description: translate({
      id: 'data.travel.trip201901.description',
      message: 'Nanning, Chongzuo (Detian Waterfall), Beihai',
    }),
  },
  {
    date: '2019-02',
    title: translate({
      id: 'data.travel.trip201902.title',
      message: '🇨🇳 Beijing',
    }),
    description: translate({
      id: 'data.travel.trip201902.description',
      message: 'Beijing',
    }),
  },
  {
    date: '2019-07',
    title: translate({
      id: 'data.travel.trip201907.title',
      message: '🇮🇹 Italy & 🇻🇦 Vatican City & 🇨🇭 Switzerland & 🇫🇷 France',
    }),
    description: translate({
      id: 'data.travel.trip201907.description',
      message:
        'Rome, Vatican City, Civita di Bagnoregio, Tuscany, Florence, Venice, Verona, St. Moritz, Davos, Lucerne, Interlaken, Montreux, Annecy, Paris',
    }),
  },
  {
    date: '2020-07',
    title: translate({
      id: 'data.travel.trip202007.title',
      message: '🇨🇳 Hainan',
    }),
    description: translate({
      id: 'data.travel.trip202007.description',
      message: 'Sanya, Wenchang, Haikou',
    }),
  },
  {
    date: '2021-05',
    title: translate({
      id: 'data.travel.trip202105.title',
      message: '🇨🇳 Jiangxi & Hubei',
    }),
    description: translate({
      id: 'data.travel.trip202105.description',
      message: 'Jiujiang (Mount Lu), Wuhan',
    }),
  },
  {
    date: '2021-07',
    title: translate({
      id: 'data.travel.trip202107.title',
      message: '🇨🇳 Shandong',
    }),
    description: translate({
      id: 'data.travel.trip202107.description',
      message: 'Yantai',
    }),
  },
  {
    date: '2023-01',
    title: translate({
      id: 'data.travel.trip202301.title',
      message: '🇨🇳 Fujian',
    }),
    description: translate({
      id: 'data.travel.trip202301.description',
      message: 'Quanzhou, Putian (Meizhou Island)',
    }),
  },
  {
    date: '2023-07',
    title: translate({
      id: 'data.travel.trip202307.title',
      message: '🇲🇻 Maldives',
    }),
    description: translate({
      id: 'data.travel.trip202307.description',
      message: 'Malé, Iru Fushi (Noonu Atoll)',
    }),
  },
  {
    date: '2024-02',
    title: translate({
      id: 'data.travel.trip202402.title',
      message: '🇨🇳 Fujian & Guangdong',
    }),
    description: translate({
      id: 'data.travel.trip202402.description',
      message: "Nanping (Mount Wuyi), Shantou (Nan'ao Island), Chaozhou, Jieyang",
    }),
  },
  {
    date: '2024-08',
    title: translate({
      id: 'data.travel.trip202408.title',
      message: '🇰🇷 South Korea',
    }),
    description: translate({
      id: 'data.travel.trip202408.description',
      message: 'Incheon, Seoul, Busan',
    }),
  },
  {
    date: '2025-01',
    title: translate({
      id: 'data.travel.trip202501.title',
      message: '🇲🇾 Malaysia',
    }),
    description: translate({
      id: 'data.travel.trip202501.description',
      message: 'Kuala Lumpur, Ipoh (Perak), George Town (Penang)',
    }),
  },
  {
    date: '2025-07',
    title: translate({
      id: 'data.travel.trip202507.title',
      message: '🇭🇰 Hong Kong & 🇨🇳 Guangdong',
    }),
    description: translate({
      id: 'data.travel.trip202507.description',
      message: 'Hong Kong, Shenzhen, Guangzhou',
    }),
    href: '/blog/travel/hk-gd',
  },
  {
    date: '2026-02',
    title: translate({
      id: 'data.travel.trip202602.title',
      message: '🇹🇭 Thailand & 🇱🇦 Laos',
    }),
    description: translate({
      id: 'data.travel.trip202602.description',
      message: 'Chiang Mai, Chiang Rai, Golden Triangle',
    }),
    href: '/blog/travel/th-la',
  },
  {
    date: '2026-08',
    title: translate({
      id: 'data.travel.trip202608.title',
      message: '🇨🇳 Beijing',
    }),
    description: translate({
      id: 'data.travel.trip202608.description',
      message: 'Beijing',
    }),
    href: '/blog/record/gfssm-2026-final',
  },
];
