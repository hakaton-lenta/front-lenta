import { Box, FormControl, FormHelperText } from '@mui/material';
import { SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import {
  ErrorLabel,
  InputLoginLabel,
  LoginButton,
  LoginInput,
  SuccessLabel,
  isValidEmail,
} from '../../components/formelements';
import {
  ENTER,
  PASSWORD,
  REGISTRATION,
  REPEAT_PASSWORD,
  TECH_SUPPORT,
  TITLE,
} from '../../utils/constants';
import { registerUser } from '../../services/redux/slices/auth/auth';
import { useAppDispatch } from '../../services/typeHooks';
// import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// const registerSchema = object({
//   //   name: string()
//   // .nonempty('Name is required')
//   // .max(32, 'Name must be less than 100 characters'),
//   email: string().nonempty('Email is required').email('Email is invalid'),
//   password: string()
//     .nonempty('Password is required')
//     .min(8, 'Password must be more than 8 characters')
//     .max(32, 'Password must be less than 32 characters'),
//   passwordConfirm: string().nonempty('Please confirm your password'),
// }).refine((data) => data.password === data.passwordConfirm, {
//   path: ['passwordConfirm'],
//   message: 'Passwords do not match',
// });

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const [emailС, setEmail] = useState('');
  const [passwordС, setPassword] = useState('');
  const [passwordConfirmС, setPasswordConfirm] = useState('');

  const [error, setError] = useState('');
  const [error2, setError2] = useState('');
  const [error3, setError3] = useState('');
  const [error4, setError4] = useState('');
  const [lsuccess, setSuccess] = useState('');
  const handleEmailChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPasswordConfirm(e.target.value);
  };
  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const navigate = useNavigate();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const passwordconf = formData.get('passwordConfirm') as string;

    setError('');
    setError2('');
    setError3('');
    setError4('');
    setSuccess('');
    // Проверяем валидность email и пароля
    if (!isValidEmail(email)) {
      if (email == '') setError('Введите email');
      else setError('Неправильный формат email');
      return;
    }

    if (password.length < 8) {
      setError2('Пароль должен содержать минимум 8 символов');
      return;
    }

    if (password !== passwordconf) {
      setError3('Пароли должны совпадать');
      return;
    }
    dispatch(registerUser({ email, password })).then((resultAction) => {
      if (registerUser.fulfilled.match(resultAction)) {
        setSuccess('Регистрация прошла успешно');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
      } else {
        setError4('Ошибка регистрации');
      }
    });
    // reset();
    // if (registerUser.rejected.match(resultAction)) {
    //   console.error('Ошибка регистрации:', resultAction.error);
    //   setError('Ошибка регистрации');
    // }
  };

  return (
    <div className="layout white">
      <Header />
      <h3 className="title">{TITLE}</h3>
      <div className="loginForm">
        <div className="loginFormInner">
          <form
            onSubmit={register}
            data-testid="registerForm"
            autoComplete="off"
          >
            <h4>{REGISTRATION}</h4>
            <Box sx={{ height: 18, mb: 2 }}>
              {lsuccess && <SuccessLabel>{lsuccess}</SuccessLabel>}
              {error4 && <ErrorLabel>{error4}</ErrorLabel>}
            </Box>
            <FormControl
              fullWidth
              error={!!error}
              variant="standard"
              sx={{ mb: 2 }}
            >
              <InputLoginLabel shrink htmlFor="email">
                Email
              </InputLoginLabel>
              <LoginInput
                fullWidth
                placeholder=""
                autoFocus
                autoComplete="Введите email"
                value={emailС}
                id="email"
                name="email"
                inputProps={{ autoComplete: 'off' }}
                onChange={handleEmailChange}
              />
              {error && <FormHelperText id="email">{error}</FormHelperText>}
            </FormControl>
            <FormControl
              fullWidth
              variant="standard"
              error={!!error2}
              sx={{ mb: 3 }}
            >
              <InputLoginLabel shrink htmlFor="password">
                {PASSWORD}
              </InputLoginLabel>
              <LoginInput
                fullWidth
                placeholder="Минимум 8 символов"
                type="password"
                autoComplete="off"
                id="password"
                name="password"
                value={passwordС}
                inputProps={{ autoComplete: 'off' }}
                onChange={handlePasswordChange}
              />
              {error2 && (
                <FormHelperText id="password">{error2}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              variant="standard"
              error={!!error3}
              sx={{ mb: 4 }}
            >
              <InputLoginLabel shrink htmlFor="password">
                {REPEAT_PASSWORD}
              </InputLoginLabel>
              <LoginInput
                fullWidth
                placeholder={REPEAT_PASSWORD}
                type="password"
                autoComplete="off"
                id="passwordConfirm"
                name="passwordConfirm"
                value={passwordConfirmС}
                inputProps={{ autoComplete: 'off' }}
                onChange={handlePasswordConfirmChange}
              />
              {error3 && (
                <FormHelperText id="password">{error3}</FormHelperText>
              )}
            </FormControl>
            {/* <FormGroup>
                  <FormControlLabel
                    control={<Checkbox required />}
                    {...register('terms')}
                    label={
                      <Typography color={errors.terms ? 'error' : 'inherit'}>
                        Принять Условия использования
                      </Typography>
                    }
                  />
                  <FormHelperText error={!!errors.terms}>
                    {errors.terms ? errors.terms.message : ''}
                  </FormHelperText>
                </FormGroup> */}
            <LoginButton
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mb: 2 }}
            >
              {REGISTRATION}
            </LoginButton>
            <p className="text-center">
              <Link className="link" to="/login">
                {ENTER}
              </Link>
            </p>
            <p className="text-center">
              <Link className="link" to="/404">
                {TECH_SUPPORT}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
