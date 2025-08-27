import Heading from '@theme/Heading';

export function MDTitle({ title, description }) {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">{title}</Heading>
      <p>{description}</p>
    </section>
  );
}
