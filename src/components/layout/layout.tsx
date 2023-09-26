import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../header/header';
import Navigation from '../navigation/navigation';
import Filter from '../filter/filter';

export const Layout: FC = () => {
  return (
    <div className="layout">
      <Header />
      <div style={{ display: 'flex' }}>
        <Navigation />
        <div>
          <Filter />
        </div>
      </div>
      <Outlet />
    </div>
  );
};
