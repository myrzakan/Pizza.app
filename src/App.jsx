import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import { Card } from './Pages/Card';
import { Main } from './Pages/Main';
import { NotFound } from './Pages/NotFound';
import './scss/app.scss';
export const App = () => {
  const [searchValue, setSearchValue] = React.useState();

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <Routes>
        <Route path="/" element={<Main searchValue={searchValue} />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/card" element={<Card />} />
      </Routes>
    </div>
  );
};
