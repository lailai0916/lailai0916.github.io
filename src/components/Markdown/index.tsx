import Translate from '@docusaurus/Translate';
import { MDTitle as Title } from '@lailai0916/ui/Markdown';
import styles from './styles.module.css';

export function MDTitle({ title, description }: { title: string; description?: string }) {
  return (
    <Title
      title={
        title === 'About' ? (
          <>
            {'🎉\xa0'}
            <span className={styles.titleText}>
              <Translate id="components.markdown.aboutGreeting">
                {"Hello,\xa0I'm\xa0lailai"}
              </Translate>
            </span>
            {'\xa0🥳'}
          </>
        ) : (
          title
        )
      }
      description={description}
    />
  );
}
