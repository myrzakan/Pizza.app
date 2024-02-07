import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import { Card } from './Pages/Main/Components/Card';
import { Main } from './Pages/Main';
import { NotFound } from './Pages/NotFound';
import './scss/app.scss';

export const SearchContext = React.createContext();
export const App = () => {
  const [searchValue, setSearchValue] = React.useState();

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/card" element={<Card />} />
        </Routes>
      </SearchContext.Provider>
    </div>
  );
};
