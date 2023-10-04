import styles from './header.module.scss';
import logo from '../../assets/icon/logo-ru.wide.svg';
import profileicon from '../../assets/icon/defaultprofile.png';
import signout from '../../assets/icon/SignOut.svg';
import { RootState } from '../../services/redux/store';
import { useNavigate } from 'react-router-dom';
import { EXIT, ROUTE_LOGIN } from '../../utils/constants';
import { logoutUser } from '../../services/redux/slices/auth/auth';
import { useAppDispatch, useAppSelector } from '../../services/typeHooks';

const Header = () => {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.user.isLoggedIn,
  );
  const mail = useAppSelector((state: RootState) => state.user.user?.email);
  const access = localStorage.getItem('accessToken') ?? '';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser({ access })).then((resultAction) => {
      if (logoutUser.fulfilled.match(resultAction)) {
        navigate(ROUTE_LOGIN);
      } else {
      }
    });
  };

  return (
    <div className={styles.header}>
      <img src={logo} alt="" />
      <div>
        {isLoggedIn || access ? (
          // Если пользователь залогинен, показываем кнопку "Выйти"
          <div className={styles.profgroup}>
            <div className={styles.profile}>
              <img className={styles.icon} src={profileicon} alt="" />
              <div className={styles.details}>
                {mail}
                <br />
                &nbsp;
              </div>
            </div>
            <button className={styles.logout} onClick={handleLogout}>
              <img src={signout} alt="" />
              {EXIT}
            </button>
          </div>
        ) : (
          ''
        )}
        {/* {loggedIn ? (
          <Link className="header__login" to="#">
            <button>Войти</button>
          </Link>
        ) : (
          <Link className="header__logout" to="#">
            <button>Выйти</button>
          </Link>
        )} */}
      </div>
    </div>
  );
};

export default Header;
