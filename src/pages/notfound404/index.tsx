import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import picture from '../../assets/icon/404.svg';
import Header from '../../components/header/header';
import { LoginButton } from '../../components/formelements';
import { COME_BACK, NOT_FOUND, TECH_SUPPORT } from '../../utils/constants';

function NotFound404() {
  const navigate = useNavigate();

  const clickGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="layout">
      <Header />
      <main className={styles.main}>
        <div className={styles.blockund}>
          <img src={picture} alt="" />
          <p className={`${styles.text}`}>{NOT_FOUND}</p>
          <LoginButton
            type="button"
            variant="contained"
            sx={{ mb: 2, minWidth: 256 }}
            onClick={clickGoBack}
          >
            {COME_BACK}
          </LoginButton>
          <p className="text-center">
            <Link className={styles.link} to="/404">
              {TECH_SUPPORT}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default NotFound404;
