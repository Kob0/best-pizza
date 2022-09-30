import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import '../scss/app.scss';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortProps, setSortProps] = React.useState({
    name: 'популярности',
    sortType: 'rating',
    sortOrder: 'asc',
  });

  const category = categoryId > 0 ? categoryId : '';

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63320c8ca54a0e83d24b5292.mockapi.io/items?category=${category}&sortBy=${sortProps.sortType}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sortProps]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
        <Sort value={sortProps} onChangeSort={(i) => setSortProps(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </>
  );
};

export default Home;
