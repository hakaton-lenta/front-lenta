import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Layout } from './components/layout/layout';
import { Provider } from 'react-redux';
import { store } from './services/redux/store';

const App = () => {
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
