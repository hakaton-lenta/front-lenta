import { Box, Grid } from '@mui/material';
import styles from './statistics.module.scss';
import Features from '../../components/features/features';
import {
  CustomPaper,
  LeftDescBlock,
  LineDesc,
  LineDescLeftPart,
  LineDescRightPart,
  RightDescBlock,
  TitleDesc,
  TitleGraph,
  TitleGraphBlock,
  TitleList,
  TitleListLi,
  TitleListSpan,
} from '../../components/formelements';
import { LineChart } from '@mui/x-charts/LineChart';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const seriesA = {
  id: 'Aseria',
  data: [2, 3, 4, 3, 4],
  label: 'Прогноз',
  color: '#2FCBFF',
};
const seriesB = {
  id: 'Bseria',
  data: [3, 1, 4, 2, 1],
  label: 'Факт',
  color: '#FFB900',
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Код ТК', width: 120 },
  {
    field: 'subcategory',
    headerName: 'Подкатегория товара',
    width: 250,
    editable: false,
  },
  {
    field: 'sku',
    headerName: 'Товар (SKU)',
    width: 150,
    editable: false,
  },
  {
    field: 'messurement',
    headerName: 'Единица измерения',
    // type: 'number',
    width: 110,
    editable: false,
  },
  {
    field: 'data',
    headerName: 'Дата',
    // type: 'number',
    width: 110,
    editable: false,
  },
  {
    field: 'forecast',
    headerName: 'Прогноз спроса',
    // type: 'number',
    width: 110,
    editable: false,
  },
];

const rows = [
  {
    id: 1,
    subcategory: 'Snow',
    sku: 'Jon',
    messurement: 'шт',
    data: '23.08.2023',
    forecast: '4',
  },
  {
    id: 2,
    subcategory: 'Lannister',
    sku: 'Cersei',
    messurement: 'шт',
    data: '23.08.2023',
    forecast: '4',
  },
  {
    id: 3,
    subcategory: 'Lannister',
    sku: 'Jaime',
    messurement: 'шт',
    data: '23.08.2023',
    forecast: '4',
  },
  {
    id: 4,
    subcategory: 'Stark',
    sku: 'Arya',
    messurement: 'шт',
    data: '23.08.2023',
    forecast: '4',
  },
  {
    id: 5,
    subcategory: 'Targaryen',
    sku: 'Daenerys',
    messurement: 'шт',
    data: '23.08.2023',
    forecast: '4',
  },
  {
    id: 6,
    subcategory: 'Melisandre',
    sku: null,
    messurement: 'шт',
    data: '23.08.2023',
    forecast: '4',
  },
  {
    id: 7,
    subcategory: 'Clifford',
    sku: 'Ferrara',
    messurement: 'шт',
    data: '23.08.2023',
    forecast: '4',
  },
  {
    id: 8,
    subcategory: 'Frances',
    sku: 'Rossini',
    messurement: 'шт',
    data: '23.08.2023',
    forecast: '4',
  },
  {
    id: 9,
    subcategory: 'Roxie',
    sku: 'Harvey',
    messurement: 'шт',
    data: '23.08.2023',
    forecast: '4',
  },
];

const Statistics = () => {
  return (
    <div className="forecast" style={{ margin: '40px 24px', width: '100vw' }}>
      <Features title={'Статистика'} />
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <CustomPaper>
            <TitleGraphBlock>
              <TitleGraph>
                График продаж и прогнозирования
                <br />
                спроса за предыдущие 14 дней
              </TitleGraph>
              <TitleList>
                <TitleListLi>
                  <TitleListSpan
                    style={{ backgroundColor: '#2FCBFF' }}
                  ></TitleListSpan>
                  <Box>Прогноз</Box>
                </TitleListLi>
                <TitleListLi>
                  <TitleListSpan
                    style={{ backgroundColor: '#FFB900' }}
                  ></TitleListSpan>
                  <Box>Факт</Box>
                </TitleListLi>
              </TitleList>
            </TitleGraphBlock>
            <Grid style={{ display: 'flex' }}>
              <LeftDescBlock>
                <LineChart
                  xAxis={[
                    {
                      data: ['23.08', '24.08', '25.08', '26.08', '27.08'],
                      scaleType: 'band',
                    },
                  ]}
                  series={[{ ...seriesA }, { ...seriesB }]}
                  height={252}
                  margin={{ top: 10, right: 30, bottom: 20, left: 33 }}
                  sx={{
                    '& .MuiChartsAxis-left .MuiChartsAxis-line': {
                      display: 'none',
                    },
                    '& .MuiChartsAxis-bottom .MuiChartsAxis-line': {
                      stroke: '#F0F0F0',
                      strokeWidth: 1,
                    },
                    '& .MuiChartsAxis-tick': {
                      stroke: '#F0F0F0',
                      strokeWidth: 1,
                    },
                    '.MuiChartsLegend-root': {
                      display: 'none',
                    },
                    '.MuiChartsAxis-tickLabel': {
                      fontFamily: 'Futura PT',
                      color: '#4D4D4D',
                      fontSize: '10px',
                    },
                    '.MuiMarkElement-root1': {
                      stroke: '#8884d8',
                      scale: '0.6',
                      fill: '#fff',
                      strokeWidth: 1,
                    },
                  }}
                />
              </LeftDescBlock>
              <RightDescBlock>
                <div style={{ marginBottom: '16px' }}>
                  <TitleDesc>Всего:</TitleDesc>
                  <LineDesc>
                    <LineDescLeftPart>Факт</LineDescLeftPart>
                    <LineDescRightPart>1980&nbsp;шт</LineDescRightPart>
                  </LineDesc>
                  <LineDesc>
                    <LineDescLeftPart>Прогноз</LineDescLeftPart>
                    <LineDescRightPart>3000&nbsp;шт</LineDescRightPart>
                  </LineDesc>
                  <LineDesc>
                    <LineDescLeftPart>
                      Точность
                      <br /> прогноза
                    </LineDescLeftPart>
                    <LineDescRightPart style={{ color: 'green' }}>
                      80%
                    </LineDescRightPart>
                  </LineDesc>
                </div>
                <div>
                  <TitleDesc>В прошлом:</TitleDesc>
                  <LineDesc>
                    <LineDescLeftPart>год</LineDescLeftPart>
                    <LineDescRightPart>1980&nbsp;шт</LineDescRightPart>
                  </LineDesc>
                  <LineDesc>
                    <LineDescLeftPart>месяц</LineDescLeftPart>
                    <LineDescRightPart>3000&nbsp;шт</LineDescRightPart>
                  </LineDesc>
                  <LineDesc>
                    <LineDescLeftPart>неделя</LineDescLeftPart>
                    <LineDescRightPart>4000&nbsp;шт</LineDescRightPart>
                  </LineDesc>
                </div>
              </RightDescBlock>
            </Grid>
          </CustomPaper>
        </Grid>
        <Grid item xs={6}>
          <CustomPaper>
            <TitleGraphBlock>
              <TitleGraph>
                График прогнозирования спроса
                <br />
                на следующие 14 дней
              </TitleGraph>
              <TitleList>
                <TitleListLi>
                  <TitleListSpan
                    style={{ backgroundColor: '#2FCBFF' }}
                  ></TitleListSpan>
                  <Box>Прогноз</Box>
                </TitleListLi>
              </TitleList>
            </TitleGraphBlock>
            <Grid style={{ display: 'flex' }}>
              <LeftDescBlock>
                <LineChart
                  xAxis={[
                    {
                      data: ['23.08', '24.08', '25.08', '26.08', '27.08'],
                      scaleType: 'band',
                    },
                  ]}
                  series={[{ ...seriesA, area: true }]}
                  height={252}
                  margin={{ top: 10, right: 30, bottom: 20, left: 33 }}
                  sx={{
                    '& .MuiAreaElement-series-Aseria': {
                      fill: "url('#myGradient')",
                    },
                    '& .MuiChartsAxis-left .MuiChartsAxis-line': {
                      display: 'none',
                    },
                    '& .MuiChartsAxis-bottom .MuiChartsAxis-line': {
                      stroke: '#F0F0F0',
                      strokeWidth: 1,
                    },
                    '& .MuiChartsAxis-tick': {
                      stroke: '#F0F0F0',
                      strokeWidth: 1,
                    },
                    '.MuiChartsLegend-root': {
                      display: 'none',
                    },
                    '.MuiChartsAxis-tickLabel': {
                      fontFamily: 'Futura PT',
                      color: '#4D4D4D',
                      fontSize: '10px',
                    },
                  }}
                >
                  <defs>
                    <linearGradient
                      id="myGradient"
                      gradientTransform="rotate(90)"
                    >
                      <stop offset="15%" stopColor="#2FCBFF" />
                      <stop
                        offset="100%"
                        stopColor="rgba(47, 203, 255, 0.10)"
                      />
                    </linearGradient>
                  </defs>
                </LineChart>
              </LeftDescBlock>
              <RightDescBlock>
                <div style={{ marginBottom: '16px' }}>
                  <TitleDesc>Всего:</TitleDesc>
                  <LineDesc>
                    <LineDescLeftPart>Прибыль</LineDescLeftPart>
                    <LineDescRightPart>N/A</LineDescRightPart>
                  </LineDesc>
                  <LineDesc>
                    <LineDescLeftPart>Потери</LineDescLeftPart>
                    <LineDescRightPart>N/A</LineDescRightPart>
                  </LineDesc>
                  <LineDesc>
                    <LineDescLeftPart>
                      Точность
                      <br /> прогноза
                    </LineDescLeftPart>
                    <LineDescRightPart style={{ color: 'green' }}>
                      N/A
                    </LineDescRightPart>
                  </LineDesc>
                </div>
                <div>
                  <TitleDesc>В прошлом:</TitleDesc>
                  <LineDesc>
                    <LineDescLeftPart>год</LineDescLeftPart>
                    <LineDescRightPart>N/A</LineDescRightPart>
                  </LineDesc>
                  <LineDesc>
                    <LineDescLeftPart>месяц</LineDescLeftPart>
                    <LineDescRightPart>N/A</LineDescRightPart>
                  </LineDesc>
                  <LineDesc>
                    <LineDescLeftPart>неделя</LineDescLeftPart>
                    <LineDescRightPart>N/A</LineDescRightPart>
                  </LineDesc>
                </div>
              </RightDescBlock>
            </Grid>
          </CustomPaper>
        </Grid>
        <Grid item xs={9}>
          <CustomPaper style={{ padding: '0' }}>
            <TitleGraphBlock style={{alignItems: 'center',padding: '0 12px', margin: '0'}}>
              <TitleGraph>Фактические и спрогнозированные продажи</TitleGraph>
            </TitleGraphBlock>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                // checkboxSelection
                disableRowSelectionOnClick
                sx={
                  {
                    '&.MuiDataGrid-root': {
                      borderRadius: '0',
                      border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                      // borderBottom: 'none',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                      // backgroundColor: '#F0F0F0',
                      backgroundColor: 'rgba(0,0,0,0.02)',
                    },
                  }
                }
              />
            </Box>
          </CustomPaper>
        </Grid>
        <Grid item xs={3}>
          <CustomPaper style={{ padding: '12px' }}>
            <TitleDesc>Спрос на 14 дней:</TitleDesc>
            <LineDesc>
              <LineDescLeftPart>Прогноз</LineDescLeftPart>
              <LineDescRightPart>1000&nbsp;шт</LineDescRightPart>
            </LineDesc>
            <LineDesc>
              <LineDescLeftPart>Остаток</LineDescLeftPart>
              <LineDescRightPart>N/A</LineDescRightPart>
            </LineDesc>
            <LineDesc>
              <LineDescLeftPart>Закупка</LineDescLeftPart>
              <LineDescRightPart style={{ color: 'green' }}>
                N/A
              </LineDescRightPart>
            </LineDesc>
            <button className={styles.export}>Выгрузить</button>
          </CustomPaper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Statistics;
