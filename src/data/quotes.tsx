import { STATUS_COLORS } from '@site/src/pages/_components/common/constants';
import { translate } from '@docusaurus/Translate';

export const favoriteQuotes = [
  {
    quote: translate({ id: 'data.quote.p1.quote', message: 'Stay hungry. Stay foolish.' }),
    author: translate({ id: 'data.quote.p1.author', message: 'Steve Jobs' }),
    context: translate({ id: 'data.quote.p1.context', message: 'Stanford Commencement Speech' }),
    category: {
      text: translate({ id: 'data.quote.p1.category', message: 'Innovative Thinking' }),
      color: STATUS_COLORS.PURPLE,
    },
  },
  {
    quote: translate({ id: 'data.quote.p2.quote', message: 'The only way to do great work is to love what you do.' }),
    author: translate({ id: 'data.quote.p2.author', message: 'Steve Jobs' }),
    context: translate({ id: 'data.quote.p2.context', message: 'On Work and Passion' }),
    category: {
      text: translate({ id: 'data.quote.p2.category', message: 'Career Philosophy' }),
      color: STATUS_COLORS.GREEN,
    },
  },
  {
    quote: translate({ id: 'data.quote.p3.quote', message: 'Talk is cheap. Show me the code.' }),
    author: translate({ id: 'data.quote.p3.author', message: 'Linus Torvalds' }),
    context: translate({ id: 'data.quote.p3.context', message: "Linus Torvalds' Programming Philosophy" }),
    category: {
      text: translate({ id: 'data.quote.p3.category', message: 'Technical Attitude' }),
      color: STATUS_COLORS.BLUE,
    },
  },
];
