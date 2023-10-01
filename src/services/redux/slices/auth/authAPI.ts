import { checkRes } from '../../../../utils/fetch';
import {
  GET_USER_URL,
  LOGIN_URL,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  REGISTER_URL,
} from '../../../../utils/constants';

const fetchData = (url: string, data: object) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => checkRes(res));
};

export const login = (username: string, password: string) => {
  return fetchData(`${LOGIN_URL}`, { username, password });
};

export const logout = (access: string) => {
  //   return fetchData(`${LOGOUT_URL}`, { access });
  console.log(access);
  return '';
};

export const register = (email: string, password: string) => {
  return fetchData(`${REGISTER_URL}`, { email, password });
};

export const getuser = (access: string) => {
  return fetchData(`${GET_USER_URL}`, { access });
};
