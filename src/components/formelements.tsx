import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Box, Button, FormHelperText, Paper } from '@mui/material';
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

export const CustomPaper = styled(Paper)({
  padding: '16px 16px 24px 16px',
  textAlign: 'center',
  borderRadius: 24,
  boxShadow: 'none',
  overflow: 'hidden',
});

export const LeftDescBlock = styled(Box)({
  flex: 1,
});

export const RightDescBlock = styled(Box)({
  width: '124px',
  textAlign: 'left',
});

export const TitleDesc = styled(Box)({
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '20px',
  marginBottom: '12px',
  color: '#9B9B9E',
});

export const LineDesc = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
});

export const LineDescLeftPart = styled(Box)({
  textAlign: 'left',
  color: '#9B9B9E',
  fontSize: '14px',
});

export const LineDescRightPart = styled(Box)({
  textAlign: 'right',
  color: '#292929',
  fontWeight: '500',
  fontSize: '16px',
});

export const TitleGraphBlock = styled(Box)({
  height: '40px',
  display: 'flex',
  alignItems: 'start',
  textAlign: 'left',
  marginBottom: '16px',
});

export const TitleGraph = styled(Box)({
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '20px',
  marginRight: '8px',
});

export const TitleList = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
});

export const TitleListLi = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '12px',
});

export const TitleListSpan = styled(Box)({
  width: '10px',
  height: '10px',

  borderRadius: '50%',
  marginRight: '4px',
});
