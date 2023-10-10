import { checkRes } from '../../../../utils/fetch';
import {
  GET_USER_URL,
  LOGIN_URL,
  // LOGOUT_URL,
  REGISTER_URL,
  TOKEN_URL,
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

const fetchDataAuth = (
  url: string,
  data: { access: string },
  method = 'GET',
) => {
  return fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.access}`,
    },
  }).then((res) => checkRes(res));
};

export const login = (username: string, password: string) => {
  return fetchData(`${LOGIN_URL}`, { username, password });
};

export const logout = (refresh: string) => {
  // return fetchDataAuth(`${LOGOUT_URL}`, { access:refresh }, 'POST');
  console.log(refresh);
  return true;
};

export const register = (email: string, password: string) => {
  return fetchData(`${REGISTER_URL}`, { email, password });
};

export const refresh = (access: string) => {
  return fetchData(`${TOKEN_URL}`, { access });
};

export const getuser = (access: string) => {
  return fetchDataAuth(`${GET_USER_URL}`, { access });
};
