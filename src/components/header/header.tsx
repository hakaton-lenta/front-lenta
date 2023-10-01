import styles from './header.module.scss';
import logo from '../../assets/icon/logo-ru.wide.svg';
import profileicon from '../../assets/icon/defaultprofile.png';
import signout from '../../assets/icon/SignOut.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';
import { useNavigate } from 'react-router-dom';
import { EXIT, ROUTE_LOGIN } from '../../utils/constants';
import { logoutUser } from '../../services/redux/slices/auth/auth';
import { useAppDispatch } from '../../services/typeHooks';

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const access = localStorage.getItem('accessToken') ?? '';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser({ access })).then((resultAction) => {
      if (logoutUser.fulfilled.match(resultAction)) {
        // После успешного входа, пользователь будет перенаправлен на главную страницу
        navigate(ROUTE_LOGIN);
      } else {
        // Если вход не успешный, устанавливаем состояние ошибки
        // setError3('Неверный email или пароль. Пожалуйста, попробуйте снова.');
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
                sasmeo@gmail.com
                <br/>
                TK-125444
              </div>
            </div>
            <button className={styles.header__logout} onClick={handleLogout}>
              <img src={signout} alt="" />
              {EXIT}
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Header;
