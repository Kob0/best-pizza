import React from 'react';
import { Link } from 'react-router-dom';

import courier from '../assets/img/сourier.png';

const CartSuccess: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Благодарим за посещение нашей пиццерии!</h2>
        <p>Ваш горячий заказ уже в пути!</p>
        <img src={courier} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
};

export default CartSuccess;
