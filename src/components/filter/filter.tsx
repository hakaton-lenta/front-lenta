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

import './filter.css';

const Filter: FC = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [tk, setTk] = React.useState<string[]>([]);
  const [group, setGroup] = React.useState<string[]>([]);
  const [category, setCategory] = React.useState<string[]>([]);
  const [subcategories, setSubcategories] = React.useState<string[]>([]);
  const [period, setPeriod] = React.useState('');
  const [selectAll, setSelectAll] = useState(false);

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

  const handleChangePeriod = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as string);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAll(event.target.checked);
  
    if (event.target.checked) {
      const allTkValues = ['Магнит', 'Пятерочка', 'Лента'];
      setTk(allTkValues);
    } else {
      setTk([]);
    }
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
        setCategory((prevCategory) => prevCategory.filter((item) => item !== value));
        break;
      case 'subcategories':
        setSubcategories((prevSubcategories) =>
          prevSubcategories.filter((item) => item !== value)
        );
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
      <Button
        sx={{ color: 'black' }}
        className="filter__button"
        onClick={toggleMenu}
        endIcon={<ExpandMoreIcon />}
      >
        Фильтры
      </Button>
      <Collapse sx={{
        maxHeight: menuOpen ? 'auto' : 0,
        maxWidth: menuOpen ? 'auto' : 0,
        overflow: 'hidden',
        transition: 'height 0.3s ease-in-out, width 0.3s ease-in-out',
      }} in={menuOpen}>
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
          >
            <MenuItem value={'Магнит'}>Магнит</MenuItem>
            <MenuItem value={'Пятерочка'}>Пятерочка</MenuItem>
            <MenuItem value={'Лента'}>Лента</MenuItem>
          </Select>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={selectAll}
              onChange={handleSelectAll}
            />
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
            <MenuItem value={'Группа А'}>Группа А</MenuItem>
            <MenuItem value={'Группа Б'}>Группа Б</MenuItem>
            <MenuItem value={'Группа C'}>Группа С</MenuItem>
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
            <MenuItem value={'Категория А'}>Категория А</MenuItem>
            <MenuItem value={'Категория Б'}>Категория Б</MenuItem>
            <MenuItem value={'Категория С'}>Категория С</MenuItem>
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
            <MenuItem value={'Подкатегория А'}>Подкатегория А</MenuItem>
            <MenuItem value={'Подкатегория Б'}>Подкатегория Б</MenuItem>
            <MenuItem value={'Подкатегория C'}>Подкатегория С</MenuItem>
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
