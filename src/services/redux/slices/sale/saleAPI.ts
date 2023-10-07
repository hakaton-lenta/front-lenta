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

export const fetchSale = (
  skuId: number,
  date: string,
  storeId: number,
  time: string,
  token: string,
) => {
  return fetchData(
    `${API_BASE_URL}/sales/store_product_period?sku=${skuId}&start_date=${date}&store=${storeId}&time_delta=${time}`,
    token,
  );
};
