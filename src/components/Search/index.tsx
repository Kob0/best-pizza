import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import SearchIcon from '../../assets/img/search-icon.svg';
import ClearIcon from '../../assets/img/clear-icon.svg';
import { setSearchValue } from '../../Redux/slices/filterSlice';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state: any) => state.filter.searchValue);
  const [value, setValue] = React.useState<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 500),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClearBtn = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
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
