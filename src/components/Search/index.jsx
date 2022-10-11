import React from 'react';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import SearchIcon from '../../assets/img/search-icon.svg';
import ClearIcon from '../../assets/img/clear-icon.svg';

const Search = () => {
  const [value, setValue] = React.useState('');
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 500),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClearBtn = () => {
    setSearchValue('');
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <img className={styles.search_icon} src={SearchIcon} alt="Поиск" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск ..."
      />
      {searchValue && (
        <img
          className={styles.clear_icon}
          src={ClearIcon}
          alt="Очистка"
          onClick={onClickClearBtn}
        />
      )}
    </div>
  );
};

export default Search;
