import { Route, Routes } from 'react-router-dom';
import { Header } from './Components/Header';
import { Main } from './Pages/Main';
import { NotFound } from './Pages/NotFound';
import './scss/app.scss';
export const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
