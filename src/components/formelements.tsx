import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Button, FormHelperText } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';

export const LoginButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  borderRadius: '40px',
  lineHeight: '34px',
  backgroundColor: '#003C96',
  borderColor: '#003C96',
  fontFamily: ['Futura PT'].join(','),
  '&:hover': {
    backgroundColor: '#0048B5',
    borderColor: '#0048B5',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

export const SuccessLabel = styled(FormHelperText)({
  fontSize: 18,
  lineHeight: '18px',
  padding: '0 6px',
  fontFamily: ['Futura PT'].join(','),
  color: 'green',
  textAlign: 'center',
});

export const ErrorLabel = styled(FormHelperText)({
  fontSize: 18,
  lineHeight: '18px',
  padding: '0 6px',
  fontFamily: ['Futura PT'].join(','),
  color: 'red',
  textAlign: 'center',
});

export const InputLoginLabel = styled(InputLabel)({
  fontSize: 18,
  lineHeight: '18px',
  padding: '0 6px',
  fontFamily: ['Futura PT'].join(','),
});

export const LoginInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(2.5),
  },
  '& .MuiInputBase-input': {
    borderRadius: 24,
    position: 'relative',
    backgroundColor: '#FFF',
    border: '1px solid',
    borderColor: '#858585',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    fontFamily: ['Futura PT'].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const LogOutButton = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 24,
    position: 'relative',
    backgroundColor: '#FFF',
    border: '1px solid',
    borderColor: '#858585',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    fontFamily: ['Futura PT'].join(','),
    '&:focus': {},
  },
}));

// Функция для проверки валидности email
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
