import React from 'react';

import styles from './Search.module.scss';
import SearchIcon from '../../assets/img/search-icon.svg';
import ClearIcon from '../../assets/img/clear-icon.svg';

import { SearchContext } from '../../App';

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  return (
    <div className={styles.root}>
      <img className={styles.search_icon} src={SearchIcon} alt="Поиск" />
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder="Поиск ..."
      />
      {searchValue && (
        <img
          className={styles.clear_icon}
          src={ClearIcon}
          alt="Очистка"
          onClick={() => setSearchValue('')}
        />
      )}
    </div>
  );
};

export default Search;
