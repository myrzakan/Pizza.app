import React from 'react';
import styles from './Search.module.scss';

export const Search = ({ searchValue, setSearchValue }) => {
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
