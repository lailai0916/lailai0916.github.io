import { translate } from '@docusaurus/Translate';
import Paginator from '@site/src/components/laikit/Paginator';

interface NavLink {
  permalink: string;
  title: string;
}

type Props = {
  className?: string;
  previous?: NavLink;
  next?: NavLink;
};

// Swizzled override of the built-in docs paginator so it shares the blog's
// paginator card (laikit Paginator) instead of the default two-box markup.
// The `theme.docs.paginator.*` ids stay — they are this component's own
// framework-owned strings, already translated.
export default function DocPaginator({ className, previous, next }: Props) {
  const prevLabel = translate({
    id: 'theme.docs.paginator.previous',
    message: 'Previous',
    description: 'The label used to navigate to the previous doc',
  });
  const nextLabel = translate({
    id: 'theme.docs.paginator.next',
    message: 'Next',
    description: 'The label used to navigate to the next doc',
  });

  return (
    <Paginator
      className={className}
      prevItem={previous && { ...previous, label: prevLabel }}
      nextItem={next && { ...next, label: nextLabel }}
      ariaLabel={translate({
        id: 'theme.docs.paginator.navAriaLabel',
        message: 'Docs pages',
        description: 'The ARIA label for the docs pagination',
      })}
    />
  );
}
