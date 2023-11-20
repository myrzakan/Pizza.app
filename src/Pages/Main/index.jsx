import React from 'react';

import axios from 'axios';
import '../../scss/app.scss';
import { Category } from './Components/Category';
import { PizzaBlock } from './Components/PizzaBlock';
import Skeleton from './Components/PizzaBlock/Skeleton';
import { Sort } from './Components/Sort';
// import pizzas from '../assets/json/pizza.json';

export const Main = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sort: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    axios
      .get(
        `https://655330845449cfda0f2e4952.mockapi.io/items?${category}&sortBy=${sortType.sort}&order=desc`,
      )
      .then(response => {
        setItems(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        console.log('Error');
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Category value={categoryId} onClickCategory={setCategoryId} />
          <Sort sortType={sortType} setSortType={setSortType} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      </div>
    </div>
  );
};
