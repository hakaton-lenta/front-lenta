import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import search from '@/assets/icon/search.svg';
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

const Forecast = () => {
  const dispatch = useAppDispatch();
  const tk = useAppSelector((state) => state.filter.tk);
  const group = useAppSelector((state) => state.filter.group);
  const category = useAppSelector((state) => state.filter.category);
  const subcategory = useAppSelector((state) => state.filter.subcategory);
  const sku = useAppSelector((state) => state.filter.sku);
  const period = useAppSelector((state) => state.filter.period);
  const selectedDate = useAppSelector((state) => state.filter.selectedDate);

  const handleRemoveChip = (field: string) => {
    switch (field) {
      case 'tk':
        dispatch(setTk({ id: 0, store: '' }));
        break;
      case 'group':
        dispatch(setGroup({ id: 0, groupId: '' }));
        break;
      case 'category':
        dispatch(setCategory({ id: 0, catId: '' }));
        break;
      case 'subcategory':
        dispatch(setSubcategory({ id: 0, subcatId: '' }));
        break;
      case 'sku':
        dispatch(setSku({ id: 0, skuId: '' }));
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
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          height: '42px',
        }}
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
          {tk.store && (
            <Chip
              key={tk.id}
              label={tk.store}
              onDelete={() => handleRemoveChip('tk')}
              sx={chipStyles}
            />
          )}
        </Box>
        <Box>
          {group.groupId && (
            <Chip
              key={group.id}
              label={group.groupId}
              onDelete={() => handleRemoveChip('group')}
              sx={chipStyles}
            />
          )}
        </Box>
        <Box>
          {category.catId && (
            <Chip
              key={category.id}
              label={category.catId}
              onDelete={() => handleRemoveChip('category')}
              sx={chipStyles}
            />
          )}
        </Box>
        <Box>
          {subcategory.subcatId && (
            <Chip
              key={subcategory.id}
              label={subcategory.subcatId}
              onDelete={() => handleRemoveChip('subcategory')}
              sx={chipStyles}
            />
          )}
        </Box>
        <Box>
          {sku.skuId && (
            <Chip
              key={sku.id}
              label={sku.skuId}
              onDelete={() => handleRemoveChip('sku')}
              sx={chipStyles}
            />
          )}
        </Box>
        <Box>
          {period && (
            <Chip
              key={period}
              label={`${period} дней`}
              onDelete={() => handleRemoveChip('period')}
              sx={chipStyles}
            />
          )}
        </Box>
        <Box sx={boxStyle}>
          {selectedDate && (
            <Chip
              key={selectedDate}
              label={`с ${selectedDate}`}
              onDelete={() => handleRemoveChip('selectedDate')}
              sx={chipStyles}
            />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Forecast;
