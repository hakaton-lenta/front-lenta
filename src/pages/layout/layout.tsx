import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../../components/header/header';
import Navigation from '../../components/navigation/navigation';
import Filter from '../../components/filter/filter';

export const Layout: FC = () => {
  return (
    <div className="layout">
      <Header />
      <div style={{ display: 'flex' }}>
        <Navigation />
        <Filter />
        <Outlet />
      </div>
    </div>
  );
};
