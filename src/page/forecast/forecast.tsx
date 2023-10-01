import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import search from '@/assets/icon/search.svg';
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

const Forecast = () => {
  const dispatch = useAppDispatch();
  const tk = useAppSelector((state) => state.filter.tk);
  const group = useAppSelector((state) => state.filter.group);
  const category = useAppSelector((state) => state.filter.category);
  const subcategories = useAppSelector((state) => state.filter.subcategories);
  const sku = useAppSelector((state) => state.filter.sku);
  const period = useAppSelector((state) => state.filter.period);
  const selectedDate = useAppSelector((state) => state.filter.selectedDate);

  const handleRemoveChip = (field: string, value: string) => {
    switch (field) {
      case 'tk':
        dispatch(setTk(tk.filter((item) => item !== value)));
        break;
      case 'group':
        dispatch(setGroup(group.filter((item) => item !== value)));
        break;
      case 'category':
        dispatch(setCategory(category.filter((item) => item !== value)));
        break;
      case 'subcategories':
        dispatch(
          setSubcategories(subcategories.filter((item) => item !== value)),
        );
        break;
      case 'sku':
        dispatch(setSku(sku.filter((item) => item !== value)));
        break;
      case 'period':
        dispatch(setPeriod(''));
        break;
      case 'selectedDate':
        dispatch(setSelectedDate(''));
        break;
      default:
        break;
    }
  };

  const chipStyles = {
    bgcolor: 'transparent',
    border: '1px solid #CDCDCD',
    color: '#003C96',
    mr: '16px',
    fontSize: '16px',
    fontWeigth: '400',
    lineHeight: '24px',
    backgroundColor: 'white',
    height: '40px',
  };

  const boxStyle = {};

  return (
    <div className="forecast" style={{ margin: '40px 24px', width: '100vw' }}>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <Typography
          sx={{ fontSize: '32px', fontWeight: '500', lineHeight: '42px' }}
        >
          Прогнозирование спроса товаров
        </Typography>
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#fff',
            borderRadius: '24px',
            padding: '5px 16px',
          }}
        >
          <img src={search} alt="Icon" />
          <input
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              width: '500px',
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
              backgroundColor: 'transparent',
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
      <Box sx={{ mb: '32px', mt: '16px', display: 'flex', flexWrap: 'wrap' }}>
        <Box sx={boxStyle}>
          {tk.map((value) => (
            <Chip
              key={value}
              label={value}
              onDelete={() => handleRemoveChip('tk', value)}
              sx={chipStyles}
            />
          ))}
        </Box>
        <Box>
          {group.map((value) => (
            <Chip
              key={value}
              label={value}
              onDelete={() => handleRemoveChip('group', value)}
              sx={chipStyles}
            />
          ))}
        </Box>
        <Box>
          {category.map((value) => (
            <Chip
              key={value}
              label={value}
              onDelete={() => handleRemoveChip('category', value)}
              sx={chipStyles}
            />
          ))}
        </Box>
        <Box>
          {subcategories.map((value) => (
            <Chip
              key={value}
              label={value}
              onDelete={() => handleRemoveChip('subcategories', value)}
              sx={chipStyles}
            />
          ))}
        </Box>
        <Box>
          {sku.map((value) => (
            <Chip
              key={value}
              label={value}
              onDelete={() => handleRemoveChip('sku', value)}
              sx={chipStyles}
            />
          ))}
        </Box>
        <Box>
          {period && (
            <Chip
              key={period}
              label={`${period} дней`}
              onDelete={() => handleRemoveChip('period', period)}
              sx={chipStyles}
            />
          )}
        </Box>
        <Box sx={boxStyle}>
          {selectedDate && (
            <Chip
              key={selectedDate}
              label={`с ${selectedDate}`}
              onDelete={() => handleRemoveChip('selectedDate', selectedDate)}
              sx={chipStyles}
            />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Forecast;
