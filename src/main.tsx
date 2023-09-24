import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Layout } from './components/layout/layout';

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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
