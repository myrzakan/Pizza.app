import React from 'react';
import styles from './Search.module.scss';
import { SearchContext } from '../../../App';

export const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  return (
    <input
      className={styles.root}
      value={searchValue}
      onChange={event => setSearchValue(event.target.value)}
      type="text"
      placeholder="Поиск пиццыы."
    />
  );
};
