import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import search from '@/assets/icon/search.svg';
import { useAppSelector } from '../../services/typeHooks';
import { categoriesSelect } from '../../services/redux/slices/categories/categories';
import { shopSelect } from '../../services/redux/slices/shop/shop';
import { IProduct } from '../../services/redux/slices/categories/categories';

import './filter.css';

const Filter: FC = () => {
  const categories = useAppSelector(categoriesSelect);
  const shops = useAppSelector(shopSelect);
  const [menuOpen, setMenuOpen] = useState(true);
  const [tk, setTk] = React.useState<string[]>([]);
  const [group, setGroup] = React.useState<string[]>([]);
  const [category, setCategory] = React.useState<string[]>([]);
  const [subcategories, setSubcategories] = React.useState<string[]>([]);
  const [sku, setSku] = React.useState<string[]>([]);
  const [period, setPeriod] = React.useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

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

  const categoriesForSelectedGroup = getCategoriesForGroup(group, categories);
  const subcategoriesForSelectedCategory = getSubcategoriesForCategory(
    category,
    categories,
  );
  const skuForSelectedSubcategory = getSkuForSubcategory(
    subcategories,
    categories,
  );

  const handleChangeTk = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;

    if (!tk.includes(newValue)) {
      setTk((prevTk) => [...prevTk, newValue]);
    }
  };

  const handleChangeGroup = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;

    if (!group.includes(newValue)) {
      setGroup((prevGroup) => [...prevGroup, newValue]);
    }
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;

    if (!category.includes(newValue)) {
      setCategory((prevCategory) => [...prevCategory, newValue]);
    }
  };

  const handleChangeSubcategories = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;

    if (!subcategories.includes(newValue)) {
      setSubcategories((prevSubcategories) => [...prevSubcategories, newValue]);
    }
  };

  const handleChangeSku = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;

    if (!sku.includes(newValue)) {
      setSku((prevSku) => [...prevSku, newValue]);
    }
  };

  const handleChangePeriod = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as string);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAll(event.target.checked);

    if (event.target.checked) {
      const allTkValues = shops.map((item) => item.store);
      setTk(allTkValues);
    } else {
      setTk([]);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleRemoveChip = (field: string, value: string) => {
    switch (field) {
      case 'tk':
        setTk((prevTk) => prevTk.filter((item) => item !== value));
        break;
      case 'group':
        setGroup((prevGroup) => prevGroup.filter((item) => item !== value));
        break;
      case 'category':
        setCategory((prevCategory) =>
          prevCategory.filter((item) => item !== value),
        );
        break;
      case 'subcategories':
        setSubcategories((prevSubcategories) =>
          prevSubcategories.filter((item) => item !== value),
        );
        break;
      case 'sku':
        setSku((prevSku) => prevSku.filter((item) => item !== value));
        break;

      default:
        break;
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="filter">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: '12px 12px',
          m: 0,
        }}
      >
        <Button
          sx={{ color: 'black' }}
          className="filter__button"
          onClick={toggleMenu}
          endIcon={<ExpandMoreIcon />}
        >
          Фильтры
        </Button>
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#F0F0F0',
            borderRadius: '24px',
            padding: '5px 16px',
          }}
        >
          <img src={search} alt="Icon" />
          <input
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              width: '650px',
              outline: 'none',
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '20ox',
            }}
            type="text"
            placeholder="Поиск"
          />
          <button
            style={{
              border: 'none',
              borderLeft: '1px solid #CDCDCD',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '20ox',
            }}
          >
            Найти
          </button>
        </Box>
      </Box>
      <Collapse
        sx={{
          maxHeight: menuOpen ? 'auto' : 0,
          maxWidth: menuOpen ? 'auto' : '100%',
          overflow: 'hidden',
          transition: 'height 0.3s ease-in-out, width 0.3s ease-in-out',
          position: 'relative',
        }}
        in={menuOpen}
      >
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel
            sx={{ fontSize: '16px', fontWeight: 400, width: '100%' }}
            id="select-label-1"
          >
            Код ТК
          </InputLabel>
          <Select
            sx={{ width: 200, marginRight: 2.5, color: 'black' }}
            labelId="select-label-1"
            id="select-1"
            value={tk[tk.length - 1]}
            label="Код ТК"
            onChange={handleChangeTk}
            displayEmpty
          >
            {shops.map((item) => (
              <MenuItem value={item.store}>{item.store}</MenuItem>
            ))}
          </Select>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox checked={selectAll} onChange={handleSelectAll} />
            Выбрать все ТК
          </label>
          <div>
            {tk.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() => handleRemoveChip('tk', value)}
              />
            ))}
          </div>
        </FormControl>
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel
            sx={{ fontSize: '16px', fontWeight: 400, width: '100%' }}
            id="select-label-1"
          >
            Группа товаров
          </InputLabel>
          <Select
            sx={{ width: 200, marginRight: 2.5 }}
            labelId="select-label-2"
            id="select-2"
            value={group[group.length - 1]}
            label="Группа товаров"
            onChange={handleChangeGroup}
          >
            {categories.map((item) => (
              <MenuItem value={item.group}>{item.group}</MenuItem>
            ))}
          </Select>
          <div>
            {group.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() => handleRemoveChip('group', value)}
              />
            ))}
          </div>
        </FormControl>
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel
            sx={{ fontSize: '16px', fontWeight: 400, width: '100%' }}
            id="select-label-1"
          >
            Категория товаров
          </InputLabel>
          <Select
            sx={{ width: 200, marginRight: 2.5 }}
            labelId="select-label-3"
            id="select-3"
            value={category[category.length - 1]}
            label="Категория товаров"
            onChange={handleChangeCategory}
          >
            {categoriesForSelectedGroup.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
          <div>
            {category.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() => handleRemoveChip('category', value)}
              />
            ))}
          </div>
        </FormControl>
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel
            sx={{ fontSize: '16px', fontWeight: 400, width: '100%' }}
            id="select-label-1"
          >
            Подкатегория товаров
          </InputLabel>
          <Select
            sx={{ width: 200, marginRight: 2.5 }}
            labelId="select-label-4"
            id="select-4"
            value={subcategories[subcategories.length - 1]}
            label="Подкатегория товаров"
            onChange={handleChangeSubcategories}
          >
            {subcategoriesForSelectedCategory.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
          <div>
            {subcategories.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() => handleRemoveChip('subcategories', value)}
              />
            ))}
          </div>
        </FormControl>

        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel
            sx={{ fontSize: '16px', fontWeight: 400, width: '100%' }}
            id="select-label-1"
          >
            Товар
          </InputLabel>
          <Select
            sx={{ width: 200, marginRight: 2.5 }}
            labelId="select-label-6"
            id="select-6"
            value={sku[sku.length - 1]}
            label="Товар"
            onChange={handleChangeSku}
          >
            {skuForSelectedSubcategory.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
          <div>
            {sku.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() => handleRemoveChip('sku', value)}
              />
            ))}
          </div>
        </FormControl>

        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel
            sx={{ fontSize: '16px', fontWeight: 400, width: '100%' }}
            id="select-label-1"
          >
            Период прогнозирования
          </InputLabel>
          <Select
            sx={{ width: 200, marginRight: 2.5 }}
            labelId="select-label-5"
            id="select-5"
            value={period}
            label="Период прогнозирования"
            onChange={handleChangePeriod}
          >
            <MenuItem value={10}>7</MenuItem>
            <MenuItem value={20}>10</MenuItem>
            <MenuItem value={30}>14</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 200 }}>
          <TextField
            id="date"
            label="Выберите дату"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <p>Выбранная дата: {selectedDate}</p>
        </FormControl>
        <Button
          sx={{
            width: '265px',
            backgroundColor: '#001E64',
            color: 'white',
            fontSize: '16px',
            fontWeight: '400',
            height: '56px',
            margin: '8px 0 8px 40px',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.9)',
            },
          }}
        >
          Найти
        </Button>
      </Collapse>
    </div>
  );
};

export default Filter;
