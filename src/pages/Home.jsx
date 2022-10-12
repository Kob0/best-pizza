import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../Redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort, { sortProps } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';

import '../scss/app.scss';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { searchValue } = React.useContext(SearchContext);
  const { categoryId, currentPage, sortData } = useSelector((state) => state.filter);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const fetchPizzas = async () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortOrder = sortData.sortType.includes('-') ? 'desc' : 'asc';
    const sortBy = sortData.sortType.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';

    const response = await axios.get(
      `https://633ad404e02b9b64c6187dd2.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${sortOrder}${search}`,
    );
    setItems(response.data);
    setIsLoading(false);
  };

  //Если изменили параметры и был первый рендер.
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          categoryId,
          currentPage,
          sortType: sortData.sortType,
        },
        { addQueryPrefix: true },
      );
      navigate(queryString);
    }
    isMounted.current = true;
  }, [categoryId, sortData.sortType, searchValue, currentPage]);

  //Если первый рендер произошел, то сверяем параметры URL и сохраняем их в Redux.
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortProps.find((obj) => obj.sortType === params.sortType);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
    }

    isSearch.current = true;
  }, []);

  //Если был первый рендер, то делаем запрос в БД.
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortData.sortType, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
