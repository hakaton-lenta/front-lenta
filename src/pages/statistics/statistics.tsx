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
import { RootState } from '../../services/redux/store';
import { useAppSelector } from '../../services/typeHooks';
import { useEffect, useState } from 'react';

// const seriesA = {
//   id: 'Aseria',
//   data: [2, 3, 4, 3, 4],
//   label: 'Прогноз',
//   color: '#2FCBFF',
// };
// const seriesB = {
//   id: 'Bseria',
//   data: [],
//   label: 'Факт',
//   color: '#FFB900',
// };

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: '#',
    width: 10,
  },
  {
    field: 'st_id',
    headerName: 'Код ТК',
    width: 200,
  },
  {
    field: 'pr_sku_id',
    headerName: 'Товар (SKU)',
    width: 150,
    editable: false,
  },
  {
    field: 'pr_uom_id',
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
    field: 'target',
    headerName: 'Прогноз спроса',
    // type: 'number',
    width: 110,
    editable: false,
  },
];

// const rows = [
//   {
//     id: 1,
//     sku: 'Jon',
//     messurement: 'шт',
//     data: '23.08.2023',
//     forecast: '4',
//   },
//   {
//     id: 2,
//     sku: 'Cersei',
//     messurement: 'шт',
//     data: '23.08.2023',
//     forecast: '4',
//   },
// ];

interface TransformedData {
  id: number;
  st_id: string;
  pr_sku_id: string;
  pr_uom_id: string;
  data: string;
  target: string;
}

const Statistics = () => {
  // const sales = useAppSelector((state: RootState) => state.sale.data);
  const predicto = useAppSelector((state: RootState) => state.predict.data);//данные прогноза
  const [maxPredict, setMaxPredict] = useState<number>(0);//максимальный прогноз
  const [sumPredict, setSumPredict] = useState<number>(0);//Сумма прогноза
  const [targets, setTargets] = useState<number[]>([]);//значения прогноза
  const [dates, setDates] = useState<string[]>([]);//даты прогноза
  const [transformedData, setTransformedData] = useState<TransformedData[]>([]);//данные для таблицы
  // console.log(predicto);
  useEffect(() => {
    if (predicto.length > 0) {
      const predictArray = predicto[0].product.predict;
      const sortedData = [...predictArray].reverse();
      const updatedTargets: number[] = [];
      const updatedDates: string[] = [];
      let lmax = 0;//локальный максимум
      let lsum = 0;//локальная сумма
      sortedData.forEach((item) => {
        if (lmax < item.target) lmax = item.target;
        lsum += item.target;
        updatedTargets.push(item.target);
        const date = new Date(item.date);
        const formattedDate = `${
          date.getDate() < 10 ? '0' : ''
        }${date.getDate()}.${date.getMonth() + 1 < 10 ? '0' : ''}${
          date.getMonth() + 1
        }`;
        updatedDates.push(formattedDate);
      });
      setMaxPredict(lmax);
      setSumPredict(lsum);
      setTargets(updatedTargets);
      setDates(updatedDates);
      let increment = 0;
      const tData: TransformedData[] = sortedData.map((item) => {
        const date = new Date(item.date);
        increment++;
        const formattedDate = `${
          date.getDate() < 10 ? '0' : ''
        }${date.getDate()}.${date.getMonth() + 1 < 10 ? '0' : ''}${
          date.getMonth() + 1
        }`;
        return {
          id: increment,
          st_id: predicto[0].st_id,
          pr_sku_id: predicto[0].product.pr_sku_id,
          pr_uom_id: predicto[0].product.pr_uom_id.toString(), // преобразовываем в строку
          data: formattedDate,
          target: item.target.toString(), // преобразовываем в строку
        };
      });
      setTransformedData(tData);
    }
  }, [predicto]);
  if (targets.length > 0 && dates.length > 0) {
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
                        data: dates,
                        scaleType: 'band',
                      },
                    ]}
                    yAxis={[
                      {
                        min: 0,
                        max: maxPredict + 1,
                      },
                    ]}
                    series={[
                      {
                        id: 'Aseria',
                        data: targets,
                        label: 'Прогноз',
                        color: '#2FCBFF',
                      },
                    ]} //, { ...seriesB }
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
                      <LineDescRightPart>-</LineDescRightPart>
                    </LineDesc>
                    <LineDesc>
                      <LineDescLeftPart>Прогноз</LineDescLeftPart>
                      <LineDescRightPart>{sumPredict}</LineDescRightPart>
                    </LineDesc>
                    <LineDesc>
                      <LineDescLeftPart>
                        Точность
                        <br /> прогноза
                      </LineDescLeftPart>
                      <LineDescRightPart style={{ color: 'green' }}>
                        -
                      </LineDescRightPart>
                    </LineDesc>
                  </div>
                  <div>
                    <TitleDesc>В прошлом:</TitleDesc>
                    <LineDesc>
                      <LineDescLeftPart>год</LineDescLeftPart>
                      <LineDescRightPart>-</LineDescRightPart>
                    </LineDesc>
                    <LineDesc>
                      <LineDescLeftPart>месяц</LineDescLeftPart>
                      <LineDescRightPart>-</LineDescRightPart>
                    </LineDesc>
                    <LineDesc>
                      <LineDescLeftPart>неделя</LineDescLeftPart>
                      <LineDescRightPart>-</LineDescRightPart>
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
                        data: dates,
                        scaleType: 'band',
                      },
                    ]}
                    yAxis={[
                      {
                        min: 0,
                        max: maxPredict + 1,
                      },
                    ]}
                    series={[
                      {
                        id: 'Aseria',
                        data: targets,
                        label: 'Прогноз',
                        color: '#2FCBFF',
                        area: true,
                      },
                    ]}
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
                      <LineDescRightPart>-</LineDescRightPart>
                    </LineDesc>
                    <LineDesc>
                      <LineDescLeftPart>Потери</LineDescLeftPart>
                      <LineDescRightPart>-</LineDescRightPart>
                    </LineDesc>
                    <LineDesc>
                      <LineDescLeftPart>
                        Точность
                        <br /> прогноза
                      </LineDescLeftPart>
                      <LineDescRightPart style={{ color: 'green' }}>
                        -
                      </LineDescRightPart>
                    </LineDesc>
                  </div>
                  <div>
                    <TitleDesc>В прошлом:</TitleDesc>
                    <LineDesc>
                      <LineDescLeftPart>год</LineDescLeftPart>
                      <LineDescRightPart>-</LineDescRightPart>
                    </LineDesc>
                    <LineDesc>
                      <LineDescLeftPart>месяц</LineDescLeftPart>
                      <LineDescRightPart>-</LineDescRightPart>
                    </LineDesc>
                    <LineDesc>
                      <LineDescLeftPart>неделя</LineDescLeftPart>
                      <LineDescRightPart>-</LineDescRightPart>
                    </LineDesc>
                  </div>
                </RightDescBlock>
              </Grid>
            </CustomPaper>
          </Grid>
          <Grid item xs={9}>
            <CustomPaper style={{ padding: '0' }}>
              <TitleGraphBlock
                style={{ alignItems: 'center', padding: '0 12px', margin: '0' }}
              >
                <TitleGraph>Фактические и спрогнозированные продажи</TitleGraph>
              </TitleGraphBlock>
              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={transformedData}
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
                  sx={{
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
                  }}
                />
              </Box>
            </CustomPaper>
          </Grid>
          <Grid item xs={3}>
            <CustomPaper style={{ padding: '12px' }}>
              <TitleDesc>Спрос на 14 дней:</TitleDesc>
              <LineDesc>
                <LineDescLeftPart>Прогноз</LineDescLeftPart>
                <LineDescRightPart>{sumPredict}</LineDescRightPart>
              </LineDesc>
              <LineDesc>
                <LineDescLeftPart>Остаток</LineDescLeftPart>
                <LineDescRightPart>-</LineDescRightPart>
              </LineDesc>
              <LineDesc>
                <LineDescLeftPart>Закупка</LineDescLeftPart>
                <LineDescRightPart style={{ color: 'green' }}>
                  -
                </LineDescRightPart>
              </LineDesc>
              <button className={styles.export}>Выгрузить</button>
            </CustomPaper>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Statistics;
