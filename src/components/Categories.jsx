import React from 'react';

export default function Categories() {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            className={activeCategory === i ? 'active' : ''}
            onClick={() => setActiveCategory(i)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
