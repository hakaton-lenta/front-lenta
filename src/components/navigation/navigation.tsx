import React, { FC, useState } from 'react';
import trendingUp from '@/assets/icon/trending-up.svg';
import bookOpen from '@/assets/icon/book-open.svg';
import chartLine from '@/assets/icon/ChartLine.svg';
import chartScatter from '@/assets/icon/chart-scatter1.svg';
import fileText from '@/assets/icon/file-text.svg';
import trello from '@/assets/icon/trello.svg';
import search from '@/assets/icon/search.svg';
import './navigation.css';
import { NavLink, useLocation } from 'react-router-dom';

interface ComponentProps {
  toggleMenu: () => void;
}

const OpenComponent: React.FC<ComponentProps> = ({ toggleMenu }) => {
  const location = useLocation();

  return (
    <div className="open">
      <div className='open__avatar'>
        <div className='open__img'>
          <p>В</p>
        </div>
        <div className='open__text'>
          <p>Вася Пупкин</p>
          <p>Категорийный менеджер</p>
          <p>ТК 123-456</p>
        </div>
      </div>
      <div className="open__menu">
        <button onClick={toggleMenu} className="open__menu-button">
          <img src={trendingUp} alt="Menu Icon" />
          <span>Аналитика проекта</span>
        </button>
        <nav className="open__nav">
          <NavLink
            to="/"
            className={`open__menu-link ${location.pathname === '/' ? 'open__menu-active' : ''
              }`}
          >
            <img src={trello} alt="Icon 1" />
            Планер
          </NavLink>
          <NavLink
            to="/route2"
            className={`open__menu-link ${location.pathname === '/route2' ? 'open__menu-active' : ''
              }`}
          >
            <img src={chartScatter} alt="Icon 1" />
            Прогноз
          </NavLink>
          <NavLink
            to="/route3"
            className={`open__menu-link ${location.pathname === '/route3' ? 'open__menu-active' : ''
              }`}
          >
            <img src={chartLine} alt="Icon 1" />
            Статистика
          </NavLink>
          <NavLink
            to="/route4"
            className={`open__menu-link ${location.pathname === '/route4' ? 'open__menu-active' : ''
              }`}
          >
            <img src={fileText} alt="Icon 1" />
            Отчеты
          </NavLink>
          <NavLink
            to="/route5"
            className={`open__menu-link ${location.pathname === '/route5' ? 'open__menu-active' : ''
              }`}
          >
            <img src={bookOpen} alt="Icon 1" />
            Библиотека
          </NavLink>
        </nav>
      </div>
      <div className="open__input">
        <input type="text" placeholder="Поиск" />
        <img src={search} alt="Icon" />
      </div>
    </div>
  );
};

const ClosedComponent: React.FC<ComponentProps> = ({ toggleMenu }) => (
  <div className="close">
    <div className="close__menu">
      <button onClick={toggleMenu} className="close__menu-button">
        <img src={trendingUp} alt="Menu Icon" />
      </button>
      <nav className="close__nav">
        <NavLink
          to="/"
          className={`close__menu-link ${location.pathname === '/' ? 'open__menu-active' : ''
            }`}
        >
          <img src={trello} alt="Icon 1" />
        </NavLink>
        <NavLink
          to="/route1"
          className={`close__menu-link ${location.pathname === '/1' ? 'open__menu-active' : ''
            }`}
        >
          <img src={chartScatter} alt="Icon 1" />
        </NavLink>
        <NavLink
          to="/route1"
          className={`close__menu-link ${location.pathname === '/2' ? 'open__menu-active' : ''
            }`}
        >
          <img src={chartLine} alt="Icon 1" />
        </NavLink>
        <NavLink
          to="/route1"
          className={`close__menu-link ${location.pathname === '/3' ? 'open__menu-active' : ''
            }`}
        >
          <img src={fileText} alt="Icon 1" />
        </NavLink>
        <NavLink
          to="/route1"
          className={`close__menu-link ${location.pathname === '/4' ? 'open__menu-active' : ''
            }`}
        >
          <img src={bookOpen} alt="Icon 1" />
        </NavLink>
      </nav>
    </div>
  </div>
);

const Navigation: FC = () => {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='menu'>
      {menuOpen ? (
        <OpenComponent toggleMenu={toggleMenu} />
      ) : (
        <ClosedComponent toggleMenu={toggleMenu} />
      )}
    </div>
  );
};

export default Navigation;
