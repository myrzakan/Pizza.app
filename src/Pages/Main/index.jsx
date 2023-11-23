import React from 'react';

import axios from 'axios';
import '../../scss/app.scss';
import { Category } from './Components/Category';
import Pagination from './Components/Pagination';
import { PizzaBlock } from './Components/PizzaBlock';
import Skeleton from './Components/PizzaBlock/Skeleton';
import { Sort } from './Components/Sort';

export const Main = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sort: 'rating',
  });
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    axios
      .get(
        `https://655330845449cfda0f2e4952.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sort}&order=desc${search}`,
      )
      .then(response => {
        setItems(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        console.log('Error');
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzzas = items
    // .filter(obj => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   }

    //   return false;
    // })
    .map(obj => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Category value={categoryId} onClickCategory={setCategoryId} />
          <Sort sortType={sortType} setSortType={setSortType} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzzas}</div>
      </div>
      <Pagination onChangePage={number => setCurrentPage(number)} />
    </div>
  );
};
