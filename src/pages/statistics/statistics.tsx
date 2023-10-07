import { Box, Grid } from '@mui/material';
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
                График фактических продаж
                <br />и прогнозирования спроса за 14 дней
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
              <TitleGraph>График прогнозирования спроса на 14 дней</TitleGraph>
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
                    <LineDescRightPart>+5,5%</LineDescRightPart>
                  </LineDesc>
                  <LineDesc>
                    <LineDescLeftPart>Потери</LineDescLeftPart>
                    <LineDescRightPart>-0,2%</LineDescRightPart>
                  </LineDesc>
                  <LineDesc>
                    <LineDescLeftPart>
                      Точность
                      <br /> прогноза
                    </LineDescLeftPart>
                    <LineDescRightPart style={{ color: 'green' }}>
                      90%
                    </LineDescRightPart>
                  </LineDesc>
                </div>
                <div>
                  <TitleDesc>В прошлом:</TitleDesc>
                  <LineDesc>
                    <LineDescLeftPart>год</LineDescLeftPart>
                    <LineDescRightPart>+2,2%</LineDescRightPart>
                  </LineDesc>
                  <LineDesc>
                    <LineDescLeftPart>месяц</LineDescLeftPart>
                    <LineDescRightPart>+0,3%</LineDescRightPart>
                  </LineDesc>
                  <LineDesc>
                    <LineDescLeftPart>неделя</LineDescLeftPart>
                    <LineDescRightPart>+0,3%</LineDescRightPart>
                  </LineDesc>
                </div>
              </RightDescBlock>
            </Grid>
          </CustomPaper>
        </Grid>
        <Grid item xs={12}>
          <CustomPaper style={{ padding: '0' }}>
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
              />
            </Box>
          </CustomPaper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Statistics;
