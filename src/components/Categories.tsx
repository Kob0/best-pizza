import React from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type TCategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
};

const Categories: React.FC<TCategoriesProps> = ({ value, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} className={value === i ? 'active' : ''} onClick={() => onChangeCategory(i)}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
