import debounce from 'lodash.debounce';
import React from 'react';
import { SearchContext } from '../../../App';
import styles from './Search.module.scss';

export const Search = () => {
  console.log(debounce);
  const [value, setValue] = React.useState();
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  const updateSearchValue = React.useCallback(
    debounce(str => {
      setSearchValue(str);
    }, 250),
    [],
  );

  const onChangeInput = event => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  return (
    <input
      className={styles.root}
      value={value}
      onChange={onChangeInput}
      type="text"
      placeholder="Поиск пиццыы."
    />
  );
};
