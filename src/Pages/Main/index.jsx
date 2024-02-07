import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../App';
import {
  setCategoryId,
  setCurrentPage,
} from '../../redux/slices/filterSlice.js';
import { fetchPizzas } from '../../redux/slices/pizzaSlice.js';
import '../../scss/app.scss';
import { Category } from './Components/Category';
import Pagination from './Components/Pagination';
import PizzaBlock from './Components/PizzaBlock';
import Skeleton from './Components/PizzaBlock/Skeleton';
import { Sort } from './Components/Sort';

export const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchValue } = React.useContext(SearchContext);

  const { items, status } = useSelector(state => state.pizza);
  const categoryId = useSelector(state => state.filterSlice.categoryId);
  const sortType = useSelector(state => state.filterSlice.sort.sortProperty);
  const currentPage = useSelector(state => state.filterSlice.currentPage);

  const onClickCategory = id => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({ category, search, currentPage, sortType }));
  };

  React.useEffect(() => {
    getPizzas();

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    dispatch(setCurrentPage(1)); // Сбрасываем страницу при изменении категории
  }, [categoryId]);

  const pizzzas = items.map(obj => {
    // console.log(obj); // Вывод для отладки
    return <PizzaBlock key={obj.id} {...obj} />;
  });

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Category value={categoryId} onClickCategory={onClickCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>

        {status === 'failed' ? (
          <div className="content__error-info">
            <h2>Произошла ошибка 😕</h2>
            <p>Не удалось получить пиццы</p>
          </div>
        ) : (
          <div className="content__items">
            {status === 'loading' ? skeletons : pizzzas}
          </div>
        )}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
