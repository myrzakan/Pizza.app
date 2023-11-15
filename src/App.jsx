import { Header } from './Components/Header';
import { Main } from './Main/Main';
import './scss/app.scss';
export const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <Main />
    </div>
  );
};
