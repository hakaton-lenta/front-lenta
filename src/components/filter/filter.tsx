import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { categoriesSelect } from '../../services/redux/slices/categories/categories';
import { shopSelect } from '../../services/redux/slices/shop/shop';
import { IProduct } from '../../services/redux/slices/categories/categories';
import { useNavigate } from 'react-router-dom';
import {
  setTk,
  setGroup,
  setCategory,
  setSubcategories,
  setSku,
  setPeriod,
  setSelectedDate,
} from '../../services/redux/slices/filter/filter';
import { useAppDispatch, useAppSelector } from '../../services/typeHooks';

import './filter.css';

const Filter: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categoriesState = useAppSelector(categoriesSelect);
  const uniqueGroups = [...new Set(categoriesState.map((item) => item.group))];
  const shops = useAppSelector(shopSelect);
  const tk = useAppSelector((state) => state.filter.tk);
  const group = useAppSelector((state) => state.filter.group);
  const category = useAppSelector((state) => state.filter.category);
  const subcategories = useAppSelector((state) => state.filter.subcategories);
  const sku = useAppSelector((state) => state.filter.sku);
  const period = useAppSelector((state) => state.filter.period);
  const selectedDate = useAppSelector((state) => state.filter.selectedDate);

  const getCategoriesForGroup = (
    groupSelect: string[],
    categoriesData: IProduct[],
  ) => {
    const filteredCategories = categoriesData
      .filter((item) => groupSelect.includes(item.group))
      .map((item) => item.category);

    return Array.from(new Set(filteredCategories));
  };

  const getSubcategoriesForCategory = (
    categorySelect: string[],
    categoriesData: IProduct[],
  ) => {
    const filteredSubcategories = categoriesData
      .filter((item) => categorySelect.includes(item.category))
      .map((item) => item.subcategory);

    return Array.from(new Set(filteredSubcategories));
  };

  const getSkuForSubcategory = (
    subcategorySelect: string[],
    categoriesData: IProduct[],
  ) => {
    const filteredSku = categoriesData
      .filter((item) => subcategorySelect.includes(item.subcategory))
      .map((item) => item.sku);

    return Array.from(new Set(filteredSku));
  };

  const categoriesForSelectedGroup = getCategoriesForGroup(
    group,
    categoriesState,
  );
  const subcategoriesForSelectedCategory = getSubcategoriesForCategory(
    category,
    categoriesState,
  );
  const skuForSelectedSubcategory = getSkuForSubcategory(
    subcategories,
    categoriesState,
  );

  const handleChangeTk = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;

    if (!tk.includes(newValue)) {
      // setTk((prevTk) => [...prevTk, newValue]);
      dispatch(setTk([...tk, newValue]));
    }
  };

  const handleChangeGroup = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;

    if (!group.includes(newValue)) {
      // setGroup((prevGroup) => [...prevGroup, newValue]);
      dispatch(setGroup([...group, newValue]));
    }
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;

    if (!category.includes(newValue)) {
      // setCategory((prevCategory) => [...prevCategory, newValue]);
      dispatch(setCategory([...category, newValue]));
    }
  };

  const handleChangeSubcategories = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;

    if (!subcategories.includes(newValue)) {
      // setSubcategories((prevSubcategories) => [...prevSubcategories, newValue]);
      dispatch(setSubcategories([...subcategories, newValue]));
    }
  };

  const handleChangeSku = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;

    if (!sku.includes(newValue)) {
      // setSku((prevSku) => [...prevSku, newValue]);
      dispatch(setSku([...sku, newValue]));
    }
  };

  const handleChangePeriod = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    // setPeriod(newValue);
    dispatch(setPeriod(newValue));
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allTkValues = shops.map((item) => item.store);
      dispatch(setTk(allTkValues));
    } else {
      dispatch(setTk([]));
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value as string;
    dispatch(setSelectedDate(newValue));
  };

  const handleClick = () => {
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
            value={tk[tk.length - 1] || ''}
            label="Код ТК"
            onChange={handleChangeTk}
            displayEmpty
          >
            {shops.map((item, index) => (
              <MenuItem key={index} value={item.store}>
                {item.store}
              </MenuItem>
            ))}
          </Select>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={tk.length === shops.length}
              onChange={handleSelectAll}
            />
            Выбрать все ТК
          </label>
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
            value={group[group.length - 1] || ''}
            label="Группа товаров"
            onChange={handleChangeGroup}
          >
            {uniqueGroups.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
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
            value={category[category.length - 1] || ''}
            label="Категория товаров"
            onChange={handleChangeCategory}
          >
            {categoriesForSelectedGroup.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
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
            value={subcategories[subcategories.length - 1] || ''}
            label="Подкатегория товаров"
            onChange={handleChangeSubcategories}
          >
            {subcategoriesForSelectedCategory.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
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
            value={sku[sku.length - 1] || ''}
            label="Товар"
            onChange={handleChangeSku}
          >
            {skuForSelectedSubcategory.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
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
            value={period || ''}
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
        <Button
          sx={{
            width: 'auto',
            backgroundColor: '#001E64',
            color: 'white',
            fontSize: '16px',
            fontWeight: '400',
            height: '56px',
            mt: '40px',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.9)',
            },
          }}
          onClick={handleClick}
        >
          Найти
        </Button>
      </Box>
    </div>
  );
};

export default Filter;
