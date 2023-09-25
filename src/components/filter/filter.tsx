import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import './filter.css';

const Filter: FC = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [tk, setTk] = React.useState('');
  const [group, setGroup] = React.useState('');
  const [category, setСategory] = React.useState('');
  const [subcategories, setSubcategories] = React.useState('');
  const [period, setPeriod] = React.useState('');

  const handleChangeTk = (event: SelectChangeEvent) => {
    setTk(event.target.value as string);
  };

  const handleChangeGroup = (event: SelectChangeEvent) => {
    setGroup(event.target.value as string);
  };

  const handleChangeСategory = (event: SelectChangeEvent) => {
    setСategory(event.target.value as string);
  };

  const handleChangeSubcategories = (event: SelectChangeEvent) => {
    setSubcategories(event.target.value as string);
  };

  const handleChangePeriod = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as string);
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
      <Collapse sx={{ marginTop: 2 }} in={menuOpen}>
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
            value={tk}
            label="Код ТК"
            onChange={handleChangeTk}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
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
            value={group}
            label="Группа товаров"
            onChange={handleChangeGroup}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
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
            value={category}
            label="Категория товаров"
            onChange={handleChangeСategory}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
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
            value={subcategories}
            label="Подкатегория товаров"
            onChange={handleChangeSubcategories}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
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
            backgroundColor: '#003C96',
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
