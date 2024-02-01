import React from 'react';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../App';
import {
  setCategoryId,
  setCurrentPage,
} from '../../redux/slices/filterSlice.js';
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
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [currentPage, setCurrentPage] = React.useState(1);

  const categoryId = useSelector(state => state.filterSlice.categoryId);
  const sortType = useSelector(state => state.filterSlice.sort.sortProperty);
  const currentPage = useSelector(state => state.filterSlice.currentPage);

  const onClickCategory = id => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  };

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     const sort = list.find(obj => obj.sortProperty === params.sortProperty);
  //     dispatch(
  //       setFilters({
  //         ...params,
  //         sort,
  //       }),
  //     );
  //   }
  // }, []);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    axios
      .get(
        `https://655330845449cfda0f2e4952.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=desc${search}`,
      )
      .then(response => {
        setItems(response.data);
        // console.log(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        console.log('Error');
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  // React.useEffect(() => {
  //   const queryString = qs.stringify({
  //     sortProperty: sortType.sortProperty,
  //     categoryId,
  //     currentPage,
  //   });

  //   navigate(`?${queryString}`);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [categoryId, sortType, currentPage]);

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
        <div className="content__items">{isLoading ? skeletons : pizzzas}</div>
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
