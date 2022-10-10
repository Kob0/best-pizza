import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';

import '../scss/app.scss';

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortData, setSortData] = React.useState({
    name: 'популярности (убывание)',
    sortType: 'rating',
  });

  const category = categoryId > 0 ? `category=${categoryId}` : '';

  React.useEffect(() => {
    setIsLoading(true);

    const sortOrder = sortData.sortType.includes('-') ? 'desc' : 'asc';
    const sortBy = sortData.sortType.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://633ad404e02b9b64c6187dd2.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${sortOrder}${search}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sortData, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
        <Sort value={sortData} onChangeSort={(data) => setSortData(data)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
};

export default Home;
