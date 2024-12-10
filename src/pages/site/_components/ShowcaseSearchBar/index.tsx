/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {type ReactNode} from 'react';
import {useSearchName} from '@site/src/pages/site/_utils';
import styles from './styles.module.css';

export default function ShowcaseSearchBar(): ReactNode {
  const [searchName, setSearchName] = useSearchName();
  return (
    <div className={styles.searchBar}>
      <input
        placeholder='搜索网站名称……'
        value={searchName}
        onInput={(e) => {
          setSearchName(e.currentTarget.value);
        }}
      />
    </div>
  );
}
