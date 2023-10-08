import { API_BASE_URL } from '../../../../utils/constants';

const checkRes = (res: Response) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
};

const fetchData = (url: string, token: string) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkRes(res));
};

export const fetchSku = (
  categoriesId: number,
  groupId: number,
  storeId: number,
  subcategoriesId: number,
  token: string,
) => {
  return fetchData(
    `${API_BASE_URL}/filters/products/?category=${categoriesId}&group=${groupId}&store=${storeId}&subcategory=${subcategoriesId}`,
    token,
  );
};
