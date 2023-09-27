import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Layout } from './components/layout/layout';
import { Provider } from 'react-redux';
import { store } from './services/redux/store';
import { useAppDispatch } from './services/typeHooks';
import { getCategoryApi } from './services/redux/slices/categories/categories';
import { getShopApi } from './services/redux/slices/shop/shop';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategoryApi());
    dispatch(getShopApi());
  }, []);

  return (
    <section className="page">
      <Routes>
        <Route path="/" element={<Layout />}></Route>
      </Routes>
    </section>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
