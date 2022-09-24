import React from 'react';

export default function Categories() {
  const [activeCategory, setActiveCategory] = React.useState('');
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickCategory = (index) => {
    setActiveCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            className={activeCategory === i ? 'active' : ''}
            onClick={() => onClickCategory(i)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
