/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import React, {type ComponentProps} from 'react';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from 'pure-react-carousel';
import Link from '@docusaurus/Link';
import Image from '@theme/IdealImage';
import 'pure-react-carousel/dist/react-carousel.es.css';
import styles from './styles.module.css';

type Site = {
  name: string;
  image: ComponentProps<typeof Image>['img'];
  url: string;
};

function SiteSlide({index, site}: {index: number; site: Site}) {
  return (
    <Slide index={index} className={styles.siteSlide}>
      <Image
        img={site.image}
        alt={site.name}
        loading={index === 0 ? 'eager' : 'lazy'}
      />
      <Link to={site.url} className={styles.siteLink} target="_blank">
        🔗 {site.name}
      </Link>
    </Slide>
  );
}

export default function ShowcaseCarousel({
  sites,
  aspectRatio,
}: {
  sites: Site[];
  aspectRatio: number;
}): JSX.Element {
  return (
    <CarouselProvider
      naturalSlideWidth={1}
      naturalSlideHeight={1 / aspectRatio}
      totalSlides={sites.length}
      infinite
      className={styles.carousel}>
      <Slider>
        {sites.map((site, index) => (
          <SiteSlide key={index} index={index} site={site} />
        ))}
      </Slider>
      <ButtonNext className={styles.navButton} style={{right: -20}}>
        {'>'}
      </ButtonNext>
      <ButtonBack className={styles.navButton} style={{left: -20}}>
        {'<'}
      </ButtonBack>
      <DotGroup className={styles.dotGroup} />
    </CarouselProvider>
  );
}

// export function ShowcaseCarouselV1(): JSX.Element {
//   return (
//     <ShowcaseCarousel
//       aspectRatio={1072 / 584}
//       sites={[
//         {
//           name: 'Prettier',
//           image: require('./img/v1/prettier.png'),
//           url: 'https://prettier.io/',
//         },
//         {
//           name: 'Babel',
//           image: require('./img/v1/babel.png'),
//           url: 'https://babeljs.io/',
//         },
//         {
//           name: 'React-Native',
//           image: require('./img/v1/react-native.png'),
//           url: 'https://archive.reactnative.dev/',
//         },
//         {
//           name: 'Katex',
//           image: require('./img/v1/katex.png'),
//           url: 'https://katex.org/docs/',
//         },
//         {
//           name: 'Docusaurus',
//           image: require('./img/v1/docusaurus.png'),
//           url: 'https://v1.docusaurus.io/',
//         },
//       ]}
//     />
//   );
// }
