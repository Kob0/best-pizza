import React from 'react';
import { Link } from 'react-router-dom';

import emptyCartImg from '../assets/img/empty-cart.png';

const EmptyCart: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Корзина пуста <span>😕</span>
        </h2>
        <p>
          Вероятнее всего, вы еще не заказывали пиццу.
          <br />
          Для оформления заказа перейдите на главную страницу.
        </p>
        <img src={emptyCartImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
};

export default EmptyCart;
