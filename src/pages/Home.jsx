import React from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectFilters, setCategoryId, setCurrentPage } from '../Redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../Redux/slices/pizzaSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import '../scss/app.scss';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, currentPage, sortData, searchValue } = useSelector(selectFilters);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortOrder = sortData.sortType.includes('-') ? 'desc' : 'asc';
    const sortBy = sortData.sortType.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        category,
        sortOrder,
        sortBy,
        search,
        currentPage,
      }),
    );
    window.scrollTo(0, 0);
  };

  //Если изменили параметры и был первый рендер.
  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        currentPage,
        sortType: sortData.sortType,
        categoryId,
      };
      const queryString = qs.stringify(params);

      navigate(`/?${queryString}`);
    }

    if (!window.location.search) {
      getPizzas();
    }

    isMounted.current = true;
  }, [categoryId, sortData.sortType, currentPage]);

  //Если первый рендер произошел, то сверяем параметры URL и сохраняем их в Redux.
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     const findSort = sortProps.find((obj) => obj.sortType === params.sortType);

  //     dispatch(
  //       setFilters({
  //         ...params,
  //         findSort,
  //       }),
  //     );
  //   }
  // }, []);

  //Если был первый рендер, то делаем запрос в БД.
  React.useEffect(() => {
    getPizzas();
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
      {status === 'error' ? (
        <div className="content__error-page">
          <h2>Произошла ошибка 😕</h2>
          <p>Сожалеем, техническая проблема. Уже приступили к её решению.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
