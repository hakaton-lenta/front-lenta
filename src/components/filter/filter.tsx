import React, { FC } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
// import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { shopSelect } from '../../services/redux/slices/shop/shop';
import {
  getСategoriesApi,
  categoriesSelect,
} from '../../services/redux/slices/categories/categories';
import { useNavigate } from 'react-router-dom';
import {
  setTk,
  setGroup,
  setCategory,
  setSubcategory,
  setSku,
  setPeriod,
  setSelectedDate,
} from '../../services/redux/slices/filter/filter';
import { useAppDispatch, useAppSelector } from '../../services/typeHooks';
import { getSaleApi } from '../../services/redux/slices/sale/sale';
import {
  getGroupsApi,
  groupsSelect,
} from '../../services/redux/slices/groups/groups';
import {
  getSubcategoriesApi,
  subcategoriesSelect,
} from '../../services/redux/slices/subcategories/subcategories';
import './filter.css';
import { LoginButton } from '../formelements';
import { getSkuApi, skuSelect } from '../../services/redux/slices/sku/sku';
// import { Button } from '@mui/material';
import { getPredictApi } from '../../services/redux/slices/predict/predict';

const Filter: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const shops = useAppSelector(shopSelect);
  const groups = useAppSelector(groupsSelect) || [];
  const categories = useAppSelector(categoriesSelect) || [];
  const subcategories = useAppSelector(subcategoriesSelect) || [];
  const skuData = useAppSelector(skuSelect) || [];
  const tk = useAppSelector((state) => state.filter.tk);
  const group = useAppSelector((state) => state.filter.group);
  const category = useAppSelector((state) => state.filter.category);
  const subcategory = useAppSelector((state) => state.filter.subcategory);
  const sku = useAppSelector((state) => state.filter.sku);
  const period = useAppSelector((state) => state.filter.period);
  const selectedDate = useAppSelector((state) => state.filter.selectedDate);
  const token = localStorage.getItem('accessToken') ?? '';

  const handleChangeTk = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;

    const selectedShop = shops.find((shop) => shop.store === newValue);

    if (selectedShop && tk.id !== selectedShop.id) {
      const shopToSave = { id: selectedShop.id, store: selectedShop.store };
      dispatch(setTk(shopToSave));
      dispatch(getGroupsApi({ storeId: selectedShop.id, token }));
    }
  };

  const handleChangeGroup = (event: SelectChangeEvent) => {
    const newValue = event.target.value;

    const selectedGroup = groups.find((item) => item.group_id === newValue);

    if (selectedGroup && group.groupId !== newValue) {
      const updatedGroup = {
        ...group,
        groupId: selectedGroup.group_id,
        id: selectedGroup.id,
      };
      dispatch(setGroup(updatedGroup));
      dispatch(
        getСategoriesApi({ groupsId: selectedGroup.id, storeId: tk.id, token }),
      );
    }
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    const newValue = event.target.value;

    const selectedCategories = categories.find(
      (item) => item.cat_id === newValue,
    );

    if (selectedCategories && category.catId !== newValue) {
      const updatedCategories = {
        ...category,
        catId: selectedCategories.cat_id,
        id: selectedCategories.id,
      };
      dispatch(setCategory(updatedCategories));
      dispatch(
        getSubcategoriesApi({
          categoriesId: selectedCategories.id,
          groupsId: group.id,
          storeId: tk.id,
          token,
        }),
      );
    }
  };

  const handleChangeSubcategories = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;

    const selectedSubcategories = subcategories.find(
      (item) => item.subcat_id === newValue,
    );

    if (selectedSubcategories && subcategory.subcatId !== newValue) {
      const updatedSubcategories = {
        ...subcategory,
        subcatId: selectedSubcategories.subcat_id,
        id: selectedSubcategories.id,
      };
      dispatch(setSubcategory(updatedSubcategories));
      dispatch(
        getSkuApi({
          categoriesId: category.id,
          groupId: group.id,
          storeId: tk.id,
          subcategoriesId: selectedSubcategories.id,
          token,
        }),
      );
    }
  };

  const handleChangeSku = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;

    const selectedSku = skuData.find((item) => item.pr_sku_id === newValue);

    if (selectedSku && sku.skuId !== newValue) {
      const updatedSku = {
        ...sku,
        skuId: selectedSku.pr_sku_id,
        id: selectedSku.id,
      };
      dispatch(setSku(updatedSku));
    }
  };

  const handleChangePeriod = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    // setPeriod(newValue);
    dispatch(setPeriod(newValue));
  };

  // const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     const allTkValues = shops.map((item) => item.store);
  //     dispatch(setTk(allTkValues));
  //   } else {
  //     dispatch(setTk([]));
  //   }
  // };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value as string;
    dispatch(setSelectedDate(newValue));
  };

  //Обработка кнопки поиска

  const handleClick = () => {
    dispatch(
      getSaleApi({
        skuId: sku.id,
        date: selectedDate,
        storeId: tk.id,
        time: period,
        token,
      }),
    );
    dispatch(
      getPredictApi({
        skuId: sku.id,
        storeId: tk.id,
        token,
      }),
    );
    navigate('/forecast');
  };

  return (
    <div className="filter">
      <h3
        style={{
          margin: '0 0 24px 0',
          fontSize: '24px',
          fontWeight: '500',
          lineHeight: '32px',
        }}
      >
        Фильтры
      </h3>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '265px',
        }}
      >
        <FormControl>
          <InputLabel
            sx={{ fontSize: '16px', fontWeight: 400, width: '100%' }}
            id="select-label-1"
          >
            Код ТК
          </InputLabel>
          <Select
            sx={{
              width: '100%',
              marginRight: 2.5,
              color: 'black',
              borderRadius: '40px',
            }}
            labelId="select-label-1"
            id="select-1"
            value={tk.store}
            label="Код ТК"
            onChange={handleChangeTk}
          >
            {shops.map((item, index) => (
              <MenuItem key={index} value={item.store}>
                {item.store}
              </MenuItem>
            ))}
          </Select>
          {/* <label style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={tk.length === shops.length}
              onChange={handleSelectAll}
            />
            Выбрать все ТК
          </label> */}
        </FormControl>
        <FormControl>
          <InputLabel
            sx={{ fontSize: '16px', fontWeight: 400, width: '100%' }}
            id="select-label-1"
          >
            Группа товаров
          </InputLabel>
          <Select
            sx={{ width: '265px', marginRight: 2.5, borderRadius: '40px' }}
            labelId="select-label-2"
            id="select-2"
            value={group.groupId}
            label="Группа товаров"
            onChange={handleChangeGroup}
          >
            {groups.length > 0 ? (
              groups.map((item) => (
                <MenuItem key={item.id} value={item.group_id}>
                  {item.group_id}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Нет доступных групп</MenuItem>
            )}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel
            sx={{ fontSize: '16px', fontWeight: 400, width: '100%' }}
            id="select-label-1"
          >
            Категория товаров
          </InputLabel>
          <Select
            sx={{ width: '265px', marginRight: 2.5, borderRadius: '40px' }}
            labelId="select-label-3"
            id="select-3"
            value={category.catId}
            label="Категория товаров"
            onChange={handleChangeCategory}
          >
            {categories.length > 0 ? (
              categories.map((item) => (
                <MenuItem key={item.id} value={item.cat_id}>
                  {item.cat_id}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Нет доступных категорий</MenuItem>
            )}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel
            sx={{ fontSize: '16px', fontWeight: 400, width: '100%' }}
            id="select-label-1"
          >
            Подкатегория товаров
          </InputLabel>
          <Select
            sx={{ width: '265px', marginRight: 2.5, borderRadius: '40px' }}
            labelId="select-label-4"
            id="select-4"
            value={subcategory.subcatId}
            label="Подкатегория товаров"
            onChange={handleChangeSubcategories}
          >
            {subcategories.length > 0 ? (
              subcategories.map((item) => (
                <MenuItem key={item.id} value={item.subcat_id}>
                  {item.subcat_id}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Нет доступных подкатегорий</MenuItem>
            )}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel
            sx={{ fontSize: '16px', fontWeight: 400, width: '100%' }}
            id="select-label-1"
          >
            Товар
          </InputLabel>
          <Select
            sx={{ width: '265px', marginRight: 2.5, borderRadius: '40px' }}
            labelId="select-label-6"
            id="select-6"
            value={sku.skuId || ''}
            label="Товар"
            onChange={handleChangeSku}
          >
            {skuData.length > 0 ? (
              skuData.map((item, index) => (
                <MenuItem key={index} value={item.pr_sku_id}>
                  {item.pr_sku_id}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Нет доступных товаров</MenuItem>
            )}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel
            sx={{ fontSize: '16px', fontWeight: 400, width: '100%' }}
            id="select-label-1"
          >
            Период прогнозирования
          </InputLabel>
          <Select
            sx={{ width: '265px', marginRight: 2.5, borderRadius: '40px' }}
            labelId="select-label-5"
            id="select-5"
            value={period}
            label="Период прогнозирования"
            onChange={handleChangePeriod}
          >
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={14}>14</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <TextField
            id="date"
            label="Выберите дату"
            type="date"
            value={selectedDate || ''}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '40px',
              },
            }}
          />
        </FormControl>
        <LoginButton
          fullWidth
          type="button"
          onClick={handleClick}
          variant="contained"
          sx={{ mt: 3 }}
        >
          Найти
        </LoginButton>
      </Box>
    </div>
  );
};

export default Filter;
