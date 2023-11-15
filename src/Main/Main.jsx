import React from 'react';

import '../scss/app.scss';
import { Category } from './Components/Category';
import { PizzaBlock } from './Components/PizzaBlock';
import { Sort } from './Components/Sort';

import axios from 'axios';
// import pizzas from '../assets/json/pizza.json';

export const Main = () => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('https://655330845449cfda0f2e4952.mockapi.io/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(() => {
        console.log('Error');
      });
  }, []);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Category />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {items.map(obj => (
            <PizzaBlock key={obj} {...obj} />
          ))}
        </div>
      </div>
    </div>
  );
};
